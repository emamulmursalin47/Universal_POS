// components/AddStaffModal.tsx
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { AddStaffModalProps, StaffFormData, StaffFormErrors } from '@/types/staff';
import { generateStaffId, validateStaffForm } from '@/utils/StaffValidation';
import { STAFF_ROLES } from '@/constants/staff';


const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<StaffFormData>({
    id: '',
    name: '',
    role: '',
    loginId: '',
    password: '',
    email: ''
  });

  const [errors, setErrors] = useState<StaffFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof StaffFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [errors]);

  const handleAutoGenerateId = useCallback(() => {
    const newId = generateStaffId();
    handleInputChange('id', newId);
  }, [handleInputChange]);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateStaffForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      
      // Reset form
      setFormData({
        id: '',
        name: '',
        role: '',
        loginId: '',
        password: '',
        email: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error saving staff member:', error);
      // Handle error (you could show a toast notification here)
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSave, onClose]);

  const handleClose = useCallback(() => {
    setFormData({
      id: '',
      name: '',
      role: '',
      loginId: '',
      password: '',
      email: ''
    });
    setErrors({});
    onClose();
  }, [onClose]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add New Staff Member</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-6">
            Fill in the details below to add a new staff member to your system.
          </p>

          <div className="space-y-4">
            {/* Staff ID and Login ID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Staff ID <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter staff ID"
                    value={formData.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    className={errors.id ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAutoGenerateId}
                    className="whitespace-nowrap"
                  >
                    Generate
                  </Button>
                </div>
                {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Login ID <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter login ID"
                  value={formData.loginId}
                  onChange={(e) => handleInputChange('loginId', e.target.value)}
                  className={errors.loginId ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.loginId && <p className="text-sm text-red-500">{errors.loginId}</p>}
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a role</option>
                {STAFF_ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              <p className="text-xs text-gray-500">
                Password must contain at least 6 characters with uppercase, lowercase, and numbers.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              type="button"
            >
              {isLoading ? 'Saving...' : 'Add Staff Member'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaffModal;