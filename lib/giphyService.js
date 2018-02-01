'use strict'

const request = require('request'),
      winston = require('./winston'),
      baseUrl = 'http://api.giphy.com/v1/gifs/',
      apiKey = require('../config.json').giphy_key,
      _ = require('lodash')

const self = module.exports = {
  request(url, queryString, callback) {
    const qs = _.merge({
            api_key: apiKey,
            rating: 'pg-13',
            fmt: 'json'
          }, queryString),
          options = {
            url: baseUrl + url,
            qs,
            method: 'get',
            json: true
          }

    request(options, (err, res, body) => {
      if (err) {
        winston.error(err)
        return callback(err, res, body)
      }

      callback(err, res, body)
    })
  },

  getTrending() {
    return new Promise((resolve, reject) => {
      self.request('trending', {}, (err, response, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body)
      })
    })
  },

  random() {
    return new Promise((resolve, reject) => {
      self.request('random', {}, (err, response, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body)
      })
    })
  },

  cats() {
    return new Promise((resolve, reject) => {
      self.request('random', {tag: 'Cats'}, (err, response, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body)
      })
    })
  },
  dogs() {
    return new Promise((resolve, reject) => {
      self.request('random', {tag: 'Dogs'}, (err, response, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body)
      })
    })
  }

}
