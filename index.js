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
      
    });

showDepartments = () => {
  // Query database
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  db.query(`SELECT * FROM department`,(sql, (err, results) => {
    if (err) throw err;
    console.log("viewing all departments:");
    console.table(results);
    userInput();
  }));
}
showRoles = () => {
  const sql = `SELECT roles.id AS id, roles.title, department.name AS department FROM roles INNER JOIN department ON role.department_id = department.id`;
  // Query database
  db.query(`SELECT * FROM roles`,(sql, (err, results) => {
    if (err) throw err;
    console.log("viewing all roles:");
    console.table(results);
    userInput();
  }));
}
showEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name,employee.last_name,role.title, department.name AS department,role.salary,CONCAT(manager.first_name,"",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`; 
  // Query database
  db.query(`SELECT * FROM employee`,(sql, (err, results) => {
    if (err) throw err;
    console.log("viewing all employees:");
    console.table(results);
    userInput();
  }));
}
addDepartment = () => {
  inquirer.prompt([{
    type:'input',
    name:'addDept',
    message: "what department do you want to add ?",
    validate: (addDept) => {
      if (addDept){
        // console.log(addDept);
      return true;
    }else {
      console.log('please enter a department');
      return false;
    }
  }}])
  .then (answer =>{
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, answer.addDept, (err, result) => {
      console.log(answer.addDept);
      if (err) throw err;
      console.log('Added ' +  answer.addDept + " to departments!");
      showDepartments();
  })})};

updateRole = () => {
  // Query database
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({name: first_name +""+ last_name, value: id}));
    inquirer.prompt([{
      type: 'list',
      name:'name',
      message: "which employee would like to update ?",
      choices: employees
    }])
    .then (empChoice => {
      const employee = empChoice.name;
      const params = [];
      params.push(employee);
      db.query(`SELECT * FROM roles`, (err, data) => {
        if (err) throw err;
        const roles = data.map (({ id, title}) => ({ name:title, value:id }));
        inquirer.prompt([{
          type: 'list',
          name:'role',
          message:'what is the employee role ?',
          choices: roles

        }])
    })
    console.log("updating employee");
    console.table(data);
    userInput();
  })})};
  
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
