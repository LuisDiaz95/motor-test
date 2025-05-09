require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const publish = require("./publish");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/publish", async (req, res) => {
  const { price, description } = req.body;
  if (!price || !description) {
    return res.status(400).json({ error: "Precio y descripción son obligatorios." });
  }

  try {
    const screenshotPath = await publish(price, description);
    const imageBuffer = fs.readFileSync(path.resolve(screenshotPath));
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al publicar el anuncio." });
  }
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
