const opus = require('node-opus');
const yt = require('ytdl-core');
const config = require('../config.json');

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

var queue = require('../utils/queue.js').queue;

exports.run = function(client, message, args) {
  let voiceCon = message.guild.voiceConnection;

  if (!voiceCon) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I must be in a Voice Channel first!",
      }
    }).catch(console.error);
  }

  if(voiceCon.speakable == false) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I dont have permissions to speak in this channel!",
      }
    }).catch(console.error);
  }

  if(queue[message.guild.id] === undefined || queue[message.guild.id].songs === undefined || queue[message.guild.id].songs.length < 1) return message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Error",
      description: "Add some songs to the queue first!",
    }
  }).catch(console.error);

  if(voiceCon.speaking) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "Already Playing!",
      }
    }).catch(console.error);
  }

  (function play(song) {
    if (song === undefined) {
      voiceCon.disconnect();
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Queue Finished",
          description: "The Queue has finished.",
        }
      }).catch(console.error);
    }

    let stream = yt(song.url, {
      audioonly: true
    });

    const dispatcher = voiceCon.playStream(stream);

    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Playing...",
        description: `**${song.title}** is now playing`,
      }
    }).catch(console.error);

    dispatcher.on('end', () => {
      console.log('End Event Triggered');
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Finished Playing",
          description: `**${song.title}** has finished playing`,
        }
      }).catch(console.error);
      if(queue[message.guild.id].songs.length > 0) {
        require('../utils/queue.js').removeQueue(message);
        setTimeout(function() { play(queue[message.guild.id].songs[0]); }, 500);
      } else {
        voiceCon.disconnect();
        return message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Queue Finished",
            description: `The Queue has finished`,
          }
        }).catch(console.error);
      }
    });

  }) (queue[message.guild.id].songs[0]);


};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['song'],
  permlevel: 1
};

exports.about = {
  name: 'play',
  description: 'Plays the Songs in the queue',
  usage: 'play <YouTube Link>'
};
