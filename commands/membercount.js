exports.run = async function (client, message, args) {
  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "MemberCount",
      description: `The Total Member Count for ${message.guild.name} is: ${message.guild.memberCount}`
    }
  }).catch(console.error);
};

exports.settings = {
  enabled: true,
  guildOnly: true,
  aliases: ['mc'],
  permlevel: 1
};

exports.about = {
  name: 'membercount',
  description: 'Displays the current MemberCount for the server',
  usage: ['membercount']
};
