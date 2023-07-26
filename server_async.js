
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3001;




async function main() {
  try {
    const db = await mysql.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'Poppop',
        database: 'job_db'
      },
    );
    const [rows, fields]  = await db.query('SELECT * FROM department' );
    console.table(rows)  
  } catch (error) {
    console.log(error);
  }
}

main();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
