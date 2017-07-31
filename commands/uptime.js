exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  function uptime() {
    var date = new Date(client.uptime);
    var strDate = '';
    strDate += date.getUTCDate() - 1 + " days, ";
    strDate += date.getUTCHours() + " hours, ";
    strDate += date.getUTCMinutes() + " minutes, ";
    strDate += date.getUTCSeconds() + " seconds";
    return strDate;
  }

  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Uptime",
      description: `**${uptime()}**`,
      timestamp: new Date(),
      footer: {
        text: `${message.author.username} gained an hours worth of life force!`
      }
    }
  });
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['utime'],
  permLevel: 1
};

exports.about = {
  name: 'uptime',
  description: 'Displays the Bot\'s Uptime',
  usage: 'uptime'
};
