"use strict";
const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const FTPClient = require("ftp");

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

async function readNewestFilePath(path, nameDisplay) {
  let parameterOut = {
    nameStation: nameDisplay,
    params: [],
  };
  const pathYear = await getNewestPath(path);
  const pathMonth = await getNewestPath(pathYear);
  const pathDay = await getNewestPath(pathMonth);
  const pathFile = await getNewestPath(pathDay); // Path file text
  const content = await fs.readFile(pathFile, "utf8"); // Data content file txt
  const spliceData = content.split("\n"); //Bỏ ký tự /n và tách mỗi dòng thành 1 phần tử trong mảng

  for (const line of spliceData) {
    var slicesArray = line.split("\t");
    //parameterOut[`para${spliceData.indexOf(line)+1}`] = line.split('\t')
    parameterOut.params.push({
      name: slicesArray[0],
      value: slicesArray[1],
      unit: slicesArray[2],
      time: slicesArray[3],
      statuspara: slicesArray[4],
    });
  }
  return parameterOut;
}

//readNewestFilePath(pathTable1[0], configs.infor_table_1.name_station_1).then((data) => console.log(data));

// async function sortDataCol(){
//   const station = configs.infor_table_1;
//   const valueCol0 = station.name_parameter;
//   let   valueCol1 = [];
//   const valueStas1 = await readNewestFilePath(pathTable1[0], station.name_station_1);
//   const valueStas2 = await readNewestFilePath(pathTable1[1], station.name_station_2);
//   const valueStas3 = await readNewestFilePath(pathTable1[2], station.name_station_3);
//   for (let i = 0; i < valueCol0.length; i++){

//   }

// }

async function renderPage1(req, res, next) {
  const station = configs.infor_table_1;
  const valueCol0 = station.name_parameter;
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
    col0: valueCol0,
    col1: valueCol1,
    col2: valueCol2,
    col3: valueCol3,
    inforTable1: configs.infor_table_1,
  });
}

async function renderPage2(req, res, next) {
  const station = configs.infor_table_2;
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
    inforTable1: configs.infor_table_1,
  });

  setTimeout(() => {
    res.redirect("/");
  }, 3000);
}

router.get("/", renderPage1);
router.get("/table2", renderPage2);

///////////////////////////////
/*
 *
 */

const ftpServer = {
  host: "27.118.28.235",
  user: "testftp",
  password: "testftp@123",
};
///
const remoteFilePath =
  "/An/MocChau/Tram1/2023/06/13/SL_TTMC_NUOTHT_20230613152500.txt";
const remotePath = "/An/MocChau/Tram1";

async function getFtpFileContent(config, remotePath) {
  return new Promise((resolve, reject) => {
    const client = new FTPClient();

    client.on("ready", () => {
      client.get(remotePath, (err, stream) => {
        if (err) {
          client.end();
          reject(err);
          return;
        }
        let content = "";

        stream.on("data", (chunk) => {
          content += chunk;
        });

        stream.on("end", () => {
          client.end();
          resolve(content);
        });

        stream.on("error", (err) => {
          client.end();
          reject(err);
        });
      });
    });
    client.on("error", (err) => {
      client.end();
      reject(err);
    });

    client.connect(config);
  });
}


module.exports = router;
