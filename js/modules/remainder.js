/**
 * Division Game Module
 */

import GameEngine from '../core/game.js';
import { getElement, addEventListener, delay } from '../utils/utils.js';

class DivisionGame {
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
    // Ensure second number is not zero
    let num2 = 0;
    while (num2 === 0) {
      num2 = Math.floor(Math.random() * 15) + 1;
    }
    const num1 = Math.floor(Math.random() * 15);

    this.engine.currentQuestion = {
      type: 'divide',
      num1,
      num2,
      correctAnswer: Math.floor(num1 / num2),
      timestamp: Date.now(),
    };

    const answerOptions = this.engine.generateAnswerOptions(4, 0, 15);

    this.elements.num1.textContent = num1;
    this.elements.num2.textContent = num2;

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
    new DivisionGame();
  });
} else {
  new DivisionGame();
}
