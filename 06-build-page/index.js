const fs = require('fs/promises');
const path = require('path');

const project = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');

const buildHTML = async () => {
  try {
    let templateData = await fs.readFile(template, 'utf-8');

    const tags = templateData.match(/{{\s*[a-zA-Z]+\s*}}/g) || [];
    for (const tag of tags) {
      const tagName = tag.replace(/{{\s*|\s*}}/g, '');
      const component = await fs.readFile(path.join(components, `${tagName}.html`), 'utf-8');      
      templateData = templateData.replace(tag, component);
    }
    await fs.writeFile(path.join(project, 'index.html'), templateData);

  } catch (error) {
    console.log('Error at biuldPage function: ', error);
  }
};

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

const buildPage = async () => {
  await fs.mkdir(project, { recursive: true });
  await buildHTML();
  await mergeStyles(styles, project, 'style.css');
  await copyDir(assets, path.join(project, 'assets'));
}

buildPage();