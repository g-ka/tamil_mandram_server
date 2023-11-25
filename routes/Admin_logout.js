const express = require('express');
const router = express.Router();
const admin_logout_controller = require('../controller/Admin_logout_controller');

router.get('/', admin_logout_controller.admin_logout_handler);

module.exports = router