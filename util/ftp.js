const ftp = require("ftp");

async function getNewestFileContentOnFtp(serverConfig, remotePath) {
  return new Promise((resolve, reject) => {
    const client = new ftp();
    client.on("ready", () => {
      getNewestFolderRecursively(client, remotePath, (err, newestFolder) => {
        if (err) {
          reject(err);
        } else {
          client.get(newestFolder, (err, stream) => {
            if (err) {
              client.end();
              reject(err);
              return;
            }

            let content = "";

            stream.on("data", (chunk) => {
              content += chunk;
            });

            stream.on("end", () => {
              client.end();
              resolve(content);
            });
          });
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
    const newestFolder = files.pop();
    const newPath = currentPath + "/" + newestFolder.name;
    //console.log(newPath);
    if (newestFolder.type != "d") {
      callback(null, newPath);
    } else {
      getNewestFolderRecursively(client, newPath, (err, newPath) => {
        if (err) {
          callback(err);
        } else {
          callback(null, newPath);
        }
      });
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
  let parameterOut = {
    nameStation: REMOTEPATH.trim("/An/MocChau/"),
    params: [],
  };
  try {
    const contentFile = await getNewestFileContentOnFtp(FTPSERVER, REMOTEPATH);
    const spliceData = contentFile.split("\n"); //Bỏ ký tự /n và tách mỗi dòng thành 1 phần tử trong mảng
    for (const line of spliceData) {
      var slicesArray = line.split("\t");
      //parameterOut[`para${spliceData.indexOf(line)+1}`] = line.split('\t')
      parameterOut.params.push({
        name: slicesArray[0],
        value: slicesArray[1],
        unit: slicesArray[2],
        time: slicesArray[3],
        statuspara: slicesArray[4],
      });
    }
    console.log(parameterOut);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Run the async function
//main();
