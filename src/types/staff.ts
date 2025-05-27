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

export interface StaffFormData {
  id: string;
  name: string;
  email: string;
  role: 'cashier' | 'vendor_admin' | '';
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