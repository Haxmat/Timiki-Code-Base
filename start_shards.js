const Discord = require('discord.js');
const config = require('./config.json');
const Manager = new Discord.ShardingManager('./app.js', {
  token: config.token
});
Manager.spawn();
