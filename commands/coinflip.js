exports.run = async function (client, message, args) {

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

function coin() {
  return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Coinflip Result",
      description: `\`\`\`${coin()}\`\`\``,
      timestamp: new Date,
      footer: {
        text: `${message.author.username} flipped the coin!`
      }
    }
  }).catch(console.error);
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['coin', 'flip'],
  permlevel: 1
};

exports.about = {
  name: 'coinflip',
  description: 'Flips a coin, Heads or Tails?',
  usage: 'coinflip'
};
