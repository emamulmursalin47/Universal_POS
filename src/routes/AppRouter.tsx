
// AppRouter.tsx

import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routes } from '.';


const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};