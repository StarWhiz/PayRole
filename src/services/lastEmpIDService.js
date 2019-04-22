const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express')

const app = express();

// SQL Query
let sqlQuery = `SELECT emp_no 
FROM combined_emp_data
ORDER BY emp_no DESC
LIMIT 1;`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/lastEmp', function (req, res) {
  const con = mysql.createConnection({
    host: "138.68.9.254",
    port: 3306,
    user: "engrdudes",
    password: "CMPE172project!",
    database: "employees"
  });

  // Initialize MySQL Connection
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });

  var employeesList = [];

  con.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }

    for (var i = 0;i < rows.length; i++) {
      var employee = [];
      employee = {   
          employee_id: rows[i].emp_no, 
      }
      employeesList.push(employee)
    }
    res.send(employeesList);
    con.end();
  });
});

https.createServer({
  key: fs.readFileSync('certs/privkey1.pem'),
  cert: fs.readFileSync('certs/fullchain1.pem')
}, app).listen(3004, () => {
  console.log('Listening...See content at https://engrdudes.tk:3004/lastEmp')
})