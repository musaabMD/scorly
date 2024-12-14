
// components/FilterTabs.jsx
import React from 'react';

const FilterTabs = ({ filters, activeFilter, setActiveFilter, counts }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 ">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-3 px-6 h-14 rounded-lg transition-colors text-lg border-2 border-gray-300 ${
              activeFilter === filter.id
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <Icon size={22} />
            <span className="font-medium">{filter.label}</span>
            <span className="text-sm font-semibold">({counts[filter.id] || 0})</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
