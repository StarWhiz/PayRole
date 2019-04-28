const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express')

const app = express();

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/insertEmp/add', (req, res) => {
  const {emp_no, first_name, last_name, date, salary, dept_no, dept_name } = req.query;
  const INSERT_QUERY = `INSERT INTO combined_emp_data (emp_no, first_name, last_name, date, salary, dept_no, dept_name) VALUES(
'${emp_no}', '${first_name}', '${last_name}', '${date}', '${salary}', '${dept_no}', '${dept_name}')`
  con.query(INSERT_QUERY, (err, results)=> {
      if(err) {
        return res.send(err)
      }
      else {
        return res.send('succesfully added employee')
      }
  });
});


https.createServer({
  key: fs.readFileSync('certs/privkey1.pem'),
  cert: fs.readFileSync('certs/fullchain1.pem')
}, app).listen(3005, () => {
  console.log('Listening...See content at https://engrdudes.tk:3005/insertEmp/add?emp_no=999997&first_name=Tai&last_name=Dao&date=12/21/1990&salary=100000&dept_no=d005&dept_name=Development')
})