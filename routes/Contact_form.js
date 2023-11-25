const express = require('express');
const router = express.Router();
const contact_form_controller = require('../controller/Contact_form_controller');

router.route('/')
  .get(contact_form_controller.get_contact_entries_handler)
  .post(contact_form_controller.contact_form_handler)

router.delete('/:id', contact_form_controller.delete_contact_entry_handler);
  
module.exports = router