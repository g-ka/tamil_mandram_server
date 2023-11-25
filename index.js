require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

// Third-party middleware(s) imports:
const CORS = require('cors');
const cookie_parser = require('cookie-parser');

// Inter-links:
// 1) Configuration:
const CORS_options = require('./configuration/CORS_options');
// 2) Middleware:
const Credentials = require('./middleware/Credentials');
const Log_req = require('./middleware/Log_req');
// 3) Routes:
const Unmatched = require('./routes/Unmatched');
const visit_count = require('./routes/Visit_count');
const contact_form = require('./routes/Contact_form');
const announcement_details = require('./routes/Announcement_details');
const admin_reg = require('./routes/Admin_reg');
const admin_log = require('./routes/Admin_log');
const admin_logout = require('./routes/Admin_logout');

// Custom middleware for logging the Request method and url:
app.use(Log_req);

// Setting 'Acess-Control-Allowed-Origins' header to 'true' for all allowed origins:
app.use(Credentials);  

// Third-party CORS middleware:
app.use(CORS(CORS_options));

// Third-party cookie-parsing middleware:
app.use(cookie_parser());

// Express in-built middleware for parsing place_holders from URL:
app.use(express.urlencoded({ extended: false }));

// Express in-built middleware for parsing JSON paylod:
app.use(express.json());

// Express in-built middleware for routing static files:
app.use(express.static(path.join(__dirname, '/public')));

// Routes:
app.use('/visit_count', visit_count);
app.use('/contact_form', contact_form);
app.use('/announcement_details', announcement_details);
app.use('/admin_reg', admin_reg);
app.use('/admin_log', admin_log);
app.use('/admin_logout', admin_logout);

app.all('*', Unmatched);

app.listen(PORT, () =>
{
  console.log('The server is running in port: '+PORT);
});