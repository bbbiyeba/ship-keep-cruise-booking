/**
 * Validation Utilities for Ship Keep Co Booking System
 * 
 * Security Best Practices Implemented:
 * 1. Input validation and sanitization
 * 2. Password strength requirements
 * 3. Email format verification (RFC 5322 compliant)
 * 4. Username character restrictions
 * 
 * Reference: https://web.dev/sign-up-form-best-practices/
 */

/**
 * Validates email address format
 * Uses simplified RFC 5322 regex pattern
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid format
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email regex - checks for user@domain.tld format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional checks
  const hasValidLength = email.length >= 5 && email.length <= 254;
  const noConsecutiveDots = !email.includes('..');
  const validFormat = emailRegex.test(email);
  
  return validFormat && hasValidLength && noConsecutiveDots;
};

/**
 * Validates username format
 * Requirements: 
 * - 3-20 characters
 * - Alphanumeric characters and underscores only
 * - No special characters to prevent injection attacks
 * 
 * @param {string} username - Username to validate
 * @returns {boolean} - True if username meets requirements
 */
export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  
  // Only allow alphanumeric and underscore
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  
  return usernameRegex.test(username);
};

/**
 * Validates password strength
 * Requirements (following NIST guidelines):
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * 
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets strength requirements
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  
  // Check minimum length
  if (password.length < 8) return false;
  
  // Check for at least one uppercase letter
  const hasUppercase = /[A-Z]/.test(password);
  
  // Check for at least one lowercase letter
  const hasLowercase = /[a-z]/.test(password);
  
  // Check for at least one number
  const hasNumber = /\d/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber;
};

/**
 * Gets password strength indicator
 * Useful for UI feedback
 * 
 * @param {string} password - Password to check
 * @returns {object} - Object with strength level and message
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { level: 0, message: 'Enter a password', color: '#6b7280' };
  }
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) {
    return { level: 1, message: 'Weak password', color: '#ef4444' };
  } else if (strength <= 4) {
    return { level: 2, message: 'Medium strength', color: '#f59e0b' };
  } else {
    return { level: 3, message: 'Strong password', color: '#10b981' };
  }
};

/**
 * Sanitizes string input to prevent XSS attacks
 * Removes potentially dangerous characters
 * 
 * @param {string} input - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates that two passwords match
 * Used for password confirmation
 * 
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} - True if passwords match
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword && password.length > 0;
};

/**
 * Validates a name field
 * Requirements:
 * - Not empty
 * - 2-50 characters
 * - Only letters, spaces, hyphens, and apostrophes
 * 
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is valid
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  
  // Check length
  if (trimmedName.length < 2 || trimmedName.length > 50) return false;
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  
  return nameRegex.test(trimmedName);
};

/**
 * Comprehensive form validation
 * Validates entire account creation form at once
 * 
 * @param {object} formData - Form data object
 * @returns {object} - Object with validation errors
 */
export const validateAccountForm = (formData) => {
  const errors = {};
  
  if (!validateUsername(formData.username)) {
    errors.username = 'Username must be 3-20 characters, alphanumeric and underscore only';
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  
  if (!passwordsMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};

/**
 * Validates booking form data
 * 
 * @param {object} bookingData - Booking form data
 * @returns {object} - Object with validation errors
 */
export const validateBookingForm = (bookingData) => {
  const errors = {};
  
  if (!validateName(bookingData.name)) {
    errors.name = 'Please enter a valid name (2-50 characters)';
  }
  
  if (!bookingData.departureDate) {
    errors.departureDate = 'Please select a departure date';
  }
  
  if (!bookingData.departureLocation) {
    errors.departureLocation = 'Please select a departure location';
  }
  
  if (!bookingData.arrivalDate) {
    errors.arrivalDate = 'Please select an arrival date';
  }
  
  // Validate that arrival is after departure
  if (bookingData.departureDate && bookingData.arrivalDate) {
    if (new Date(bookingData.arrivalDate) <= new Date(bookingData.departureDate)) {
      errors.arrivalDate = 'Arrival date must be after departure date';
    }
  }
  
  return errors;
};
