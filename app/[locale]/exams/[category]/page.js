'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { categories, examsByCategory } from '@/lib/exam-data';
import ExamList from '@/components/ExamList';

export default function ExamCategoryPage({ params }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find category
  const category = categories.find((cat) => cat.id === params.category);

  if (!category) {
    return notFound();
  }

  // Ensure exams array exists for the category
  const exams = examsByCategory[params.category] || [];

  const handleJoinWaitlist = () => {
    if (email) {
      console.log('Waitlist email submitted:', email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className={`min-h-screen ${category.bgColor}`}>
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
            <p className="mt-2 text-lg text-gray-600">Practice Tests and Study Materials</p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search exams..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exam List or Waitlist */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {exams.length > 0 ? (
          <ExamList categoryId={params.category} category={category} searchQuery={searchQuery} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-800">No exams available yet</h2>
            <p className="text-gray-600 mt-2">Join the waitlist to be notified when exams are available.</p>

            {!isSubmitted ? (
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleJoinWaitlist}
                  className="mt-2 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                >
                  Join Waitlist
                </button>
              </div>
            ) : (
              <p className="mt-4 text-green-500">Thank you! We'll notify you once exams are available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
