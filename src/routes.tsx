import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CatalogPage } from './pages/catalog/CatalogPage';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { CutFormPage } from './pages/dashboard/CutFormPage';
import { TeamPage } from './pages/team/TeamPage';
import { ShopPage } from './pages/shop/ShopPage';
import { ProfilePage } from './pages/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <CatalogPage /> },
      { path: '/equipe', element: <TeamPage /> },
      { path: '/sobre', element: <ShopPage /> },
      { path: '/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/admin', element: <DashboardPage /> },
          { path: '/admin/cortes/novo', element: <CutFormPage /> },
          { path: '/admin/cortes/:id', element: <CutFormPage /> },
          { path: '/admin/equipe', element: <TeamPage /> },
          { path: '/admin/perfil', element: <ProfilePage /> },
        ],
      },
    ],
  },
]);
