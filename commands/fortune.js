const unirest = require('unirest');

exports.run = async function (client, message, args) {

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  unirest.get('http://yerkee.com/api/fortune/').headers("Accept", "application/json").end(res => {
    if (res.status == 200) {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "You fortune has been told!",
          description: res.body.fortune
        }
      }).catch(console.error);
    } else {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "You fortune has been told!",
          description: "I have no idea!"
        }
      }).catch(console.error);
    }
  });
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['prophecy', 'oracle'],
  permlevel: 1
};

exports.about = {
  name: 'fortune',
  description: 'Tells your fortune',
  usage: 'fortune'
};
