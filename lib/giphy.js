'use strict'

const service = require('./giphyService'),
      random = require('./random'),
      eachSeries = require('async').eachSeries,
      moment = require('moment'),
      maxListLength = 500

let idsList = []

module.exports = {

  trending(useRandom = true) {
    return new Promise((resolve, reject) => {
      service.getTrending().then(res => {
        let url

        if (idsList.length > maxListLength) {
          idsList = []
        }

        if (useRandom) {
          const getIndex = () => {
            const i = random(0, res.data.length)

            if (idsList.indexOf(res.data[i].id) !== -1) {
              return getIndex()
            }

            idsList.push(res.data[i].id)
            return i
          }
          const index = getIndex()

          return resolve(res.data[index].images.original.url)
        }

        eachSeries(res.data, (item, cb) => {
          if (idsList.indexOf(item.id) === -1) {
            lastId = item.id
            url = item.images.original.url
            idsList.push(item.id)
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
  },
  cats() {
    return new Promise((resolve, reject) => {
      service.cats().then(res => {
        resolve(res.data.image_original_url)
      }).catch(err => {
        reject(err)
      })
    })
  }, 
  dogs() {

    return new Promise((resolve, reject) => {

      service.dogs().then(res => {

        resolve(res.data.image_original_url)

      }).catch(err => {

        reject(err)

      })

    })

  }
}
