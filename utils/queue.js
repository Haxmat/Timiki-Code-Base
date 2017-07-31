const opus = require('node-opus');
const config = require('../config.json');
const YouTube = require('youtube-node');
const yt = require('ytdl-core');

const youtube = new YouTube();

youtube.setKey(config.gapikey);

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

var queue = {};

exports.addQueue = function(message, args) {

  if (args.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must define a song to add to the queue"
      }
    }).catch(console.error);
  }

  if (args.join(' ').includes("http://") || args.join(' ').includes("https://")) {
    let url = args.join(' ');

    yt.getInfo(url, (err, info) => {
      if (err) return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "Invalid Youtube Video: " + err
        }
      }).catch(console.error);

      if (!queue.hasOwnProperty(message.guild.id)) {
        queue[message.guild.id] = {}
        queue[message.guild.id].songs = []
      }

      queue[message.guild.id].songs.push({
        url: url,
        title: info.title
      });
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Added to Queue",
          description: `**${info.title}** has been added to queue`
        }
      }).catch(console.error);
    });
  } else {
    let name = args.join(' ');
    youtube.search(name, 1, function(error, result) {
      if (error) {
        if (err) return message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
              title: "Error",
            description: `Unable to complete the search: ${err}`
          }
        }).catch(console.error);
      } else {
        if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].songs = [];
        queue[message.guild.id].songs.push({
          url: `https://www.youtube.com/watch?v=${result.items[0].id.videoId}`,
          title: result.items[0].snippet.title
        });
        return message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Added to Queue",
            description: `**${result.items[0].snippet.title}** has been added to queue`
          }
        }).catch(console.error);
      }
    });
  }
};

exports.removeQueue = function(message) {
  if (!queue[message.guild.id]) return;
  if (queue[message.guild.id].songs == []) return;
  queue[message.guild.id].songs.shift();
};

exports.clearQueue = function(message) {
  if (!queue[message.guild.id]) return;
  if (queue[message.guild.id].songs == undefined) return;
  queue[message.guild.id].songs = [];
}

exports.queue = queue;
