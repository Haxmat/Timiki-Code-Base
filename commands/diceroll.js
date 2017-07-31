exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  let roll = Math.floor(Math.random() * 6) + 1;
  if(args.slice(1).length > 0) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must define only 1 argument"
      }
    }).catch(console.error);
  }
  if(args.slice(0).length > 0) {
    let parsedInt = parseInt(args.slice(0));
    if(isNaN(parsedInt)) {
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "I cannot roll what is not a number"
        }
      }).catch(console.error);
    }
    roll = Math.floor(Math.random() * parsedInt) + 1;
  }
  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Roll Result",
      description: `\`\`\`${roll}\`\`\``
    }
  }).catch(console.error);
};

exports.settings = {
    enabled: true,
    guildOnly: false,
    aliases: ['roll'],
    permlevel: 1
};

exports.about = {
    name: 'diceroll',
    description: 'Rolls a die default is 6 sides',
    usage: 'roll [Number of sides]'
};
