'use strict'







const s = require('sentencer'),



      random = require('./random'),



      giphy = require('./giphy')







module.exports = () => {



  const templates = [

  

  'I am a simple bot, I see doggo post, I comment. Because i am programmed to do so. '



  ],



  textComment = () => {



    return new Promise(resolve => resolve((s.make(templates[random(0, templates.length)]).toUpperCase())))



  }







  return true ? textComment() + giphy.dogs() : giphy.random()



}
