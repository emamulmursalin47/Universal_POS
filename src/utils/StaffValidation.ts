// utils/staffValidation.ts
import { StaffFormData, StaffFormErrors } from '../types/staff';
import { VALIDATION_RULES } from '../constants/staff';

export const validateStaffForm = (formData: StaffFormData): StaffFormErrors => {
  const errors: StaffFormErrors = {};

  // Validate ID
  if (!formData.id.trim()) {
    errors.id = 'Staff ID is required';
  } else if (formData.id.length < 3) {
    errors.id = 'Staff ID must be at least 3 characters';
  }

  // Validate Name
  if (!formData.name.trim()) {
    errors.name = 'Full name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate Email
  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate Role
  if (!formData.role) {
    errors.role = 'Role selection is required';
  }

  // Validate Login ID
  if (!formData.loginId.trim()) {
    errors.loginId = 'Login ID is required';
  } else if (formData.loginId.length < 3) {
    errors.loginId = 'Login ID must be at least 3 characters';
  } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.loginId)) {
    errors.loginId = 'Login ID can only contain letters, numbers, dots, hyphens, and underscores';
  }

  // Validate Password
  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return errors;
};

export const isValidStaffForm = (formData: StaffFormData): boolean => {
  const errors = validateStaffForm(formData);
  return Object.keys(errors).length === 0;
};

export const formatRoleName = (role: string): string => {
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const generateStaffId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `STAFF${timestamp}${random}`;
};