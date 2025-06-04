// types/staff.ts
export interface Staff {
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

export type StaffTypesNew = {
  _id: string;
  userId: string;
  user: string;
  email: string;
  vendorId: string;
  fullName: string;
  contactNumber: string;
  address: string;
  databaseName: string;
  role: 'admin' | 'manager' | 'staff';
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface StaffFormData {
  email: string;
  fullName: string;
  contactNumber: string;
  address: string;
  password: string;
  role: string;
}

export interface StaffFormErrors {
  email?: string;
  fullName?: string;
  contactNumber?: string;
  address?: string;
  password?: string;
  role?: string;
}