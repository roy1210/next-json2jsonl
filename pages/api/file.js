import formidable from 'formidable';
import fs from 'fs';
import jsonl from 'jsonl';

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send('');
  });
};

const saveFile = async (file) => {
  try {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/in.json`, data);
    fs.createReadStream(`./public/in.json`)
      .pipe(jsonl())
      .pipe(fs.createWriteStream(`./public/out.jsonl`));
    return;
  } catch (e) {
    console.log(e);
  }
};

const deleteFile = async (req, res) => {
  fs.unlinkSync(`./public/in.json`);
  fs.unlinkSync(`./public/out.jsonl`);
  return res.status(201).send('');
};

export default (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? deleteFile()
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('');
};
