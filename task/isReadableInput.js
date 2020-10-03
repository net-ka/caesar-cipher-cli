const fs = require('fs');

const isReadableInput = input => {
  if (input) {
    try {
      fs.accessSync(input, fs.constants.R_OK);
      return true;
    } catch (err) {
      console.log(`${input} is not readable or doesn't exist`);
      process.exit(1);
    }
  }
}

module.exports = {
  isReadableInput: isReadableInput,
};
