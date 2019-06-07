# pi-voice-command-google

> Recognize a single voice command on a Raspberry Pi using the Google Speech API.

## ~~ WARNING ~~

Google demands personal information, including credit card billing information
in order to use their service. Further, at time of writing, only 60 minutes of
speech is free per month before you are charged. This is soooo far from a good
solution, but it's the best I've been able to find for free voice recognition.
To help the development of Free/Libre Open Source voice recognition, please 
contribute your voice to the [Common Voice](https://voice.mozilla.org/en) project!

## Setup

1. Install NodeJS 8.x.x or newer.
2. Follow Step 1 and Step 2 [on this Google Speech API quickstart page](https://cloud.google.com/speech-to-text/docs/quickstart-protocol). You'll need to have the `GOOGLE_APPLICATION_CREDENTIALS` environment variable set when running your node process.
3. Have ALSA set up for audio. If the `arecord` command is not available, you might need a package like `alsa-utils`.
4. Run `npm install pi-voice-command-google` to install the module.

## Usage

```js
var voice = require('pi-voice-command-google')

voice(function (err, res) {
  if (err) throw err
  console.log('Transcript:', res)
})
```

and saying 'hello world' aloud, outputs

```
hello warld
```

## API

```js
var voice = require('pi-voice-command-google')
```

### var cancel = voice(cb)

Returns a function `cancel` that can be used to terminate microphone recording
and upload to Google servers.

Otherwise, `cb(err, res)` is called. `res` will be a string with the contents
of what the Google machinery heard you say.

Right now, this function is hardcoded to abort after 3 seconds of silence (no
command given; `null` as `res`), or after 1 second of silence after a command
is given.

## License

MIT

