'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DirectionScore, QuizAnswer, Question } from '../types';
import { CareerQuizScoring } from '../utils/scoring';

interface ResultsCardProps {
  results: DirectionScore[];
  onRestart: () => void;
  userAnswers: QuizAnswer[];
  questions: Question[];
}

const ResultsCard: React.FC<ResultsCardProps> = ({ 
  results, 
  onRestart, 
  userAnswers, 
  questions 
}) => {
  // Получаем профиль пользователя для отображения его характеристик
  const scoring = new CareerQuizScoring([], questions);
  const userProfile = scoring.getUserProfile(userAnswers);

  const getTopUserTraits = () => {
    const traitLabels: { [key: string]: string } = {
      creativity: 'Творчество',
      technology: 'Технологии',
      visual: 'Визуальное мышление',
      artistic: 'Художественность',
      logical: 'Логика',
      practical: 'Практичность',
      competition: 'Соревновательность',
      presentation: 'Презентация'
    };

    return Object.entries(userProfile)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([trait, value]) => ({
        name: traitLabels[trait] || trait,
        value,
        percentage: Math.round((value / Math.max(...Object.values(userProfile))) * 100)
      }));
  };

  const topTraits = getTopUserTraits();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎯 Твои рекомендации готовы!
        </h1>
        <p className="text-gray-600">
          На основе твоих ответов мы подобрали 3 наиболее подходящих направления
        </p>
      </motion.div>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Твой профиль:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTraits.map((trait, index) => (
            <div key={trait.name} className="text-center">
              <div className="text-2xl font-bold text-blue-600">{trait.percentage}%</div>
              <div className="text-sm text-gray-600">{trait.name}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <div className="space-y-6">
        {results.map((result, index) => (
          <motion.div
            key={result.direction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${
              index === 0 
                ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' 
                : index === 1 
                ? 'border-gray-300 bg-gray-50' 
                : 'border-orange-300 bg-orange-50'
            }`}
          >
            {/* Badge for ranking */}
            <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'
            }`}>
              {index + 1}
            </div>

            {/* Medal emoji for top result */}
            {index === 0 && (
              <div className="absolute -top-2 -left-2 text-2xl">🏆</div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {result.direction.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {result.direction.description}
                </p>
                <div className="text-sm text-gray-500">
                  Подходящие классы: {result.direction.grades.join(', ')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {result.percentage}%
                </div>
                <div className="text-xs text-gray-500">
                  совпадение
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className={`h-2 rounded-full ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : index === 1 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-600' 
                    : 'bg-gradient-to-r from-orange-400 to-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${result.percentage}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              />
            </div>

            {/* Link button */}
            {result.direction.link ? (
              <a
                href={result.direction.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Узнать больше
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                Ссылка скоро появится
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center space-x-4 pt-6"
      >
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
        >
          Пройти тест заново
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Сохранить результат
        </button>
      </motion.div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4"
      >
        💡 <strong>Совет:</strong> Помни, что это только рекомендации! 
        Ты всегда можешь попробовать любое направление, которое тебе интересно.
        Главное — это твое желание учиться и развиваться!
      </motion.div>


    </div>
  );
};

export default ResultsCard;
