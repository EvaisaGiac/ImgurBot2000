'use strict'

const winston = require('./winston')

module.exports = err => {
  winston.error(err)
}
