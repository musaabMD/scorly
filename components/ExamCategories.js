"use client";
import React from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Heart, Activity, Book, Dumbbell, Network,
  Stethoscope, PlusSquare, Pill, Building2, Hammer } from 'lucide-react';
import { examsByCategory } from '@/lib/exam-data';

const categories = [
  {
    id: 'behavioral-health',
    title: 'Behavioral Health',
    icon: 'Heart',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    borderColor: 'hover:border-purple-500',
  },
  {
    id: 'ems',
    title: 'EMS',
    icon: 'Activity',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    borderColor: 'hover:border-red-500',
  },
  {
    id: 'essentials',
    title: 'Essentials',
    icon: 'Book',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'hover:border-blue-500',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    icon: 'Dumbbell',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'hover:border-blue-500',
  },
  {
    id: 'it-cybersecurity',
    title: 'IT & Cybersecurity',
    icon: 'Network',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    borderColor: 'hover:border-green-500',
  },
  {
    id: 'medical',
    title: 'Medical',
    icon: 'Stethoscope',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'hover:border-blue-500',
  },
  {
    id: 'nursing',
    title: 'Nursing',
    icon: 'Heart',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    borderColor: 'hover:border-red-500',
  },
  {
    id: 'nursing-school',
    title: 'Nursing School',
    icon: 'Pill',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    borderColor: 'hover:border-purple-500',
  },
  {
    id: 'professional',
    title: 'Professional',
    icon: 'Building2',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'hover:border-blue-500',
  },
  {
    id: 'skilled-trades',
    title: 'Skilled Trades',
    icon: 'Hammer',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    borderColor: 'hover:border-red-500',
  },
];

const iconComponents = {
  Heart,
  Activity,
  Book,
  Dumbbell,
  Network,
  Stethoscope,
  PlusSquare,
  Pill,
  Building2,
  Hammer
};

export default function ExamCategories() {
    const t = useTranslations('ExamCategories');
    const router = useRouter();
  
    const handleClick = (categoryId) => {
      router.push(`/exams/${categoryId}`);
    };
  
    return (
      <div className="min-h-screen bg-white"> {/* Added background color */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = iconComponents[category.icon];
              const examCount = examsByCategory[category.id]?.length || 0;
              const totalQuestions = examsByCategory[category.id]?.reduce((acc, exam) => acc + exam.questions, 0) || 0;
  
              return (
                <button
                  key={category.id}
                  onClick={() => handleClick(category.id)}
                  className={`
                    relative flex items-center space-x-4 rounded-lg 
                    border-2 border-transparent bg-white px-6 py-5 
                    shadow-sm hover:shadow-md transition-all duration-200 
                    focus:outline-none ${category.borderColor}
                    text-left border-2 border-stone-400 
                  `}
                >
                  <div className={`shrink-0 ${category.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-medium text-gray-900">
                      {t(`categories.${category.id}.title`)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">
                        {examCount} {examCount === 1 ? 'Exam' : 'Exams'}
                      </p>
                      <span className="text-sm text-gray-400">•</span>
                      <p className="text-sm text-gray-500">
                        {totalQuestions.toLocaleString()} Questions
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <svg 
                      className={`w-5 h-5 ${category.color}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }