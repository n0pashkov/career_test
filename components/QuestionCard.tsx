'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedValue?: string | number;
  onAnswer: (questionId: number, value: string | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedValue, 
  onAnswer 
}) => {
  // Компактный вид для вопроса о классе
  if (question.type === 'grade') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {question.question}
        </h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {question.options.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                selectedValue === option.value
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {option.value}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Обычный вид для остальных вопросов
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedValue === option.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                selectedValue === option.value
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedValue === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
              <span className="font-medium">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
