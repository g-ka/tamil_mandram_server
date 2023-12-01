const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

const vc_logger = require('../model/Visit_count');
const admin_reg_list = require('../model/Admin_reg_list');

const Visit_count_handler = async (req, res) =>
{
  const date_time = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

  if(!req.cookies?.visitor_id)
  {    
    const new_visitor_id = uuid();
    res.cookie('visitor_id', new_visitor_id, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 12*60*60*1000});

    await vc_logger.create({
      id: new_visitor_id,
      "visit(s)": 1,
      time: date_time
    });
  }
  else
  {
    const current_visitor = await vc_logger.findOne({id: req.cookies?.visitor_id});

    current_visitor["time"] = date_time;
    current_visitor["visit(s)"] += 1; 

    await current_visitor.save();
  }

  if(req.cookies?.jwt)
  {
    const refresh_token = req.cookies.jwt;

    const exist = await admin_reg_list.findOne({refresh_token: refresh_token});
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

const fetch_visit_count_handler = async (req, res) =>
{
  const vc_list = await vc_logger.find();
  return res.status(200).json({ vc_list });
};

module.exports = { Visit_count_handler, fetch_visit_count_handler }