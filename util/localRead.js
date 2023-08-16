const fs = require("fs").promises;

async function getNewestPath(path) {
  let folders = await fs.readdir(path);
  let folder = folders[folders.length - 1];
  return `${path}/${folder}`;
}

async function readNewestFilePath(path, nameDisplay) {
  let parameterOut = {
    nameStation: nameDisplay,
    params: [],
  };
  try {
    const pathYear = await getNewestPath(path);
    const pathMonth = await getNewestPath(pathYear);
    const pathDay = await getNewestPath(pathMonth);
    const pathFile = await getNewestPath(pathDay); // Path file text
    const content = await fs.readFile(pathFile, "utf8"); // Data content file txt
    const spliceData = content.split("\n"); //Bỏ ký tự /n và tách mỗi dòng thành 1 phần tử trong mảng
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
    return parameterOut;
  } catch {
    (err) => console.log(err);
  }
}

module.exports = { readNewestFilePath };
