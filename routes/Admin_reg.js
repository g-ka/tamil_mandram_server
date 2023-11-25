const express = require('express');
const router = express.Router();
const admin_reg_controller = require('../controller/Admin_reg_controller');

router.post('/', admin_reg_controller.admin_reg_handler);

module.exports = router