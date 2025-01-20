const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const fileToOutput = path.join(__dirname, 'output.txt');
const outputText = fs.createWriteStream(fileToOutput, { flags: 'a'});
const inputText = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter your text (or "exit" to quit): ',
});

console.log('Hello!');

inputText.prompt();

inputText.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') inputText.close();
  else {
    outputText.write(`${text}\n`);
    inputText.prompt();
  }
});

inputText.on('close', () => {
  outputText.end();
  console.log('Goodbye!');
  process.exit(0)
});

inputText.on('SIGINT', () => {
  console.log('input closed');
  inputText.close();
});
