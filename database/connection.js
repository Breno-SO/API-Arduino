let knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: "3306",
    user: "bill",
    password: "passpass",
    database: "db_eventos",
  },
});

module.exports = knex;
