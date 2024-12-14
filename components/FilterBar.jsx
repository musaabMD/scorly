
// components/FilterBar.jsx
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const FilterBar = ({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery, 
  showAnswers, 
  setShowAnswers,
  categories 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-14 px-5 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer pr-12 text-lg"
        >
          {categories.map((cat) => (
            <option key={cat.label} value={cat.label}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={24} />
      </div>

      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-14 pr-5 bg-gray-50 border border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-4 text-gray-400" size={24} />
      </div>

      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="flex items-center gap-2 px-6 h-14 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
      >
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>
    </div>
  );
};

export default FilterBar;