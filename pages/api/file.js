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
    return new Promise((resolve) => {
      const data = fs.readFileSync(file.path);
      fs.writeFileSync(`./public/in.json`, data);
      fs.createReadStream(`./public/in.json`)
        .pipe(jsonl())
        .pipe(fs.createWriteStream(`./public/out.jsonl`));
      resolve(true);
      return;
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteFile = async (req, res) => {
  const files = [`./public/in.json`, `./public/out.jsonl`];
  files.forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
  return res.status(201).send('');
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? deleteFile(req, res)
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('');
};
