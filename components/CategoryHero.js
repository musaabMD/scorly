import React from 'react';
import * as Icons from 'lucide-react';
import { Search } from 'lucide-react';

const CategoryHero = ({ category, onSearch }) => {
  const Icon = Icons[category.icon];

  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-lg ${category.bgColor}`}>
              <Icon className={`w-10 h-10 ${category.color}`} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {category.title}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Practice Tests and Study Materials
              </p>
            </div>
          </div>
          
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Search exams..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;