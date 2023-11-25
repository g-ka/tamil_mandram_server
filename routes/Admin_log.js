const express = require('express');
const router = express.Router();
const admin_log_controller = require('../controller/Admin_log_controller');

router.post('/', admin_log_controller.admin_log_handler);

module.exports = router