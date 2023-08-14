const ftp = require("ftp");

const REMOTEFILEPATH =
  "/An/MocChau/Tram1/2023/06/13/SL_TTMC_NUOTHT_20230613152500.txt";

async function getNewestFolderOnFtp(serverConfig, remotePath) {
  return new Promise((resolve, reject) => {
    const client = new ftp();

    client.on("ready", () => {
      getNewestFolderRecursively(client, remotePath, (err, newestFolder) => {
        client.end();
        if (err) {
          reject(err);
        } else {
          resolve(newestFolder);
        }
      });
    });

    client.on("error", (err) => {
      client.end();
      reject(err);
    });

    client.connect(serverConfig);
  });
}

function getNewestFolderRecursively(client, currentPath, callback) {
  client.list(currentPath, (err, files) => {
    if (err) {
      return callback(err);
    }
    

    let newestFolder = null;
    let newestDate = new Date(0);

    files.forEach((file) => {
      if (file.type === "d") {
        // Check if it's a directory
        const parts = file.name.split("/");
        console.log(parts);
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
          const day = parseInt(parts[2], 10);
          const folderDate = new Date(year, month, day);

          if (folderDate > newestDate) {
            newestDate = folderDate;
            newestFolder = currentPath + "/" + file.name;
          }
        }
      }
    });

    if (!newestFolder) {
      return callback(null, null); // No folders found at this level
    }

    getNewestFolderRecursively(client, newestFolder, (err, subNewestFolder) => {
      if (err) {
        callback(err);
      } else {
        callback(null, subNewestFolder || newestFolder);
      }
    });
  });
}

// Example usage:
async function main() {
  const FTPSERVER = {
    host: "27.118.28.235",
    port: 21,
    user: "testftp",
    password: "testftp@123",
  };
  const REMOTEPATH = "/An/MocChau/Tram1";

  try {
    const newestFolder = await getNewestFolderOnFtp(FTPSERVER, REMOTEPATH);
    console.log("Newest folder:", newestFolder);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Run the async function
main();
