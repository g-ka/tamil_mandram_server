const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs_promises = require('fs').promises; 
const jwt = require('jsonwebtoken');

const vc_logger = require('../model/Visit_count.json');
const admin_reg_list = require('../model/Admin_reg_list.json');

const Visit_count_handler = async (req, res) =>
{
  const date_time = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

  if(!req.cookies?.visitor_id)
  {    
    const new_visitor_id = uuid();
    res.cookie('visitor_id', new_visitor_id, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 12*60*60*1000});
    vc_logger.push({
      "id": new_visitor_id,
      "visit(s)": 1,
      "time": date_time
    });
    
    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Visit_count.json'), JSON.stringify(vc_logger));    
  }
  else
  {
    const current_visitor = vc_logger.find(visitor => visitor.id == req.cookies?.visitor_id);
    const remaining_visitors = vc_logger.filter(visitor => visitor.id != req.cookies?.visitor_id);

    current_visitor["time"] = date_time;
    current_visitor["visit(s)"] += 1; 
    const updated_vc_logger = [...remaining_visitors, current_visitor];

    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Visit_count.json'), JSON.stringify(updated_vc_logger));    
  }

  if(req.cookies?.jwt)
  {
    const refresh_token = req.cookies.jwt;

    const exist = admin_reg_list.find(reg => reg.refresh_token == refresh_token);
    if(!exist) return res.sendStatus(401);

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) =>
      {
        if(err || exist.username != decoded.admin.username)
        {
          return res.sendStatus(403);
        }

        res.status(202);
        return res.json({ "username": decoded.admin.username });
      }
    );
  }

  return res.end();
};

const fetch_visit_count_handler = (req, res) =>
{
  return res.status(200).json({ vc_list: vc_logger });
};

module.exports = { Visit_count_handler, fetch_visit_count_handler }