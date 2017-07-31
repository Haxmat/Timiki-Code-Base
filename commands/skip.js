var queue = require('../utils/queue.js').queue;
exports.run = function(client, message, args) {

  let voiceCon = message.guild.voiceConnection;

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if(!voiceCon) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: `I must be in a voice channel first!`
      }
    }).catch(console.error);
  }

  if(!voiceCon.speaking) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: `I cannot skip a song that isnt playing!`
      }
    }).catch(console.error);
  }

if(voiceCon.speaking) {
  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Skipped",
      description: `the song has been skipped!`
    }
  }).catch(console.error);
  return voiceCon.dispatcher.end();
}
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'skip',
  description: 'Skips the current song',
  usage: ['skip']
};
