const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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
  const { type, name, address, city, state, zip, area, country, price, rating, numberOfReviews, index, propertyId, propertyPrice, propertySize, bedroom, bathroom, garage, garageSize, yearBuilt, category,    propertyStatus
  } = req.body;

  const cards = readData('cards.json');
  cards.push({
    type, name, address, city, state, zip, area, country, price, rating, numberOfReviews, index, propertyId, propertyPrice, propertySize, bedroom, bathroom, garage, garageSize, yearBuilt, category,  propertyStatus
  });

  writeData('cards.json', cards);
  res.send({
    type,
    name,
    address,
    city,
    state,
    zip,
    area,
    country,
    price,
    rating,
    numberOfReviews,
    index,
    propertyId,
    propertyPrice,
    propertySize,
    bedroom,
    bathroom,
    garage,
    garageSize,
    yearBuilt,
    category,
    propertyStatus
  });
});

app.put('/cards', (req, res) => {
  const cards = req.body;
  writeData('cards.json', cards);
  res.status(200).send({ message: 'Updated successfully' });
});


app.get('/agency', (req, res) => {
  const agency = readData('agency.json');
  res.send({ agency });
});

app.post('/agency', (req, res) => {
  const { title, text, image, type } = req.body;
  const agency = readData('agency.json');
  agency.push({ title, text, image, type });
  writeData('agency.json', agency);
  res.send({ title, text, image, type });
});

app.put('/agency', (req, res) => {
  const agency = req.body;
  writeData('agency.json', agency);
  res.status(200).send({ message: 'Updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
