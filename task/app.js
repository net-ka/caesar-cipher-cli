const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { pipelineAction } = require('./pipeline');
const { isReadableInput } = require('./isReadableInput');
const { isWritableOutput } = require('./isWritableOutput');
const { transform } = require('./transform');
const cipher = require('./cipher');

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);

program
  .version('1.0.0')
  .description('Caeser Cipher CLI')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .requiredOption('-a, --action <action>', 'an action encode/decode')
  .requiredOption('-s, --shift <shift>', 'a shift')
  .parse(process.argv);

const { action, shift, input, output } = program.opts();

if (action !== 'encode' && action !== 'decode') {
  console.error('Action option should be encode or decode');
  process.exit(1);
}

if (isNaN(shift) || shift < 0 || shift > 27) {
  console.error('Shift option should be a number from 0 to 26');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

const isInput = isReadableInput(input);
const isOutput = isWritableOutput(output);

if (!input) {
  console.log('You can write text for transform after each Enter press');

  rl.on('line', (line) => {
    if (!output) {
      console.log('Transformed text is:');
    }
    // cipher(line, action, shift);
  });
}

const readStream = isInput
  ? fs.createReadStream(path.join(__dirname, input))
  : rl.input;

const writeStream = isOutput
  ? fs.createWriteStream(path.join(__dirname, output), { flags: "a+" })
  : process.stdout;

const transformStream = transform(action, shift);

pipelineAction(readStream, transformStream, writeStream);
