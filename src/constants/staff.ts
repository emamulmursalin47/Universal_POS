// constants/staff.ts
import { RoleOption, Staff } from '../types/staff';

export const STAFF_ROLES: RoleOption[] = [
  { value: 'cashier', label: 'Cashier' },
  { value: 'vendor_admin', label: 'Vendor Admin' }
];

export const MOCK_STAFF_DATA: Record<string, Staff> = {
  staff1: {
    id: 'staff1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'cashier',
    loginId: 'john.doe',
    password: 'hashedPassword123', // In real app, this should be hashed
    avatar: null,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  staff2: {
    id: 'staff2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'vendor_admin',
    loginId: 'jane.smith',
    password: 'hashedPassword456', // In real app, this should be hashed
    avatar: null,
    status: 'active',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  staff3: {
    id: 'staff3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'cashier',
    loginId: 'mike.johnson',
    password: 'hashedPassword789', // In real app, this should be hashed
    avatar: null,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  REQUIRED_FIELDS: ['id', 'name', 'email', 'role', 'loginId', 'password'] as const
} as const;