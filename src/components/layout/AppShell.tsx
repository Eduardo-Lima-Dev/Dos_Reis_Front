import { Outlet, useLocation } from 'react-router-dom';
import { TabBar } from '../ui/TabBar';

const NO_TABBAR = ['/login', '/admin/cortes/novo', '/admin/cortes/'];

export function AppShell() {
  const { pathname } = useLocation();
  const showTabBar = !NO_TABBAR.some((p) => pathname.startsWith(p));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, paddingBottom: 20 }}>
        <Outlet />
      </div>
      {showTabBar && <TabBar />}
    </div>
  );
}
