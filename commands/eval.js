const Discord = require('discord.js');
const config = require('../config.json');
const sql = require('sqlite');
exports.run = async function(client, message, args) {

var shards = new Discord.ShardClientUtil(client);

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, +String.fromCharCode(8203));
    else
      return text;
  }

  try {
    var code = args.slice(0).join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    let result = clean(evaled);
    if (result.includes(client.token)) return message.channel.send(':eyes: Not for your Eyes :eyes: ');
    message.channel.sendCode("x1", clean(evaled));
  } catch (err) {
    message.channel.send(`\`Error:\` \`\`\n${clean(err)}\n\`\``);
  }
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 4
};

exports.about = {
  name: 'eval',
  description: 'Evaluates Javascript',
  usage: 'eval <Javascript Code>'
};
