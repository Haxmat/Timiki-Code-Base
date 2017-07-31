const Discord = require('discord.js');
const sql = require('sqlite');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  let user = message.mentions.users.first();

  if(!user) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention a user to find out about them!"
      }
    }).catch(console.error);
  }
  if(message.mentions.users.size > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention only 1 user!"
      }
    }).catch(console.error);
  }

  await sql.run('CREATE TABLE IF NOT EXISTS userinfo (guildId TEXT, userId TEXT, warnCount INTEGER, kickCount INTEGER)');
  var row = await sql.get(`SELECT * FROM userinfo WHERE guildId = ? AND userId = ?`, [message.guild.id, user.id]);
  if (!row) {
    await sql.run('INSERT INTO userinfo (guildId, userId, warnCount, kickCount) VALUES (?, ?, ?, ?)', [message.guild.id, user.id, 0, 0]);
    row = await sql.get(`SELECT * FROM userinfo WHERE guildId = ? AND userId = ?`, [message.guild.id, user.id]);
  }

  const embed = new Discord.RichEmbed()
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setThumbnail(user.avatarURL)
  .setTimestamp()
  .addField('Name:', `${user.username}#${user.discriminator}`)
  .addField('Joined Discord at:', `${user.createdAt}`)
  .addField('Joined this Server at:', `${message.guild.member(user).joinedAt}`)
  .addField('Warns:', `${row.warnCount}`)
  .addField('Kicks:', `${row.kickCount}`);

  return message.channel.send({embed: embed});
};
exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['whois'],
  permlevel: 1
};

exports.about = {
  name: 'userinfo',
  description: 'Tells you some info about the user. Warns, Kicks, etc..',
  usage: 'userinfo @user'
};
