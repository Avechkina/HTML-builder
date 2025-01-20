const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

const showFiles = async () => {
  try {
    const arrOfFiles = await fs.readdir(folder, { withFileTypes: true });
    for (let i = 0; i < arrOfFiles.length; i++) {
      if (arrOfFiles[i].isFile()) {
        const nameInfo = path.parse(arrOfFiles[i].name);
        const sizeInfo = await fs.stat(path.join(folder, arrOfFiles[i].name));
        console.log(`${nameInfo.name} - ${nameInfo.ext.slice(1)} - ${(sizeInfo.size / 1024).toFixed(4)} kb`);
      }
    }
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

showFiles();