const mysql = require('mysql');
const express = require('express')

const app = express();

// SQL Query
let sqlQuery = `
SELECT emp_no,
       first_name,
       last_name,
	   DATE_FORMAT(hire_date,'%m/%d/%Y') AS date,
       salary,
       dept_no,
       dept_name      
FROM   employees
       NATURAL JOIN emp_info_by_dept NATURAL JOIN latestSalaryPerEmp;`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/empData', function (req, res) {
  const con = mysql.createConnection({
    host: "138.68.9.254",
    port: 3306,
    user: "engrdudes",
    password: "CMPE172project!",
    database: "employees"
  });
  
  var employeesList = [];
  
  // Initialize MySQL Connection
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });

  con.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
      con.end();
    }

    for (var i = 0;i < rows.length; i++) {
        var employee = [];
        employee = {   
            employee_id: rows[i].emp_no, 
            name: rows[i].first_name+ " " + rows[i].last_name,
            department_id: rows[i].dept_no,
            department_name: rows[i].dept_name,
            hiringDate: rows[i].date,
            salary: rows[i].salary
        }
        employeesList.push(employee)
    }
    res.send(employeesList);
    con.end();
  });
});

app.listen(3001, () => {
  console.log('Go to http://localhost:3001/empData to see posts');
});