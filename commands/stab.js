const Discord = require('discord.js');
exports.run = async function(client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  let user = message.mentions.users.first();

  var embed = new Discord.RichEmbed()
    .setTitle("Stabbed!")
    .setDescription(`${user} got stabbed by ${message.member.user}`)
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .setThumbnail('http://i.imgur.com/DsddJMf.png')
    .setFooter('That must have hurt!');

  if (!user) {
    embed = new Discord.RichEmbed()
      .setTitle("Stabbed!")
      .setDescription(`${message.member.user} stabbed themselves`)
      .setColor(hexcols[~~(Math.random() * hexcols.length)])
      .setThumbnail('http://i.imgur.com/DsddJMf.png')
      .setFooter('That must have hurt!');
  }
  if (message.mentions.users.size > 1) {
    embed = new Discord.RichEmbed()
      .setTitle("Stabbed!")
      .setDescription(`${message.member.user} stabbed themselves`)
      .setColor(hexcols[~~(Math.random() * hexcols.length)])
      .setThumbnail('http://i.imgur.com/DsddJMf.png')
      .setFooter('That must have hurt!');
  }
if (user === message.member.user) {
  embed = new Discord.RichEmbed()
    .setTitle("Stabbed!")
    .setDescription(`${message.member.user} stabbed themselves`)
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .setThumbnail('http://i.imgur.com/DsddJMf.png')
    .setFooter('That must have hurt!');
}

 return message.channel.send({embed: embed});
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['shank'],
  permlevel: 1
};

exports.about = {
  name: 'stab',
  description: 'Stabs the mentioned user',
  usage: 'stab @user'
};
