// routes/cashierRoutes.tsx

import { CashierLayout } from '@/components/layout/CashierLayout';
import CashierPOS from '@/pages/cashier/CashierPOS';
import SalesHistoryPage from '@/pages/cashier/SalesHistoryPage';
import ReportsPage from '@/pages/cashier/ReportsPage';
import ProfilePage from '@/pages/cashier/ProfilePage';


export const cashierRoutes = [
  {
    path: "/cashier",
    element: <CashierLayout />,
    children: [
      {
        index: true,
        element: <CashierPOS />
      },
      {
        path: "sales",
        element: <SalesHistoryPage />
      },
      {
        path: "reports",
        element: <ReportsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
       
    ]
  }
];