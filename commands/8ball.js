exports.run = async function (client, message, args) {

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

  const ball = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely',
    'You may rely on it', 'As I see it, yes', 'Most likely',
    'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again',
    'Ask again later', 'Better not tell you now', 'Cannot predict now',
    'Concentrate and ask again',
    'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'
  ];

  if(args.slice(0).length < 1) {
    message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: `You did not ask a Question!`,
        timestamp: new Date(),
        footer: {
          text: `${message.author.username} didn't ask a question :(`
        }
      }
    }).catch(console.error);
  } else {
  message.channel.send('', {
    embed: {
      color: hexcols[~~(Math.random() * hexcols.length)],
      title: "8Ball Result!",
      description: `\`\`\`
${ball[~~(Math.random() * ball.length)]}
\`\`\``,
      timestamp: new Date(),
      footer: {
        text: `${message.author.username} asked me a question!`
      }
    }
  }).catch(console.error);
}

};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['8'],
  permlevel: 1
};

exports.about = {
  name: '8ball',
  description: 'Gives you an answer to your question',
  usage: '8Ball <Question>'
};
