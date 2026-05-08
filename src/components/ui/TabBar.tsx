import { useLocation, useNavigate } from 'react-router-dom';
import { Grid2X2, Info, LogIn, LayoutDashboard, Plus, Users, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const clientTabs = [
  { id: 'catalog', label: 'Catálogo', path: '/', Icon: Grid2X2 },
  { id: 'shop', label: 'Sobre', path: '/sobre', Icon: Info },
  { id: 'login', label: 'Entrar', path: '/login', Icon: LogIn },
];

const barberTabs = [
  { id: 'dashboard', label: 'Meus Cortes', path: '/admin', Icon: LayoutDashboard },
  { id: 'new-cut', label: 'Novo', path: '/admin/cortes/novo', Icon: Plus },
  { id: 'team', label: 'Equipe', path: '/admin/equipe', Icon: Users },
  { id: 'profile', label: 'Perfil', path: '/admin/perfil', Icon: User },
];

export function TabBar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = isAuthenticated ? barberTabs : clientTabs;
  const activeId = tabs.find((t) => t.path === location.pathname)?.id;

  return (
    <nav
      style={{
        position: 'sticky',
        bottom: 0,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--color-line-2)',
        paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        paddingTop: 10,
        zIndex: 50,
        display: 'grid',
        gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
      }}
    >
      {tabs.map(({ id, label, path, Icon }) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 py-[6px] transition-colors duration-150"
            style={{ color: active ? 'var(--color-gold)' : 'var(--color-cream-3)' }}
          >
            <Icon size={20} className="sm:w-6 sm:h-6" strokeWidth={1.4} />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
