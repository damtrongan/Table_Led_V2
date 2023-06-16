// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const fs = require("fs/promises");
// const fs1 = require("fs");
// const configs = require("../data/config").configs;

// const namefolderTable1s = configs.names_folder_table1;
// const pathFolderTable1s = namefolderTable1s.map((folderTable1) => {
//   return configs.dir_readFile + "/" + folderTable1;
// });

// const getSubPath = (pathReadFolder) => {
//   subPaths = fs1.readdirSync(pathReadFolder).map((subNameFolder) => {
//     return path.join(pathReadFolder, subNameFolder);
//   });
//   return (subPaths = subPaths[subPaths.length - 1]);
// };

// const getData = (pathReadFolder) => {
//   let parameterOut = {};
//   yearPath = getSubPath(pathReadFolder);
//   monthPath = getSubPath(yearPath);
//   dayPath = getSubPath(monthPath);
//   dataPath = getSubPath(dayPath);
//   data = fs1
//     .readFileSync(dataPath, {
//       encoding: "utf8",
//     })
//     .split("\n")
//     .forEach((line) => {
//       var slicesArray = line.split("\t");
//       parameterOut[slicesArray[0]] = {
//         value: slicesArray[1],
//         unit: slicesArray[2],
//         time: slicesArray[3],
//         status: slicesArray[4],
//       };
//     });
//   return parameterOut;
// };

// /**
//  * Setup all data
//  * */
// var allData = {};

// function getAllData(pathFolderTable1s) {
//   allData.station0 = getData(pathFolderTable1s[0]);
//   allData.station1 = getData(pathFolderTable1s[1]);
//   allData.station2 = getData(pathFolderTable1s[2]);
// }

// function renderPage(req, res, next) {
//   getAllData(pathFolderTable1s);
//   res.render("../views/table.ejs", {
//     infors: configs,
//     data: allData,
//   });
// }
// function renderPage2(req, res, next) {
//   getAllData(pathFolderTable1s);
//   res.render("../views/table2.ejs", {
//     infors: configs,
//     data: allData,
//   });
// }

// router.get("/", renderPage);
// router.get("/table2", renderPage2);

// /* router.get("/data", (req, res, next) => {
//   res.send(JSON.stringify(allData));
// }); */

// module.exports = router;
