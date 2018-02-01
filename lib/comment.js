'use strict'

const s = require('sentencer'),
      random = require('./random'),
      giphy = require('./giphy')

module.exports = () => {
  const templates = [
    'WHAT THE HELL IS WRONG WITH YOU YOU {{noun}} OF A {{noun}}!! COULDNT YOU THINK OF A TITLE???',
    'WHAT THE {{adjective}} {{noun}} IS THIS?? WHY DO YOU NOT HAVE A TITLE?!',
    'USING NO GOOD TITLE IS LIKE WHEN A {{noun}} SEES A {{noun}} WTF',
    'THINK OF A TITLE NEXT TIME YOU {{noun}}!!!',
    'WHAT THE HECK WHY DO YOU PUT THAT AS YOUR TITLE?',
    '{{nouns}}!! GET A TITLE ALREADY!',
    'THAT TITLE IS {{adjective}}!! I HATE IT',
    'YOUR LACK OF TITLE DISTURBS ME',
    'WOOOOOOOOOOOOOOOWWW NOT EVEN A TITLE?? LOL JUST GET A TITLE',
    'THAT TITLE IS {{adjective}}? OH WAIT THERE IS PRETTY MUCH NONE',
    'IS THAT WHAT I THINK IT IS? BARELY A TITLE?',
    'NICE TITLE OP, NOT. WHY WOULD YOU NOT JUST THINK OF ONE???',
    'OP GOT SOME MAD TITLING SKILLS. JK WTF IS WRONG WITH YOU OP YOU FAGGOT',
    'THIS IS {{an_adjective}} POST BUT THE TITLE IS AWFUL.',
    'WHAT IS THIS TITLE?? OH MY GOD JUST GET A TITLE ALREADY YOU {{noun}}',
    'WHY ALL THE DOWNVOTES? PROBABLY BECAUSE OF THE TITLE',
    'THE FP DESERVES THIS, TALKING ABOUT THAT TITLE OFCOURSE, I DONT WANT THAT IN MY USERSUB ANYMORE',
    'I WISH I HAD NEVER SEEN THIS TITLE THEN THE POST MIGHT HAVE BEEN GOOD',
    'UP UP AND AWAY!! WITH THAT TITLE EW',
    'THANKS OP FOR THAT AWFUL TITLE',
    'SPOILER ALERT, OP\'S A {{noun}}, NEXT TIME GET A TITLE YOU {{noun}}',
    'OK.. NEXT TIME GET A TITLE PLEASE THIS HURTS MY EYES OH MY GOD YOU {{noun}}',
    'OP DESERVES {{a_noun}}, {{a_noun}}, AND {{a_noun}} FOR THAT SHITTY TITLE FFS!!!',
    'WATCH THIS MAKE IT TO FP EVEN THO IT HAS LIKE NO TITLE LIKE THINK OF A TITLE YOU {{noun}}',
    'WHAT AM I LOOKING AT HERE?? OH RIGHT THE TITLE WAIT THERE IS PRETTY MUCH NONE',
    'THE TITLE LOOKS LIKE A {{noun}} LIKE WTF GET THAT OUT OF MY SIGHT',
    '{{an_adjective}} POST OP, TOO BAD THE TITLE IS AWFUL',
    'CAN YOU GET A TITLE NEXT TIME? K THANKS BYE',
    'OH MY JUST GET A TITLE YOU LOSER'
  ],
  textComment = () => {
    return new Promise(resolve => resolve((s.make(templates[random(0, templates.length)]).toUpperCase())))
  }

  return true ? textComment() : giphy.random()
}
