const fs = require('fs');

const isWritableOutput = output => {
  if (output) {
    try {
      fs.accessSync(output, fs.constants.W_OK);
      return true;
    } catch (err) {
      console.error(`Error: '${output}' is not writable`);
      process.exit(1);
    }
  }
}

module.exports = {
  isWritableOutput,
};
