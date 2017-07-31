const Discord = require('discord.js');
const os = require('os');
const cmdcount = require('../app.js').cmdcount;
const package = require('../package.json');
exports.run = async function (client, message, args) {

  function uptime() {
    var date = new Date(client.uptime);
    var strDate = '';
    strDate += date.getUTCDate() - 1 + " days, ";
    strDate += date.getUTCHours() + " hours, ";
    strDate += date.getUTCMinutes() + " minutes, ";
    strDate += date.getUTCSeconds() + " seconds";
    return strDate;
  }

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
  let totalmem = os.totalmem();
  let totalrammb = (totalmem / 1024) / 1024;
  let usingmembytes = process.memoryUsage().heapTotal;
  let usingmemmb = (usingmembytes / 1024) / 1024;
  let ping = parseFloat(Math.round((client.ping * 100) / 100)).toFixed(0);
  var embed = new Discord.RichEmbed()
      .setAuthor('Bot Info and Stats')
      .setDescription('The Info and Stats of Timiki')
  embed.addField("Bot Status", ' :ok_hand: All Good! ', true)
  embed.addField("Bot Version", `${package.version}`, true)
  embed.addField("Guilds", `${client.guilds.size}`, true)
  embed.addField("Users Online", `${client.users.size}`, true)
  embed.addField("Total Users", `${client.guilds.reduce((a, b) => a + b.memberCount, 0)}`, true)
  embed.addField("Channels", `${client.channels.size}`, true)
  embed.addField("Ram Usage", `${parseFloat(Math.round(usingmemmb * 100) / 100).toFixed(2)}MB / ${parseFloat(Math.round(totalrammb * 100) / 100).toFixed(2)}MB`, true)
  embed.addField("Uptime", `${uptime()}`, true)
  embed.addField("Ping", `${ping}ms`, true)
  embed.addField("Site", `[Click Link]()`, true)
      .setColor(hexcols[~~(Math.random() * hexcols.length)]);

  return message.channel.send({embed: embed});
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['botinfo', 'stats', 'status'],
  permlevel: 1
};

exports.about = {
  name: 'info' ,
  description: 'Gives you some info about the Bot',
  usage: 'info'
};
