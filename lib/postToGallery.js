'use strict'

const imgur = require('./imgurService'),
      giphy = require('./giphy'),
      winston  = require('./winston'),
      error = require('./promiseError'),
      sentencer = require('sentencer'),
      random = require('./random'),
      title = () => {
        const templates = [
          '{{an_adjective}} {{noun}} of a post',
          'MRW {{a_noun}} meets {{an_adjective}} {{noun}}',
          '{{nouns}}',
          '{{a_noun}}',
          '{{a_noun}} tries to be {{a_noun}}',
          'A giant {{adjective}} {{nouns}}',
          'Clever title',
          '{{an_adjective}} {{noun}}',
          '{{adjective}} {{nouns}}',
          'poopy post',
          '[100 emoji]',
          'MFW {{nouns}}',
          'MRW {{an_adjective}} girls meets {{an_adjective}} boy',
          '90\'s kids be like',
          'This guy',
          'Not a dump',
          '{{nouns}} reading {{an_adjective}} book',
          'MRW {{a_noun}} hits {{a_noun}} and then {{an_adjective}} {{noun}} sees the whole thing',
          'Feels',
          'Aliens',
          'You know you\'re {{a_noun}} when'
        ]

        return sentencer.make(templates[random(0, templates.length)])
      }

module.exports = () => {
  // Get an image url
  giphy.trending().then(url => {
    // Upload that image to imgur
    imgur.uploadImage(url).then(res => {
      // Create a gallery post
      const t = title()
      imgur.share(res.id, t).then(() => {
        winston.info(`Uploaded and posted ${res.id} - ${t}`)
      }).catch(error)
    }).catch(error)
  }).catch(error)

}
