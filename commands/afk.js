const sql = require('sqlite');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  await sql.run('CREATE TABLE IF NOT EXISTS afk (userId TEXT, message TEXT)');
  const row = await sql.get(`SELECT * FROM afk WHERE userId ='${message.author.id}'`);

  var afkMessage = args.join(' ');

  if(args.length < 1) {
    afkMessage = "I am currently afk.";
  }

  if(!row) {
    sql.run('INSERT INTO afk (userId, message) VALUES (?, ?)', [message.author.id, afkMessage]);
  } else {
    sql.run('DELETE FROM afk WHERE userId =?', message.author.id);
    require('../utils/afk.js').dbconv(sql);
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "You are no Longer AFK!",
        description: `I will no display the message **${row.message}** whenever someone mentions you in chat!`
      }
    }).catch(console.error);
  }

  require('../utils/afk.js').dbconv(sql);

  return message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "You are now AFK!",
      description: `I will display the message **${afkMessage}** whenever someone mentions you in chat!`
    }
  }).catch(console.error);
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'afk',
  description: 'Sets your afk message and status',
  usage: 'afk [message]'
};
