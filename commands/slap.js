const Discord = require('discord.js');
exports.run = async function (client, message, args) {
  const slaps = ['http://i1280.photobucket.com/albums/a489/Lilyfied/Anime%20Gif/slapgif_zps5164a18e.gif', 'http://rs1031.pbsrc.com/albums/y377/shinnidan/Toradora_-_Taiga_Slap.gif', 'https://media.tenor.co/images/85722c3e51d390e11a0493696f32fb69/tenor.gif', 'http://img.photobucket.com/albums/v639/aoie_emesai/100handslap.gif', 'https://i.giphy.com/jLeyZWgtwgr2U.gif', 'http://38.media.tumblr.com/tumblr_m8y3b9QtpG1rdy4o1o1_400.gif'];

const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

let user = message.mentions.users.first();

var embed = new Discord.RichEmbed()
  .setTitle("Slapped!")
  .setDescription(`${user} got slapped by ${message.member.user}`)
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setImage(slaps[~~(Math.random() * slaps.length)])
  .setFooter('That must have hurt!');

if (!user) {
  embed = new Discord.RichEmbed()
    .setTitle("Slapped!")
    .setDescription(`${message.member.user} slapped themselves!`)
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .setImage(slaps[~~(Math.random() * slaps.length)])
    .setFooter('That must have hurt!');
}

if (message.mentions.users.size > 1) {
  embed = new Discord.RichEmbed()
    .setTitle("Slapped!")
    .setDescription(`${message.member.user} slapped themselves!`)
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .setImage(slaps[~~(Math.random() * slaps.length)])
    .setFooter('That must have hurt!');
}

return message.channel.send({embed: embed});
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'slap',
  description: 'Slaps the mentioned user',
  usage: 'slap @user'
};
