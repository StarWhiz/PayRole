const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const app = express();

// SQL Query
let sqlQuery = `SELECT * FROM departments;`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/deptData', function (req, res) {
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

  var deptList = [];

  con.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
      con.end();
    }

    for (var i = 0;i < rows.length; i++) {
        var department = [];
        department = {   
            _id: rows[i].dept_no, 
            name: rows[i].dept_name
        }
        deptList.push(department)
    }
    res.send(deptList);
    con.end();
  });
});

https.createServer({
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
}, app).listen(3002, () => {
  console.log('Listening... See content at https://138.68.9.254:3002/deptData')
})