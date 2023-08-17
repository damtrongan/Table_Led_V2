const express = require("express");
const router = express.Router();

const fs = require("fs");
const { get } = require("https");
const path = require("path");
let fileContent = {
  name_company: 'XXX JOINT STOCK COMPANY',
  name_display: 'TABLE QUALITY MONITORING PARAMETER',
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
  dir_readFile: "D:/02_Code/02_Table_Led_BAK/fake_data",
  names_folder_table1: [ 'station_W1', 'station_W2', 'station_W3' ],
  names_folder_table2: [ 'station_A1', 'station_A2' ]
}
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "config.json"
);

const pTest = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "defaultconfig.json"
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
      } else resolve(JSON.parse(defaultconfig));
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
  console.log(config);
  fileContent.name_company = config.name_company;
  

  console.log(fileContent.name_company);
  await saveFile(pTest, JSON.stringify(fileContent));
  res.redirect("/admin");
});

module.exports = router;
