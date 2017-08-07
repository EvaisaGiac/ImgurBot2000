'use strict'

const imgur = require('./imgurService'),
      giphy = require('./giphy'),
      random = require('./random'),
      error = require('./promiseError'),
      eachSeries = require('async').eachSeries,
      comment = require('./comment'),
      winston = require('./winston'),
      maxCount = 6,
      makeComment = (post, cb) => {
        // Post a random comment on each post
        comment().then(c => {
          imgur.comment(post.id, c).then(() => {
            winston.info(`Commented "${c}" on ${post.id}`)
            setTimeout(cb, 17000)
          }).catch(error)
        }).catch(error)
      }

let lastTime = 1502084211,
    count = 0

module.exports = () => {
  // Paginate from the first page of the user/time/day gallery
  imgur.getUserSub().then(posts => {
    let firstTime

    // iterate through each gallery
    eachSeries(posts, (post, cb) => {
      if (!firstTime) {
        firstTime = post.datetime
      }

      // Coninue until:
      // 1. maxCount is reached, or
      // 2. lastTime is reached
      if (post.datetime <= lastTime || ++count > maxCount) {
        return cb(true)
      }

      makeComment(post, cb)
    }, done => {
      lastTime = firstTime
      count = 0
    })
  }).catch(error)
}
