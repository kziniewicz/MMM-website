import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const generatePageButtons = () => {
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          Poprzednia
        </button>
      );
    }

    for (
      let i = currentPage - 2;
      i <= currentPage + 2 && i <= totalPages;
      i++
    ) {
      if (i > 0) {
        buttons.push(
          <button
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          Następna
        </button>
      );
    }

    return buttons;
  };

  return <div className="pagination">{generatePageButtons()}</div>;
};

export default Pagination;
