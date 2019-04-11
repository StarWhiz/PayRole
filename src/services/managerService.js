const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const app = express();

// SQL Query
let sqlQuery = 
`SELECT first_name, last_name
FROM combined_emp_data NATURAL JOIN dept_manager
WHERE combined_emp_data.emp_no = dept_manager.emp_no;`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/managerData', function (req, res) {
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

  var managerList = [];

  con.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
      con.end();
    }

    for (var i = 0;i < rows.length; i++) {
        var managers = [];
        managers = {   
          name: rows[i].first_name+ " " + rows[i].last_name
        }
        managerList.push(managers)
    }
    res.send(managerList);
    con.end();
  });
});

https.createServer({
  key: fs.readFileSync('certs/privkey1.pem'),
  cert: fs.readFileSync('certs/fullchain1.pem')
}, app).listen(3003, () => {
  console.log('Listening... See content at https://engrdudes.tk:3003/managerData')
})