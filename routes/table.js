"use strict";
const express = require("express");
const router = express.Router();
const si = require('systeminformation');

const configs = require("../data/config.json");
const { getFTPFileContent } = require("../util/ftp");
const { readNewestFilePath } = require("../util/localRead");
const mainPath = configs.dir_readFile;

async function renderPage1(req, res, next) {
  const station = configs.infor_table_1;
  const valueCol0 = station.name_parameter;
  const pathTable1 = configs.names_folder_table1.map((nameFolder) => {
    return `${mainPath}/${nameFolder}`;
  });
  const DEFAULTVALUE = {
    nameStation: "Station",
    params: [
      {
        name: "pH",
        value: 7,
        unit: "-",
        time: 0,
        statuspara: 0,
      },
    ],
  };

  //Read file from folders for table 1
  const valueCol1 = await readNewestFilePath(
    pathTable1[0],
    station.name_station_1
  );
  const valueCol2 = await readNewestFilePath(
    pathTable1[1],
    station.name_station_2
  );
  const valueCol3 = await readNewestFilePath(
    pathTable1[2],
    station.name_station_3
  );

  res.render("../views/table.ejs", {
    infors: configs,
    col0: valueCol0 || DEFAULTVALUE,
    col1: valueCol1 || DEFAULTVALUE,
    col2: valueCol2 || DEFAULTVALUE,
    col3: valueCol3 || DEFAULTVALUE,
    inforTable1: configs.infor_table_1,
  });
}

async function renderPage2(req, res, next) {
  const station = configs.infor_table_2;
  const pathTable2 = configs.names_folder_table2.map((nameFolder) => {
    return `${mainPath}/${nameFolder}`;
  });
  const valueCol0 = station.name_parameter;
  const valueCol1 = await readNewestFilePath(
    pathTable2[0],
    station.name_station_1
  );
  const valueCol2 = await readNewestFilePath(
    pathTable2[1],
    station.name_station_2
  );
  res.render("../views/table2.ejs", {
    infors: configs,
    col0: valueCol0,
    col1: valueCol1,
    col2: valueCol2,
    inforTable2: configs.infor_table_2,
  });
}

router.get("/", renderPage1);
router.get("/table2", renderPage2);

si.graphics((displays) => {
  console.log(displays);
})	


module.exports = router;
