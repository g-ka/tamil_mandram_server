const express = require('express');
const router = express.Router();
const Announcement_details_controller = require('../controller/Announcement_details_controller');
const Update_ac_details_controller = require('../controller/Update_ac_details_controller');

router.get('/', Announcement_details_controller.announcement_details_handler);
router.post('/update', Update_ac_details_controller.update_ac_details_handler);

module.exports = router