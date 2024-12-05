class FormValidation {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  }

  static validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
  }

  static validateRequired(value) {
    return value.trim() !== "";
  }

  static validatePhone(phone) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  }

  static validateDate(date) {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }
}

export default FormValidation;
