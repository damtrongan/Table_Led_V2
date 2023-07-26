const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const configs = require("../data/config.json");
const mainPath = configs.dir_readFile;

const pathTable1 = configs.names_folder_table1.map((nameFolder) => {
  return `${mainPath}/${nameFolder}`;
});
const pathTable2 = configs.names_folder_table2.map((nameFolder) => {
  return `${mainPath}/${nameFolder}`;
});

function readDir(path) {
  return new Promise((resolve, rejects) => {
    fs.readdir(path, { withFileTypes: true }, (err, folders) => {
      if (err) {
        console.log(err);
      } else {
        var newestFolder = folders[folders.length - 1];
        console.log(newestFolder.isDirectory());
        if (newestFolder.isDirectory && newestFolder.name.endsWith('.txt') ) {
          readDir(`${path}/${newestFolder.name}`);
        } else {
          resolve(`${path}/${newestFolder.name}`);
        }
      }
    });
  });
}

readDir(pathTable1[0])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

function renderPage(req, res, next) {
  res.render("../views/table.ejs", {
    infors: configs,
  });
}

router.get("/", renderPage);

module.exports = router;
