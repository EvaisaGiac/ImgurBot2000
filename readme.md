# ImgurBot2000

This is an experiment to try and generate the most amount of reputation points with me not doing anything. It will likely end with me getting banned somehow.

Runs tasks to post comments and submit gallery images to Imgur, as well as notifies me of the change in reputation.

## Requirements

An Imgur api access_token (and client_id, client_secret, and refresh_token), a Giphy api key, and a Pushbullet key.

## Usage

Clone this repo, in the project root:

```
$ npm i
```

Set up the config. I didn't put in checks

```
$ cp config.sample.json config.json
$ nano config.json
```

(`debug` doesn't actually do anything)

```
$ node index.js
```
