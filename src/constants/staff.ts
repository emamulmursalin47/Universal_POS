// constants/staff.ts
import { Staff } from '../types/staff';

export const MOCK_STAFF_DATA: Staff[] = [
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

export const STAFF_ROLES = [
  { value: 'cashier', label: 'Cashier' },
  { value: 'vendor_admin', label: 'Vendor Admin' }
] as const;