// data/mockShops.ts
import { Shop } from '@/types/shop';

export const MOCK_SHOPS: Shop[] = [
  {
    id: 1,
    name: "Tech Solutions Co.",
    email: "contact@techsolutions.com",
    contact: "+1 (555) 123-4567",
    subscriptionPlan: "premium",
    subscriptionStatus: "active",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    deadline: "2024-07-15T00:00:00Z",
    lastUpdated: "2024-03-10T00:00:00Z"
  },
  {
    id: 2,
    name: "Digital Marketing Hub",
    email: "info@digitalmarketing.com",
    contact: "+1 (555) 987-6543",
    subscriptionPlan: "basic",
    subscriptionStatus: "active",
    isActive: true,
    createdAt: "2024-02-20T00:00:00Z",
    deadline: "2024-08-20T00:00:00Z"
  },
  {
    id: 3,
    name: "Creative Design Studio",
    email: "hello@creativedesign.com",
    contact: "+1 (555) 456-7890",
    subscriptionPlan: "standard",
    subscriptionStatus: "expired",
    isActive: false,
    createdAt: "2024-03-10T00:00:00Z",
    deadline: "2024-06-10T00:00:00Z",
    lastUpdated: "2024-06-10T00:00:00Z"
  },
  {
    id: 4,
    name: "E-commerce Plus",
    email: "support@ecommerceplus.com",
    contact: "+1 (555) 321-0987",
    subscriptionPlan: "premium",
    subscriptionStatus: "trial",
    isActive: true,
    createdAt: "2024-04-05T00:00:00Z",
    deadline: "2024-10-05T00:00:00Z"
  },
  {
    id: 5,
    name: "Local Retail Store",
    email: "manager@localretail.com",
    contact: "+1 (555) 654-3210",
    subscriptionPlan: "basic",
    subscriptionStatus: "active",
    isActive: false,
    createdAt: "2024-03-25T00:00:00Z",
    deadline: "2024-09-25T00:00:00Z",
    lastUpdated: "2024-05-15T00:00:00Z"
  }
];