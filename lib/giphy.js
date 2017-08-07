'use strict'

const service = require('./giphyService'),
      random = require('./random'),
      eachSeries = require('async').eachSeries

let lastId = ''

module.exports = {

  trending(useRandom = true) {
    return new Promise((resolve, reject) => {
      service.getTrending().then(res => {
        let url

        if (useRandom) {
          return resolve(res.data[random(0, res.data.length)].images.original.url)
        }

        eachSeries(res.data, (item, cb) => {
          if (item.id !== lastId) {
            lastId = item.id
            url = item.images.original.url
            return cb(true)
          }

          cb()
        }, () => {
          resolve(url)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },

  random() {
    return new Promise((resolve, reject) => {
      service.random().then(res => {
        resolve(res.data.image_original_url)
      }).catch(err => {
        reject(err)
      })
    })
  }

}
