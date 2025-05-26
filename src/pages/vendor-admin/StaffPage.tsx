import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Users, TrendingUp, TrendingDown, UserCheck, UserX, Edit, Trash2, Eye, EyeOff, Filter } from 'lucide-react';

// Types
interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'cashier' | 'vendor_admin';
  loginId: string;
  password: string;
  avatar?: string | null;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

interface StaffFormData {
  id: string;
  name: string;
  email: string;
  role: 'cashier' | 'vendor_admin' | '';
  loginId: string;
  password: string;
}

interface StaffFormErrors {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  loginId?: string;
  password?: string;
}

// Mock Data
const MOCK_STAFF_DATA: Staff[] = [
  {
    id: 'staff1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'cashier',
    loginId: 'john.doe',
    password: 'hashedPassword123',
    avatar: null,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'staff2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'vendor_admin',
    loginId: 'jane.smith',
    password: 'hashedPassword456',
    avatar: null,
    status: 'active',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'staff3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'cashier',
    loginId: 'mike.johnson',
    password: 'hashedPassword789',
    avatar: null,
    status: 'inactive',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

const STAFF_ROLES = [
  { value: 'cashier', label: 'Cashier' },
  { value: 'vendor_admin', label: 'Vendor Admin' }
];

// Validation utility
const validateStaffForm = (formData: StaffFormData): StaffFormErrors => {
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

const generateStaffId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `STAFF${timestamp}${random}`;
};

const formatRoleName = (role: string): string => {
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// AddStaffModal Component
const AddStaffModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffData: StaffFormData) => void;
}> = ({ isOpen, onClose, onSave }) => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Staff Member</h2>

          <div className="space-y-4">
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
                    className={errors.id ? 'border-red-500' : ''}
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
                  className={errors.loginId ? 'border-red-500' : ''}
                />
                {errors.loginId && <p className="text-sm text-red-500">{errors.loginId}</p>}
              </div>
            </div>

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
              {isLoading ? 'Saving...' : 'Add Staff Member'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// EditStaffModal Component
const EditStaffModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onUpdate: (staff: Staff) => void;
}> = ({ isOpen, onClose, staff, onUpdate }) => {
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

  React.useEffect(() => {
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Staff ID</label>
                <Input
                  value={formData.id}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Login ID <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter login ID"
                  value={formData.loginId}
                  onChange={(e) => handleInputChange('loginId', e.target.value)}
                  className={errors.loginId ? 'border-red-500' : ''}
                />
                {errors.loginId && <p className="text-sm text-red-500">{errors.loginId}</p>}
              </div>
            </div>

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

// StaffTable Component
const StaffTable: React.FC<{
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onToggleStatus: (staffId: string) => void;
  onDelete: (staffId: string) => void;
}> = ({ staff, onEdit, onToggleStatus, onDelete }) => {
  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or add a new staff member.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-900">Name</th>
              <th className="text-left p-4 font-medium text-gray-900">Email</th>
              <th className="text-left p-4 font-medium text-gray-900">Role</th>
              <th className="text-left p-4 font-medium text-gray-900">Login ID</th>
              <th className="text-left p-4 font-medium text-gray-900">Status</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{staffMember.name}</span>
                      <div className="text-xs text-gray-500">ID: {staffMember.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{staffMember.email}</td>
                <td className="p-4">
                  <span className="capitalize text-gray-700">
                    {formatRoleName(staffMember.role)}
                  </span>
                </td>
                <td className="p-4 text-gray-700 font-mono text-sm">{staffMember.loginId}</td>
                <td className="p-4">
                  {getStatusBadge(staffMember.status)}
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit(staffMember)}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onToggleStatus(staffMember.id)}
                      className={`${staffMember.status === 'active' 
                        ? 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300' 
                        : 'text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      {staffMember.status === 'active' ? (
                        <>
                          <UserX className="h-3 w-3 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDelete(staffMember.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main StaffPage Component
const StaffPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    return MOCK_STAFF_DATA.filter(user => 
      user.role === 'cashier' || user.role === 'vendor_admin'
    );
  });

  // Enhanced filtering logic
  const filteredStaff = useMemo(() => {
    return staffList.filter(staff => {
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.loginId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'active' && staff.status === 'active') ||
        (statusFilter === 'inactive' && staff.status === 'inactive');
      
      return matchesSearch && matchesStatus;
    });
  }, [staffList, searchTerm, statusFilter]);

  // Calculate comprehensive statistics
  const stats = {
    total: staffList.length,
    active: staffList.filter(staff => staff.status === 'active').length,
    inactive: staffList.filter(staff => staff.status === 'inactive').length,
    cashiers: staffList.filter(staff => staff.role === 'cashier').length,
    vendorAdmins: staffList.filter(staff => staff.role === 'vendor_admin').length
  };

  const handleAddStaff = useCallback((newStaffData: StaffFormData) => {
    // Check for existing data
    const existingStaff = staffList.find(staff => staff.id === newStaffData.id);
    if (existingStaff) {
      alert('Staff ID already exists. Please use a unique ID.');
      return;
    }

    const existingLoginId = staffList.find(staff => staff.loginId === newStaffData.loginId);
    if (existingLoginId) {
      alert('Login ID already exists. Please use a unique login ID.');
      return;
    }

    const existingEmail = staffList.find(staff => staff.email === newStaffData.email);
    if (existingEmail) {
      alert('Email address already exists. Please use a unique email address.');
      return;
    }

    const newStaffMember: Staff = {
      id: newStaffData.id,
      name: newStaffData.name,
      email: newStaffData.email,
      role: newStaffData.role as Staff['role'],
      loginId: newStaffData.loginId,
      password: newStaffData.password,
      avatar: null,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setStaffList(prev => [...prev, newStaffMember]);
    alert(`Staff member "${newStaffMember.name}" added successfully!`);
  }, [staffList]);

  const handleEditStaff = useCallback((staff: Staff) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  }, []);

  const handleUpdateStaff = useCallback((updatedStaff: Staff) => {
    setStaffList(prev => 
      prev.map(staff => 
        staff.id === updatedStaff.id ? updatedStaff : staff
      )
    );
    alert(`Staff member "${updatedStaff.name}" updated successfully!`);
  }, []);

  const handleToggleStatus = useCallback((staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const action = staff.status === 'active' ? 'deactivate' : 'activate';
    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${staff.name}"?`
    );
    
    if (confirmed) {
      setStaffList(prev => 
        prev.map(staff => 
          staff.id === staffId 
            ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active', updatedAt: new Date() }
            : staff
        )
      );
      alert(`${staff.name} has been ${action}d successfully.`);
    }
  }, [staffList]);

  const handleDeleteStaff = useCallback((staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${staff.name}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      setStaffList(prev => prev.filter(s => s.id !== staffId));
      alert(`${staff.name} has been deleted successfully.`);
    }
  }, [staffList]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Staff Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive management system for staff members and their access levels
            </p>
          </div>
          
          {/* Add Button */}
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Add Staff</span>
            <span className="hidden sm:inline">Add New Staff Member</span>
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {/* Primary Stats */}
          <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Total Staff
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {stats.active}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Active
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-600">
                    {stats.inactive}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Inactive
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-orange-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {stats.cashiers}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Cashiers
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          {/* Additional Stats for larger screens */}
          <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 hidden xl:block">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {stats.vendorAdmins}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Admins
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                All Staff Members ({filteredStaff.length})
              </CardTitle>
              
              {/* Quick Stats Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {stats.active} Active
                </div>
                <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {stats.inactive} Inactive
                </div>
                <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {stats.cashiers} Cashiers
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            
            {/* Enhanced Search and Filter Section */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, login ID, or staff ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {/* Status Filter */}
                <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                  
                  {(searchTerm || statusFilter !== 'all') && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="px-4 py-2"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
                <div>
                  Showing <span className="font-semibold text-gray-900">{filteredStaff.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{staffList.length}</span> staff members
                  {searchTerm && (
                    <span> matching "<span className="font-medium text-blue-600">{searchTerm}</span>"</span>
                  )}
                </div>
                
                {/* Mobile Quick Filters */}
                <div className="flex gap-2 sm:hidden">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                    className="text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('active')}
                    className="text-xs"
                  >
                    Active
                  </Button>
                  <Button
                    variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('inactive')}
                    className="text-xs"
                  >
                    Inactive
                  </Button>
                </div>
              </div>
            </div>

            {/* Staff Table */}
            <div className="hidden sm:block">
              <StaffTable
                staff={filteredStaff}
                onEdit={handleEditStaff}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteStaff}
              />
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <Card key={staff.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{staff.name}</h3>
                          <p className="text-sm text-gray-500">{staff.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        staff.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {staff.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Role:</span>
                        <span className="font-medium">{formatRoleName(staff.role)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Login ID:</span>
                        <span className="font-mono">{staff.loginId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Staff ID:</span>
                        <span className="font-mono">{staff.id}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditStaff(staff)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(staff.id)}
                        className={`flex-1 ${staff.status === 'active' 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-green-500 hover:text-green-600'
                        }`}
                      >
                        {staff.status === 'active' ? (
                          <>
                            <UserX className="h-3 w-3 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-sm mx-auto">
                    <div className="rounded-full bg-gray-100 h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No staff members found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== 'all'
                        ? 'Try adjusting your search terms or filters to see more results.'
                        : 'Get started by adding your first staff member to begin managing your team.'
                      }
                    </p>
                    {(!searchTerm && statusFilter === 'all') && (
                      <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Staff Member
                      </Button>
                    )}
                    {(searchTerm || statusFilter !== 'all') && (
                      <Button onClick={clearFilters} variant="outline">
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Empty State for Desktop */}
            {filteredStaff.length === 0 && (
              <div className="hidden sm:block text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="rounded-full bg-gray-100 h-20 w-20 mx-auto mb-8 flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No staff members found</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search terms or filters to see more results.'
                      : 'Get started by adding your first staff member to begin managing your team.'
                    }
                  </p>
                  {(!searchTerm && statusFilter === 'all') ? (
                    <Button onClick={() => setIsAddModalOpen(true)} size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Staff Member
                    </Button>
                  ) : (
                    <Button onClick={clearFilters} size="lg" variant="outline">
                      <Filter className="h-5 w-5 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddStaff}
      />
      
      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={selectedStaff}
        onUpdate={handleUpdateStaff}
      />
    </div>
  );
};

export default StaffPage;