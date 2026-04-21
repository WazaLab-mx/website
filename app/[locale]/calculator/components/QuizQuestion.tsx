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
    }, 300);
  };

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600
            ${selectedOption === option ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
          >
            <span className="font-semibold">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
