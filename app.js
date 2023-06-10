const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "pass123",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "view departments",
          "view roles",
          "view employees",
          "add a department",
          "add a role",
          "add employee",
          "update employee role",
        ],
      },
    ])
    .then(function (res) {
      if (res.choice === "view departments") {
        db.query("select * from department", function (error, data) {
          console.table(data);
          menu();
        });
      }
      if (res.choice === "view roles") {
        db.query("select * from role", function (error, data) {
          console.table(data);
          menu();
        });
      }
      if (res.choice === "view employees") {
        db.query("select * from employee", function (error, data) {
          console.table(data);
          menu();
        });
      }
    });
}
menu();
