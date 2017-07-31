exports.run = async function (client, message, args) {
  let string = args.join(' ');
  if(!string) {
    return message.channel.send('http://lmgtfy.com/?iie=1&q=is+the+internet+working%3F');
  }
  let lmgtfylink = `http://lmgtfy.com/?iie=1&q=${encodeURIComponent(string).replace(/'+'/g, '%2B').replace(/%20/g, '+').replace(/=/g, '%3B')}`
  return message.channel.send(lmgtfylink);
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'lmgtfy',
  description: 'Gives you a LMGTFY Link',
  usage: 'lmgtfy <query>'
};
