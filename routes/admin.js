"use strict";
const express = require("express");
const router = express.Router();
const FTP = require("ftp");
const moment = require("moment");

var ftpServer = {
  host: "27.118.28.235",
  user: "testftp",
  password: "testftp@123",
};
const remotePath = "/An/MocChau/Tram1";

var client = new FTP();

client.connect(ftpServer);
client.on("ready", () => {
  console.log("FTP Conected");

  function readToFile(remotePath) {
    client.list(remotePath, (err, lists) => {
      if (err) {
        console.log(err);
      }
      lists = lists.slice(-1);
      if (lists[0].type === "d") {
        //console.log(`${remotePath}/${lists[0].name}`);
        readToFile(`${remotePath}/${lists[0].name}`);
      } else {
        console.log(`${remotePath}/${lists[0].name}`);
      }
    });
  }
  readToFile(remotePath);
});

router.get("/", (req, res, next) => {
  res.render("../views/admin.ejs", {});
});
module.exports = router;
