//Timiki Discord Bot by Harry aka haxmat
const opus = require('node-opus');
const yt = require('ytdl-core');
const sql = require('sqlite');
const Discord = require('discord.js');
const unirest = require('unirest');
const os = require('os');
const client = new Discord.Client({
  autoreconnect: true
});
var shards = new Discord.ShardClientUtil(client);
const config = require('./config.json');
const fs = require('fs');
const moment = require('moment');

require('./utils/eventLoader.js')(client);

client.login(config.token);

function updateStats() {
  unirest.post(`https://discordbots.org/api/bots/${config.client_id}/stats`)
    .headers({
      'Authorization': `${config.discordbotstoken}`
    })
    .send({
      "server_count": client.guilds.size
    }).end(function(res) {
      console.log(res.body);
    });
}



client.on('guildDelete', guild => {
  const row = sql.get(`SELECT * FROM prefixes WHERE guildId ='${guild.id}'`);
  if (!row) {
    updateStats();

    return;
  } else {
    sql.run('DELETE FROM prefixes WHERE guildId =?', guild.id);
    console.log('Guild Removed and Prefix Cleared :(');
    updateStats();
  }
});

client.on('guildCreate', guild => {
  updateStats();
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading ${files.length} commands`);
  files.forEach(fname => {
    let props = require(`./commands/${fname}`);
    log(`Loading Command; ${props.about.name}`);
    client.commands.set(props.about.name, props);
    props.settings.aliases.forEach(alias => {
      client.aliases.set(alias, props.about.name);
    });
  });
  exports.cmdcount = files.length;
});

client.reload = command => {
  //This reloads the given command by clearing it from cache
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.settings.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.about.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (message.channel.type == "dm") {
    let permlvl = 1;
    if (message.author.id === config.owner) permlvl = 4;
  } else {
    permlvl = 1;
    let controller_role = message.guild.roles.find(r => r.name.toUpperCase() === config.controller_role_name);
    if (controller_role && message.member.roles.has(controller_role.id)) {
      permlvl = 2;
    };
    let administrator_role = message.guild.roles.find(r => r.name.toUpperCase() === config.administrator_role_name);
    let ownerId = message.guild.ownerId;
    if (administrator_role && message.member.roles.has(administrator_role.id) || message.author.id == message.guild.ownerId) {
      permlvl = 3;
    };
    if (message.author.id === config.owner) {
      permlvl = 4;
    };
    return permlvl;
  }
};
