const bcrypt = require('bcrypt');

const admin_reg_list = require('../model/Admin_reg_list');

const admin_reg_handler = async (req, res) =>
{
  const { username, seckey, password } = req.body;

  if(!username || !seckey || !password) return res.sendStatus(400);

  const exist = await admin_reg_list.findOne({seckey: seckey});
  if(!exist) return res.sendStatus(409);

  if(exist.username || exist.password) return res.sendStatus(403);

  const username_exist = await admin_reg_list.findOne({username: username});
  if(username_exist) return res.sendStatus(408);    

  try
  {
    const hash_password = await bcrypt.hash(password, 10);

    exist["username"] = username;
    exist["password"] = hash_password;
    await exist.save();

    return res.sendStatus(201);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

module.exports = { admin_reg_handler }