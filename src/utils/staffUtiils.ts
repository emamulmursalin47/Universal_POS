// utils/staffUtils.ts
import { StaffFormData, StaffFormErrors } from '../types/staff';

export const validateStaffForm = (formData: StaffFormData): StaffFormErrors => {
  const errors: StaffFormErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (formData.fullName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.contactNumber)) {
    errors.contactNumber = 'Please enter a valid contact number';
  } else if (formData.contactNumber.replace(/\D/g, '').length < 10) {
    errors.contactNumber = 'Contact number must be at least 10 digits';
  }

  if (!formData.address.trim()) {
    errors.address = 'Address is required';
  } else if (formData.address.length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }

  if (!formData.role) {
    errors.role = 'Role selection is required';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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

export const formatContactNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Format based on length (assuming different country formats)
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  return phoneNumber; // Return original if doesn't match expected patterns
};