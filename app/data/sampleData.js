// data/sampleData.js
import { BookOpen, Flag, XCircle, Star, Library, Brain, Lightbulb } from 'lucide-react';

export const sampleQuestions = {
  flagged: [
    {
      id: 'f1',
      category: 'Biology',
      topic: 'Cell Biology',
      emoji: '🦠',
      question: "Explain the role of G-proteins in signal transduction cascades.",
      choices: [
        "They only function as enzyme inhibitors",
        "They act as molecular switches in signal relay",
        "They exclusively transport glucose",
        "They synthesize proteins"
      ],
      correctAnswer: 1,
      answer: "G-proteins act as molecular switches, cycling between active (GTP-bound) and inactive (GDP-bound) states to relay signals from cell surface receptors to intracellular effectors.",
      flagReason: "Complex mechanism needs review"
    },
    {
      id: 'f2',
      category: 'Chemistry',
      topic: 'Organic Chemistry',
      emoji: '⚗️',
      question: "Compare and contrast E1 and E2 elimination reactions.",
      choices: [
        "Both follow first-order kinetics",
        "Both are concerted processes",
        "E1 is unimolecular, E2 is bimolecular",
        "Neither requires a base"
      ],
      correctAnswer: 2,
      answer: "E1 is unimolecular, stepwise, follows first-order kinetics. E2 is bimolecular, concerted, follows second-order kinetics.",
      flagReason: "Need to memorize conditions"
    }
  ],
  // ... other question categories would go here
};

export const categories = [
  { label: 'All', emoji: '📚' },
  { label: 'Biology', emoji: '🧬' },
  { label: 'Cell Biology', emoji: '🦠' },
  { label: 'Genetics', emoji: '🧬' },
  { label: 'Chemistry', emoji: '⚗️' },
  { label: 'Physics', emoji: '⚡' }
];

export const filters = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'flagged', label: 'Flagged', icon: Flag },
  { id: 'incorrect', label: 'Incorrect', icon: XCircle },
  { id: 'flashcard', label: 'Flashcards', icon: Library },
  { id: 'highYield', label: 'HY', icon: Brain },
  { id: 'examTips', label: 'Tips', icon: Lightbulb },
];
