const announcement_detail = require('../model/Announcement_details');

const announcement_details_handler = async (req, res) =>
{
  const announcement_details = await announcement_detail.find();
  return res.status(200).json({ announcement_details })
};

module.exports = { announcement_details_handler }