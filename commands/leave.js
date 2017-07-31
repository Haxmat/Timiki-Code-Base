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
          description: "Please wait for the current song to finish!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    } else {
      voiceCon.disconnect()
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Disconnected",
          description: "Disconnected from the Voice Channel",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes music!`
          }
        }
      }).catch(console.error);
    }
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['exit'],
  permlevel: 1
};

exports.about = {
  name: 'leave',
  description: 'Leaves the Current Voice Channel',
  usage: 'leave'
};
