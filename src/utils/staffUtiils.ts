// utils/staffUtils.ts
import { StaffFormData, StaffFormErrors } from '../types/staff';

export const validateStaffForm = (formData: StaffFormData): StaffFormErrors => {
  const errors: StaffFormErrors = {};

  if (!formData.id.trim()) {
    errors.id = 'Staff ID is required';
  } else if (formData.id.length < 3) {
    errors.id = 'Staff ID must be at least 3 characters';
  }

  if (!formData.name.trim()) {
    errors.name = 'Full name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.role) {
    errors.role = 'Role selection is required';
  }

  if (!formData.loginId.trim()) {
    errors.loginId = 'Login ID is required';
  } else if (formData.loginId.length < 3) {
    errors.loginId = 'Login ID must be at least 3 characters';
  } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.loginId)) {
    errors.loginId = 'Login ID can only contain letters, numbers, dots, hyphens, and underscores';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const generateStaffId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `STAFF${timestamp}${random}`;
};

export const formatRoleName = (role: string): string => {
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};