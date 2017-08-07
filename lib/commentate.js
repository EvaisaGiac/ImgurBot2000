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
            setTimeout(cb, 15000)
          }).catch(error)
        }).catch(error)
      }

let lastHash = '',
    count = 0

module.exports = () => {
  // Paginate from the first page of the user/time/day gallery
  imgur.getUserSub().then(posts => {
    let firstHash

    // iterate through each gallery
    eachSeries(posts, (post, cb) => {
      if (!firstHash) {
        firstHash = post.id
      }

      // Coninue until:
      // 1. maxCount is reached, or
      // 2. lastHash is reached
      if (post.id === lastHash || ++count > maxCount) {
        lastHash = firstHash
        return cb(true)
      }

      makeComment(post, cb)
    }, done => {
      count = 0
    })
  }).catch(error)
}
