const express = require('express');
const router = express.Router();
const visit_count_controller = require('../controller/Visit_count_controller');

router.get('/', visit_count_controller.Visit_count_handler);
router.get('/fetch_vc', visit_count_controller.fetch_visit_count_handler);

module.exports = router