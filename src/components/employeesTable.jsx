import React, { Component } from "react";
import Table from "./common/table";

class EmployeesTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "department_name", label: "Department" },
    { path: "hiringDate", label: "Hiring Date" },
    {
      path: "salary",
      label: "Salary",
      content: employee => this.props.setPriceFormat(employee)
    }
  ];

  render() {
    const { employees, onSort, sortColumn, isManager } = this.props;

    if (!isManager) {
      this.columns = this.columns.slice(0, 3); //This is to render only the first three columns (without salary)
    }

    return (
      <Table
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default EmployeesTable;
