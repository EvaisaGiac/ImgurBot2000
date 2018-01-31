'use strict'

const post = require('./lib/postToGallery'),
      commentate = require('./lib/commentate'),
      reputation = require('./lib/reputationAlert'),
      r = require('./lib/random'),
      ms = require('millisecond'),
      postInterval = () => {
        return r(ms('5 mins'), ms('100 mins'))
      },
      postTask = () => {
        post()
        setTimeout(postTask, postInterval())
      },
      commentInterval = () => {
        return r(ms('10 sec'), ms('1 mins'))
      },
      commentTask = () => {
        commentate()
        setTimeout(commentTask, commentInterval())
      },
      reputationTask = () => {
        reputation()
        setTimeout(reputationTask, ms('1 hours'))
      }

postTask()
commentTask()
reputationTask()
