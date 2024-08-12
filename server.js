const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const validateData = (data) => {
  if (!data.title || !data.text || !data.image || !data.type) {
    throw new Error('Invalid data');
  }
  return data;
};

const handleCreate = async (req, res, filename) => {
  try {
    const data = validateData(req.body);
    const fileData = await readFileAsync(`./data/${filename}.json`, 'utf8');
    const jsonData = JSON.parse(fileData);
    jsonData.push(data);
    await writeFileAsync(`./data/${filename}.json`, JSON.stringify(jsonData, null, 2));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Invalid request' });
  }
};

const handleUpdate = async (req, res, filename) => {
  try {
    const data = req.body;
    await writeFileAsync(`./data/${filename}.json`, JSON.stringify(data, null, 2));
    res.status(200).send({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Invalid request' });
  }
};

app.get('/cards', async (req, res) => {
  try {
    const fileData = await readFileAsync('./data/cards.json', 'utf8');
    const jsonData = JSON.parse(fileData);
    res.send({ cards: jsonData });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Not found' });
  }
});

app.post('/cards', (req, res) => {
  handleCreate(req, res, 'cards');
});

app.put('/cards', (req, res) => {
  handleUpdate(req, res, 'cards');
});

app.get('/tops', async (req, res) => {
  try {
    const fileData = await readFileAsync('./data/tops.json', 'utf8');
    const jsonData = JSON.parse(fileData);
    res.send({ tops: jsonData });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Not found' });
  }
});

app.post('/tops', (req, res) => {
  handleCreate(req, res, 'tops');
});

app.put('/tops', (req, res) => {
  handleUpdate(req, res, 'tops');
});

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});