import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class pagination extends Component {
  state = { pageNumber: "" };

  handleChange = e => {
    this.setState({ pageNumber: e.target.value });
  };

  //function that disables and enables iterating buttons
  iteration = (iterate, direction, current, totalPages) => {
    if(direction === 'backwards' && (current > iterate)){
      return(
        <li className={current === 1 ? "page-item disabled" : ""}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() =>
              this.props.onPageChange(current <= iterate ? 1 : current - iterate)
            }
          >
            <span aria-hidden="true">&laquo;{iterate}</span>
          </a>
        </li>
      )
    } else if(direction === 'forwards' && (current + iterate <= totalPages)){
        return(
          <li className={current === totalPages ? "page-item disabled" : ""}>
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                this.props.onPageChange(
                  current + iterate >= totalPages
                    ? totalPages
                    : current + iterate
                )
              }
            >
              <span aria-hidden="true">{iterate}&raquo;</span>
            </a>
          </li>
        );
    } else return;
  }

  validate = (pageNumber, pagesCount) => {
    const pageN = parseInt(pageNumber, 10);
    if(isNaN(pageNumber)){
      return
    }
    else if(pageN > pagesCount){
      this.props.onPageChange(pagesCount);
    } 
    else if(pageN < 1){
      this.props.onPageChange(1);
    } 
    else this.props.onPageChange(pageN);
  }

  render() {
    const {
      itemsCount,
      pageSize,
      currentPage,
      onPageChange,
      pageRange
    } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    var pagesWindow = [];
    if (pagesCount < pageRange) {
      pagesWindow = pages;
    } else {
      if (currentPage < pageRange / 2) {
        pagesWindow = pages.slice(0, pageRange);
      } else if (currentPage > pagesCount - pageRange / 2) {
        pagesWindow = pages.slice(pagesCount - pageRange, pagesCount);
      } else {
        const startingPoint = currentPage - 1 - Math.floor(pageRange / 2);
        const endingPoint = currentPage + Math.floor(pageRange / 2);
        pagesWindow = pages.slice(startingPoint, endingPoint);
      }
    }

    return (
      <nav>
        <ul className="pagination">
          <li className={currentPage === 1 ? "page-item disabled" : ""}>
            <a className="page-link" onClick={() => onPageChange(1)}>
              First
            </a>
          </li>
          {this.iteration(100, 'backwards', currentPage, pagesCount)}
          {this.iteration(10, 'backwards', currentPage, pagesCount)}
          {pagesWindow.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
          {this.iteration(10, 'forwards', currentPage, pagesCount)}
          {this.iteration(100, 'forwards', currentPage, pagesCount)}
          <li
            className={currentPage === pagesCount ? "page-item disabled" : ""}
          >
            <a className="page-link" onClick={() => onPageChange(pagesCount)}>
              Last
            </a>
          </li>
        </ul>
        <input
          placeholder="Go to page"
          value={this.state.pageNumber}
          onChange={this.handleChange}
        />
        <button
          onClick={() => this.validate(this.state.pageNumber, pagesCount)}
        >
          Search
        </button>
      </nav>
    );
  }
}

pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default pagination;
