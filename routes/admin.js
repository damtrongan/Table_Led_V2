"use strict";
const express = require("express");
const router = express.Router();
const ftp = require("ftp");
const moment = require('moment');

var remoteServer = {
  host: "27.118.28.235",
  user: "testftp",
  password: "testftp@123",
};
const remotePath = "/An/MocChau/Tram1";

function getNewestTextFileFromFolder(ftpClient, folderPath) {
  return new Promise((resolve, reject) => {
    ftpClient.cwd(folderPath, (cwdErr) => {
      if (cwdErr) {
        console.error("Error changing directory:", cwdErr);
        reject(cwdErr);
        return;
      }

      ftpClient.list((listErr, files) => {
        if (listErr) {
          console.error("Error getting file list:", listErr);
          reject(listErr);
          return;
        }

        // Filter out any non-text files
        const textFiles = files.filter((file) => {
          return file.type === "-" && file.name.toLowerCase().endsWith(".txt");
        });

        // Sort files in descending order based on modified timestamp
        textFiles.sort((a, b) => {
          const aTimestamp = moment(a.date).valueOf();
          const bTimestamp = moment(b.date).valueOf();
          return bTimestamp - aTimestamp;
        });

        if (textFiles.length === 0) {
          resolve(null); // No text files in this folder
        } else {
          const newestFile = textFiles[0].name;
          resolve(newestFile);
        }
      });
    });
  });
}

function readNewestTextFileFromDynamicFolders(ftpOptions, mainFolder) {
  return new Promise((resolve, reject) => {
    const client = new ftp();

    // Connect to the FTP server
    client.connect(ftpOptions);

    // Handler for successful FTP server connection
    client.on("ready", () => {
      console.log("Connected to FTP server");

      let currentDate = moment().utc();
      const year = currentDate.format("YYYY");
      const month = currentDate.format("MM");
      const day = currentDate.format("DD");
      let folderPath = `${mainFolder}/${year}/${month}/${day}`;

      function iterateFolders() {
        getNewestTextFileFromFolder(client, folderPath)
          .then((newestFile) => {
            if (newestFile) {
              const filePath = `${folderPath}/${newestFile}`;

              // Download the newest file from the FTP server
              client.get(filePath, (getErr, stream) => {
                if (getErr) {
                  console.error("Error downloading file:", getErr);
                  reject(getErr);
                  return;
                }

                let fileContents = "";

                // Concatenate the file contents as they arrive
                stream.on("data", (chunk) => {
                  fileContents += chunk.toString();
                });

                // Handler for file reading completion
                stream.on("end", () => {
                  console.log("File read successfully");
                  resolve(fileContents);
                });
              });
            } else {
              // Move to the previous day
              currentDate = currentDate.subtract(1, "day");
              const prevYear = currentDate.format("YYYY");
              const prevMonth = currentDate.format("MM");
              const prevDay = currentDate.format("DD");
              folderPath = `${mainFolder}/${prevYear}/${prevMonth}/${prevDay}`;

              if (currentDate.isAfter(moment().subtract(1, "year"))) {
                iterateFolders(); // Continue iterating
              } else {
                reject(new Error("No text files found in the folders"));
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      }

      iterateFolders(); // Start iterating from the current date
    });

    // Handler for FTP client connection errors
    client.on("error", (err) => {
      console.error("FTP connection error:", err);
      reject(err);
    });
  });
}

readNewestTextFileFromDynamicFolders(remoteServer, remotePath)
  .then((fileContents) => {
    console.log("Newest file content:", fileContents);
    // Additional code to handle the file content
  })
  .catch((err) => {
    console.error("Error reading newest file:", err);
    // Additional error handling code
  });

router.get("/", (req, res, next) => {
  res.render("../views/admin.ejs", {});
});
module.exports = router;
