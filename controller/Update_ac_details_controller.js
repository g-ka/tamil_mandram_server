const { format } = require('date-fns');

const announcement_detail = require('../model/Announcement_details');

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

    const ac_details = await announcement_detail.find();
    if(!ac_details.length)
    {
      await announcement_detail.create({
        title: title,
        desc: desc,
        points: [one, two, three, four, five, six, seven, eight, nine, ten],
        image: "temple.jpg",
        date: date
      });
    }
    else
    {
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

      await ac_details[0].save();
    }  

    return res.sendStatus(201);
  }
  catch(err)
  {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

module.exports = { update_ac_details_handler }