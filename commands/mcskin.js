const unirest = require('unirest');
exports.run = async function(client, message, args) {
  let mcname = args.slice(0);

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if (args.length > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "Only 1 username please!"
      }
    }).catch(console.error);
  }

  if (args.slice(0).length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must give a username!"
      }
    }).catch(console.error);
  }

    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: `Minecraft Skin for ${mcname}:`,
        image: {
          url: `https://visage.surgeplay.com/full/404/${mcname}.png`
        }
      }
    }).catch(console.error);
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'mcskin',
  description: 'Finds the Skin for the specified username',
  usage: 'mcskin <username>'
};
