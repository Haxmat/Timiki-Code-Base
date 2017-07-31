exports.run = function (client, message, args) {
  const addQueue = require('../utils/queue.js').addQueue(message, args);
  
  addQueue;

};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['add'],
  permlevel: 1
};

exports.about = {
  name: 'add',
  description: 'Adds songs to the queue',
  usage: 'add <YouTube Link>'
};
