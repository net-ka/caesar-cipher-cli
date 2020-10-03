const { Transform } = require("stream");
const os = require("os");

const transform = (action, shift) => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString();

      const arrLowerCharCode = [];
      const arrUpperCharCode = [];

      for (let i = 97; i < 123; i++) {
        arrLowerCharCode.push(i);
      }

      for (let i = 65; i < 91; i++) {
        arrUpperCharCode.push(i);
      }

      const newDataCodes = [];

      for (let i = 0; i < data.length; i++) {
        const letterCode = data.charCodeAt(i);

        const includedArray = arrLowerCharCode.includes(letterCode) ? arrLowerCharCode
          : arrUpperCharCode.includes(letterCode) ? arrUpperCharCode
            : false;

        const first = includedArray[0];
        const last = includedArray[includedArray.length - 1];

        if (action === 'encode') {

          if (includedArray && letterCode + +shift < last) {
            newDataCodes.push(letterCode + +shift);
          }

          if (includedArray && letterCode + +shift > last) {
            newDataCodes.push(letterCode + +shift - last + first - 1);
          }

          if (includedArray && letterCode + +shift === last) {
            newDataCodes.push(last);
          }
        }

        if (action === 'decode') {

          if (includedArray && letterCode - shift > first) {
            newDataCodes.push(letterCode - shift);
          }

          if (includedArray && letterCode - shift < first) {
            newDataCodes.push(letterCode - shift + last - first + 1);
          }

          if (includedArray && letterCode - shift === first) {
            newDataCodes.push(first);
          }
        }

        if (!includedArray) {
          newDataCodes.push(letterCode);
        }
      }

      const newData = String.fromCharCode(...newDataCodes);

      this.push(newData);
      // this.push(newData.concat('\n'));
      // this.push(os.EOL);
      callback();
    },
  });
};

module.exports = {
  transform: transform
};
