// Helper functions for the application

/**
 * Format date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleDateString('es-ES', options);
};

/**
 * Calculate days remaining until a date
 * @param {Date} targetDate - Target date
 * @returns {number} Number of days remaining
 */
const daysRemaining = (targetDate) => {
  if (!targetDate) return 0;
  
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

/**
 * Generate a random password
 * @param {number} length - Length of the password
 * @returns {string} Random password
 */
const generateRandomPassword = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

module.exports = {
  formatDate,
  daysRemaining,
  generateRandomPassword
};