/**
 * Utility Functions Module
 * Common helper functions used across the application
 */

/**
 * Get DOM element by ID with error handling
 */
export function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
}

/**
 * Get multiple DOM elements
 */
export function getElements(ids) {
  const elements = {};
  ids.forEach(id => {
    elements[id] = getElement(id);
  });
  return elements;
}

/**
 * Add event listener with error handling
 */
export function addEventListener(element, event, callback) {
  if (!element) {
    console.warn('Element not found for event listener');
    return false;
  }
  element.addEventListener(event, callback);
  return true;
}

/**
 * Generate random number between min and max (inclusive)
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate unique array of random numbers
 */
export function generateUniqueRandomNumbers(count, min, max, exclude = []) {
  const numbers = [];
  while (numbers.length < count) {
    const num = getRandomNumber(min, max);
    if (!numbers.includes(num) && !exclude.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Format number with specific decimal places
 */
export function formatNumber(num, decimals = 0) {
  return Number(num).toFixed(decimals);
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if device is mobile
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Log with timestamp
 */
export function log(message, type = 'log') {
  const timestamp = new Date().toLocaleTimeString();
  console[type](`[${timestamp}] ${message}`);
}

/**
 * Delay execution (Promise-based sleep)
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert object to URL parameters
 */
export function objectToParams(obj) {
  return new URLSearchParams(obj).toString();
}

export default {
  getElement,
  getElements,
  addEventListener,
  getRandomNumber,
  generateUniqueRandomNumbers,
  shuffleArray,
  formatNumber,
  debounce,
  throttle,
  isMobileDevice,
  log,
  delay,
  camelToKebab,
  objectToParams,
};
