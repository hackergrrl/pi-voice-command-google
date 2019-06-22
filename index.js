const speech = require('@google-cloud/speech');
const record = require('node-record-lpcm16');

module.exports = function (keysPath, ready, cb) {
  if (ready && !cb) {
    cb = ready
    ready = function(){}
  }
  if (!cb) cb = function(){}

  process.env.GOOGLE_APPLICATION_CREDENTIALS = keysPath

  const client = new speech.SpeechClient();

  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US'
    },
    interimResults: true
  };

  var workingResult
  var lastResult
  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', cb)
    .on('data', data => {
      workingResult = data.results[0].alternatives[0].transcript
      lastResult = new Date().getTime()
    });

  var stream = record
    .start({
      sampleRateHertz: 16000,
      threshold: 0,
      verbose: false,
      recordProgram: 'arecord',
      silence: '1.0',
      device: 'plughw:0,0'
    })

  stream
    .on('error', cb)
    .pipe(recognizeStream);

  stream.once('data', function () {
    ready()
  })

  var ix = setInterval(function () {
    var now = new Date().getTime()
    if (workingResult && now - lastResult > 1000) {
      finish(null, workingResult)
    } else if (!workingResult && now - lastResult > 3000) {
      finish()
    }
  }, 500)

  function finish (err, res) {
    record.stop()
    stream.end()
    clearInterval(ix)
    cb(err, workingResult)
  }

  return finish.bind(null, null, null)
}
