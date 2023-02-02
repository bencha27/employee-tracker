const mysql = require("mysql2");

const database = "employee_db";
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: database
  },
  console.log(`Connected to the ${database} database`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;