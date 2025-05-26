// types/staff.ts
export interface Staff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  loginId: string;
  password: string;
  avatar?: string | null;
  status?: StaffStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type StaffRole = 'cashier' | 'vendor_admin';

export type StaffStatus = 'active' | 'inactive' | 'suspended';

export interface StaffFormData {
  id: string;
  name: string;
  email: string;
  role: StaffRole | '';
  loginId: string;
  password: string;
}

export interface StaffFormErrors {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  loginId?: string;
  password?: string;
}

export interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffData: StaffFormData) => void;
}

export interface StaffTableProps {
  staff: Staff[];
  onEdit: (staffId: string) => void;
  onDeactivate: (staffId: string) => void;
}

export interface RoleOption {
  value: StaffRole;
  label: string;
}