import React from 'react';
import Quiz from '../components/Quiz';
import Header from '../components/Header';
import Footer from '../components/Footer';
import directionsData from '../directions.json';
import questionsData from '../questions.json';
import { Direction, Question } from '../types';

export default function Home() {
  const directions = directionsData.directions as Direction[];
  const questions = questionsData.questions as Question[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🚀 Квиз по профориентации
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Пройди тест и узнай, какие IT-направления подходят тебе больше всего! 
              Ответь на 8 вопросов и получи персональные рекомендации.
            </p>
          </div>

          {/* Quiz Component */}
          <Quiz directions={directions} questions={questions} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
