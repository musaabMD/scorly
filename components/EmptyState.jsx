
// components/EmptyState.jsx
import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ searchQuery, selectedCategory }) => {
  return (
    <div className="text-center py-12">
      <SearchX className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No questions found</h3>
      <p className="mt-2 text-gray-500">
        {searchQuery && selectedCategory !== 'All' 
          ? `No questions matching "${searchQuery}" in ${selectedCategory} category`
          : searchQuery 
          ? `No questions matching "${searchQuery}"`
          : `No questions in ${selectedCategory} category`}
      </p>
    </div>
  );
};

export default EmptyState;
