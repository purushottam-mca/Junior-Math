/**
 * Addition Game Module
 * Handles question generation and answer validation for addition
 */

import GameEngine from '../core/game.js';
import { getElement, addEventListener, delay } from '../utils/utils.js';

class AdditionGame {
  constructor() {
    this.engine = new GameEngine({ enableSound: true });
    this.initializeDOM();
    this.setupEventListeners();
    this.startGame();
  }

  /**
   * Initialize DOM elements
   */
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

  /**
   * Setup event listeners for answer options
   */
  setupEventListeners() {
    this.options.forEach((option, index) => {
      addEventListener(option, 'click', () => this.handleAnswer(index));
    });
  }

  /**
   * Generate and display new question
   */
  generateQuestion() {
    const question = this.engine.generateQuestion('add', 0, 15);
    const answerOptions = this.engine.generateAnswerOptions(4, 0, 28);

    // Display numbers
    this.elements.num1.textContent = question.num1;
    this.elements.num2.textContent = question.num2;

    // Display answer options
    answerOptions.options.forEach((answer, index) => {
      this.options[index].textContent = answer;
      this.options[index].dataset.answer = answer;
      this.options[index].classList.remove('correct', 'incorrect');
    });

    this.correctAnswerIndex = answerOptions.shuffledIndex;
  }

  /**
   * Handle answer selection
   */
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
      // Highlight correct answer
      this.options[this.correctAnswerIndex].classList.add('correct');
      await delay(800);
      selectedOption.classList.remove('incorrect');
      this.options[this.correctAnswerIndex].classList.remove('correct');
    }
  }

  /**
   * Start the game
   */
  startGame() {
    this.generateQuestion();
  }
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AdditionGame();
  });
} else {
  new AdditionGame();
}
