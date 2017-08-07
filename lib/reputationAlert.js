'use strict'

const imgur = require('./imgurService'),
      pushbullet = require('./pushbullet'),
      winston = require('./winston'),
      error = require('./promiseError')

let lastRep = 0

module.exports = () => {

  imgur.getReputation().then(res => {
    const diff = res.reputation - lastRep
    winston.info(`Reputation: ${res.reputation}, difference of ${diff}`)
    pushbullet.note({}, 'Reputation progress', `${res.reputation}, for a difference of ${diff} from yesterday`)
    lastRep = res.reputation
  }).catch(error)

}
