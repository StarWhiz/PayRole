import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class pagination extends Component {
  state = { pageNumber: "" };

  handleChange = e => {
    this.setState({ pageNumber: e.target.value });
  };

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
          <li className={currentPage === 1 ? "page-item disabled" : ""}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                onPageChange(currentPage <= 100 ? 1 : currentPage - 100)
              }
            >
              <span aria-hidden="true">&laquo;100</span>
            </a>
          </li>
          <li className={currentPage === 1 ? "page-item disabled" : ""}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                onPageChange(currentPage <= 10 ? 1 : currentPage - 10)
              }
            >
              <span aria-hidden="true">&laquo;10</span>
            </a>
          </li>
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
          <li
            className={currentPage === pagesCount ? "page-item disabled" : ""}
          >
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                onPageChange(
                  currentPage + 10 >= pagesCount ? pagesCount : currentPage + 10
                )
              }
            >
              <span aria-hidden="true">10&raquo;</span>
            </a>
          </li>
          <li
            className={currentPage === pagesCount ? "page-item disabled" : ""}
          >
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                onPageChange(
                  currentPage + 100 >= pagesCount
                    ? pagesCount
                    : currentPage + 100
                )
              }
            >
              <span aria-hidden="true">100&raquo;</span>
            </a>
          </li>
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
          onClick={() => onPageChange(parseInt(this.state.pageNumber, 10))}
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
