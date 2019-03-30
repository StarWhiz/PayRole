import React, { Component } from "react";
import EmployeesTable from "./employeesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getEmployees } from "../services/fakeEmployeeService";
import { getDepartments } from "../services/fakeDepartmentService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Employees extends Component {
  state = {
    employees: [],
    departments: [],
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "title", order: "asc" },
    selectedDepartment: null,
    searchQuery: "",
    pageRange: 5
  };

  componentDidMount() {
    const departments = [
      { _id: "", name: "All Departments" },
      ...getDepartments()
    ];

    // this.setState({ employees: getEmployees(), departments });
    fetch('http://localhost:3002/deptData')
    .then(response => response.json())
    .then(deptData => { const departments = [
                        { _id: "", name: "All Departments" },
                          ...deptData
                        ];
                        this.setState({ departments: departments })
                       return(deptData)})

    fetch('http://localhost:3001/empData')
    .then(response => response.json())
    .then(empData => {this.setState({ employees: empData });; 
                      return(empData)})


  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDepartmentSelect = department => {
    this.setState({
      selectedDepartment: department,
      currentPage: 1,
      searchQuery: ""
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePriceFormat = employee => {
    const priceFormat = employee.salary.toFixed(2);
    return <span>${priceFormat}</span>;
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedDepartment,
      employees: allEmployees,
      searchQuery
    } = this.state;

    let filtered = allEmployees;
    if (searchQuery)
      filtered = allEmployees.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedDepartment && selectedDepartment._id)
      filtered = allEmployees.filter(
        m => m.department_id === selectedDepartment._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const employees = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: employees };
  };

  render() {
    const { length: count } = this.state.employees;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      pageRange
    } = this.state;

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
          <button
            className="btn btn-primary"
            onClick={this.props.onLogout}
            style={{ marginBottom: 20 }}
            type="button"
          >
            Logout
          </button>
          <p>Showing {totalCount} employees in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
            pageRange={pageRange}
          />
        </div>
      </div>
    );
  }
}

export default Employees;
