'use client';

import React, { useState } from 'react';
import { QuizQuestion as QuizQuestionType, QuizOption } from '../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: QuizOption) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);

  const handleOptionClick = (option: QuizOption) => {
    setSelectedOption(option);
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
    }, 250);
  };

  return (
    <div className="animate-fade-in w-full">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white mb-3 leading-snug">
        {question.question}
      </h2>
      {question.rationale && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
          {question.rationale}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {question.options.map((option, index) => {
          const active = selectedOption === option;
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-5 border text-left transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950 focus:ring-black dark:focus:ring-white ${
                active
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                  : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-black dark:hover:border-white'
              }`}
            >
              <span className="text-base font-medium">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
