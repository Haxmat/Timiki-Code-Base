exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  let voiceCon = message.guild.voiceConnection;
  if (!voiceCon) {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I must be in a Voice Channel first",
        timestamp: new Date(),
        footer: {
          text: `${message.author.username} likes music!`
        }
      }
    }).catch(console.error);
  } else {
    if (!voiceCon.speaking) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "I cannot change the volume if no song is playing",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
    let newVol = parseInt(args.slice(0).join(' '));
    if(isNaN(newVol)) {
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "You must enter a number betweem 1 and 100!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
    if(newVol > 100) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "You must enter a number betweem 1 and 100!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
    if(newVol < 1) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "You must enter a number betweem 1 and 100!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
    var dispatcher = voiceCon.dispatcher;
    dispatcher.setVolume(newVol / 100);
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Volume Changed",
        description: "The Volume has been changed",
        timestamp: new Date(),
        footer: {
          text: `${message.author.username} likes music!`
        }
      }
    })
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['vol'],
  permlevel: 1
};

exports.about = {
  name: 'volume',
  description: 'Change the volume of the song',
  usage: 'volume'
};
