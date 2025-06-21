import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StaffFormData, StaffFormErrors, StaffTypesNew } from '@/types/staff';
import { validateStaffForm } from '@/utils/staffUtiils';
import axios from 'axios';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffTypesNew | null;
  // onUpdate: (staff: StaffTypesNew) => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  staff,
  // onUpdate
}) => {
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: '',
    email: '',
    role: '',
    contactNumber: '',
    address: '',
    // password: '',
    status: '',
  });

  const [errors, setErrors] = useState<StaffFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (staff && isOpen) {
      setFormData({
        fullName: staff.fullName,
        email: staff.email,
        role: staff.role,
        contactNumber: staff.contactNumber || '',
        address: staff.address || '',
        // password: '', // Password is not typically pre-filled
        status: staff.status || 'active',
      });
    }
  }, [staff, isOpen]);

  const handleInputChange = useCallback((field: keyof StaffFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // if (errors[field]) {
    //   setErrors(prev => ({
    //     ...prev,
    //     [field]: undefined
    //   }));
    // }
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateStaffForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!staff) return;
      const updatedStaff: StaffFormData = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        address: formData.address,
      };
      // console.log('id', staff?.user);
      const response = await axios.patch(`/api/v1/shop-role/update-staff/${staff.user}`, updatedStaff, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      })
      console.log(response);
      onClose();
    } catch (error) {
      console.error('Error updating staff member:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, staff, onClose]);

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

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Role */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role <span className="text-red-500">*</span></label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a role</option>
                
              </select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div> */}

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <Input
                placeholder="Enter contact number"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <Input
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            {/* Status */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div> */}

            {/* Password */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div> */}
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
