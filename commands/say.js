const config = require('../config.json');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if (args.length < 1) {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You did not define what to say!",
        footer: {
          text: `${message.author.username} needs to learn how to use my commands!`
        }
      }
    }).catch(console.error);
  } else {
    var Say = args.slice(1).join(" ");
    var ch = message.mentions.channels.first();
    if(ch) {
    if(!ch.permissionsFor(client.user).has(0x00000800)) {
      return message.channel.send('I do not have the permission `SEND_MESSAGES` in the specified channel');
    }
}
    if (!ch) {
      Say = args.slice(0).join(" ");
      ch = message.channel;
    }
    ch.send(Say);
  };
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 3
};

exports.about = {
  name: 'say',
  description: 'Says what you tell it to',
  usage: 'say [channel] <message>'
};
