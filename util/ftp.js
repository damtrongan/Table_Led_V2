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
    const newestFolder = files.pop()
    const newPath = currentPath + "/" + newestFolder.name;
    if(newestFolder.type != 'd'){
      callback(null, null)
    }else{
      getNewestFolderRecursively(client, newPath);
    }
    
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
