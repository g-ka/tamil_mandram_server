const announcement_details = require('../model/Announcement_details.json');

const announcement_details_handler = (req, res) =>
{
  return res.status(200).json({ announcement_details })
};

module.exports = { announcement_details_handler }