// components/EditStaffModal.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Staff, StaffFormData, StaffFormErrors } from '@/types/staff';
import { validateStaffForm } from '@/utils/staffUtiils';
import { STAFF_ROLES } from '@/constants/staff';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onUpdate: (staff: Staff) => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  staff,
  onUpdate
}) => {
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

  useEffect(() => {
    if (staff && isOpen) {
      setFormData({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        loginId: staff.loginId,
        password: staff.password
      });
    }
  }, [staff, isOpen]);

  const handleInputChange = useCallback((field: keyof StaffFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateStaffForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedStaff: Staff = {
        ...staff!,
        name: formData.name,
        email: formData.email,
        role: formData.role as Staff['role'],
        loginId: formData.loginId,
        password: formData.password,
        updatedAt: new Date()
      };
      
      onUpdate(updatedStaff);
      onClose();
    } catch (error) {
      console.error('Error updating staff member:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, staff, onUpdate, onClose]);

  const handleClose = useCallback(() => {
    setErrors({});
    onClose();
  }, [onClose]);

  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Staff Member</h2>

          <div className="space-y-4">
           

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Staff Member'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStaffModal;