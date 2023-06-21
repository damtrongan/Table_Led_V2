const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { rejects } = require("assert");
const configs = require("../data/config").configs;

const main_Folder = configs.dir_readFile;
const nameFolderTable1s = configs.names_folder_table1;
const nameFolderTable2s = configs.names_folder_table2;

const pathFolderRead = nameFolderTable1s.map((nameFolder) => {
  return path.join(main_Folder, nameFolder);
});

//console.log(pathFolderRead);
/* 
  IN:
  + main_folder cần đọc
  + Mảng tên folder cần đọc

  OUT: 
  + Đọc ra file mới nhất trong đó
*/

function getNewestFile(pathReadFolder) {
  return new Promise((resolve, rejects) => {
    var newestPath = '';
    fs.readdir(pathReadFolder, { withFileTypes: true }, (err, folders) => {
      if (err) rejects(err);
      else {
        var newestFolder = folders.sort((a, b) => {
          return b.name - a.name;
        })[0];

        if (newestFolder.isFile == false) {
          newestPath = path.join(pathReadFolder, newestFolder.name);
          getNewestFile(newestPath);
        } else{
          resolve(newestPath = path.join(pathReadFolder, newestFolder.name))
        }
      }
    });
  });
}

getNewestFile(pathFolderRead[0])
  .then((result) => {
    console.log(result);
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
