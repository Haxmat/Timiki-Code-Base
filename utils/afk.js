var messages = {};

function logDB() {
    console.log(messages);
};

exports.dbconv = async function (sql) {

    var rows = await sql.all('SELECT * FROM afk');

    for (i = 0; i < rows.length; i++) {

        messages[ rows[i].userId ] = rows[i].message;

    }

    console.log("AFK Messages Loaded Into Cache");
    logDB();
};

exports.messages = messages;
