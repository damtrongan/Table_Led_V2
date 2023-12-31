const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const { config } = require("process");
let DEFAULTCONFIG = {
  name_company: 'XXX JOINT STOCK COMPANY',
  name_display: 'TABLE QUALITY MONITORING PARAMETER',
  method_read: 'on',
  dir_readFile: 'D:/02_Code/02_Table_Led_BAK/fake_data',
  ftp_server: '27.118.28.235',
  user: 'testftp',
  password: 'testftp@123',
  port: 21,
  remote_dir: '/An/MocChau',
  num_tables: 2,
  infor_table_1: {
    nameTable: 'Water Staion',
    numb_station: 3,
    name_station_1: 'Staion 1',
    name_station_2: 'Staion 2',
    name_station_3: 'Staion 3',
    num_parameter: 7,
    name_parameter: [ 'pH', 'Temp', 'TSS', 'COD', 'NH4', 'Flow_IN', 'Flow_OUT' ],
    unit_parameters: [
      '-',    'oC',
      'mg/L', 'mg/L',
      'mg/L', 'mg/L',
      'mg/L'
    ]
  },
  infor_table_2: {
    nameTable: 'Air Staion',
    numb_station: 3,
    name_station_1: 'Staion 4',
    name_station_2: 'Staion 5',
    num_parameter: 7,
    name_parameter: [
      'PM', 'Temp',
      'P',  'Flow',
      'CO', 'NO',
      'HF'
    ],
    unit_parameters: [
      'mg/m3', 'mg/m3',
      'mg/m3', 'm3/h',
      'mg/m3', 'mg/m3',
      'mg/m3'
    ]
  },
  names_folder_table1: [ 'station_W1', 'station_W2', 'station_W3' ],
  names_folder_table2: [ 'station_A1', 'station_A2' ]
}


const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "config.json"
);

function getConfigFromFile(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, (err, config) => {
      if (err) {
        resolve(JSON.stringify("./data/config.json"));
      } else resolve(JSON.parse(config));
    });
  });
}

async function saveFile(path, data){
  return new Promise((resolve, rejects) => {
    fs.writeFile(path, data ,(err) => {
      if (err) {
        console.log(err);
      } else resolve(JSON.parse(DEFAULTCONFIG));
    });
  });
}

router.get("/", async (req, res, next) => {
  const data = await getConfigFromFile(p)
  res.render("../views/admin.ejs", {
    config: data,
  });
});

router.post("/saveconfig", async (req, res, next) => {
  const config = req.body;
  DEFAULTCONFIG.name_company = config.name_company;
  DEFAULTCONFIG.name_display = config.name_display;
  DEFAULTCONFIG.method_read = config.method_read;
  DEFAULTCONFIG.dir_readFile =  config.dir_readFile;
  DEFAULTCONFIG.ftp_server = config.ftp_server;
  DEFAULTCONFIG.user = config.user;
  DEFAULTCONFIG.password = config.password;
  DEFAULTCONFIG.port = config.port;
  DEFAULTCONFIG.remote_dir = config.remote_dir;
  DEFAULTCONFIG.num_tables = config.num_tables;
  DEFAULTCONFIG.infor_table_1.nameTable = config.name_table1;
  console.log(config);
  await saveFile(p, JSON.stringify(DEFAULTCONFIG));
  res.redirect("/admin");
});

module.exports = router;
