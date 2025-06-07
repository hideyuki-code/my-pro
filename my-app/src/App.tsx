import React, { useState } from 'react';
import SearchBar from './components/features/SearchAndFilter/SearchBar';
import TypeFilter from './components/features/SearchAndFilter/TypeFilter';
import Pagination from './components/common/Pagination';


function App() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ポケモン図鑑</h1>

      <div className="md:flex md:space-x-4 mb-6">
        <div className="md:w-1/2">
          <SearchBar /* onSearch={handleSearch} */ />
        </div>
        <div className="md:w-1/2">
          <TypeFilter /* onTypeChange={handleTypeChange} */ />
        </div>
      </div>

      {/* ポケモン一覧表示エリア (F1-8で実装) */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

export default App;
