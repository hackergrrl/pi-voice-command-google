# pi-voice-command-google

> Recognize a single voice command on a Raspberry Pi using the Google Speech API.

## ~~ WARNING ~~

Google demands personal information, including credit card billing information
in order to use their service. Further, at time of writing, only 60 minutes of
speech is free per month before you are charged. This is soooo far from a good
solution, but it's the best I've been able to find for free voice recognition.

## Setup

1. Install NodeJS 8.x.x or newer.
2. Follow Step 1 and Step 2 [on this Google Speech API quickstart page](https://cloud.google.com/speech-to-text/docs/quickstart-protocol). Save the JSON file it gives you somewhere handy.
3. Have ALSA set up for audio. If the `arecord` command is not available, you might need a package like `alsa-utils`.
4. Run `npm install pi-voice-command-google` to install the module.

## Usage

```js
var voice = require('pi-voice-command-google')
var fs = require('fs')

var keysPath = './speech_keys.json'

voice(keysPath, function (err, res) {
  if (err) throw err
  console.log('Transcript:', res)
})
```

and saying 'hello world' aloud, outputs

```
hello world
```

## API

```js
var voice = require('pi-voice-command-google')
```

### var cancel = voice(keysPath, cb)

Returns a function `cancel` that can be used to terminate microphone recording
and upload to Google servers.

`keysPath` is a path to a JSON file: whatever Google gives you when you set up a Speech API project
[here](https://cloud.google.com/speech-to-text/docs/quickstart-protocol).

Otherwise, `cb(err, res)` is called. `res` will be a string with the contents
of what the Google machinery heard you say.

Right now, this function is hardcoded to abort after 3 seconds of silence (no
command given; `null` as `res`), or after 1 second of silence after a command
is given.

## License

MIT

