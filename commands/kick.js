const Discord = require('discord.js');
const sql = require('sqlite');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if(!message.guild.member(client.user).permissions.has('KICK_MEMBERS')) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I do not have the permission `KICK_MEMBERS` to do this"
      }
    }).catch(console.error);
  }

  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'mod-log');
  if(!modlog) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I cannot find a `mod-log` channel!"
      }
    }).catch(console.error);
  }
  if(!user) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention a user to kick!"
      }
    }).catch(console.error);
  }
  if(reason.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must supply a reason for the kick!"
      }
    }).catch(console.error);
  }
  if(message.mentions.users.size > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention only 1 user to kick!"
      }
    }).catch(console.error);
  }

  if(!message.guild.member(user).kickable) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I cannot kick that member!"
      }
    }).catch(console.error);
  }
  message.guild.member(user).kick().then(m => {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Kicked User",
        description: `The user ${user.username}#${user.discriminator} has been removed from the server for:\n${reason}`
      }
    }).catch(console.error);
  });



  const embed = new Discord.RichEmbed()
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setTimestamp()
  .addField('Action:', 'Kick')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Reason:', `${reason}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

  return client.channels.get(modlog.id).send({embed: embed });

  await sql.run('CREATE TABLE IF NOT EXISTS userinfo (guildId TEXT, userId TEXT, warnCount INTEGER, kickCount INTEGER)');
  const row = await sql.get(`SELECT * FROM userinfo WHERE guildId = ? AND userId = ?`, [message.guild.id, user.id]);
  if (!row) {
    sql.run('INSERT INTO userinfo (guildId, userId, warnCount, kickCount) VALUES (?, ?, ?, ?)', [message.guild.id, user.id, 0, 1]);
  } else {
    sql.run(`UPDATE userinfo SET kickCount = ? WHERE guildId = ? AND userId = ?`, [row.kickCount + 1, message.guild.id, user.id]);
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 2
};

exports.about = {
  name: 'kick',
  description: 'Kicks the mentioned user',
  usage: 'kick <Mention>'
};
