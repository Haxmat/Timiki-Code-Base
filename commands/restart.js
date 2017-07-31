const config = require('../config.json');
exports.run = async function (client, message, args) {
  message.channel.send('', {
    embed: {
      color: 0x28acc1,
      description: '**Restarting...**',
    }
  }).then(r => {
    process.exit();
  });
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['rstart'],
  permlevel: 4
};

exports.about = {
  name: 'restart',
  description: 'Restarts the Bot (If started using PM2)',
  usage: 'restart'
};
