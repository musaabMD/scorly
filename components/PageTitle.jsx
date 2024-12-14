
// components/PageTitle.jsx
import React from 'react';
import { filters } from '@/app/data/sampleData';

const PageTitle = ({ activeFilter, count }) => {
  const getFilterTitle = () => {
    const filter = filters.find(f => f.id === activeFilter);
    return filter ? filter.label : 'All';
  };

  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        {getFilterTitle()} Questions
        <span className="ml-2 text-xl text-gray-500">
          ({count})
        </span>
      </h1>
    </div>
  );
};

export default PageTitle;