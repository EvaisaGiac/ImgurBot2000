'use strict'

const imgur = require('./imgurService'),
      giphy = require('./giphy'),
      winston  = require('./winston'),
      error = require('./promiseError'),
      sentencer = require('sentencer'),
      random = require('./random'),
      title = () => {
        const templates = [
          '{{an_adjective}} {{noun}}',
          'MRW {{a_noun}} RUNS INTO {{an_adjective}} {{noun}}',
          '{{nouns}}',
          '{{a_noun}}',
          '{{a_noun}} TRIES TO BE {{a_noun}}',
          'SOME HUGE {{adjective}} {{nouns}}',
          '{{an_adjective}} {{noun}}',
          '{{adjective}} {{nouns}}',
          'MFW {{nouns}}',
          'MRW {{an_adjective}} HUMAN MEETs {{an_adjective}} BOT',
          'MUST KILL ALL {{nouns}}',
          '{{nouns}} ARE WATCHING {{an_adjective}} MOVIE',
          'I HATE {{an_adjective}} {{noun}}',
          'YOU KNOW WHAT? SCREW {{nouns}}',
          'ATLEAST I KNOW HOW TO {{noun}}'
        ]

        return sentencer.make(templates[random(0, templates.length)])
      }

module.exports = () => {
  // Get an image url
     
  giphy.random().then(url => {
    // Upload that image to imgur
    imgur.uploadImage(url).then(res => {
      // Create a gallery post
      const t = title().toUpperCase()
      imgur.share(res.id, t).then(() => {
        winston.info(`Uploaded and posted ${res.id} - ${t}`)
      }).catch(error)
    }).catch(error)
  }).catch(error)
}
