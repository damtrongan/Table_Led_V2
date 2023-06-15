"use strict";
const express = require("express");
const router = express.Router();
const Ftp = require("ftp");
const moment = require('moment');

var remoteServer = {
  host: "27.118.28.235",
  user: "testftp",
  password: "testftp@123",
};
const remotePath = "/An/MocChau/Tram1/2023/06/16";

function readData (serverFTP, mainPath){
  return new Promise((resolve, reject) => {
    const client = new Ftp();

    //Connect to the FTP Server
    client.connect(serverFTP);

    client.on('ready', () => {
      console.log("FTP connected");
      
      client.list(mainPath, (errs, files) => 
      {
        if(errs) {
          reject(errs);  
        }
        resolve(console.log(files));
      })
    })
  })
}

console.log(readData(remoteServer, remotePath));

router.get("/", (req, res, next) => {
  res.render("../views/admin.ejs", {});
});
module.exports = router;
