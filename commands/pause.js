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
          description: "I cannot pause if no song is playing",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
    var dispatcher = voiceCon.player.dispatcher;
    dispatcher.pause();
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Paused",
        description: "The Song has Been Paused",
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
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'pause',
  description: 'Pauses the current song',
  usage: 'pause'
};
