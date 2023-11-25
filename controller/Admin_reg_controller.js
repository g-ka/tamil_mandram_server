const path = require('path');
const fs_promises = require('fs').promises;
const bcrypt = require('bcrypt');

const admin_reg_list = require('../model/Admin_reg_list.json');

const admin_reg_handler = async (req, res) =>
{
  const { username, seckey, password } = req.body;

  if(!username || !seckey || !password) return res.sendStatus(400);

  const exist = admin_reg_list.find(reg => seckey == reg.seckey);
  if(!exist) return res.sendStatus(409);

  if(exist.username || exist.password) return res.sendStatus(403);

  const username_exist = admin_reg_list.find(reg => username == reg.username);
  if(username_exist) return res.sendStatus(408);    

  try
  {
    const hash_password = await bcrypt.hash(password, 10);

    const filtered_list = admin_reg_list.filter(reg => seckey != reg.seckey);
    exist["username"] = username;
    exist["password"] = hash_password;
    const updated_list = [...filtered_list, exist];

    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Admin_reg_list.json'), JSON.stringify(updated_list));
    return res.sendStatus(201);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

module.exports = { admin_reg_handler }