const request = require('request');
const Discord = require('discord.js');
const config = require('../config.json');
const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419];
exports.run = async function (client, message, args) {
  if(args.length < 1) {
    return message.channel.send('', {
      embed: {
        color: hexcols[~~(Math.random() * hexcols.length)],
        title: "Error",
        description: "No location defined"
      }
    }).catch(console.error);
  }

  const googleReq = request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${args}&key=${config.gapikey}`,
  }, (err, results, body) => {
    var res = JSON.parse(body)
    if(res.status == 'REQUEST_DENIED') {
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "The Google API Request was Denied"
        }
      }).catch(console.error);
    }
    if(!res.results[0]) {
      return message.channel.send('', {
        embed: {
          color: hexcols[~~(Math.random() * hexcols.length)],
          title: "Error",
          description: "The Location is Invalid"
        }
      }).catch(console.error);
    }
    var geocode = [res.results[0].geometry.location.lat, res.results[0].geometry.location.lng].join(',');
    var fullname = res.results[0].formatted_address;

    const WeatherReq = request({
      url: `https://api.darksky.net/forecast/10c3f3a88d5ee25115775661d8d824c4/${geocode}?units=ca`,
    }, (err, response, body) => {
        var res = JSON.parse(body)
        var data = res;
        var condition = data.currently.summary;
        var chanceofrain = Math.round((data.currently.precipProbability * 100) / 5) * 5;
        var temperature = Math.round(data.currently.temperature * 10) / 10;
        var humidity = Math.round(data.currently.humidity * 100);
        var windspeed = data.currently.windSpeed;

        const finalEmbed = new Discord.RichEmbed()
        .setTitle(`Weather conditions in ${fullname}`)
        .setColor(hexcols[~~(Math.random() * hexcols.length)])
        .addField("Conditions", `${condition}`)
        .addField("Temperature", `${temperature}°C`)
        .addField("Humidity", `${humidity}%`)
        .addField("Chance of Rain", `${chanceofrain}%`)
        .addField("Windspeed", `${windspeed}Km/H`);

        return message.channel.send({embed: finalEmbed});
    });
});
};

exports.settings = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 1
};

exports.about = {
  name: 'weather',
  description: 'Gives you the weather forecast',
  usage: 'weather <location>'
};
