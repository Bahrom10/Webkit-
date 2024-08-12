import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data');

const readData = (file) => {
  const rawData = fs.readFileSync(path.join(dataPath, file));
  return JSON.parse(rawData);
};

const writeData = (file, data) => {
  fs.writeFileSync(path.join(dataPath, file), JSON.stringify(data, null, 2));
};

app.get('/cards', (req, res) => {
  const cards = readData('cards.json');
  res.send({ cards });
});

app.post('/cards', (req, res) => {
  const { title, text, image, type } = req.body;
  const cards = readData('cards.json');
  cards.push({ title, text, image, type });
  writeData('cards.json', cards);
  res.send({ title, text, image, type });
});

app.put('/cards', (req, res) => {
  const cards = req.body;
  writeData('cards.json', cards);
  res.status(200).send({ message: 'Updated successfully' });
});

app.get('/tops', (req, res) => {
  const tops = readData('tops.json');
  res.send({ tops });
});

app.post('/tops', (req, res) => {
  const { title, text, image, type } = req.body;
  const tops = readData('tops.json');
  tops.push({ title, text, image, type });
  writeData('tops.json', tops);
  res.send({ title, text, image, type });
});

app.put('/tops', (req, res) => {
  const tops = req.body;
  writeData('tops.json', tops);
  res.status(200).send({ message: 'Updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
