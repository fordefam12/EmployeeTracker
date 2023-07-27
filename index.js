const inquirer = require("inquirer");
const { default: Choice } = require("inquirer/lib/objects/choice");


// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Poppop",
    database: "job_db",
  },
  console.log(`Connected to the job database.`)
);

const userInput = () =>
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "what would you like to do ?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "update an employee role",
          "Update an emploee Manager",
          "View an employee by departments",
          "delete an employee",
          "delete a role",
          "delete a department",
          "view department budgets",
        ],
      },
    ])
    .then((answers) => {
      if (answers.prompt === "View all departments") {
        showDepartments();
      }
      if (answers.prompt === "View all roles") {
        showRoles();
      }
      if (answers.prompt=== "View all employees") {
        showEmployees();
      }
      if (answers.prompt === "Add a department") {
        addDepartment();
      }
      if (answers.prompt === "Add a role") {
        addRole();
      }
      if (answers.prompt === "Add an employee") {
        addEmployee();
      }
      if (answers.prompt === "update an employee role") {
        updateRole();
      }
      if (answers.prompt=== "Update an emploee Manager") {
        updateManager();
      }
      if (answers.prompt === "View an employee by departments") {
        showEmployeeDepartments();
      }
      if (answers.prompt === "delete an employee") {
        deleteEmployee();
      }
      if (answers.prompt=== "delete a role") {
        deleteRole();
      }
      if (answers.prompt === "delete a department") {
        deleteDepartment();
      }
      if (answers.prompt === "view department budgets") {
        showBugets();
      }
      console.log(answers.prompt);
    });

showDepartments = () => {
  // Query database
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;
    console.log("viewing all departments:");
    console.table(results);
    userInput();
  });
}
showRoles = () => {
  // Query database
  db.query(`SELECT * FROM roles`, (err, results) => {
    if (err) throw err;
    console.log("viewing all roles:");
    console.table(results);
    userInput();
  });
}
userInput();
