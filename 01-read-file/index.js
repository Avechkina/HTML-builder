const fs = require('fs');
const path = require('path');

const fileToRead = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(fileToRead, { encoding: 'utf8'});

stream.pipe(process.stdout);

stream.on('error', (err) => {
  console.error('File read error:', err);
});