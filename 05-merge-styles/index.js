const fs = require('fs/promises');
const path = require('path');

const mergeStyles = async (source, reseiver, fileName) => {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });
    const styles = [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.css')) {
        styles.push(await fs.readFile(path.join(source, file.name), 'utf-8'));
      }
    }
    await fs.writeFile(path.join(reseiver, fileName), styles.join('\n'));
    
  } catch (error) {
    console.log('Error of merging: ', error);
  }
}

const folserOfStyles = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = 'bundle.css';

mergeStyles(folserOfStyles, outputFolder, outputFile);