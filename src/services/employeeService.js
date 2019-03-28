const mysql = require('mysql');

const con = mysql.createConnection({
  host: "138.68.9.254",
  port: 3306,
  user: "engrdudes",
  password: "CMPE172project!",
  database: "employees"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

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


var employeesList = [];
con.query(sqlQuery, function(err, rows, fields) {
    if (err) throw err;

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
    console.log(employeesList);
});