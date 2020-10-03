const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { pipelineAction } = require('./pipeline');
const { isReadableInput } = require('./isReadableInput');
const { isWritableOutput } = require('./isWritableOutput');
const { transform } = require('./transform');

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
  console.log('Action should be encode or decode');
  process.exit(1);
}

if(isNaN(shift) || shift < 0 || shift > 27) {
  console.log('Shift argument should be a number from 0 to 26');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isInput = isReadableInput(input);
const isOutput = isWritableOutput(output);

const readStream = isInput
  ? fs.createReadStream(path.join(__dirname, input))
  // : process.stdin;
  : rl.input;

const writeStream = isOutput
  ? fs.createWriteStream(path.join(__dirname, output), { flags: "a+" })
  // : process.stdout;
  : rl.output;

const transformStream = transform(action, shift);

pipelineAction(readStream, transformStream, writeStream);

// console.log(`transformed text is: ${process.stdout}`);

process.stdin.on('end', function() {
  process.stdout.write('REPL stream ended.');
});

// rl.on('line', () => {
//   if(rl.input) {
//     pipelineAction(readStream, transformStream, writeStream);
//     // console.log(`text was written to: ${output}`);
//     // process.exit(1);
//     console.log('in stream');
//   }
// });

// rl.question('What is your favorite food? ', (answer) => {
//   console.log(`Oh, so your favorite food is ${answer}`);
//   process.exit(1);
// });
