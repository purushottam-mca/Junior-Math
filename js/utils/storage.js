/**
 * Local Storage Management Module
 * Handles all localStorage operations for the application
 */

class StorageManager {
  constructor() {
    this.isAvailable = this.checkLocalStorageAvailability();
  }

  /**
   * Check if localStorage is available
   */
  checkLocalStorageAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('LocalStorage is not available');
      return false;
    }
  }

  /**
   * Save data to localStorage
   */
  setItem(key, value) {
    if (!this.isAvailable) {
      console.warn('LocalStorage not available. Data not saved.');
      return false;
    }
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.error(`Error saving to localStorage: ${e}`);
      return false;
    }
  }

  /**
   * Get data from localStorage
   */
  getItem(key, parseJson = true) {
    if (!this.isAvailable) {
      return null;
    }
    try {
      const item = localStorage.getItem(key);
      return item && parseJson ? JSON.parse(item) : item;
    } catch (e) {
      console.error(`Error reading from localStorage: ${e}`);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key) {
    if (!this.isAvailable) {
      return false;
    }
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing from localStorage: ${e}`);
      return false;
    }
  }

  /**
   * Clear all localStorage data
   */
  clear() {
    if (!this.isAvailable) {
      return false;
    }
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error(`Error clearing localStorage: ${e}`);
      return false;
    }
  }

  /**
   * Get all keys in localStorage
   */
  getAllKeys() {
    if (!this.isAvailable) {
      return [];
    }
    return Object.keys(localStorage);
  }

  /**
   * Update user statistics
   */
  updateStats(operationType, isCorrect) {
    const stats = this.getItem('junior_math_stats') || {};
    
    if (!stats[operationType]) {
      stats[operationType] = { correct: 0, incorrect: 0, total: 0 };
    }

    stats[operationType].total++;
    if (isCorrect) {
      stats[operationType].correct++;
    } else {
      stats[operationType].incorrect++;
    }

    this.setItem('junior_math_stats', stats);
    return stats[operationType];
  }

  /**
   * Get user statistics
   */
  getStats(operationType = null) {
    const stats = this.getItem('junior_math_stats') || {};
    return operationType ? stats[operationType] : stats;
  }

  /**
   * Get user profile
   */
  getProfile() {
    return this.getItem('junior_math_user');
  }

  /**
   * Save user profile
   */
  setProfile(profile) {
    return this.setItem('junior_math_user', profile);
  }

  /**
   * Get preferences
   */
  getPreferences() {
    return this.getItem('junior_math_preferences') || {};
  }

  /**
   * Update preferences
   */
  updatePreferences(preferences) {
    const current = this.getPreferences();
    const updated = Object.assign({}, current, preferences);
    return this.setItem('junior_math_preferences', updated);
  }
}

export default new StorageManager();
