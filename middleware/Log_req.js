const path = require('path');
const fs = require('fs');
const fs_promises = require('fs').promises;

const { format } = require('date-fns');

const Log_req = async (req, res, next) =>
{
  console.log(req.method+' '+req.path);

  const date_time = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
  const new_entry = req.method+'  '+req.path+'  '+date_time+'  '+req.headers.origin+'\n';

  try
  {
    if(!fs.existsSync(path.join(__dirname, '../', 'logs')))
    {
      await fs_promises.mkdir(path.join(__dirname, '../', 'logs'));
    }
    await fs_promises.appendFile(
      path.join(__dirname, '../', 'logs/', 'Req_log.txt'),
      new_entry
      );
  }
  catch(err)
  {
    console.error(err.message);
  }

  next();
};

module.exports = Log_req