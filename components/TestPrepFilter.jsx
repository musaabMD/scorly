// TestPrepFilter.jsx
"use client"

import React, { useState, useEffect } from 'react';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import FilterTabs from '@/components/FilterTabs';
import QuestionDisplay from '@/components/QuestionDisplay';
import PageTitle from '@/components/PageTitle';
import { sampleQuestions, categories, filters } from '@/app/data/sampleData';


const defaultQuestions = {
    flagged: [],
    incorrect: [],
    important: [],
    flashcards: [],
    highYield: [],
    examTips: []
  };
  
  const TestPrepFilter = () => {
    const [showAnswers, setShowAnswers] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredData, setFilteredData] = useState(defaultQuestions);
    const [questions, setQuestions] = useState(defaultQuestions);
  
    // Mock stats
    const stats = {
      totalQuestions: 32,
      completedQuestions: 24,
      averageScore: 85,
      studyStreak: 7,
      progressPercent: 75
    };
  
    const categories = [
      { label: 'All', emoji: '📚' },
      { label: 'Biology', emoji: '🧬' },
      { label: 'Cell Biology', emoji: '🦠' },
      { label: 'Genetics', emoji: '🧬' },
      { label: 'Chemistry', emoji: '⚗️' },
      { label: 'Physics', emoji: '⚡' }
    ];
  
    const filters = [
      { id: 'all', label: 'All', icon: BookOpen },
      { id: 'flagged', label: 'Flagged', icon: Flag },
      { id: 'incorrect', label: 'Incorrect', icon: XCircle },
      { id: 'important', label: 'Important', icon: Star },
      { id: 'flashcard', label: 'Flashcards', icon: Library },
      { id: 'highYield', label: 'HY', icon: Brain },
      { id: 'examTips', label: 'Tips', icon: Lightbulb }
    ];
  
    useEffect(() => {
      // Here you would fetch actual questions data
      // For now using empty state
      setQuestions(defaultQuestions);
    }, []);
  
    // Filter and search functionality
    useEffect(() => {
      let result = { ...questions };
  
      if (selectedCategory !== 'All') {
        Object.keys(result).forEach(key => {
          result[key] = result[key].filter(item => 
            item.category === selectedCategory || item.topic === selectedCategory
          );
        });
      }
  
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        Object.keys(result).forEach(key => {
          result[key] = result[key].filter(item => {
            const searchableText = [
              item.question,
              item.answer,
              item.topic,
              item.category,
              item.flagReason,
              item.commonMistake,
              item.importance,
              ...(item.key_points || []),
              item.description,
              item.applicability
            ].filter(Boolean).join(' ').toLowerCase();
            
            return searchableText.includes(query);
          });
        });
      }
  
      setFilteredData(result);
    }, [selectedCategory, searchQuery, questions]);
  
    const counts = {
      all: Object.values(questions).flat().length,
      flagged: questions.flagged.length,
      incorrect: questions.incorrect.length,
      important: questions.important.length,
      flashcard: questions.flashcards.length,
      highYield: questions.highYield.length,
      examTips: questions.examTips.length,
    };
  
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <StatsBar stats={stats} />
        
        <PageTitle 
          activeFilter={activeFilter} 
          count={counts[activeFilter] || 0}
          filters={filters}
        />
  
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAnswers={showAnswers}
          setShowAnswers={setShowAnswers}
          categories={categories}
        />
  
        <FilterTabs
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          counts={counts}
        />
  
        {counts.all > 0 ? (
          <QuestionDisplay 
            type={activeFilter} 
            data={filteredData} 
            showAnswers={showAnswers} 
          />
        ) : (
          <EmptyState 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    );
  };
  
  export default TestPrepFilter;