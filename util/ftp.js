const express = require("express");
const fs = require("fs");
var FTPClient = require("ftp");
var client = new FTPClient();
const app = express();

// Connect to Server
client.connect({
  host: "27.118.28.235",
  user: "testftp",
  password: "testftp@123",
});
const remotePath = "/An/MocChau/Tram1/";
const remoteFilePath =
  "/An/MocChau/Tram1/2023/06/13/SL_TTMC_NUOTHT_20230613152500.txt";

client.on("ready", function () {
  console.log("Connected !");
  // Remote file path on the FTP server
});

// Handler for FTP client connection errors
client.on("error", (err) => {
  console.error("FTP connection error:", err);
});

