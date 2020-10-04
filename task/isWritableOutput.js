const fs = require('fs');

const isWritableOutput = output => {
  if (output) {
    try {
      fs.accessSync(output, fs.constants.W_OK);
      return true;
    } catch (err) {
      console.error(`${output} is not writable`);
      process.exit(1);
    }
  }
}

module.exports = {
  isWritableOutput: isWritableOutput,
};
