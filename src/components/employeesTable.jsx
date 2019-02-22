import React, { Component } from "react";
import Table from "./common/table";

class EmployeesTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "department.name", label: "Department" },
    { path: "hiringDate", label: "Hiring Date" },
    { path: "salary", label: "Salary" }
  ];

  render() {
    const { employees, onSort, sortColumn } = this.props;

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
