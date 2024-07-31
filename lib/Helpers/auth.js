import { publicEmailDomains } from './publicEmailDomains';

// Enhanced validateEmail function with public email domain validation
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;

  const domain = email.split('@')[1];
  return publicEmailDomains.includes(domain);
};

export const isPasswordValid = (password) => {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!-/:-@[-`{-~]/.test(password); 

  return { hasMinLength, hasNumber, hasSpecialChar };
};