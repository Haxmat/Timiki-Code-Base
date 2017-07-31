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
    if (voiceCon.speaking) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "I cannot resume what is not paused!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    } else {
      var dispatcher = voiceCon.player.dispatcher;
      if (!dispatcher.paused) {
        message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Error",
            description: "I cannot resume what is not paused!",
            timestamp: new Date(),
            footer: {
              text: `${message.author.username} likes music!`
            }
          }
        }).catch(console.error);
      } else {
        dispatcher.resume();
        message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Resumed",
            description: "The Song has Been Resumed",
            timestamp: new Date(),
            footer: {
              text: `${message.author.username} likes music!`
            }
          }
        })
      }
    }
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['continue'],
  permlevel: 1
};

exports.about = {
  name: 'resume',
  description: 'Resumes the current song',
  usage: 'resume'
};
