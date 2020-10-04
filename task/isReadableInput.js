const fs = require('fs');

const isReadableInput = input => {
  if (input) {
    try {
      fs.accessSync(input, fs.constants.R_OK);
      return true;
    } catch (err) {
      console.error(`${input} is not readable or doesn't exist`);
      process.exit(1);
    }
  }
  else {
    return false;
  }
}

module.exports = {
  isReadableInput,
};
