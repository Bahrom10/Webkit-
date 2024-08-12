const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

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

const handleCreate = async (req, res) => {
  try {
    const data = validateData(req.body);
    const filePath = path.join(__dirname, 'data', 'cards.json');
    const fileData = await readFileAsync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    jsonData.push(data);
    await writeFileAsync(filePath, JSON.stringify(jsonData, null, 2));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Invalid request' });
  }
};

const handleUpdate = async (req, res) => {
  try {
    const data = validateData(req.body); // Assuming validation needed for update as well
    const filePath = path.join(__dirname, 'data', 'cards.json');
    await writeFileAsync(filePath, JSON.stringify(data, null, 2));
    res.status(200).send({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Invalid request' });
  }
};

app.get('/cards', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'cards.json');
    const fileData = await readFileAsync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    res.send({ cards: jsonData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/cards', handleCreate);

app.put('/cards', handleUpdate);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
