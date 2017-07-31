const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('./db.sqlite');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

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
        description: "You must mention a user to warn!"
      }
    }).catch(console.error);
  }
  if(reason.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must supply a reason for the warn!"
      }
    }).catch(console.error);
  }
  if(message.mentions.users.size > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention only 1 user to warn!"
      }
    }).catch(console.error);
  }

  user.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Warned",
      description: `You have recieved a warning on **${message.guild.name}** for:\n${reason}`
    }
  }).then(m => {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Warned User",
        description: `The user ${user.username}#${user.discriminator} has recieved a warning for:\n${reason}`
      }
    }).catch(console.error);
  }).catch(console.error);

  const embed = new Discord.RichEmbed()
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setTimestamp()
  .addField('Action:', 'Warn')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Reason:', `${reason}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

  client.channels.get(modlog.id).send({ embed: embed });

    await sql.run('CREATE TABLE IF NOT EXISTS userinfo (guildId TEXT, userId TEXT, warnCount INTEGER, kickCount INTEGER)');
    const row = await sql.get(`SELECT * FROM userinfo WHERE guildId = ? AND userId = ?`, [message.guild.id, user.id]);
    if (!row) {
      sql.run('INSERT INTO userinfo (guildId, userId, warnCount, kickCount) VALUES (?, ?, ?, ?)', [message.guild.id, user.id, 1, 0]);
    } else {
      sql.run(`UPDATE userinfo SET warnCount = ? WHERE guildId = ? AND userId = ?`, [row.warnCount + 1, message.guild.id, user.id]);
    }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 2
};

exports.about = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user',
  usage: 'warn @user <reason>'
};
