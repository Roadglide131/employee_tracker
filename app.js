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
      if (res.choice === "add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Enter department's name",
            },
          ])
          .then((res) => {
            db.query(
              `INSERT INTO department (name) VALUES ("${res.name}")`,
              function (error, data) {
                console.table(data);
                menu();
              }
            );
          });
      }
      if (res.choice === "add a role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Enter role's title",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter role's salary",
            },
            {
              type: "input",
              name: "d_id",
              message: "Enter role's department",
            },
          ])
          .then((res) => {
            db.query(
              `INSERT INTO role (title, salary, department_id) VALUES ("${res.name}", ${res.salary}, ${res.d_id})`,
              function (error, data) {
                console.table(data);
                console.error(error);
                menu();
              }
            );
          });
      }
      if (res.choice === "add employee") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Enter employee's first name",
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter employee's last name",
            },
            {
              type: "input",
              name: "role",
              message: "Enter employee's role",
            },
            {
              type: "input",
              name: "manager",
              message: "Enter if employee is manager",
            },
          ])
          .then((res) => {
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("${res.first_name}", "${res.last_name}", ${res.role}, ${res.manager})`,
              function (error, data) {
                console.table(data);
                console.error(error);
                menu();
              }
            );
          });
      }
      if (res.choice === "update employee role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "employee_id",
              message: "Enter employee's id",
            },
            {
              type: "input",
              name: "role_id",
              message: "Enter employee's new role",
            },
          ])
          .then((res) => {
            db.query(
              `update employee set role_id=${res.role_id} where id=${res.employee_id} `,
              function (error, data) {
                console.table(data);
                console.error(error);
                menu();
              }
            );
          });
      }
    });
}
menu();
