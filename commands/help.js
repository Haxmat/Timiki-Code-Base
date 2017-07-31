const config = require('../config.json');
const Discord = require('discord.js');
exports.run = async function(client, message, args) {
  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
  const sql = require('sqlite');
  if (message.channel.type == "dm") {
    var prefix = config.prefix;
  } else {
    const row = await sql.get(`SELECT * FROM prefixes WHERE guildId ='${message.guild.id}'`);
    prefix = !!row ? row.prefix : config.prefix;
  }



  function setFun(msg, author) {
    msg.edit(`For a Help menu without reactions use \`${prefix}help full\`\n\nType \`${prefix}help [command]\` for more info on a specific command\n\n| :information_source: Information | :game_die: **__Fun/Misc__** | :musical_note: Music | :tools: Mod/Admin |\n
:game_die: Fun/Misc\n
\`\`\`
coinflip  fortune   mcskin  slap  afk  lmgtfy
stab  rate  diceroll  8ball image  calc
\`\`\``).then(m => {
      m.awaitReactions((reaction, user) => user.id === author.id, {
        max: 1,
        time: 60000
      }).then(reactions => {
        if(reactions.first() == undefined) return;
        if (reactions.first().emoji.name == "🎲") {
          setFun(m, author);
        } else if (reactions.first().emoji.name == "ℹ") {
          setInfo(m, author);
        } else if (reactions.first().emoji.name == "🎵") {
          setMusic(m, author);
        } else if (reactions.first().emoji.name == "🛠") {
          setMod(m, author);
        }
      })
    });
  };

  function setInfo(msg, author) {
    msg.edit(`For a Help menu without reactions use \`${prefix}help full\`\n\nType \`${prefix}help [command]\` for more info on a specific command\n\n| :information_source: **__Information__** | :game_die: Fun/Misc | :musical_note: Music | :tools: Mod/Admin |\n
:information_source: Information\n
\`\`\`
help  stats   membercount   userinfo    weather
donate    invite    ping    uptime
\`\`\``).then(m => {
      m.awaitReactions((reaction, user) => user.id === author.id, {
        max: 1,
        time: 60000
      }).then(reactions => {
        if(reactions.first() == undefined) return;
        if (reactions.first().emoji.name == "🎲") {
          setFun(m, author);
        } else if (reactions.first().emoji.name == "ℹ") {
          setInfo(m, author);
        } else if (reactions.first().emoji.name == "🎵") {
          setMusic(m, author);
        } else if (reactions.first().emoji.name == "🛠") {
          setMod(m, author);
        }
      });
    });
  };

  function setMusic(msg, author) {
    msg.edit(`For a Help menu without reactions use \`${prefix}help full\`\n\nType \`${prefix}help [command]\` for more info on a specific command\n\n| :information_source: Information | :game_die: Fun/Misc | :musical_note: **__Music__** | :tools: Mod/Admin |\n
:musical_note: Music\n
\`\`\`
join  leave   add
play  queue   skip
\`\`\``).then(m => {
      m.awaitReactions((reaction, user) => user.id === author.id, {
        max: 1,
        time: 60000
      }).then(reactions => {
        if(reactions.first() == undefined) return;
        if (reactions.first().emoji.name == "🎲") {
          setFun(m, author);
        } else if (reactions.first().emoji.name == "ℹ") {
          setInfo(m, author);
        } else if (reactions.first().emoji.name == "🎵") {
          setMusic(m, author);
        } else if (reactions.first().emoji.name == "🛠") {
          setMod(m, author);
        }
      });
    });
  };

  function setMod(msg, author) {
    msg.edit(`For a Help menu without reactions use \`${prefix}help full\`\n\nType \`${prefix}help [command]\` for more info on a specific command\n\n| :information_source: Information | :game_die: Fun/Misc | :musical_note: Music | :tools: **__Mod/Admin__** |\n
:tools: Mod/Admin\n
\`\`\`
purge  kick   warn  say   ban
lockdown   unpunish   setprefix   queue clear
\`\`\``).then(m => {
      m.awaitReactions((reaction, user) => user.id === author.id, {
        max: 1,
        time: 60000
      }).then(reactions => {
        if(reactions.first() == undefined) return;
        if (reactions.first().emoji.name == "🎲") {
          setFun(m, author);
        } else if (reactions.first().emoji.name == "ℹ") {
          setInfo(m, message.author);
        } else if (reactions.first().emoji.name == "🎵") {
          setMusic(m, author);
        } else if (reactions.first().emoji.name == "🛠") {
          setMod(m, author);
        }
      });
    });
  };

  if (!args[0]) {

    message.channel.send(`For a Help menu without reactions use \`${prefix}help full\`\n\nType \`${prefix}help [command]\` for more info on a specific command\n\n| :information_source: **__Information__** | :game_die: Fun/Misc | :musical_note: Music | :tools: Mod/Admin |\n
:information_source: Information\n
\`\`\`
help  info   membercount   userinfo    weather
donate    invite    ping    uptime
\`\`\``).then(m => {
      m.react("\u2139");
      m.react("\uD83C\uDFB2");
      m.react("\uD83C\uDFB5");
      m.react("\uD83D\uDEE0");
      m.awaitReactions((reaction, user) => user.id === message.author.id, {
        max: 1,
        time: 60000
      }).then(reactions => {
        if(reactions.first() == undefined) return;
        if (reactions.first().emoji.name == "🎲") {
          setFun(m, message.author);
        } else if (reactions.first().emoji.name == "ℹ") {
          setInfo(m, message.author);
        } else if (reactions.first().emoji.name == "🎵") {
          setMusic(m, message.author);
        } else if (reactions.first().emoji.name == "🛠") {
          setMod(m, message.author);
        }
      });
    });

  } else {
    if(args == "full") {

    const info = new Discord.RichEmbed()
    .setTitle("Information")
    .setDescription("Commands to give you Information")
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`help [command]`, 'Sends help to your DM\'s')
    .addField(`stats`, 'Gives you some of Timiki\'s Stats')
    .addField(`membercount`, 'Shows the membercount for the current server')
    .addField(`userinfo <user>`, 'Shows you info about the mentioned user. Warns, Kicks, etc..')
    .addField(`weather <location>`, 'Shows you the weather forecast for the location specified')
    .addField(`donate`, 'Gives you a link to support Timiki\'s Development')
    .addField(`invite`, 'Gives you a link to invite Timiki to your server')
    .addField(`ping`, 'Gives you the latency of Timiki')
    .addField(`uptime`, 'Gives you the uptime of Timiki');
    message.author.send({embed: info});

    const util = new Discord.RichEmbed()
    .setTitle("Utility Commands")
    .setDescription("These commands help you do things")
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`image <query>`, 'Searches google for Images')
    .addField(`afk [afk message]`, 'Sets your status as AFK')
    .addField(`calc <calculation>`, 'Calculates Maths')
    .addField(`lmgtfy <question>`, 'Generates an lmgtfy link');
    message.author.send({embed: util});

    const mod = new Discord.RichEmbed()
    .setTitle("Moderation Commands")
    .setDescription("Commands to help with Moderation (Requires `Bot Controller` role)")
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`purge <1-99>`, 'Purges the channel of the given number of messages')
    .addField(`kick <user> <reason>`, 'Kicks the mentioned user (Needs `mod-log` channel)')
    .addField(`warn <user> <reason>`, 'Warns the mentioned user (Needs `mod-log` channel)');
    message.author.send('', {embed: mod});

    const admin = new Discord.RichEmbed()
    .setTitle("Admin Commands")
    .setDescription("Commands to help with Administration (Requires `Bot Admin` role)")
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`say [channel] <message>`, 'Makes Timiki speak in the specified channel')
    .addField(`ban <user> <reason>`, 'Bans the mentioned user (Needs `mod-log` channel)')
    .addField(`lockdown <time (h, m, s)>`, 'locks down the current channel for the given amount of time')
    .addField(`unpunish <user> <reason>`, 'Clears the user of all their warnings and kicks')
    .addField(`setprefix <New Prefix>`, 'Sets the Timiki\'s prefix for the server')
    .addField(`queue clear`, 'Clears the Music Queue');
    message.author.send({embed: admin});

    const music = new Discord.RichEmbed()
    .setTitle('Music Commands')
    .setDescription('Listen to your Favorite songs!')
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`join`, 'Joins your current voice channel')
    .addField(`leave`, 'Leaves the current voice channel')
    .addField(`add <yt link>`, 'Adds the song to the queue')
    .addField(`play`, 'Plays the songs in queue')
    .addField(`queue`, 'Displays the queue')
    .addField(`skip`, 'Skips the current song');
    message.author.send({embed: music});

    const fun = new Discord.RichEmbed()
    .setTitle("Fun Commands")
    .setDescription("These commands bring you joy!")
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
    .addField(`talk <message>`, 'Talk to cleverbot')
    .addField(`coinflip`, 'Flips a coin. Heads or Tails?')
    .addField(`fortune`, 'Tells you your fortune!')
    .addField(`mcskin <mc username>`, 'Gives you the MC Skin of the Given username')
    .addField('slap <user>', 'Slaps the mentioned user')
    .addField(`stab <user>`, 'Stabs the mentioned user')
    .addField(`rate <user>`, 'Rates the mentioned user')
    .addField(`diceroll [number of sides]`, 'Rolls a dice. Default is 6 Sides')
    .addField(`8ball <question>`, 'A Magic 8Ball');
    return message.author.send({embed: fun});
    }
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.about.name} = \n${command.about.description}\nusage :: ${command.about.usage}`, {
        code: 'asciidoc'
      });
    }
  }
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permlevel: 1
};

exports.about = {
  name: 'help',
  description: 'Displays all the available commands',
  usage: ['help [command]']
};
