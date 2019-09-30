const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const csv = require('csvtojson');
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  }
}).single('file');

app.get('/', function(req, res) {
  return res.send('Hello Server');
});

app.get('/getUploads/:filePath', function(req, res) {
  const filePath = '/uploads/' + req.params.filePath;
  const fullFilePath = path.join(__dirname, filePath);

  csv()
    .fromFile(fullFilePath)
    .then(jsonObj => {
      return res.send(jsonObj);
    });
});

app.post('/upload', function(req, res) {
  upload(req, res, function(error) {
    if (error instanceof multer.MulterError) {
      return res.status(500).json(error);
    } else if (error) {
      return res.status(500).json(error);
    }
    console.log('File is uploaded Succesfully');
    return res.status(200).send(req.file);
  });
});

app.listen(8080, () => {
  console.log('Server started!');
});
