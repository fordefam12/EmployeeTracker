
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
  console.table(results);
  userInput()
});
const userInput = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "what is the title of the project?",
    },

    {
      type: "input",
      name: "description",
      message: "what is the description of your project?",
    },
    
    {
      type: "input",
      name: "installation",
      message: "Describe the installation process if any:",
    },
    {
      type: "input",
      name: "usage",
      message: "what is this project used for ?",
    },
    {
      type: "list",
      name: "License",
      message: "what licenses were used for the project?",
      choices: [
        "Academic Free License v3.0",
        "Apache license 2.0",
        "Artistic license 2.0",
        "Boost Software License 1.0",
        "BSD 2-clause license",
        "BSD 3-clause license",
        "BSD 3-clause Clear license",
        "BSD Zero-Clause license",
        "Creative Commons license family",
        "Creative Commons Zero v1.0 Universal",
        "Creative Commons Attribution 4.0",
        "Creative Commons Attribution Share Alike 4.0",
        "Do What The F*ck You Want To Public License",
        "Educational Community License v2.0",
        "Eclipse Public License 1.0",
        "Eclipse Public License 2.0",
        "European Union Public License 1.1",
        "GNU Affero General Public License v3.0",
        "GNU General Public License family",
        "GNU General Public License v2.0",
        "GNU General Public License v3.0",
        "GNU Lesser General Public License family",
        "GNU Lesser General Public License v2.1",
        "GNU Lesser General Public License v3.0",
        "ISC",
        "LaTeX Project Public License v1.3c",
        "Microsoft Public License",
        "MIT",
        "Mozilla Public License 2.0",
        "Open Software License 3.0",
        "PostgreSQL License",
        "SIL Open Font License 1.1",
        "University of Illinois/NCSA Open Source License",
        "The Unlicense",
        "zLib License",
      ],
    },
    {
      type: "input",
      name: "Contributing",
      message: "who all contributed on this project?",
    },
    {
      type: "input",
      name: "test",
      message: "where any test included",
    },
    {
      type: "input",
      name: "questions",
      message: "what do i do if i have a issue?",
    },
    {
      type: "input",
      name: "email",
      message: "what is your email ?",
    },
    {
      type: "input",
      name: "username",
      message: "what is your github username?",
    },
  ]);
