const config = require('../config.json');
const unirest = require('unirest');
const Discord = require('discord.js');
const sql = require('sqlite');
module.exports = async client => { // When the client is ready it will log to the console and execute other functions
    sql.open('./db.sqlite');

    sql.run('CREATE TABLE IF NOT EXISTS prefixes (guildId TEXT, prefix TEXT)'); // Creates a table called prefixes in the SQLite Database
    await sql.run('CREATE TABLE IF NOT EXISTS afk (userId TEXT, message TEXT)');

    require('../utils/prefix.js').dbconv(sql); // Calls the Function to Cache all the prefixes from that database
    require('../utils/afk.js').dbconv(sql); // Calls the Function to Cache all the afk messages from that database into an Object for higher performance

    function updateStats() { // A Function to update the stats of the Bot on https://discordbots.org/
        unirest.post(`https://discordbots.org/api/bots/${config.client_id}/stats`)
            .headers({
                'Authorization': `${config.discordbotstoken}`
            })
            .send({
                "server_count": client.guilds.size
            }).end(function(res) {
            console.log(res.body);
        });
    }

    updateStats(); // Calls the updateStats function

    var shards = new Discord.ShardClientUtil(client); // Enables the ShardClientUtil under the name of shards
    console.log(`Online, Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);

    setInterval(function() { // Sets the interval to change the playing status every 30000 miliseconds or 30seconds
        changePlaying(); // The Function to call every 30 seconds
    }, 30000);

    function changePlaying() { // The function to change the playing status randomly
        switch (Math.floor(Math.random() * 9)) { // Random number generator
            case 0:
                client.user.setGame(`on ${client.guilds.size} guilds | ${config.prefix}prefix`);
            case 1:
                client.user.setGame(`with ${client.users.size} users! | ${config.prefix}prefix`);
            case 2:
                client.user.setGame(`( ͡° ͜ʖ ͡°) | ${config.prefix}prefix`);
            case 3:
                client.user.setGame(`ಠ_ಠ | ${config.prefix}prefix`);
            case 4:
                client.user.setGame(`(ᵔᴥᵔ) | ${config.prefix}prefix`);
                break;
            case 5:
                client.user.setGame(`with Friends | ${config.prefix}prefix`);
                break;
            case 6:
                client.user.setGame(`cookies! | ${config.prefix}prefix`);
                break;
            case 7:
                client.user.setGame(`hide and seek | ${config.prefix}prefix`);
                break;
            case 8:
                client.user.setGame(`with code | ${config.prefix}prefix`);
        }
    };
};
