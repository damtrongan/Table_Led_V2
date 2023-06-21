const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
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

// function getNewestFile(pathReadFoler) {
//   return new Promise((resolve, rejects) => {
//     fs.readdir(pathReadFoler, {withFileTypes : true}, (err, files) => {
//       pathRead = '';
//       if (err) rejects(err);
//       else {
//         files = files.sort((a, b) => {
//           return b.name - a.name;
//         });
//         if(files[0].isDirectory){
//           getNewestFile(`${pathReadFoler}/${files[0].name}`)
//         }else{
//           return ( pathRead =`${pathReadFoler}/${files[0].name}`);
//         }
//         resolve(pathRead);
//       }
//     });
//   });
// }

// getNewestFile(pathFolderRead[0])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// var p = "D:/02_Code/03_Table_Led_V2/data/test.json";
// var a = true;
// function readFileJSON(p){
//   fs.readFile(p,'utf8', (err, fileContent) => {
//     if(err) {
//       fileContent = [];
//       readFileJSON(fileContent);
//     }else {
//       console.log(fileContent);
//     }
//   })
// };
// readFileJSON(p);


var p = "./data/xxx.json/"
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

function test(){
  getProductsFromFile((data) => {
    console.log(data);
  })
}

test();

function renderPage(req, res, next) {
  res.render("../views/table.ejs", {
    infors: configs,
  });
}

router.get("/", renderPage);

module.exports = router;
