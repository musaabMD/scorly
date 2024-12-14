'use client';

import Link from 'next/link';
import { examsByCategory } from '@/lib/exam-data';

export default function ExamList({ categoryId, category, searchQuery = '' }) {
  const exams = examsByCategory[categoryId] || [];
  console.log('Exams:', exams); // Debug

  const filteredExams = searchQuery
    ? exams.filter(exam => 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exams;

  if (exams.length === 0) {
    return <div className="text-center text-gray-500">No exams found in this category.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredExams.map((exam) => (
        <Link
          key={exam.id}
          href={`/exams/${categoryId}/${exam.id}`}
          className="group block p-6 bg-base-200 border-2 border-black rounded-lg border-2 border-transparent hover:border-blue-500 transition-all duration-200"
        >
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">
            {exam.title}
          </h2>
          <p className="text-gray-600 mb-4">{exam.subtitle}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {exam.questions} Questions
            </span>
            <span className="text-sm font-medium text-blue-600">
              Start Practice →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}