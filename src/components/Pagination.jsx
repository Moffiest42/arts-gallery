import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="pagination" aria-label="Gallery pages">
      <button
        className="pagination__btn pagination__btn--prev"
        aria-label="Previous page"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <span className="pagination__chevron" aria-hidden="true"></span>
      </button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination__ellipsis">...</span>
        ) : (
          <button
            key={page}
            className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      ))}

      <button
        className="pagination__btn"
        aria-label="Next page"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="pagination__chevron" aria-hidden="true"></span>
      </button>
    </nav>
  );
};

export default Pagination;