const { format } = require('date-fns');
const path = require('path');
const fs_promises = require('fs').promises;

const ac_details = require('../model/Announcement_details.json');

const update_ac_details_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;

  if(!refresh_token) return res.sendStatus(401);

  const date = format(new Date(), 'dd/MM/yyyy');

  try
  {
    const { 
      title, 
      desc,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten
    } = req.body;

    ac_details[0]["title"] = title;
    ac_details[0]["desc"] = desc;
    ac_details[0]["points"][0] = one;
    ac_details[0]["points"][1] = two;
    ac_details[0]["points"][2] = three;
    ac_details[0]["points"][3] = four;
    ac_details[0]["points"][4] = five;
    ac_details[0]["points"][5] = six;
    ac_details[0]["points"][6] = seven;
    ac_details[0]["points"][7] = eight;
    ac_details[0]["points"][8] = nine;
    ac_details[0]["points"][9] = ten;
    ac_details[0]["date"] = date;

    await fs_promises.writeFile(path.join(__dirname, '../', 'model', 'Announcement_details.json'), JSON.stringify(ac_details));
    return res.sendStatus(201);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

module.exports = { update_ac_details_handler }