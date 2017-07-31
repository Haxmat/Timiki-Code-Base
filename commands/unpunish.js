const Discord = require('discord.js');
const sql = require('sqlite');
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
        description: "You must mention a user to clear their name!"
      }
    }).catch(console.error);
  }
  if(reason.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must supply a reason for the clear!"
      }
    }).catch(console.error);
  }
  if(message.mentions.users.size > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention only 1 user to unpunish them"
      }
    }).catch(console.error);
  }

  user.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "Unpunished",
      description: `You have have been unpunished on **${message.guild.name}** for:\n${reason}`
    }
  }).then(m => {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Unpunished",
        description: `The user ${user.username}#${user.discriminator} has had their name cleared for:\n${reason}`
      }
    }).catch(console.error);
  }).catch(console.error);

  const embed = new Discord.RichEmbed()
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setTimestamp()
  .addField('Action:', 'unpunish')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Reason:', `${reason}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

  client.channels.get(modlog.id).send({ embed: embed });

    await sql.run('CREATE TABLE IF NOT EXISTS userinfo (guildId TEXT, userId TEXT, warnCount INTEGER, kickCount INTEGER)');
    const row = await sql.get(`SELECT * FROM userinfo WHERE guildId = ? AND userId = ?`, [message.guild.id, user.id]);
    if (!row) {
      sql.run('INSERT INTO userinfo (guildId, userId, warnCount, kickCount) VALUES (?, ?, ?, ?)', [message.guild.id, user.id, 0, 0]);
    } else {
      sql.run(`UPDATE userinfo SET warnCount = ? AND kickCount = ? WHERE guildId = ? AND userId = ?`, [0, 0, message.guild.id, user.id]);
    }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['clearname', 'clear'],
  permlevel: 3
};

exports.about = {
  name: 'unpunish',
  description: 'Clears all the punishments',
  usage: 'unpunish @user <reason>'
};
