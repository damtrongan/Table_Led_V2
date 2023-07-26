const express = require("express");
const router = express.Router();
const configs = require("../data/config.json");
const path = require("path");
const fs = require("fs");

//
const mainPath = configs.dir_readFile;
const stationTable1 = configs.names_folder_table1;
const stationTable2 = configs.names_folder_table2;

function getPathRead(mainPath, nameGroupStation) {
  let path = [];
  for (const name of nameGroupStation) {
    path.push(`${mainPath}/${name}`);
  }
  return path;
}

// Mảng các path của các trạm cần đọc
const pathTable1 = getPathRead(mainPath, stationTable1);
const pathTable2 = getPathRead(mainPath, stationTable2);

var pathRead;
function processPath(path, folders) {
  var newestFolder = folders[folders.length - 1];
  //console.log(newestFolder);
  if (newestFolder.isDirectory()) {
    readNewestFileFromPath(`${path}/${newestFolder.name}`);
  } else {
    return (`${path}/${newestFolder.name}`);
  }
}

function readNewestFileFromPath(path) {
  var pathRead = fs.readdir(path, { withFileTypes: true }, (err, folders) => {
    if (err) console.log(err);
    else {
      processPath(path,folders);
    }
  });
  //console.log(pathRead);
}
//var dirPath = fs.readdirSync(pathTable1[0])
//console.log(pathTable1[0]);
readNewestFileFromPath(pathTable1[0]);

function renderPage(req, res, next) {
  res.render("../views/table.ejs", {
    infors: configs,
  });
}

router.get("/", renderPage);

module.exports = router;
