'use strict'

const winston = require('winston'),
      p = require('path')

winston.cli()

winston.add(winston.transports.File, {
  level: 'info',
  name: 'info',
  filename: p.join(__dirname, '..', 'logs', 'repostbot.info.log')
})

winston.add(winston.transports.File, {
  level: 'error',
  name: 'error',
  filename: p.join(__dirname, '..', 'logs', 'repostbot.error.log')
})

module.exports = winston
