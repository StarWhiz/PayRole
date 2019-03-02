import React, { Component } from "react";
import EmployeesTable from "./employeesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getEmployees } from "../services/fakeEmployeeService";
import { getDepartments } from "../services/fakeDepartmentService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Employees extends Component {
  state = {
    employees: [],
    departments: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const departments = [
      { _id: "", name: "All Departments" },
      ...getDepartments()
    ];

    this.setState({ employees: getEmployees(), departments });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDepartmentSelect = department => {
    this.setState({ selectedDepartment: department, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePriceFormat = employee => {
    const priceFormat = employee.salary.toFixed(2);
    return <span>${priceFormat}</span>;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedDepartment,
      employees: allEmployees
    } = this.state;

    const filtered =
      selectedDepartment && selectedDepartment._id
        ? allEmployees.filter(m => m.department_id === selectedDepartment._id)
        : allEmployees;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const employees = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: employees };
  };

  render() {
    const { length: count } = this.state.employees;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no employees in the database.</p>;

    const { totalCount, data: employees } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.departments}
            selectedItem={this.state.selectedDepartment}
            onItemSelect={this.handleDepartmentSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} employees in the database.</p>
          <EmployeesTable
            employees={employees}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            setPriceFormat={this.handlePriceFormat}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Employees;
