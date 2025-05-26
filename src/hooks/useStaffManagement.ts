/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/useStaffManagement.ts
import { useState, useCallback, useMemo } from 'react';
import { Staff, StaffFormData, StaffRole } from '../types/staff';
import { MOCK_STAFF_DATA } from '../constants/staff';

interface UseStaffManagementReturn {
  staffList: Staff[];
  filteredStaff: Staff[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  addStaff: (staffData: StaffFormData) => Promise<boolean>;
  updateStaff: (staffId: string, updates: Partial<Staff>) => Promise<boolean>;
  deactivateStaff: (staffId: string) => Promise<boolean>;
  activateStaff: (staffId: string) => Promise<boolean>;
  deleteStaff: (staffId: string) => Promise<boolean>;
  getStaffById: (staffId: string) => Staff | undefined;
  getStaffByRole: (role: StaffRole) => Staff[];
  getActiveStaffCount: () => number;
  getTotalStaffCount: () => number;
}

export const useStaffManagement = (): UseStaffManagementReturn => {
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    return Object.values(MOCK_STAFF_DATA).filter(user => 
      user.role === 'cashier' || user.role === 'vendor_admin'
    );
  });
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized filtered staff list
  const filteredStaff = useMemo(() => {
    if (!searchTerm.trim()) return staffList;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return staffList.filter(staff => 
      staff.name.toLowerCase().includes(lowercaseSearch) ||
      staff.email.toLowerCase().includes(lowercaseSearch) ||
      staff.loginId.toLowerCase().includes(lowercaseSearch) ||
      staff.id.toLowerCase().includes(lowercaseSearch)
    );
  }, [staffList, searchTerm]);

  // Add new staff member
  const addStaff = useCallback(async (newStaffData: StaffFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation checks
      const existingId = staffList.find(staff => staff.id === newStaffData.id);
      if (existingId) {
        setError('Staff ID already exists');
        return false;
      }

      const existingLoginId = staffList.find(staff => staff.loginId === newStaffData.loginId);
      if (existingLoginId) {
        setError('Login ID already exists');
        return false;
      }

      const existingEmail = staffList.find(staff => staff.email === newStaffData.email);
      if (existingEmail) {
        setError('Email address already exists');
        return false;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newStaff: Staff = {
        id: newStaffData.id,
        name: newStaffData.name,
        email: newStaffData.email,
        role: newStaffData.role as StaffRole,
        loginId: newStaffData.loginId,
        password: newStaffData.password, // Should be hashed in real application
        avatar: null,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setStaffList(prev => [...prev, newStaff]);
      return true;
    } catch (err) {
      setError('Failed to add staff member');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [staffList]);

  // Update staff member
  const updateStaff = useCallback(async (staffId: string, updates: Partial<Staff>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setStaffList(prev =>
        prev.map(staff =>
          staff.id === staffId
            ? { ...staff, ...updates, updatedAt: new Date() }
            : staff
        )
      );
      return true;
    } catch (err) {
      setError('Failed to update staff member');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Deactivate staff member
  const deactivateStaff = useCallback(async (staffId: string): Promise<boolean> => {
    return updateStaff(staffId, { status: 'inactive' });
  }, [updateStaff]);

  // Activate staff member
  const activateStaff = useCallback(async (staffId: string): Promise<boolean> => {
    return updateStaff(staffId, { status: 'active' });
  }, [updateStaff]);

  // Delete staff member (soft delete by setting status)
  const deleteStaff = useCallback(async (staffId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setStaffList(prev => prev.filter(staff => staff.id !== staffId));
      return true;
    } catch (err) {
      setError('Failed to delete staff member');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get staff by ID
  const getStaffById = useCallback((staffId: string): Staff | undefined => {
    return staffList.find(staff => staff.id === staffId);
  }, [staffList]);

  // Get staff by role
  const getStaffByRole = useCallback((role: StaffRole): Staff[] => {
    return staffList.filter(staff => staff.role === role);
  }, [staffList]);

  // Get active staff count
  const getActiveStaffCount = useCallback((): number => {
    return staffList.filter(staff => staff.status === 'active').length;
  }, [staffList]);

  // Get total staff count
  const getTotalStaffCount = useCallback((): number => {
    return staffList.length;
  }, [staffList]);

  return {
    staffList,
    filteredStaff,
    searchTerm,
    isLoading,
    error,
    setSearchTerm,
    addStaff,
    updateStaff,
    deactivateStaff,
    activateStaff,
    deleteStaff,
    getStaffById,
    getStaffByRole,
    getActiveStaffCount,
    getTotalStaffCount
  };
};