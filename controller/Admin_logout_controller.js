const admin_reg_list = require('../model/Admin_reg_list');

const admin_logout_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = await admin_reg_list.findOne({refresh_token: refresh_token});
  if(!exist) return res.sendStatus(401);

  exist.refresh_token = '';

  try
  {    
    await exist.save();
    res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None' });
    return res.sendStatus(200);
  }
  catch(err)
  {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

module.exports = { admin_logout_handler }