var queue = require('../utils/queue.js').queue;
const config = require('../config.json');
const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
exports.run = async function (client, message, args) {
  let administrator_role = message.guild.roles.find(r => r.name.toUpperCase() === config.administrator_role_name);
  if(queue[message.guild.id] === undefined || queue[message.guild.id].songs === undefined || queue[message.guild.id].songs.length < 1) return message.channel.send('The Queue is Empty');
  if(args == "clear") { // If the message arguments are equal to clear
    if (administrator_role && message.member.roles.has(administrator_role.id) || message.author.id === config.owner) { // If the author is the owner of the server or has the administrator_role
    require('../utils/queue.js').clearQueue(message); // Runs the function clearQueue from the /utils/queue.js file
    return message.channel.send('', { // Returns a message stating the queue has been cleared
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Queue Cleared",
        description: "The Queue has been cleared"
      }
    }).catch(console.error);
  } else {
    return message.channel.send('', { // Returns a message stating the user has invalid permissions
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "You have insufficient Permissionss!"
      }
    }).catch(console.error);
  }
  }
  return message.channel.send(queue[message.guild.id].songs.map(s => `${s.title}`), {code: true}).catch(console.error); // Sends the Queue to the current channel. Top to Bottom
};

exports.settings = { // Settings for the command
  enabled: true, // Whether or not the command is enabled
  guildOnly: true, // Whether or not this command works in a PM
  aliases: [], // The aliases for the command
  permlevel: 1 // The Minimum perm level required to use the command
};

exports.about = {
  name: 'queue', // The name of the command
  description: 'Shows the queue', // The description of the command
  usage: ['queue'] // The usage of the command
};
