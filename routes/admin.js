// "use strict";
// const express = require("express");
// const router = express.Router();
// const Ftp = require("ftp");
// const moment = require("moment");

// var remoteServer = {
//   host: "27.118.28.235",
//   user: "testftp",
//   password: "testftp@123",
// };
// const remotePath = "/An/MocChau/Tram1/2023/06/16";

// function readData(serverFTP, mainPath) {
//   return new Promise((resolve, reject) => {
//     const client = new Ftp();

//     //Connect to the FTP Server
//     client.connect(serverFTP);

//     //When connection ready
//     client.on("ready", () => {
//       console.log("FTP connected");

//       function getIntoFolder(clientFtp, mainPath) {
//         clientFtp.list(mainPath, (errs, files) => {
//           if (errs) {
//             reject(errs);
//           }
//           var file = files.slice(-1);
//           if (file[0].type === "d") {
//             getIntoFolder(`${mainPath}/${file[0].name}`);
//           } else {
//             return `${mainPath}/${file[0].name}`;
//           }
//         });
//         getIntoFolder(client, mainPath);
//       }
//     });
//   });
// }

// console.log(readData(remoteServer, remotePath));

// router.get("/", (req, res, next) => {
//   res.render("../views/admin.ejs", {});
// });
// module.exports = router;
