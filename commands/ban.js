const Discord = require('discord.js');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if(!message.guild.member(client.user).permissions.has('KICK_MEMBERS')) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I do not have the permission `BAN_MEMBERS` to do this"
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
        description: "You must mention a user to ban!"
      }
    }).catch(console.error);
  }
  if(reason.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must supply a reason for the ban!"
      }
    }).catch(console.error);
  }
  if(message.mentions.users.size > 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must mention a user to ban!"
      }
    }).catch(console.error);
  }

  if(!message.guild.member(user).bannable) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I cannot ban that member!"
      }
    }).catch(console.error);
  }
  message.guild.ban(user).then(m => {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Banned User",
        description: `The user ${user.username}#${user.discriminator} has been banned from the server for:\n${reason}`
      }
    }).catch(console.error);
  });



  const embed = new Discord.RichEmbed()
  .setColor(hexcols[~~(Math.random() * hexcols.length)])
  .setTimestamp()
  .addField('Action:', 'Ban')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Reason:', `${reason}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

  return client.channels.get(modlog.id).send({ embed: embed });
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 3
};

exports.about = {
  name: 'ban',
  description: 'Bans the mentioned user',
  usage: 'ban <Mention>'
};
