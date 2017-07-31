const Discord = require('discord.js');
const Cleverbot = require('cleverbot-node');
const config = require('../config.json');
const clbot = new Cleverbot;
exports.run = async function(client, message, args) {
    clbot.configure({botapi: config.clbotkey});
    clbot.write(args.slice(0), (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.message).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    });
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['chat', 'cb'],
  permlevel: 1
};

exports.about = {
  name: 'talk',
  description: 'Talks to Cleverbot',
  usage: 'talk <message>'
};
