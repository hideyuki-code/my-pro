import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // F2-5で本格的に使用
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      // onPageChange(currentPage - 1); // F2-5で有効化
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      // onPageChange(currentPage + 1); // F2-5で有効化
    }
  };

  // 表示するページ番号のロジック (簡易版)
  // より複雑なロジック (例: ... を表示する) はここでは省略
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 0) return null; // ページがない場合は何も表示しない

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        前へ
      </button>

      {startPage > 1 && (
        <>
          <button 
            onClick={() => { /* onPageChange(1) */ }} 
            className={`px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50`}
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => { /* onPageChange(page) */ }}
          disabled={currentPage === page}
          className={`px-4 py-2 border rounded-md 
                      ${currentPage === page 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'}
                      disabled:opacity-75 disabled:cursor-not-allowed`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages -1 && <span className="text-gray-500">...</span>}
          <button 
            onClick={() => { /* onPageChange(totalPages) */ }}
            className={`px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
