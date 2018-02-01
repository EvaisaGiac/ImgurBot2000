'use strict'

const imgur = require('./imgurService'),
      giphy = require('./giphy'),
      random = require('./random'),
      error = require('./promiseError'),
      eachSeries = require('async').eachSeries,
      comment = require('./comment'),
      winston = require('./winston'),
      ms = require('millisecond'),
      maxCount = 50000000,
      makeComment = (post, cb) => {
        // Post a random comment on each post
        comment().then(c => {
          imgur.comment(post.id, c).then(() => {
            winston.info(`Commented "${c}" on ${post.id}`)
            setTimeout(cb, random(ms('15 secs'), random('1 min')))
          }).catch(error)
        }).catch(error)
      }

let lastTime = 9999999999,
    count = 0

module.exports = () => {
  // Paginate from the first page of the user/time/day gallery
  imgur.getUserSub().then(posts => {
    
    let firstTime
    let LastPost
    // iterate through each gallery
    eachSeries(posts, (post, cb) => {
      if (!firstTime) {
        firstTime = post.datetime
      }
      //winston.info(`Checked ${post.title}`)
      // Coninue until:
      // 1. maxCount is reached, or
      // 2. lastTime is reached
      /*if (post.datetime <= lastTime || ++count > maxCount) {
        return cb(true)
      }*/
      
      if (post.title == "." && LastPost != post.id){
            LastPost = post.id
            makeComment(post, cb)            
      }
    }, done => {
      lastTime = firstTime
      count = 0
    })
  }).catch(error)
}
