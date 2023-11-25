const { format } = require('date-fns');
const path = require('path');
const fs_promises = require('fs').promises;

const contact_form_entry_logger = require('../model/contact_form_entry.json'); 

const get_contact_entries_handler = (req, res) =>
{
  if(!req.cookies?.jwt) return res.sendStatus(401);

  return res.status(200).json({ message_list: contact_form_entry_logger });
};  

const contact_form_handler = async (req, res) =>
{
  const date_time = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  const { name, email, subject, message } = req.body;

  if(!subject || !message) return res.sendStatus(400);

  const length = contact_form_entry_logger.length;
  const id = length ? contact_form_entry_logger[length-1]?.id + 1 : 1;

  const new_message = {
    id,
    name,
    email,
    subject,
    message,
    "time": date_time
  };
  const updated_contact_form_entry_logger = [...contact_form_entry_logger, new_message];

  try
  {
    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'contact_form_entry.json'), JSON.stringify(updated_contact_form_entry_logger));

    return res.sendStatus(201)
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

const delete_contact_entry_handler = async (req, res) =>
{
  if(!req.params.id) return res.sendStatus(422);

  const id = req.params.id;
  const updated_list = contact_form_entry_logger.filter(entry => entry.id != id);

  try
  {
    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'contact_form_entry.json'), JSON.stringify(updated_list));
    return res.sendStatus(204);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

module.exports = { contact_form_handler, get_contact_entries_handler, delete_contact_entry_handler }