const fs = require('fs/promises');
const path = require('path');

const dirToCopy = path.join(__dirname, 'files');
const dirToPaste = path.join(__dirname, 'files-copy');

const copyDir = async (source, receiver) => {
  try {
    await fs.rm(receiver, { force: true, recursive: true });
    await fs.mkdir(receiver);

    const content = await fs.readdir(source, { withFileTypes: true });

    for (let i = 0; i < content.length; i++) {
      const nestedSource = path.join(source, content[i].name);
      const nestedReceiver = path.join(receiver, content[i].name);

      if (content[i].isDirectory()) await copyDir(nestedSource, nestedReceiver);
      else if (content[i].isFile()) await fs.copyFile(nestedSource, nestedReceiver);
    }
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}
copyDir(dirToCopy, dirToPaste).then(() => console.log('Directoty updated!'));
