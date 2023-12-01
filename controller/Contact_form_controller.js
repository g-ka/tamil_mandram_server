const { format } = require('date-fns');

const contact_form_entry_logger = require('../model/Contact_form_entry'); 

const get_contact_entries_handler = async (req, res) =>
{
  if(!req.cookies?.jwt) return res.sendStatus(401);

  const message_list = await contact_form_entry_logger.find();
  return res.status(200).json({ message_list });
};  

const contact_form_handler = async (req, res) =>
{
  const date_time = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  const { name, email, subject, message } = req.body;

  if(!subject || !message) return res.sendStatus(400);

  const message_list = await contact_form_entry_logger.find();
  const length = message_list.length;
  const id = length ? message_list[length-1]?.id + 1 : 1;

  try
  {    
    await contact_form_entry_logger.create({
      id,
      name,
      email,
      subject,
      message,
      time: date_time      
    });

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

  try
  {    
    await contact_form_entry_logger.deleteOne({id: id});
    return res.sendStatus(204);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

module.exports = { contact_form_handler, get_contact_entries_handler, delete_contact_entry_handler }