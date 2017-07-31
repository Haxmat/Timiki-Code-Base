const config = require('../config.json');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
  if(!message.channel.permissionsFor(client.user).has(0x00002000)) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I do not have the permission `MANAGE_MESSAGES` to do this",
        timestamp: new Date()
      }
    }).catch(console.error);
  }
  let messagecount = parseInt(args.join(' '));
  if (args.length < 1) {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You have not defined the number of messages to delete",
        timestamp: new Date(),
        footer: {
          text: `${message.author.username} didnt define arguments!`
        }
      }
    }).catch(console.error);
  } else {
    if (args.slice(0).length > 2) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "You have defined too many arguments!",
          timestamp: new Date(),
          footer: {
            text: `${message.author.username} likes to define arguments!`
          }
        }
      }).catch(console.error);
    } else {
      message.channel.fetchMessages({
        limit: messagecount + 1
      }).then(messages => {
        if (messages.size < 2) return;
        message.channel.bulkDelete(messages);
      }).catch(console.error);
    };
  };
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['delete'],
  permlevel: 2
};

exports.about = {
  name: 'purge',
  description: 'Purges the current channel of the number of messages specified',
  usage: 'purge <number of messages to purge (1-99)>'
};
