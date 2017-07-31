const Discord = require('discord.js');
const config = require('../config.json');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  const embed = new Discord.RichEmbed()
  .setTitle("Donate to Timiki")
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setDescription(`To donate to Timiki and help cover the running costs. Please visit the link below`)
  .addField(`Donate Here`, `[Patreon](https://www.patreon.com/haxmatose)`);

  message.channel.send({embed: embed});
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['patreon'],
  permlevel: 1
};

exports.about = {
  name: 'donate',
  description: 'Lets you support Timiki\'s Development',
  usage: 'donate'
};
