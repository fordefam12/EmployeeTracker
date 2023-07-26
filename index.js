
const inquirer = require("inquirer");


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

// Query database
db.query("SELECT * FROM department", function (err, results) {
  if (err) {
    console.log(err);
    return;
  }
  // console.table(results);
  userInput()
});
const userInput = () =>
  inquirer.prompt([
    {
      type: "list",
      name: "options",
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
    }
  ])
    .then((answers)=> {
      const {choices} = answers
    
    
      if (choices === "View all departments"){
        showDepartments();
      }
      if (choices === "View all roles"){
        showRoles();
      }
      if (choices === "View all employees"){
        showEmployees();
      }
      if (choices === "Add a department"){
        addDepartment();
      }
      if (choices === "Add a role"){
        addRole();
      }
      if (choices === "Add an employee"){
        addEmployee();
      }
      if (choices === "update an employee role"){
        updateRole();
      }
      if (choices === "Update an emploee Manager"){
        updateManager();
      }
      if (choices === "View an employee by departments"){
        showEmployeeDepartments();
      }
      if (choices === "delete an employee"){
        deleteEmployee();
      }
      if (choices === "delete a role"){
        deleteRole();
      }
      if (choices === "delete a department"){
        deleteDepartment();
      }
      if (choices === "view department budgets"){
        showBugets();
      }
      
  });
  showDepartments = () => {
      console.log("showing all departemnts.../n");
      const sql = `SELECT department.id AS id, department  FROM department `;

      db.promise().queery(sql, (err,rows) => {
        if (err) throw err;
        console.table(rows);
        userInput();
      })
  }