import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";

class EmployeeForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      department_id: "",
      hiringDate: "",
      salary: ""
    },
    departments: [],
    errors: {},
    lastID: ""
  };

  schema = {
    employee_id: Joi.string(),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    department_id: Joi.string()
      .required()
      .label("Department"),
    hiringDate: Joi.string()
      .required()
      .label("Hiring Date"),
    salary: Joi.number()
      .required()
      .label("Salary")
  };

  componentDidMount() {
    fetch("https://engrdudes.tk:3002/deptData")
      .then(response => response.json())
      .then(deptData => {
        const departments = [...deptData];
        this.setState({ departments: departments });
        return Promise.resolve(deptData);
      });

    fetch("https://engrdudes.tk:3004/lastEmp")
      .then(response => response.json())
      .then(lastEmpIDObj => {
        const lastID = lastEmpIDObj[0].employee_id;
        this.setState({ lastID });
        return Promise.resolve(lastEmpIDObj);
      });
  }

  doSubmit = () => {
    var employee = { ...this.state.data, department_name: "" };

    //get department and id
    const deptName = _.find(this.state.departments, [
      "_id",
      employee.department_id
    ]).name;
    employee.department_name = deptName;
    employee.employee_id = (this.state.lastID + 1).toString();

    console.log(employee);

    const {
      employee_id,
      firstName,
      lastName,
      hiringDate,
      salary,
      department_id,
      department_name
    } = employee;

    console.log(
      "https://engrdudes.tk:3005/insertEmp/add?emp_no=" +
        employee_id +
        "&first_name=" +
        firstName +
        "&last_name=" +
        lastName +
        "&date=" +
        hiringDate +
        "&salary=" +
        salary +
        "&dept_no=" +
        department_id +
        "&dept_name=" +
        department_name
    );

    fetch(
      "https://engrdudes.tk:3005/insertEmp/add?emp_no=" +
        employee_id +
        "&first_name=" +
        firstName +
        "&last_name=" +
        lastName +
        "&date=" +
        hiringDate +
        "&salary=" +
        salary +
        "&dept_no=" +
        department_id +
        "&dept_name=" +
        department_name
    )
      .then(response => response.text())
      .then(response1 => {
        console.log(response1);
        this.props.history.push("/employees");
        return Promise.resolve(response1);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderSelect(
            "department_id",
            "Department",
            this.state.departments
          )}
          {this.renderInput("hiringDate", "Hiring Date (MM/DD/YYYY)")}
          {this.renderInput("salary", "Salary")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
