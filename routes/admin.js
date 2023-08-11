const { rejects } = require("assert");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "configtest.json"
);

function getConfigFromFile(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, (err, config) => {
      if (err) {
        rejects(err);
      } else resolve(JSON.parse(config));
    });
  });
}

router.get("/", (req, res, next) => {
  getConfigFromFile(p).then((data) => {
    console.log(data);
    res.render("../views/admin.ejs",
    {
      config : data
    }
    );
  });
});

module.exports = router;
