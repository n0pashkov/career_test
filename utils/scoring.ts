import { Direction, Question, QuizAnswer, DirectionScore } from '../types';

export class CareerQuizScoring {
  private directions: Direction[];
  private questions: Question[];

  constructor(directions: Direction[], questions: Question[]) {
    this.directions = directions;
    this.questions = questions;
  }

  // Фильтруем направления по классу (обязательный фильтр)
  private filterByGrade(grade: number): Direction[] {
    return this.directions.filter(direction => {
      return direction.grades.includes(grade);
    });
  }

  // Вычисляем баллы для направления на основе ответов
  private calculateDirectionScore(direction: Direction, answers: QuizAnswer[]): number {
    let totalScore = 0;
    let maxPossibleScore = 0;

    answers.forEach(answer => {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (!question || question.type === 'grade') return;

      const option = question.options.find(opt => opt.value === answer.value);
      if (!option || !option.tags) return;

      // Для каждого тега в ответе умножаем на соответствующий тег направления
      Object.entries(option.tags).forEach(([tagName, answerValue]) => {
        const directionTagValue = direction.tags[tagName as keyof typeof direction.tags] || 0;
        const points = answerValue * directionTagValue;
        totalScore += points;
        
        // Максимальный возможный балл для этого тега
        maxPossibleScore += answerValue * 5; // 5 - максимальное значение тега
      });
    });

    return totalScore;
  }

  // Дополнительные баллы за предпочтительный возраст
  private getAgeBonus(direction: Direction, grade: number): number {
    if (direction.preferredGrades && direction.preferredGrades.includes(grade)) {
      return 10; // Бонус за идеальный возраст
    }
    return 0;
  }

  // Основной метод подсчета рекомендаций
  public getRecommendations(answers: QuizAnswer[]): DirectionScore[] {
    // Находим класс из ответов
    const gradeAnswer = answers.find(a => 
      this.questions.find(q => q.id === a.questionId)?.type === 'grade'
    );
    
    if (!gradeAnswer) {
      throw new Error('Grade answer is required');
    }

    const grade = gradeAnswer.value as number;
    
    // Фильтруем направления по классу
    const eligibleDirections = this.filterByGrade(grade);
    
    // Вычисляем баллы для каждого направления
    const scores: DirectionScore[] = eligibleDirections.map(direction => {
      const baseScore = this.calculateDirectionScore(direction, answers);
      const ageBonus = this.getAgeBonus(direction, grade);
      const totalScore = baseScore + ageBonus;
      
      // Вычисляем максимально возможный балл для процентного соотношения
      const maxPossibleScore = this.calculateMaxPossibleScore(answers);
      const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

      return {
        direction,
        score: totalScore,
        maxPossibleScore,
        percentage: Math.round(percentage)
      };
    });

    // Сортируем по убыванию баллов и возвращаем топ-3
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  private calculateMaxPossibleScore(answers: QuizAnswer[]): number {
    let maxScore = 0;
    
    answers.forEach(answer => {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (!question || question.type === 'grade') return;

      const option = question.options.find(opt => opt.value === answer.value);
      if (!option || !option.tags) return;

      Object.values(option.tags).forEach(answerValue => {
        maxScore += answerValue * 5; // 5 - максимальное значение тега направления
      });
    });

    return maxScore + 10; // +10 за возможный возрастной бонус
  }

  // Получить статистику по тегам пользователя
  public getUserProfile(answers: QuizAnswer[]): { [key: string]: number } {
    const profile: { [key: string]: number } = {};
    
    answers.forEach(answer => {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (!question || question.type === 'grade') return;

      const option = question.options.find(opt => opt.value === answer.value);
      if (!option || !option.tags) return;

      Object.entries(option.tags).forEach(([tagName, value]) => {
        profile[tagName] = (profile[tagName] || 0) + value;
      });
    });

    return profile;
  }
}
