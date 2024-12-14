// TestPrep.js
import React, { useState, useEffect } from 'react';
import { ChevronDown, Flag, XCircle, Star, Library, Brain, Lightbulb, BookOpen, Search } from 'lucide-react';

// Sample data structure
const sampleQuestions = {
  flagged: [
    {
      id: 'f1',
      category: 'Biology',
      topic: 'Cell Biology',
      emoji: '🦠',
      question: "Explain the role of G-proteins in signal transduction cascades.",
      answer: "G-proteins act as molecular switches, cycling between active (GTP-bound) and inactive (GDP-bound) states to relay signals from cell surface receptors to intracellular effectors.",
      flagReason: "Complex mechanism needs review"
    },
    {
      id: 'f2',
      category: 'Chemistry',
      topic: 'Organic Chemistry',
      emoji: '⚗️',
      question: "Compare and contrast E1 and E2 elimination reactions.",
      answer: "E1 is unimolecular, stepwise, follows first-order kinetics. E2 is bimolecular, concerted, follows second-order kinetics.",
      flagReason: "Need to memorize conditions"
    },
    {
      id: 'f3',
      category: 'Physics',
      topic: 'Quantum Mechanics',
      emoji: '⚛️',
      question: "Describe the quantum tunneling effect and its applications.",
      answer: "Quantum tunneling is a phenomenon where particles pass through potential barriers that they classically couldn't overcome. Applications include STM microscopy and nuclear fusion.",
      flagReason: "Conceptually challenging"
    }
  ],

  incorrect: [
    {
      id: 'i1',
      category: 'Biology',
      topic: 'Genetics',
      emoji: '🧬',
      question: "What is the role of telomerase in cancer cells?",
      answer: "Telomerase maintains telomere length in cancer cells, preventing cellular senescence and enabling unlimited replication potential.",
      commonMistake: "Confusing it with regular DNA polymerase function"
    },
    {
      id: 'i2',
      category: 'Chemistry',
      topic: 'Physical Chemistry',
      emoji: '🔬',
      question: "Explain Le Chatelier's principle with an example.",
      answer: "Le Chatelier's principle states that when a system at equilibrium is disturbed, it shifts to counteract the change. Example: In N₂ + 3H₂ ⇌ 2NH₃, increasing pressure shifts equilibrium toward NH₃.",
      commonMistake: "Predicting wrong direction of shift"
    },
    {
      id: 'i3',
      category: 'Physics',
      topic: 'Thermodynamics',
      emoji: '🌡️',
      question: "Define entropy and its relationship to spontaneous processes.",
      answer: "Entropy is a measure of system disorder. Spontaneous processes occur with increasing total entropy (system + surroundings).",
      commonMistake: "Only considering system entropy"
    }
  ],

  important: [
    {
      id: 'im1',
      category: 'Biology',
      topic: 'Immunology',
      emoji: '🛡️',
      question: "Describe the differences between primary and secondary immune responses.",
      answer: "Primary response is slower, produces mainly IgM, and has no memory cells. Secondary response is faster, produces mainly IgG, and involves memory cells.",
      importance: "Fundamental to immune system function"
    },
    {
      id: 'im2',
      category: 'Chemistry',
      topic: 'Biochemistry',
      emoji: '🧪',
      question: "Explain the regulation of glycolysis by key enzymes.",
      answer: "Key regulatory enzymes: hexokinase/glucokinase, phosphofructokinase-1, and pyruvate kinase. Regulated by ATP/AMP levels, citrate, and hormones.",
      importance: "Central to metabolism understanding"
    },
    {
      id: 'im3',
      category: 'Physics',
      topic: 'Electromagnetism',
      emoji: '⚡',
      question: "State and explain Maxwell's equations.",
      answer: "Four equations describing electric and magnetic fields: Gauss's law, Gauss's law for magnetism, Faraday's law, and Ampère-Maxwell law.",
      importance: "Foundation of electromagnetic theory"
    }
  ],

  flashcards: [
    {
      id: 'fc1',
      category: 'Biology',
      topic: 'Neuroscience',
      emoji: '🧠',
      front: "What is the function of myelin?",
      back: "Myelin insulates axons and enables saltatory conduction, increasing action potential speed and efficiency."
    },
    {
      id: 'fc2',
      category: 'Chemistry',
      topic: 'Inorganic',
      emoji: '⚛️',
      front: "Define crystal field splitting energy.",
      back: "Energy difference between t2g and eg orbitals in transition metal complexes due to ligand interactions."
    },
    {
      id: 'fc3',
      category: 'Physics',
      topic: 'Mechanics',
      emoji: '🎯',
      front: "State Newton's Second Law.",
      back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma"
    }
  ],

  highYield: [
    {
      id: 'hy1',
      category: 'Biology',
      topic: 'Metabolism',
      emoji: '⚡',
      concept: "Electron Transport Chain",
      key_points: [
        "Located in inner mitochondrial membrane",
        "Generates proton gradient",
        "Four main complexes (I-IV)",
        "Final electron acceptor is oxygen"
      ]
    },
    {
      id: 'hy2',
      category: 'Chemistry',
      topic: 'Acid-Base',
      emoji: '🧪',
      concept: "Henderson-Hasselbalch Equation",
      key_points: [
        "pH = pKa + log([A-]/[HA])",
        "Crucial for buffer calculations",
        "At pH = pKa, [A-] = [HA]",
        "Used in physiological systems"
      ]
    },
    {
      id: 'hy3',
      category: 'Physics',
      topic: 'Waves',
      emoji: '🌊',
      concept: "Wave Properties",
      key_points: [
        "Frequency × wavelength = speed",
        "Diffraction at obstacles",
        "Interference patterns",
        "Standing waves in bounded systems"
      ]
    }
  ],

  examTips: [
    {
      id: 'tip1',
      emoji: '💡',
      title: "Time Management",
      description: "Allocate 1.5 minutes per multiple choice question. Mark uncertain questions for review if time permits.",
      applicability: "All sections"
    },
    {
      id: 'tip2',
      emoji: '🎯',
      title: "Process of Elimination",
      description: "Always eliminate obviously wrong answers first. Can increase chances from 25% to 50% even with uncertain knowledge.",
      applicability: "Multiple choice questions"
    },
    {
      id: 'tip3',
      emoji: '📝',
      title: "Equation Sheet Strategy",
      description: "Review the equation sheet during tutorial time. Mark key equations you commonly use.",
      applicability: "Physics and Chemistry sections"
    }
  ]
};

// Question Display Component
const QuestionDisplay = ({ type, data, showAnswers }) => {
  const renderFlaggedQuestion = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.topic}</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag className="text-yellow-500" size={18} />
          <span className="text-sm text-gray-500">{item.flagReason}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{item.question}</p>
      {showAnswers && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <p className="text-gray-600">{item.answer}</p>
        </div>
      )}
    </div>
  );

  const renderIncorrectQuestion = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.topic}</span>
        </div>
        <XCircle className="text-red-500" size={18} />
      </div>
      <p className="text-gray-700 mb-3">{item.question}</p>
      {showAnswers && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <p className="text-gray-600">{item.answer}</p>
          <p className="text-red-500 text-sm mt-2">Common mistake: {item.commonMistake}</p>
        </div>
      )}
    </div>
  );

  const renderImportantQuestion = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.topic}</span>
        </div>
        <Star className="text-yellow-500" size={18} />
      </div>
      <p className="text-gray-700 mb-3">{item.question}</p>
      {showAnswers && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <p className="text-gray-600">{item.answer}</p>
          <p className="text-blue-500 text-sm mt-2">Why important: {item.importance}</p>
        </div>
      )}
    </div>
  );

  const renderFlashcard = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.topic}</span>
        </div>
        <Library className="text-blue-500" size={18} />
      </div>
      <p className="text-gray-700 mb-3">{item.front}</p>
      {showAnswers && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <p className="text-gray-600">{item.back}</p>
        </div>
      )}
    </div>
  );

  const renderHighYield = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.concept}</span>
        </div>
        <Brain className="text-purple-500" size={18} />
      </div>
      <ul className="list-disc pl-5 text-gray-700">
        {item.key_points.map((point, index) => (
          <li key={index} className="mb-1">{point}</li>
        ))}
      </ul>
    </div>
  );

  const renderExamTip = (item) => (
    <div key={item.id} className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.emoji}</span>
          <span className="font-medium">{item.title}</span>
        </div>
        <Lightbulb className="text-yellow-500" size={18} />
      </div>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p className="text-sm text-blue-600">Applies to: {item.applicability}</p>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'flagged':
        return data.flagged.map(renderFlaggedQuestion);
      case 'incorrect':
        return data.incorrect.map(renderIncorrectQuestion);
      case 'important':
        return data.important.map(renderImportantQuestion);
      case 'flashcard':
        return data.flashcards.map(renderFlashcard);
      case 'highYield':
        return data.highYield.map(renderHighYield);
      case 'examTips':
        return data.examTips.map(renderExamTip);
      case 'all':
        return (
          <>
            {data.flagged.map(renderFlaggedQuestion)}
            {data.incorrect.map(renderIncorrectQuestion)}
            {data.important.map(renderImportantQuestion)}
            {data.flashcards.map(renderFlashcard)}
            {data.highYield.map(renderHighYield)}
            {data.examTips.map(renderExamTip)}
          </>
        );
      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderContent()}</div>;
};

// Main Component
const TestPrepFilter = () => {
  const [showAnswers, setShowAnswers] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(sampleQuestions);

  // Stats
  const stats = {
    totalQuestions: 32,
    completedQuestions: 24,
    averageScore: 85,
    studyStreak: 7,
    progressPercent: 75
  };

  // Categories
  const categories = [
    { label: 'All', emoji: '📚' },
    { label: 'Biology', emoji: '🧬' },
    { label: 'Cell Biology', emoji: '🦠' },
    { label: 'Genetics', emoji: '🧬' },
    { label: 'Chemistry', emoji: '⚗️' },
    { label: 'Physics', emoji: '⚡' }
  ];

  // Filters
  const filters = [
    { id: 'all', label: 'All', count: Object.values(sampleQuestions).flat().length, icon: BookOpen },
    { id: 'flagged', label: 'Flagged', count: sampleQuestions.flagged.length, icon: Flag },
    { id: 'incorrect', label: 'Incorrect', count: sampleQuestions.incorrect.length, icon: XCircle },
    { id: 'important', label: 'Important', count: sampleQuestions.important.length, icon: Star },
    { id: 'flashcard', label: 'Flashcards', count: sampleQuestions.flashcards.length, icon: Library },
    { id: 'highYield', label: 'HY', count: sampleQuestions.highYield.length, icon: Brain },
    { id: 'examTips', label: 'Tips', count: sampleQuestions.examTips.length, icon: Lightbulb },
  ];

  // Filter and search functionality
  useEffect(() => {
    let result = { ...sampleQuestions };

    // Filter by category
    if (selectedCategory !== 'All') {
      Object.keys(result).forEach(key => {
        result[key] = result[key].filter(item => 
          item.category === selectedCategory || item.topic === selectedCategory
        );
      });
    }

    // Filter by search query
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
            item.front,
            item.back,
            item.concept,
            ...(item.key_points || []),
            item.description,
            item.applicability
          ].filter(Boolean).join(' ').toLowerCase();
          
          return searchableText.includes(query);
        });
      });
    }

    setFilteredData(result);
  }, [selectedCategory, searchQuery]);

  const getCurrentFilterTitle = () => {
    const currentFilter = filters.find(f => f.id === activeFilter);
    return currentFilter ? currentFilter.label : 'All Questions';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <span className="text-sm font-medium text-gray-600">Done</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{stats.progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${stats.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="text-sm font-medium text-gray-600">Score</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{stats.averageScore}%</span>
        </div>

        {/* Study Streak */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="text-sm font-medium text-gray-600">Day</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-800">{stats.studyStreak}</span>
            <span className="text-xs text-gray-600">days up</span>
          </div>
        </div>
      </div>

      {/* Hero Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {getCurrentFilterTitle()}
          <span className="ml-2 text-gray-500 text-lg">
            ({filters.find(f => f.id === activeFilter)?.count || 0})
          </span>
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer pr-10 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat.label} value={cat.label}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Search Box */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>

        {/* Review Mode Toggle */}
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="flex items-center gap-1.5 px-4 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors ml-auto text-sm font-medium"
        >
          {showAnswers ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors text-sm ${
                activeFilter === filter.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{filter.label}</span>
              <span className="text-xs font-semibold">({filter.count})</span>
            </button>
          );
        })}
      </div>

      {/* Question Display */}
      <QuestionDisplay 
        type={activeFilter} 
        data={filteredData} 
        showAnswers={showAnswers} 
      />
    </div>
  );
};

export default TestPrepFilter;
