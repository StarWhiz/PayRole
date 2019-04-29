const mysql = require("mysql");

const con = mysql.createConnection({
  host: "138.68.9.254",
  port: 3306,
  user: "engrdudes",
  password: "CMPE172project!",
  database: "employees"
});

export function insertEmployeeToSQL(
  emp_no,
  first_name,
  last_name,
  date,
  salary,
  dept_no,
  dept_name
) {
  // SQL Query
  let sqlQuery =
    "INSERT INTO combined_emp_data VALUES (" +
    emp_no +
    ", " +
    '"' +
    first_name +
    '"' +
    ", " +
    '"' +
    last_name +
    '"' +
    ", " +
    '"' +
    date +
    '"' +
    ", " +
    salary +
    ", " +
    '"' +
    dept_no +
    '"' +
    ", " +
    '"' +
    dept_name +
    '"' +
    ");";

  console.log(sqlQuery);
  con.query(sqlQuery, function(err, result) {
    if (err) {
      con.end();
      throw err;
    }
    // TODO: Something then..
    console.log("1 employee record inserted...");
    con.end();
  });
}

// Example Usage of Function
// insertEmployeeToSQL("999999", "Tai", "Dao", "04/11/2019", "120000", "d005", "Development");

// DELETE QUERY: delete from combined_emp_data where emp_no = 999999;
