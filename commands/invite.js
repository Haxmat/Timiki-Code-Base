const Discord = require('discord.js');
const config = require('../config.json');
exports.run = async function (client, message, args) {

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  const embed = new Discord.RichEmbed()
  .setTitle("Add Timiki to your server")
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setDescription(`To Add ${client.user.username} to your server use the link below`)
  .addField(`Add to your Server`, `[Invite Link](${config.invitelink})`);

  message.channel.send({embed: embed});
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'invite',
  description: 'Gives you a link to add Timiki to your server',
  usage: 'invite'
};
