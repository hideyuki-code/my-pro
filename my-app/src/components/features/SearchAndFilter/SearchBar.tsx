// src/components/features/SearchAndFilter/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void; // F2-3で本格的に使用
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      // onSearch(event.target.value); // F2-3で有効化
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="ポケモンを名前で検索..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;