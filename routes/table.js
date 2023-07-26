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

function getIntoFolder(path) {
  const promise = new Promise((resolve, reject) => {
    fs.readdir(path, { withFileTypes: true }, (err, folders) => {
      if (err) {
        reject("Can not read folder");
      }else{
        resolve(folders);
      }
      // let newestFolder = folders[folders.length - 1];
      // if (newestFolder.isDirectory) {
      //   getIntoFolder(`${path}/${newestFolder.name}`);
      // } else {
      //   resolve(`${path}/${newestFolder.name}`);
      // }
    });
  });
  return promise;
}
console.log(pathTable1);
getIntoFolder(pathTable1[0])
  .then((path) => {
    console.log(path);
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
