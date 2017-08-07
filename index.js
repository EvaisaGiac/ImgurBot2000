'use strict'

const post = require('./lib/postToGallery'),
      commentate = require('./lib/commentate'),
      reputation = require('./lib/reputationAlert'),
      r = require('./lib/random'),
      ms = require('millisecond'),
      postInterval = () => {
        return r(ms('5 mins'), ms('20 mins'))
      },
      postTask = () => {
        post()
        setTimeout(postTask, postInterval())
      },
      commentInterval = () => {
        return r(ms('15 sec'), ms('2 mins'))
      },
      commentTask = () => {
        commentate()
        setTimeout(commentTask, commentInterval())
      },
      reputationTask = () => {
        reputation()
        setTimeout(reputationTask, ms('1 day'))
      }

postTask()
commentTask()
reputationTask()
