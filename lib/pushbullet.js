'use strict'

const PushBullet = require('pushbullet'),
      key = require('../config.json').pushbullet_key

module.exports = new PushBullet(key)
