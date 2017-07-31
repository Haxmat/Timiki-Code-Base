exports.run = async function (client, message) {
  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
  let user = message.mentions.users.first();
  if(!user) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Unable to Rate",
        description: "You did not mention a user to rate!"
      }
    }).catch(console.error);
  }
    const num = Math.floor(Math.random() * 12) + 1;
    return message.channel.send(`👌 **${num}/${num === 9 ? 11 : 10}**`);
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['rateuser'],
  permlevel: 1
};

exports.about = {
  name: 'rate' ,
  description: 'Rates the mentioned user',
  usage: 'rate @user'
};
