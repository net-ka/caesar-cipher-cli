const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { pipelineAction } = require('./pipeline');
const { isReadableInput } = require('./isReadableInput');
const { isWritableOutput } = require('./isWritableOutput');
const { transform } = require('./transform');
const requiredOptionsValidation = require('./requiredOptionsValidation');

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

requiredOptionsValidation(action, shift);

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

const isInput = isReadableInput(input);
const isOutput = isWritableOutput(output);

if (!input) {
  console.log('You can write text for transform after each Enter press');

  rl.on('line', () => {
    if (!output) {
      console.log('Transformed text is:');
    }
  });
}

const readStream = isInput
  ? fs.createReadStream(path.resolve(__dirname, input))
  : rl.input;

const writeStream = isOutput
  ? fs.createWriteStream(path.resolve(__dirname, output), { flags: "a+" })
  : process.stdout;

const transformStream = transform(action, shift);

pipelineAction(readStream, transformStream, writeStream);
