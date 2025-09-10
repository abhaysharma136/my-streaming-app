import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Pagination({
  currentPage = 1,
  totalPages = 10,
  maxVisiblePages = 5,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = parseInt(searchParams.get("page")) || currentPage;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage) return;

    // Update the URL with the new page parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);

    // Scroll to top of the page for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate the range of visible page numbers
  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, activePage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const renderPageNumbers = () => {
    const pages = getPageNumbers();
    const pageElements = [];

    // Add first page and ellipsis if needed
    if (pages[0] > 1) {
      pageElements.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          1
        </button>
      );

      if (pages[0] > 2) {
        pageElements.push(
          <span key="ellipsis-start" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    pages.forEach((page) => {
      pageElements.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            page === activePage
              ? "bg-blue-600 text-white"
              : "text-blue-700 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      );
    });

    // Add last page and ellipsis if needed
    if (pages[pages.length - 1] < totalPages) {
      if (pages[pages.length - 1] < totalPages - 1) {
        pageElements.push(
          <span key="ellipsis-end" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }

      pageElements.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    return pageElements;
  };

  return (
    <footer className="flex justify-center items-center py-4 mt-6">
      <nav className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className="px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className="px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </nav>
    </footer>
  );
}
