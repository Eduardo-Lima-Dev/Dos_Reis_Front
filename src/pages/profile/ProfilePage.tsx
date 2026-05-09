import { useNavigate } from 'react-router-dom';
import { Wordmark } from '../../components/ui/Wordmark';
import { BigStat } from '../../components/ui/BigStat';
import { useAuth } from '../../contexts/AuthContext';
import { useHaircuts } from '../../hooks/queries/useHaircuts';
import { ChevronRight } from 'lucide-react';

const PROFILE_ITEMS = [
  'Editar perfil',
  'Configurar horários',
  'Notificações',
  'Política de cancelamento',
  'Suporte',
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { logout, profile } = useAuth();
  const { data: cuts = [] } = useHaircuts();

  const email = profile?.email ?? '';
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="pb-[40px]">
      <header
        className="flex justify-between items-center px-[22px] sm:px-8 md:px-12 pt-[10px] pb-[18px]"
        style={{ borderBottom: '1px solid var(--color-line-2)' }}
      >
        <Wordmark className="h-7" />
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: 'var(--color-gold)' }}>
          Perfil
        </div>
      </header>

      <section className="pt-[36px] pb-0 text-center px-[22px] sm:px-8 md:px-12">
        <div
          className="w-[100px] h-[100px] mx-auto rounded-full flex items-center justify-center text-[38px] font-semibold"
          style={{
            background: 'linear-gradient(135deg, #c9a961, #8c6f3a)',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--color-ink)',
            border: '1px solid var(--color-line)',
          }}
        >
          {initial}
        </div>
        <h1
          className="m-0 mt-[20px] text-[32px] leading-[1]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--color-cream)',
          }}
        >
          {email}
        </h1>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase mt-[10px]" style={{ color: 'var(--color-gold)' }}>
          Barbeiro
        </div>
      </section>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[32px]">
        <div
          className="grid grid-cols-3"
          style={{ border: '1px solid var(--color-line)', background: 'var(--color-ink-2)', borderRadius: 'var(--radius)', overflow: 'hidden' }}
        >
          <BigStat label="Cortes" value={cuts.length} />
          <BigStat label="Função" value="Barb." small divider />
          <BigStat label="Acesso" value="Admin" small />
        </div>
      </section>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[30px] flex flex-col gap-[8px]">
        {PROFILE_ITEMS.map((item) => (
          <button
            key={item}
            className="flex justify-between items-center px-[18px] py-[16px] text-[14px] text-left card card-hover w-full"
            style={{ color: 'var(--color-cream)' }}
          >
            <span>{item}</span>
            <ChevronRight size={16} style={{ color: 'var(--color-cream-3)' }} />
          </button>
        ))}
      </section>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[30px]">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="btn-danger"
        >
          Sair da conta
        </button>
      </section>
    </div>
  );
}
