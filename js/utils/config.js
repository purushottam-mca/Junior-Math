/**
 * Global Configuration for Junior Math Application
 * Centralized settings for game behavior, UI, and features
 */

const CONFIG = {
  // Game settings
  game: {
    minNumber: 0,
    maxNumber: 15,
    optionCount: 4,
    delayBetweenQuestions: 1200, // ms
    enableSound: true,
  },

  // Audio settings
  audio: {
    correct: 'assets/Correct.mp3',
    wrong: 'assets/wrong.mp3',
    volume: 1.0,
  },

  // UI settings
  ui: {
    darkMode: false,
    showTimer: false,
    animationsEnabled: true,
  },

  // Feature flags
  features: {
    authenticationEnabled: false,
    localStorageEnabled: true,
    userProfilesEnabled: false,
    leaderboardEnabled: false,
    progressTrackingEnabled: true,
  },

  // Game operations
  operations: {
    add: { symbol: '+', name: 'Addition' },
    subtract: { symbol: '-', name: 'Subtraction' },
    multiply: { symbol: '×', name: 'Multiplication' },
    divide: { symbol: '÷', name: 'Division' },
    remainder: { symbol: '%', name: 'Remainder' },
    between: { symbol: '▢', name: 'Between' },
  },

  // Storage keys
  storage: {
    userProfile: 'junior_math_user',
    gameStats: 'junior_math_stats',
    preferences: 'junior_math_preferences',
    sessionData: 'junior_math_session',
  },

  // Routes
  routes: {
    home: 'index.html',
    login: 'pages/login.html',
    setup: 'pages/setup.html',
    add: 'pages/add.html',
    subtract: 'pages/subtract.html',
    multiply: 'pages/multiply.html',
    divide: 'pages/divide.html',
    remainder: 'pages/remainder.html',
    between: 'pages/between.html',
  },
};

// Merge user preferences with defaults
CONFIG.mergePreferences = function(userPrefs) {
  return Object.assign({}, CONFIG, userPrefs);
};

export default CONFIG;
