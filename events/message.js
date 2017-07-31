const config = require('../config.json');
const opus = require('node-opus');
const Discord = require('discord.js');
const sql = require('sqlite');
const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;
var prefixes = require('../utils/prefix.js').prefixDB;
var afkmsg = require('../utils/afk.js').messages;
module.exports = async message => {
    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
    if (message.author.bot) return;
    let client = message.client;
    var prefix = "";
    if(message.channel.type == "dm") {
        prefix = config.prefix;
    } else {
        if(!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

        if (prefixes[ message.guild.id ]) {
            prefix = prefixes[ message.guild.id ];
        } else {
            prefix = config.prefix;
        }
    }

    if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
        let params = message.content.split(' ').slice(1);
        if(!params) return;
        if(params) {
            clbot.configure({botapi: config.clbotkey});
            clbot.write(params.join(' '), (response) => {
                message.channel.startTyping();
                setTimeout(() => {
                    message.channel.send(response.message).catch(console.error);
                    message.channel.stopTyping();
                }, Math.random() * (1 - 3) + 1 * 1000);
            });
        }
    }

    if(message.content.toLowerCase().startsWith(config.prefix + "prefix")) {
        if(message.channel.type == "dm") {
            return message.channel.send('To use commands in DM Use the Prefix `%`');
        }
        if(!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send('I Require the `EMBED_LINKS` permission!');
        message.channel.send('', {
            embed: {
                color: hexcols[~~(Math.random() * hexcols.length)],
                title: "Prefix",
                description: `The Current prefix for this server is ${prefix}\nType ${prefix}help for a list of commands`
            }
        }).catch(console.error);
    }

    let mentionedUsers = message.mentions.users.array();
    if (mentionedUsers.length > 0) {
        for (i = 0; i < mentionedUsers.length; i++) {
            if (afkmsg[mentionedUsers[i].id]) {
                message.channel.send({embed: {
                    author: {
                        name: mentionedUsers[i].username + " is currently away",
                        icon_url: mentionedUsers[i].avatarURL
                    },
                    description: afkmsg[mentionedUsers[i].id],
                    color: hexcols[~~(Math.random() * hexcols.length)]
                }});
            }
        }
    }

    if (!message.content.startsWith(prefix)) return;
    let command = message.content.toLowerCase().split(' ')[0].slice(prefix.length);
    let perms = client.elevation(message);
    let args = message.content.split(' ').slice(1);
    let cmd;

    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if(!cmd) return;
    if (cmd) {
        if (perms < cmd.settings.permlevel) {
            message.channel.send({
                embed: {
                    color: hexcols[~~(Math.random() * hexcols.length)],
                    title: "Error",
                    description: "You do not have the sufficient permissions!"
                }
            }).catch(console.error);
        } else {
            if(cmd.settings.guildOnly == true && message.channel.type == "dm") {
                return message.channel.send('This command is server only!');
            }
            if(message.channel.type != "dm" && !message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send('I Require the `EMBED_LINKS` permission!');
            cmd.run(client, message, args, perms);
        }
    }
};
