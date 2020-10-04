const { pipeline } = require('stream');

const pipelineAction = (readStream, transformStream, writeStream) => {
  pipeline(
    readStream,
    transformStream,
    writeStream,
    (error) => {
      if (error) {
        console.error('Pipeline failed')
        process.exit(1);
      }
      else {
        console.log('Pipeline succeeded');
        process.exit(1);
      }
    }
  )
};

module.exports = {
  pipelineAction,
};
