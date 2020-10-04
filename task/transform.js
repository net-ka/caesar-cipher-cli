const { Transform } = require("stream");
const cipher = require('./cipher');

const transform = (action, shift) => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const newData = cipher(chunk, action, shift);

      this.push(newData);
      callback();
    },
  });
};

module.exports = {
  transform
};
