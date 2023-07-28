const inquirer = require("inquirer");
const { default: Choice } = require("inquirer/lib/objects/choice");

// Import and require mysql2
const mysql = require("mysql2");
const { validate } = require("uuid");

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
          "Update an employee Manager",
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
      if (answers.prompt === "View all employees") {
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
      if (answers.prompt === "Update an employee Manager") {
        updateManager();
      }
      if (answers.prompt === "View an employee by departments") {
        showEmployeeDepartments();
      }
      if (answers.prompt === "delete an employee") {
        deleteEmployee();
      }
      if (answers.prompt === "delete a role") {
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
  db.query(
    `SELECT * FROM department`,
    (sql,
    (err, results) => {
      if (err) throw err;
      console.log("viewing all departments:");
      console.table(results);
      userInput();
    })
  );
};
showRoles = () => {
  const sql = `SELECT roles.id AS id, roles.title, department.name AS department FROM roles INNER JOIN department ON role.department_id = department.id`;
  // Query database
  db.query(
    `SELECT * FROM roles`,
    (sql,
    (err, results) => {
      if (err) throw err;
      console.log("viewing all roles:");
      console.table(results);
      userInput();
    })
  );
};
showEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name,employee.last_name,role.title, department.name AS department,role.salary,CONCAT(manager.first_name,"",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  // Query database
  db.query(
    `SELECT * FROM employee`,
    (sql,
    (err, results) => {
      if (err) throw err;
      console.log("viewing all employees:");
      console.table(results);
      userInput();
    })
  );
};
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "what department do you want to add ?",
        validate: (addDept) => {
          if (addDept) {
            // console.log(addDept);
            return true;
          } else {
            console.log("please enter a department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        console.log(answer.addDept);
        if (err) throw err;
        console.log("Added " + answer.addDept + " to departments!");
        showDepartments();
      });
    });
};
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "what role do you want to add ?",
        validate: (addRole) => {
          if (addRole) {
            // console.log(addRole);
            return true;
          } else {
            console.log("please enter a role");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: " what is the salary for this role ?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("please enter a salry");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      // console.log("THIS IS ANSWER!!!!!!!!!!!!!!!!!!!!!",answer);
      db.query("SELECT name, ID from department", (err, data) => {
        // console.log(data);
        if (err) throw err;
        const dept = data.map(({ name, ID }) => ({ name: name, value: ID }));
        console.log("this is department", dept);
        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "what department is this role for in ?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            // console.log(deptChoice);
            let params = [answer.role, answer.salary];
            const dept = deptChoice.dept;
            params.push(dept);
            // console.log(params);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("added " + answer.role + " to roles!");
              showRoles();
            });
          });
      });
    });
};

updateRole = () => {
  // Query database
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    // console.log(employees);
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "which employee would like to update ?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);
        db.query(`SELECT * FROM roles`, (err, data) => {
          // console.log(data);
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "roles",
                message: "what is the employee role ?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.roles;
              console.log(role);
              params.push(role);
              // let employee = params[0];
              params[0] = role;
              params[1] = employee;
              // console.log("this is params!!!!!!!!!",params);
              const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("updating employee");
                showEmployees();
              });
            });
        });
      });
  });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "what is the employees first name ?",
        validate: (addFirst) => {
          if (addFirst) {
            // console.log(firstName);
            return true;
          } else {
            console.log("please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: " what is the last name of the employee",
        validate: (addLast) => {
          if (addLast) {
            return true;
          } else {
            console.log("please enter a last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];
      db.query(`SELECT roles.id,roles.title FROM roles`, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "what is the employees role ?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);
            db.query(`SELECT *FROM employee`, (err, data) => {
              if (err) throw err;
              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "who is the employees manager ?",
                    choices: managers,
                  },
                ])
                .then((managerChocie) => {
                  const manager = managerChocie.manager;
                  // console.log("this is manager", manager);
                  // console.log(managerChocie);
                  params.push(manager);
                  const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("employee has been added");
                    showEmployees();
                  });
                });
            });
          });
      });
    });
};
updateManager = () => {
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);
        db.query(`SELECT *FROM employee`, (err, data) => {
          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "who is the employees manager ?",
                choices: managers,
              },
            ])
            .then((managerChocie) => {
              const manager = managerChocie.manager;
              params.push(manager);
              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("employee has been updated");
                showEmployees();
              });
            });
        });
      });
  });
};
showEmployeeDepartments = () => {
  console.log("show employee by departments.../n");
  const sql = `SELECT employee.first_name,
    employee.last_name,
    department.name AS department FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    userInput();
  });
};
deleteDepartment = () => {
  const deptSql = `SELECT * FROM department`;
  db.query(deptSql, (err, data) => {
    if (err) throw err;
    const dept = data.map(({name, id }) => ({ name:name, value:id}));
    inquirer.prompt([{
      type:'list',
      name: 'dept',
      message:"what department do you want to delte ?",
      choices: dept
    }])
    .then(deptChoice => {
      const dept = deptChoice.dept;
      const sql = `DELETE FROM department WHERE id = ?`
      db.query(sql, dept, (err, result) => {
        if (err) throw err;
        console.log("successfully deleted");
        showDepartments();
      })
    })
  console.log('successfully deleted');
  })
};
deleteRole = () => {
  db.query(`SELECT *FROM roles`, (err, data) => {
    if (err) throw err;{
    const role = data.map(({title, id}) => ({name: title, value: id}));
    inquirer.prompt([{
      type:'list',
      name:'role',
      message: "what role do you want to delete ?",
      choices: role
    }])
    .then(roleChoice => {
      const role = roleChoice.role;
      const sql = `DELETE FROM roles WHERE id = ?`;
      db.query(sql, role, (err, result) => {
        if (err) throw err;
        console.log("successfully deleted");
        showRoles();

    })
    })
  }})
};
deleteEmployee = () => {
  db.query(`SELECT * FROM employee`, (err,data) =>{
    if (err)throw err;
    const employees = data.map (({ id, first_name, last_name})=> ({name:first_name + " "+ last_name, value: id}));
    inquirer.prompt([{
      type:'list',
      name: 'name',
      message: "which employee would you like to delete ?",
      choices: employees
    }])
    .then(empChoice => {
      const employee = empChoice.name;
      const sql = `DELETE FROM employee WHERE id = ?`;
      db.query(sql,employee, (err, result) => {
        if (err) throw err;
        console.log("successfully deleted");
        showEmployees();
      })
    })
  })
};
showBugets = () => {
  console.log('showing budget');
  const sql =` SELECT department_id AS id,
  department.name AS department, SUM(salary) AS budget FROM roles JOIN department ON roles.department_id = department.id GROUP BY  department_id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    userInput();
  })
};
showDepartments = () => {
  // Query database
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  db.query(
    `SELECT * FROM department`,
    (sql,
    (err, results) => {
      if (err) throw err;
      console.log("viewing all departments:");
      console.table(results);
      userInput();
    })
  );
};
userInput();
