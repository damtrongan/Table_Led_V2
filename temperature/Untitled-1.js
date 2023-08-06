const ftp = require('ftp');

async function getNewestPathOnFtp(host, port, username, password, remotePath) {
  return new Promise((resolve, reject) => {
    const client = new ftp();

    client.on('ready', () => {
      getNewestPathRecursively(client, remotePath, (err, newestPath) => {
        client.end();
        if (err) {
          reject(err);
        } else {
          resolve(newestPath);
        }
      });
    });

    client.on('error', (err) => {
      client.end();
      reject(err);
    });

    client.connect({
      host,
      port,
      user: username,
      password,
    });
  });
}

function getNewestPathRecursively(client, currentPath, callback) {
  client.list(currentPath, (err, files) => {
    if (err) {
      return callback(err);
    }

    let newestPath = null;
    let newestTimestamp = 0;

    files.forEach((file) => {
      if (file.type === 'd') { // Check if it's a directory
        const timestamp = file.date.getTime();

        if (timestamp > newestTimestamp) {
          newestTimestamp = timestamp;
          newestPath = currentPath + '/' + file.name;
        }
      }
    });

    if (!newestPath) {
      return callback(null, null); // No folders found at this level
    }

    getNewestPathRecursively(client, newestPath, (err, subNewestPath) => {
      if (err) {
        callback(err);
      } else {
        callback(null, subNewestPath || newestPath);
      }
    });
  });
}