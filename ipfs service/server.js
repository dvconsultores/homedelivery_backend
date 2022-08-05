const express = require('express');
const app = express(),
bodyParser = require("body-parser");
const morgan = require('morgan');
port = 3070;

const cors = require('cors');
const multer  = require('multer')

const web3storage = require('web3.storage')

const { Web3Storage, File } = web3storage

app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}));


app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

const token = "**********************************************************************************************************************"

app.post('/api/ipfs', cors(), multer().single('file'), async function (req, res) {
  if (req.file) {
    const client = new Web3Storage({ token })
    const files = [
      new File([req.file.buffer], req.file.originalname)
    ]
    const cid = await client.put(files)

    return res.json({ data: cid, nombre: req.file.originalname })
  } else {
    res.json(req.body)
  }
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});