// hooks/useQuestionNavigation.js
import { useState } from 'react';

export const useQuestionNavigation = (questions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = questions[currentIndex];
  const hasNext = currentIndex < questions.length - 1;
  const hasPrevious = currentIndex > 0;

  return {
    currentQuestion,
    currentIndex,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
    total: questions.length
  };
};
