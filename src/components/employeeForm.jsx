import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";
import { insertEmployeeToSQL } from "./../services/insertEmployeeService";

class EmployeeForm extends Form {
  state = {
    data: {
      name: "",
      department_id: "",
      hiringDate: "",
      salary: ""
    },
    departments: [],
    errors: {}
  };

  schema = {
    employee_id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
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
  }

  doSubmit = () => {
    var employee = { ...this.state.data, department_name: "" };
    const deptName = _.find(this.state.departments, [
      "_id",
      employee.department_id
    ]).name;
    employee.employee_id = Date.now().toString();
    employee.department_name = deptName;
    console.log(employee);

    this.props.history.push("/employees");
  };

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
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
