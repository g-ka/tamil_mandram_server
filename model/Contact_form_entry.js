const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contact_form_entry = new Schema({
  id: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  time: String
});

module.exports = model('Message', contact_form_entry)