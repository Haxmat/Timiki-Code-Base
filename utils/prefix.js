var prefixDB = {};

function logDB() {
console.log(prefixDB);
};

exports.dbconv = async function (sql) {

var rows = await sql.all('SELECT * FROM prefixes');

  for (i = 0; i < rows.length; i++) {

    prefixDB[ rows[i].guildId ] = rows[i].prefix;

  }

console.log("Guild Prefixes Loaded Into Cache");
logDB();
};

exports.prefixDB = prefixDB;
