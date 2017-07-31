exports.run = function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  let voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) {
    message.channel.send({
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must be in a voice channel first!"
      }
    }).catch(console.error);
  } else {
    let voiceCon = message.guild.voiceConnection;
    if (voiceCon) {
      if (voiceCon.speaking) {
        message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Error",
            description: `Please wait until the song has finished playing!`
          }
        }).catch(console.error);
      }
    } else {
      if(voiceChannel.joinable == true) {
      voiceChannel.join().then(connection => {
        message.channel.send('', {
          embed: {
            color: hexcols[~~(Math.random() * hexcols.length)],
            title: "Channel Joined",
            description: `${client.user.username} has joined your current voice channel`
          }
        }).catch(console.error);
      }).catch(console.error);
    } else {
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: `I do not have permissions to join that channel!`
        }
      }).catch(console.error);
    }
  }
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'join',
  description: 'Joins the current Voice Channel',
  usage: 'join'
};
