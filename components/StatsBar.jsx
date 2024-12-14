
// components/StatsBar.jsx
import React from 'react';

const StatsBar = ({ stats }) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 ">
      <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
        <div className="flex justify-between items-center mb-2 ">
          <div className="flex items-center gap-3 ">
            <span className="text-2xl">📊</span>
            <span className="text-lg font-medium text-gray-600">Progress</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{stats.progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3  ">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${stats.progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between border-2 border-gray-300">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <span className="text-lg font-medium text-gray-600">Average Score</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{stats.averageScore}%</span>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between border-2 border-gray-300">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-lg font-medium text-gray-600">Study Streak</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-800">{stats.studyStreak}</span>
          <span className="text-base text-gray-600">days</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;