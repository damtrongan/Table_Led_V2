const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs").promises;
const configs = require("../data/config.json");

const mainPath = configs.dir_readFile;

const pathTable1 = configs.names_folder_table1.map((nameFolder) => {
  return `${mainPath}/${nameFolder}`;
});
const pathTable2 = configs.names_folder_table2.map((nameFolder) => {
  return `${mainPath}/${nameFolder}`;
});

async function getNewestPath(path) {
  let folders = await fs.readdir(path);
  let folder = folders[folders.length - 1];
  return `${path}/${folder}`;
}

async function readNewestFilePath(paths) {
  let contents = [];
  for (const path of paths) {
    const pathYear = await getNewestPath(path);
    const pathMonth = await getNewestPath(pathYear);
    const pathDay = await getNewestPath(pathMonth);
    const pathFile = await getNewestPath(pathDay);
    const data = await fs.readFile(pathFile, "utf8");
    contents.push(data);
  }
  return contents;
}

const example = [
  'pH\t2.34\t\t20230509153700\t00\r\n' +
    'TSS\t65.61\tmg/L\t20230509153700\t00\r\n' +
    'COD\t75.68\tmg/L\t20230509153700\t00\r\n' +
    'Flow\t6.24\tm3/h\t20230509153700\t00\r\n' +
    'NH4\t8.21\tmg/L\t20230509153700\t00\r\n' +
    'Flow_IN\t298.29\tm3/h\t20230509153700\t00\r\n' +
    'Temp\t22.87\toC\t20230509153700\t00\r\n',
  'pH\t7.33\t\t20230509153800\t00\r\n' +
    'TSS\t6.93\tmg/L\t20230509153800\t00\r\n' +
    'COD\t62.98\tmg/L\t20230509153800\t00\r\n' +
    'Flow\t40.28\tm3/h\t20230509153800\t00\r\n' +
    'NH4\t6.46\tmg/L\t20230509153800\t00\r\n' +
    'Flow_IN\t64.98\tm3/h\t20230509153800\t00\r\n' +
    'Temp\t23.58\toC\t20230509153800\t00\r\n',
  'pH\t7.71\t\t20230509154000\t00\r\n' +
    'TSS\t30.92\tmg/L\t20230509154000\t00\r\n' +
    'COD\t31.53\tmg/L\t20230509154000\t00\r\n' +
    'Flow\t1.10\tm3/h\t20230509154000\t00\r\n' +
    'NH4\t1.65\tmg/L\t20230509154000\t00\r\n' +
    'Flow_IN\t0.00\tm3/h\t20230509154000\t02\r\n' +
    'Temp\t28.93\toC\t20230509154000\t00\r\n'
];

function splitData(contents){
  contents.forEach(element => {
    element.split('\t')
    console.log(element);
  });
}
splitData(example)

function renderPage(req, res, next) {
  res.render("../views/table.ejs", {
    infors: configs,
  });
}

router.get("/", renderPage);

module.exports = router;
