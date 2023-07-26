const PORT = process.env.PORT || 3001;

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
});
