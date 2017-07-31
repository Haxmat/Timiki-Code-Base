const sql = require('sqlite');
exports.run = async function (client, message, args) {
    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

    const row = await sql.get(`SELECT * FROM prefixes WHERE guildId ='${message.guild.id}'`);

    if(!row) {
      console.log('Row Not Found');
      if(args.slice(0).length < 1) {
     return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: `You did not define a prefix!`,
          footer: {
            text: `${message.author.username} didn't define my new prefix!`
          }
        }
      }).catch(console.error);
  }

  if(args.slice(0).includes(`<@${client.user.id}>`)) {
    return message.channel.send('', {
       embed: {
         color: hexcols[~~(Math.random() * hexcols.length)],
         title: "Error",
         description: `You cannot set a mention as a prefix`
       }
     }).catch(console.error);
  }
    await sql.run('INSERT INTO prefixes (guildId, prefix) VALUES (?, ?)', [message.guild.id, args.slice(0).join(' ')]);
    console.log(`Prefix updated on ${message.guild.name} reloading prefix cache`);
    await require('../utils/prefix.js').dbconv(sql);
     return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Prefix Set",
        description: `Server Prefix Updated to ${args.slice(0).join(' ')}`,
        footer: {
          text: `${message.author.username} changed my prefix!`
        }
      }
    }).catch(console.error);
    } else {
      if(args.slice(0).length < 1) {
     return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: `You did not define a prefix!`,
          footer: {
            text: `${message.author.username} didn't define my new prefix!`
          }
        }
      }).catch(console.error);
  }
  if(args.slice(0).includes(`<@${client.user.id}>`)) {
    return message.channel.send('', {
       embed: {
         color: hexcols[~~(Math.random() * hexcols.length)],
         title: "Error",
         description: `You cannot set a mention as a prefix`
       }
     }).catch(console.error);
  }
     await sql.run(`UPDATE prefixes SET prefix = ? WHERE guildId = ?`, [args.slice(0).join(' '), message.guild.id]);
     console.log(`Prefix updated on ${message.guild.name} reloading prefix cache`);
     await require('../utils/prefix.js').dbconv(sql);
     return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Prefix Set",
        description: `Server Prefix Updated to ${args.slice(0).join(' ')}`,
        footer: {
          text: `${message.author.username} changed my prefix!`
        }
      }
    }).catch(console.error);
    }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['prefixset'],
  permlevel: 3
};

exports.about = {
  name: 'setprefix',
  description: 'sets the prefix for the guild',
  usage: 'setprefix <new prefix>'
};
