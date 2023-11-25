const path = require('path');
const fs_promises = require('fs').promises;

const admin_reg_list = require('../model/Admin_reg_list.json');

const admin_logout_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = admin_reg_list.find(reg => reg.refresh_token == refresh_token);
  if(!exist) return res.sendStatus(401);

  exist.refresh_token = '';
  const filtered_list = admin_reg_list.filter(reg => reg.username != exist.username);
  const updated_list = [...filtered_list, exist];

  try
  {    
    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Admin_reg_list.json'), JSON.stringify(updated_list));
    res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None' });
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

module.exports = { admin_logout_handler }