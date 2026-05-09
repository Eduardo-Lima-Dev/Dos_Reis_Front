import { useState } from 'react';
import { Wordmark } from '../../components/ui/Wordmark';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useUsers, useReceptionists } from '../../hooks/queries/useUsers';
import { useAuth } from '../../contexts/AuthContext';
import { CreateReceptionistModal } from './CreateReceptionistModal';
import type { User } from '../../types/api';

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

const ACCENT_COLORS = ['#c9a961', '#b89456', '#9c8048', '#d8d2c2', '#a8a397'];

export function TeamPage() {
  const { isAuthenticated } = useAuth();
  const { data: barbers = [], isLoading: loadingBarbers } = useUsers();
  const { data: receptionists = [], isLoading: loadingRecep } = useReceptionists();

  const allBarbers = barbers.filter((u) => u.role === 'barber');
  const allReceptionists = barbers.filter((u) => u.role === 'receptionist').concat(receptionists);
  const uniqueReceptionists = allReceptionists.filter(
    (u, i, arr) => arr.findIndex((x) => x.id === u.id) === i
  );

  const [isAddingReceptionist, setIsAddingReceptionist] = useState(false);

  return (
    <div className="pb-[30px]">
      <header
        className="flex justify-between items-center px-[22px] sm:px-8 md:px-12 pt-[10px] pb-[18px]"
        style={{ borderBottom: '1px solid var(--color-line-2)' }}
      >
        <Wordmark className="h-7" />
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: 'var(--color-gold)' }}>
          Equipe
        </div>
      </header>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[32px] pb-[10px]">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[10px]" style={{ color: 'var(--color-gold)' }}>
          Nossos profissionais
        </div>
        <h1
          className="m-0 text-[38px] leading-[1]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'var(--color-cream)',
            letterSpacing: '-0.02em',
          }}
        >
          A arte em boas mãos.
        </h1>
      </section>

      {/* Barbers */}
      <section className="pt-[28px]">
        <SectionHeader kicker={`${allBarbers.length} barbeiros`} title="Barbeiros" />
        <div className="px-[22px] sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {loadingBarbers
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[72px]" style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line-2)' }} />
              ))
            : allBarbers.map((user, i) => (
                <TeamMemberCard key={user.id} user={user} accent={ACCENT_COLORS[i % ACCENT_COLORS.length]} />
              ))}
        </div>
      </section>

      {/* Receptionists — only visible when authenticated */}
      {isAuthenticated && (
        <section className="pt-[32px]">
          <SectionHeader
            kicker={`${uniqueReceptionists.length} recepcionistas`}
            title="Recepção"
            action={
              <button
                onClick={() => setIsAddingReceptionist(true)}
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                + Adicionar
              </button>
            }
          />
          <div className="px-[22px] sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {loadingRecep
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-[72px]" style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line-2)' }} />
                ))
              : uniqueReceptionists.map((user, i) => (
                  <TeamMemberCard key={user.id} user={user} accent={ACCENT_COLORS[(i + 3) % ACCENT_COLORS.length]} />
                ))}
          </div>
        </section>
      )}

      {isAddingReceptionist && (
        <CreateReceptionistModal onClose={() => setIsAddingReceptionist(false)} />
      )}
    </div>
  );
}

function TeamMemberCard({ user, accent }: { user: User; accent: string }) {
  const initials = getInitials(user.name);
  return (
    <div
      className="flex items-center gap-[14px] p-[14px_16px] card"
      style={{}}
    >
      <div
        className="w-[48px] h-[48px] rounded-full shrink-0 flex items-center justify-center text-[16px] font-semibold"
        style={{
          background: `linear-gradient(135deg, ${accent}, #8c6f3a)`,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          color: 'var(--color-ink)',
        }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px]" style={{ color: 'var(--color-cream)', fontWeight: 500 }}>
          {user.name}
        </div>
        <div
          className="font-mono text-[9px] tracking-[0.18em] uppercase mt-[3px]"
          style={{ color: user.role === 'barber' ? 'var(--color-gold)' : 'var(--color-cream-3)' }}
        >
          {user.role === 'barber' ? 'Barbeiro' : 'Recepção'}
        </div>
      </div>
    </div>
  );
}
