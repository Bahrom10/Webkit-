import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/cards", (req, res) => {
  const rawdata = fs.readFileSync("./data/cards.json");
  const cards = JSON.parse(rawdata);
  res.send({ cards });
});

app.post("/cards", (req, res) => {
  const { title, text, image, type } = req.body;

  const rawdata = fs.readFileSync("./data/cards.json");
  const cards = JSON.parse(rawdata);
  console.log(cards);
  console.log(rawdata);

  cards.push({ title, text, image, type });
  fs.writeFileSync("./data/cards.json", JSON.stringify(cards, null, 2));

  res.send({ title, text, image, type });
});

app.put("/cards", (req, res) => {
  const cards = req.body

  fs.writeFileSync("./data/cards.json", JSON.stringify(cards, null, 2));

  res.status(200).send({message: "Все готово"})
})
app.get("/tops", (req, res) => {
  const rawdata = fs.readFileSync("./data/tops.json");
  const tops = JSON.parse(rawdata);
  res.send({ tops });
});

app.post("/tops", (req, res) => {
  const { title, text, image, type } = req.body;

  const rawdata = fs.readFileSync("./data/tops.json");
  const tops = JSON.parse(rawdata);
  console.log(tops);
  console.log(rawdata);

  tops.push({ title, text, image, type });
  fs.writeFileSync("./data/tops.json", JSON.stringify(tops, null, 2));

  res.send({ title, text, image, type });
});

app.put("/tops", (req, res) => {
  const tops = req.body

  fs.writeFileSync("./data/tops.json", JSON.stringify(tops, null, 2));

  res.status(200).send({message: "Все готово"})
})

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
