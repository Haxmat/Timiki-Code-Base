const gis = require('g-i-s');
exports.run = async function (client, message, args) {

	const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];

	if (args.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: `Error: Could Not Complete Search`,
        description: `An Error Occured:\n\`\`\`Cannot Search for Undefined. Please Define an image to search for\`\`\``
      }
    }).catch(console.error);
  }

  gis(args.join(' '), logResults);

  function logResults(error, results) {
    if(error) {
      console.log(error);
      message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: `Error: Could Not Complete Search`,
          description: `An Error Occured:\n\`\`\`${error}\`\`\`\n Please contact haxmat#2439`
        }
      }).catch(console.error);
    } else {
      message.channel.send(results[~~(Math.random() * results.length)].url);
    }
  }
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: ['googleimages', 'picture', 'imagesearch', 'images'],
  permlevel: 1
};

exports.about = {
  name: 'image',
  description: 'Gives you an image',
  usage: 'image <image to search for>'
};
