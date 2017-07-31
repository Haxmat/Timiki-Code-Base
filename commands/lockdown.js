const ms = require('ms');
exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  if (!client.lockit) client.lockit = [];
  let time = args.slice(0).join(' ');
  let validUnlocks = ['release', 'unlock'];
  if(!message.guild.member(client.user).permissions.has('MANAGE_CHANNELS')) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "I do not have the permission `MANAGE_CHANNELS` to do this"
      }
    }).catch(console.error);
  }
  if (!time) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You must set a lockdown duration in hours, minutes, or seconds (h, m, s)"
      }
    }).catch(console.error);
  }

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Lockdown Lifted",
          description: "The Channel Lockdown has been Lifted"
        }
      }).catch(console.error);
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(console.error);
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Channel Locked Down",
          description: `The Channel has been Locked Down for ${ms(ms(time), { long: true })}`
        }
      }).then(() => {
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send('', {
            embed: {
              color: hexcols[~~(Math.random() * hexcols.length)],
              title: "Lockdown Lifted",
              description: "The Channel lockdown has been lifted"
            }
          })).catch(console.error);
        }, ms(time));
      }).catch(console.error);
    }).catch(console.error);
  }
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['ld'],
  permlevel: 3
};

exports.about = {
  name: 'lockdown',
  description: 'Locks down a channel for the specified time in hours, minutes or seconds (h, m, s) Useful to protect against server raiding.',
  usage: 'lockdown <duration (h, m, s)>'
};
