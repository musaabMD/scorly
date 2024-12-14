'use client';

import { useTranslations } from 'next-intl';
import useBookmarkStore from '@/lib/store/bookmarkStore';
import Link from 'next/link';
import { categories } from '@/lib/exam-data';
import { examsByCategory } from '@/lib/exam-data';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarkStore();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bookmarked Exams</h1>
        
        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">You haven't bookmarked any exams yet</p>
            <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
              Browse Exams
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookmarks.map((exam) => {
              const category = categories.find(cat => 
                examsByCategory[cat.id]?.some(e => e.id === exam.id)
              );
              
              return (
                <Link
                  key={exam.id}
                  href={`/exams/${category?.id}/${exam.id}`}
                  className={`
                    block p-6 rounded-lg
                    bg-white
                    border-2 border-transparent
                    transition-all duration-200
                    hover:shadow-lg
                    ${category?.borderColor || 'hover:border-gray-200'}
                  `}
                >
                  <h2 className={`text-xl font-bold ${category?.color || 'text-gray-900'} mb-2`}>
                    {exam.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{exam.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {exam.questions.toLocaleString()} Questions
                    </p>
                    <span className={`text-sm font-medium ${category?.color || 'text-gray-900'}`}>
                      Start Practice →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}