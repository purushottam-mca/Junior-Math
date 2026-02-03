/**
 * Multiplication Game Module
 */

import GameEngine from '../core/game.js';
import { getElement, addEventListener, delay } from '../utils/utils.js';

class MultiplicationGame {
  constructor() {
    this.engine = new GameEngine({ enableSound: true });
    this.initializeDOM();
    this.setupEventListeners();
    this.startGame();
  }

  initializeDOM() {
    this.elements = {
      num1: getElement('num1'),
      num2: getElement('num2'),
      option1: getElement('option1'),
      option2: getElement('option2'),
      option3: getElement('option3'),
      option4: getElement('option4'),
    };

    this.options = [this.elements.option1, this.elements.option2, this.elements.option3, this.elements.option4];
  }

  setupEventListeners() {
    this.options.forEach((option, index) => {
      addEventListener(option, 'click', () => this.handleAnswer(index));
    });
  }

  generateQuestion() {
    const question = this.engine.generateQuestion('multiply', 0, 15);
    const answerOptions = this.engine.generateAnswerOptions(4, 0, 225);

    this.elements.num1.textContent = question.num1;
    this.elements.num2.textContent = question.num2;

    answerOptions.options.forEach((answer, index) => {
      this.options[index].textContent = answer;
      this.options[index].dataset.answer = answer;
      this.options[index].classList.remove('correct', 'incorrect');
    });

    this.correctAnswerIndex = answerOptions.shuffledIndex;
  }

  async handleAnswer(optionIndex) {
    const selectedOption = this.options[optionIndex];
    const userAnswer = selectedOption.dataset.answer;

    const result = this.engine.checkAnswer(userAnswer);

    if (result.correct) {
      selectedOption.classList.add('correct');
      this.engine.playCorrectSound();
      await delay(this.engine.config.delayBetweenQuestions || 1200);
      this.generateQuestion();
    } else {
      selectedOption.classList.add('incorrect');
      this.engine.playWrongSound();
      this.options[this.correctAnswerIndex].classList.add('correct');
      await delay(800);
      selectedOption.classList.remove('incorrect');
      this.options[this.correctAnswerIndex].classList.remove('correct');
    }
  }

  startGame() {
    this.generateQuestion();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MultiplicationGame();
  });
} else {
  new MultiplicationGame();
}
