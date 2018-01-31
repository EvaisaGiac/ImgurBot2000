'use strict'

const request = require('request'),
      baseUrl = 'https://api.imgur.com/3/',
      winston = require('./winston'),
      config = require('../config.json'),
      write = require('jsonfile').writeFile,
      p = require('path'),
      error = require('./promiseError'),

      headers = {
        client_id() {
          return {
            'Authorization': `Client-ID ${config.client_id}`
          }
        },
        bearer() {
          return {
            'Authorization': `Bearer ${config.access_token}`
          }
        }
      }

let attempts = 0

const self = module.exports = {
  request(options, callback) {
    options.url = baseUrl + options.url
    options.json = true

    request(options, (err, res, body) => {
      if (err) {
        winston.error(err)
        return callback(err, res, body)
      }

      // Try and refresh if it's not a
      if (body.status === 403 && ++attempts < 3) {
        return self.refreshToken().then((err, res, body) => {
          self.request(options, callback)
        }).catch(error)
      }

      if (body.status !== 200) {
        return callback({ message: 'Failed to make request', error: body }, res, body)
      }

      attempts = 0
      callback(err, res, body)
    })
  },

  refreshToken() {
    winston.info('Requesting new access token')

    return new Promise((resolve, reject) => {
      self.request({
        url: 'oauth2/token',
        method: 'post',
        body: {
          refresh_token: config.refresh_token,
          client_id: config.client_id,
          client_secret: config.client_secret,
          grant_type: 'refresh_token'
        }
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        config.refresh_token = body.refresh_token
        config.access_token = body.access_token

        write(p.join(__dirname, '..', 'config.json'), config, { spaces: 2 }, () => {
          winston.info('Access token received, new config written:', config)
          resolve()
        })
      })
    })
  },

  getReputation() {
    return new Promise((resolve, reject) => {
      self.request({
        url: `account/${config.username}`,
        method: 'get',
        headers: headers.client_id()
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body.data)
      })
    })
  },

  uploadImage(url) {
    return new Promise((resolve, reject) => {
      self.request({
        url: 'image',
        method: 'post',
        headers: headers.bearer(),
        body: {
          image: url,
          description: ""
        }
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        return resolve(body.data)
      })
    })
  },

  share(hash, title) {
    return new Promise((resolve, reject) => {
      self.request({
        url: `gallery/image/${hash}`,
        method: 'post',
        headers: headers.bearer(),
        body: {
          terms: 1,
          mature: 0,
          title
        }
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        return resolve(body.data)
      })
    })
  },

  getUserSub(page = 1) {
    return new Promise((resolve, reject) => {
      self.request({
        url: `gallery/user/time/day/${page}`,
        method: 'get',
        headers: headers.client_id(),
        qs: {
          showViral: true,
          mature: false,
          album_previews: false
        }
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body.data)
      })
    })
  },

  comment(image_id, comment) {
    return new Promise((resolve, reject) => {
      self.request({
        url: `comment`,
        method: 'post',
        headers: headers.bearer(),
        body: { image_id, comment }
      }, (err, res, body) => {
        if (err) {
          return reject(err)
        }

        resolve(body.data)
      })
    })
  }

}
