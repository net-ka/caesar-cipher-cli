module.exports = (chunk, action, shift) => {
  const data = chunk.toString();

  const arrLowerCharCode = [];
  const arrUpperCharCode = [];

  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    arrLowerCharCode.push(i);
  }

  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
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

    if (action === 'encode' && includedArray) {

      if (letterCode + +shift < last) {
        newDataCodes.push(letterCode + +shift);
      }

      if (letterCode + +shift > last) {
        newDataCodes.push(letterCode + +shift - last + first - 1);
      }

      if (letterCode + +shift === last) {
        newDataCodes.push(last);
      }
    }

    if (action === 'decode' && includedArray) {

      if (letterCode - shift > first) {
        newDataCodes.push(letterCode - shift);
      }

      if (letterCode - shift < first) {
        newDataCodes.push(letterCode - shift + last - first + 1);
      }

      if (letterCode - shift === first) {
        newDataCodes.push(first);
      }
    }

    if (!includedArray) {
      newDataCodes.push(letterCode);
    }
  }

  const newData = String.fromCharCode(...newDataCodes);

  return newData;
};
