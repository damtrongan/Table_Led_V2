// const express = require("express");
// const fs = require("fs").promises;

// const app = express();
// const path = require("path");

// const configs = require("../data/config.json");
// const mainPath = configs.dir_readFile;

// const pathTable1 = configs.names_folder_table1.map((nameFolder) => {
//   return `${mainPath}/${nameFolder}`;
// });
// const pathTable2 = configs.names_folder_table2.map((nameFolder) => {
//   return `${mainPath}/${nameFolder}`;
// });

// async function getNewestFolder(folderPath) {
//   try {
//     const files = await fs.readdir(folderPath);
//     const folderStats = await Promise.all(
//       files.map(async (file) => {
//         const fullPath = path.join(folderPath, file);
//         const stats = await fs.stat(fullPath);
//         return {
//           name: file,
//           mtime: stats.mtime.getTime(),
//           isDirectory: stats.isDirectory(),
//         };
//       })
//     );

//     // Filter out only directories and sort them by modification time (newest first)
//     const sortedFolders = folderStats
//       .filter((item) => item.isDirectory)
//       .sort((a, b) => b.mtime - a.mtime);

//     if (sortedFolders.length === 0) {
//       throw new Error("No folders found in the specified directory.");
//     }

//     return path.join(folderPath, sortedFolders[0].name);
//   } catch (error) {
//     throw new Error("Error retrieving the newest folder: " + error.message);
//   }
// }

// async function getNewestFile(folderPath) {
//   try {
//     const files = await fs.readdir(folderPath);
//     const fileStats = await Promise.all(
//       files.map(async (file) => {
//         const fullPath = path.join(folderPath, file);
//         const stats = await fs.stat(fullPath);
//         return {
//           name: file,
//           mtime: stats.mtime.getTime(),
//           isDirectory: stats.isDirectory(),
//         };
//       })
//     );

//     // Filter out only files and sort them by modification time (newest first)
//     const sortedFiles = fileStats
//       .filter((item) => !item.isDirectory)
//       .sort((a, b) => b.mtime - a.mtime);

//     if (sortedFiles.length === 0) {
//       throw new Error("No files found in the specified directory.");
//     }

//     return path.join(folderPath, sortedFiles[0].name);
//   } catch (error) {
//     throw new Error("Error retrieving the newest file: " + error.message);
//   }
// }

// async function readNewestFileText(folderPath) {
//   try {
//     const newestYear = await getNewestFolder(folderPath);
//     const newestMonth = await getNewestFolder(newestYear);
//     const newestDay = await getNewestFolder(newestMonth);
//     const newestFile = await getNewestFile(newestDay);
//     const fileText = await fs.readFile(newestFile, "utf-8");
//     return { newestYear, newestMonth, newestDay, newestFile, fileText };
//   } catch (error) {
//     throw new Error(
//       "Error reading the newest file and folders: " + error.message
//     );
//   }
// }

// // Example usage:
// //const folderPath = '/path/to/your/folder';
// console.log(pathTable1[0]);
// readNewestFileText(pathTable1[0])
//   .then((result) => {
//     console.log("Newest Year:", result.newestYear);
//     console.log("Newest Month:", result.newestMonth);
//     console.log("Newest Day:", result.newestDay);
//     console.log("Newest File:", result.newestFile);
//     console.log("Text of the newest .txt file:", result.fileText);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

console.log('heello');