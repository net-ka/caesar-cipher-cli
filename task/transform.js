const { Transform } = require("stream");
const os = require("os");
const cipher = require('./cipher');

const transform = (action, shift) => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const newData = cipher(chunk, action, shift);

      this.push(newData);
      // this.push(newData.concat('\n'));
      // this.push(os.EOL);
      callback();
    },
  });
};

module.exports = {
  transform
};
