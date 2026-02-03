/**
 * Authentication Module
 * Handles user authentication and session management
 */

import StorageManager from './storage.js';

class AuthManager {
  constructor() {
    this.currentUser = this.loadUser();
  }

  /**
   * Register a new user
   */
  register(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    const user = {
      id: this.generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: this.hashPassword(password),
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true,
    };

    // In a real app, this would be sent to a backend
    // For now, we'll store in localStorage
    if (StorageManager.setProfile(user)) {
      this.currentUser = user;
      return { success: true, user: this.sanitizeUser(user) };
    }

    return { success: false, message: 'Registration failed' };
  }

  /**
   * Login user
   */
  login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    const storedUser = StorageManager.getProfile();
    
    if (!storedUser || storedUser.email !== email.toLowerCase()) {
      return { success: false, message: 'Invalid credentials' };
    }

    if (!this.verifyPassword(password, storedUser.password)) {
      return { success: false, message: 'Invalid credentials' };
    }

    storedUser.lastLogin = new Date().toISOString();
    StorageManager.setProfile(storedUser);
    this.currentUser = storedUser;

    return { success: true, user: this.sanitizeUser(storedUser) };
  }

  /**
   * Logout user
   */
  logout() {
    this.currentUser = null;
    StorageManager.removeItem('junior_math_session');
    return { success: true, message: 'Logged out successfully' };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser ? this.sanitizeUser(this.currentUser) : null;
  }

  /**
   * Load user from storage
   */
  loadUser() {
    const profile = StorageManager.getProfile();
    return profile && profile.isActive ? profile : null;
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Hash password (basic implementation - use bcrypt in production)
   */
  hashPassword(password) {
    // WARNING: This is a basic hash for demo purposes
    // Use proper hashing library (bcrypt) in production!
    return Buffer.from(password).toString('base64');
  }

  /**
   * Verify password
   */
  verifyPassword(password, hash) {
    return this.hashPassword(password) === hash;
  }

  /**
   * Remove sensitive data from user object
   */
  sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Update user profile
   */
  updateProfile(updates) {
    if (!this.currentUser) {
      return { success: false, message: 'No user logged in' };
    }

    const updated = Object.assign({}, this.currentUser, updates);
    if (StorageManager.setProfile(updated)) {
      this.currentUser = updated;
      return { success: true, user: this.sanitizeUser(updated) };
    }

    return { success: false, message: 'Update failed' };
  }
}

export default new AuthManager();
