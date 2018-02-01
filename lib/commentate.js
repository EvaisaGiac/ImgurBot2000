'use strict'
const imgur = require('./imgurService'),
      giphy = require('./giphy'),
      random = require('./random'),
      error = require('./promiseError'),
      eachSeries = require('async').eachSeries,
      comment = require('./comment'),
      comment2 = require('./comment2'),
      comment3 = require('./comment3'),
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
      },
      makeComment3 = (post, cb) => {
        // Post a random comment on each post
        comment3().then(c => {
          imgur.comment(post.id, c).then(() => {
            winston.info(`Commented "${c}" on ${post.id}`)
            setTimeout(cb, random(ms('15 secs'), random('1 min')))
          }).catch(error)
        }).catch(error)
      },
      makeComment2 = (post, cb) => {
        // Post a random comment on each post
        comment2().then(c => {
          imgur.comment(post.id, c).then(() => {
            winston.info(`Commented "${c}" on ${post.id}`)
            setTimeout(cb, random(ms('15 secs'), random('1 min')))
          }).catch(error)
        }).catch(error)
      }
let lastTime = 9999999999,
    count = 0,
    LastPost = 0,
    a = [];
module.exports = () => {
  // Paginate from the first page of the user/time/day gallery
  imgur.getUserSub().then(posts => {
    
    let firstTime
    
    // iterate through each gallery
    eachSeries(posts, (post, cb) => {
      if (!firstTime) {
        firstTime = post.datetime
      }
      //LastPost = post.id
      
      // Coninue until:
      // 1. maxCount is reached, or
      // 2. lastTime is reached
      /*if (post.datetime <= lastTime || ++count > maxCount) {
        return cb(true)
      }*/
 
      winston.info(`Checked ${post.title} length is ${(post.title).length} comparing to items: ${(a)} , commented a total of ${(a).length} times.`)
      
      if ((post.title).includes("cat") && a.indexOf(post.id) > -1 || (post.title).includes("kitty") && a.indexOf(post.id) > -1){
            LastPost = post.id
            a.push(post.id)
            makeComment2(post, cb)            
      }      
      else if ((post.title).includes("dog") && a.indexOf(post.id) > -1 || (post.title).includes("golden") && a.indexOf(post.id) > -1 || (post.title).includes("pup") && a.indexOf(post.id) > -1 || (post.title).includes("corgi") && a.indexOf(post.id) > -1 || (post.title).includes("shib") && a.indexOf(post.id) > -1 || (post.title).includes("husky") && a.indexOf(post.id) > -1){
            LastPost = post.id
            a.push(post.id)
            makeComment3(post, cb)            
      }      
      else if ((post.title).length < 5 && a.indexOf(post.id) > -1){
            LastPost = post.id
            a.push(post.id)
            makeComment(post, cb)            
      }
    }, done => {
      lastTime = firstTime
      count = 0
    })
  }).catch(error)
}
