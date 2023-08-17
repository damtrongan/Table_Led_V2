const express = require("express");
const router = express.Router();

const fs = require("fs");
const { get } = require("https");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "config.json"
);

function getConfigFromFile(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, (err, config) => {
      if (err) {
        resolve(JSON.stringify("./data/config.json"));
      } else resolve(JSON.parse(config));
    });
  });
}

async function saveFile(path, data){
  return new Promise((resolve, rejects) => {
    fs.writeFile(path, data ,(err) => {
      if (err) {
        console.log(err);
      } else resolve(JSON.parse(defaultconfig));
    });
  });
}

router.get("/", async (req, res, next) => {
  const data = await getConfigFromFile(p)
  res.render("../views/admin.ejs", {
    config: data,
  });
});

router.post("/saveconfig", async (req, res, next) => {
  const config = req.body;
  await saveFile(p, JSON.stringify(config));
  console.log(config);
  res.redirect("/admin");
});

module.exports = router;
