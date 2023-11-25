const path = require('path');
const fs_promises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const admin_reg_list = require('../model/Admin_reg_list.json');

const admin_log_handler = async (req, res) =>
{

  const { username , password } = req.body;

  if(!username || !password)  return res.sendStatus(400);

  const exist = admin_reg_list.find(reg => reg.username == username);
  if(!exist) return res.sendStatus(401);

  const match = await bcrypt.compare(password, exist.password);
  if(match)
  {
    const refresh_token = jwt.sign(
      {
        admin:{
          username: exist.username
        }
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    try
    {
      const filtered_list = admin_reg_list.filter(reg => username != reg.username);
      exist["refresh_token"] = refresh_token;
      const updated_list = [...filtered_list, exist];
      await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Admin_reg_list.json'), JSON.stringify(updated_list));

      res.cookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None', maxAge: 24*60*60*1000 });
      return res.sendStatus(200);
    }
    catch(err)
    {
      return res.sendStatus(500);
    }
  }
  else
  {
    return res.sendStatus(409);
  }
};

module.exports = { admin_log_handler }