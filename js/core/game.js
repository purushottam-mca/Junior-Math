/**
 * Core Game Engine Module
 * Handles question generation, answer validation, and game flow
 */

import StorageManager from '../utils/storage.js';
import { shuffleArray, getRandomNumber, generateUniqueRandomNumbers } from '../utils/utils.js';

class GameEngine {
  constructor(config = {}) {
    this.config = config;
    this.currentQuestion = null;
    this.score = 0;
    this.streak = 0;
    this.totalQuestions = 0;
    this.correctAnswers = 0;
    this.audioElements = {
      correct: null,
      wrong: null,
    };
    this.initAudio();
  }

  /**
   * Initialize audio elements
   */
  initAudio() {
    this.audioElements.correct = document.getElementById('correctSound');
    this.audioElements.wrong = document.getElementById('wrongSound');
  }

  /**
   * Generate a question based on operation type
   */
  generateQuestion(operationType, minNum = 0, maxNum = 15) {
    const num1 = getRandomNumber(minNum, maxNum);
    const num2 = getRandomNumber(minNum, maxNum);

    let correctAnswer;
    const operation = operationType.toLowerCase();

    switch (operation) {
      case 'add':
        correctAnswer = num1 + num2;
        break;
      case 'subtract':
        correctAnswer = Math.max(0, num1 - num2);
        break;
      case 'multiply':
        correctAnswer = num1 * num2;
        break;
      case 'divide':
        correctAnswer = num2 !== 0 ? Math.floor(num1 / num2) : 0;
        break;
      case 'remainder':
        correctAnswer = num2 !== 0 ? num1 % num2 : 0;
        break;
      case 'between':
        correctAnswer = Math.min(num1, num2) + 1;
        break;
      default:
        throw new Error(`Unknown operation: ${operationType}`);
    }

    this.currentQuestion = {
      type: operationType,
      num1,
      num2,
      correctAnswer,
      timestamp: Date.now(),
    };

    return this.currentQuestion;
  }

  /**
   * Generate answer options with one correct and three wrong answers
   */
  generateAnswerOptions(optionCount = 4, minNum = 0, maxNum = 28) {
    if (!this.currentQuestion) {
      throw new Error('No question generated yet');
    }

    const { correctAnswer } = this.currentQuestion;
    const wrongAnswers = generateUniqueRandomNumbers(
      optionCount - 1,
      minNum,
      maxNum,
      [correctAnswer]
    );

    const allAnswers = [correctAnswer, ...wrongAnswers];
    const shuffled = shuffleArray(allAnswers);

    return {
      options: shuffled,
      correctAnswer,
      shuffledIndex: shuffled.indexOf(correctAnswer),
    };
  }

  /**
   * Check if answer is correct
   */
  checkAnswer(userAnswer) {
    if (!this.currentQuestion) {
      return { correct: false, message: 'No question active' };
    }

    const { correctAnswer } = this.currentQuestion;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    this.totalQuestions++;

    if (isCorrect) {
      this.correctAnswers++;
      this.streak++;
      this.score += 10;
    } else {
      this.streak = 0;
      this.score = Math.max(0, this.score - 5);
    }

    // Update statistics in storage
    StorageManager.updateStats(this.currentQuestion.type, isCorrect);

    return {
      correct: isCorrect,
      correctAnswer,
      userAnswer: parseInt(userAnswer),
      score: this.score,
      streak: this.streak,
    };
  }

  /**
   * Play correct answer sound
   */
  playCorrectSound() {
    if (this.audioElements.correct && this.config.enableSound !== false) {
      this.audioElements.correct.currentTime = 0;
      this.audioElements.correct.play().catch(e => {
        console.warn('Could not play correct sound:', e);
      });
    }
  }

  /**
   * Play wrong answer sound
   */
  playWrongSound() {
    if (this.audioElements.wrong && this.config.enableSound !== false) {
      this.audioElements.wrong.currentTime = 0;
      this.audioElements.wrong.play().catch(e => {
        console.warn('Could not play wrong sound:', e);
      });
    }
  }

  /**
   * Get current game statistics
   */
  getStats() {
    return {
      totalQuestions: this.totalQuestions,
      correctAnswers: this.correctAnswers,
      incorrectAnswers: this.totalQuestions - this.correctAnswers,
      accuracy:
        this.totalQuestions > 0
          ? ((this.correctAnswers / this.totalQuestions) * 100).toFixed(2)
          : 0,
      score: this.score,
      streak: this.streak,
    };
  }

  /**
   * Reset game state
   */
  reset() {
    this.currentQuestion = null;
    this.score = 0;
    this.streak = 0;
    this.totalQuestions = 0;
    this.correctAnswers = 0;
  }
}

export default GameEngine;
