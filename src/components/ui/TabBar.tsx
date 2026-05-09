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
        background: 'rgba(14,13,12,0.97)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-line-2)',
        borderRadius: '20px 20px 0 0',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        paddingTop: 8,
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
            className="flex flex-col items-center gap-[5px] py-[6px] transition-all duration-150 relative"
            style={{ color: active ? 'var(--color-gold)' : 'var(--color-cream-3)' }}
          >
            {active && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 28,
                  height: 2,
                  background: 'var(--color-gold)',
                  borderRadius: '0 0 2px 2px',
                }}
              />
            )}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 30,
                borderRadius: 8,
                background: active ? 'rgba(201,169,97,0.12)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.4} />
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
