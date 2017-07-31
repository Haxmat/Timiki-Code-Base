exports.run = async function (client, message, args) {
  message.channel.send(`pong`).then(m => {
    let latency = m.createdTimestamp - message.createdTimestamp;

    const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

    const pingmsg = [`Ouch! You kicked me in the crotch in ${latency}**ms**\n Damn that stings!`, `Geez, You punched me in the stomach in ${latency}**ms**\n That really hurt!`, `Wow! You drank that smoothie within ${latency}**ms**\n Want another one?`, `You wanna know my speed? It is ${latency}**ms**\n Whos the slow one now?`];

    let pingmessage = pingmsg[~~(Math.random() * pingmsg.length)];

    m.edit('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Latency",
        description: `${pingmessage}`,
        timestamp: new Date(),
        footer: {
          text: `${message.author.username} Wants to know how fast I am!`
        }
      }
    })
  });
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'ping',
  description: 'Displays the Latency of the Bot',
  usage: 'ping'
};
