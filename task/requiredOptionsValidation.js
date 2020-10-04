module.exports = (action, shift) => {
  if (action !== 'encode' && action !== 'decode') {
    console.error('Error: action option should be encode or decode');
    process.exit(1);
  }

  if (isNaN(shift) || shift < 0 || shift > 27) {
    console.error('Error: shift option should be a number from 0 to 26');
    process.exit(1);
  }

  return;
}

