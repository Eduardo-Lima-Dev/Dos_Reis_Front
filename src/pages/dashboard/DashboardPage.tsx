import { useNavigate } from 'react-router-dom';
import { Wordmark } from '../../components/ui/Wordmark';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CutPlaceholder } from '../../components/ui/CutPlaceholder';
import { BigStat } from '../../components/ui/BigStat';
import { useHaircuts } from '../../hooks/queries/useHaircuts';
import { useAuth } from '../../contexts/AuthContext';
import { fmtMoney, fmtMin } from '../../lib/formatters';
import type { Haircut } from '../../types/api';

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout, profile } = useAuth();
  const { data: allCuts = [], isLoading } = useHaircuts();

  const avgDuration = allCuts.length
    ? Math.round(allCuts.reduce((s, c) => s + c.duration, 0) / allCuts.length)
    : 0;

  const minPrice = allCuts.length
    ? fmtMoney(Math.min(...allCuts.map((c) => c.price)))
    : '—';

  return (
    <div>
      {/* Header */}
      <header
        className="flex justify-between items-center px-[22px] pt-[10px] pb-[18px]"
        style={{ borderBottom: '1px solid var(--color-line-2)' }}
      >
        <Wordmark className="h-7" />
        <button
          onClick={logout}
          className="font-mono text-[9px] tracking-[0.22em] uppercase px-[10px] py-[6px] rounded-full"
          style={{ color: 'var(--color-cream-3)', border: '1px solid var(--color-line-2)' }}
        >
          Sair
        </button>
      </header>

      {/* User strip */}
      <section className="px-[22px] pt-[26px] pb-[22px]">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[8px]" style={{ color: 'var(--color-gold)' }}>
          Painel · Barbeiro
        </div>
        <h1
          className="m-0 text-[38px] leading-[1]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-cream)',
          }}
        >
          Olá, {profile?.email?.split('@')[0] ?? 'Barbeiro'}.
        </h1>
        <p className="mt-[12px] text-[13px] leading-[1.5]" style={{ color: 'var(--color-cream-3)' }}>
          Gerencie o catálogo de cortes, preços e tempos.
        </p>
      </section>

      {/* Stats */}
      <section className="px-[22px]">
        <div
          className="grid grid-cols-3"
          style={{ border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}
        >
          <BigStat label="Cortes" value={allCuts.length} />
          <BigStat label="A partir de" value={minPrice} small divider />
          <BigStat label="Tempo médio" value={`${avgDuration}min`} small />
        </div>
      </section>

      {/* Cuts list */}
      <section className="pt-[32px]">
        <SectionHeader
          kicker={`${allCuts.length} cadastrados`}
          title="Cortes"
          action={
            <button
              onClick={() => navigate('/admin/cortes/novo')}
              className="font-mono text-[10px] tracking-[0.22em] uppercase px-[12px] py-[8px] font-semibold"
              style={{ background: 'var(--color-gold)', color: 'var(--color-ink)' }}
            >
              + Novo
            </button>
          }
        />

        <div className="px-[22px] flex flex-col gap-[12px]">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[80px] rounded-none" style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line-2)' }} />
              ))
            : allCuts.map((cut) => (
                <DashboardCutRow
                  key={cut.id}
                  cut={cut}
                  onClick={() => navigate(`/admin/cortes/${cut.id}`)}
                />
              ))}

          {!isLoading && allCuts.length === 0 && (
            <div
              className="py-[40px] text-center"
              style={{
                border: '1px dashed var(--color-line)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--color-cream-3)',
              }}
            >
              Nenhum corte cadastrado ainda.
              <br />
              <button
                onClick={() => navigate('/admin/cortes/novo')}
                className="mt-[14px] px-[16px] py-[10px] font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)' }}
              >
                Cadastrar primeiro corte
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tip */}
      <section className="px-[22px] pt-[32px] pb-[20px]">
        <div
          className="p-[18px] flex gap-[14px] items-start"
          style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line-2)' }}
        >
          <div
            className="w-[28px] h-[28px] shrink-0 rounded-full flex items-center justify-center text-[14px]"
            style={{
              border: '1px solid var(--color-gold)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--color-gold)',
            }}
          >
            i
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-[4px]" style={{ color: 'var(--color-gold)' }}>
              Dica
            </div>
            <div className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--color-cream-2)' }}>
              Cortes com fotos e descrição completa aparecem em destaque no catálogo público.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCutRow({ cut, onClick }: { cut: Haircut; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-[14px] p-[12px] text-left items-stretch"
      style={{
        background: 'var(--color-ink-2)',
        border: '1px solid var(--color-line-2)',
      }}
    >
      <div className="w-[80px] shrink-0">
        <CutPlaceholder cut={cut} aspect="1/1" showLabel={false} />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 18,
            color: 'var(--color-cream)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {cut.name}
          </div>
          {cut.tags && cut.tags.length > 0 && (
            <div className="flex gap-1 mt-[6px] flex-wrap">
              {cut.tags.slice(0, 2).map((t) => (
                <span
                  key={t.id}
                  className="font-mono text-[8px] tracking-[0.18em] uppercase px-[6px] py-[2px]"
                  style={{ color: 'var(--color-cream-3)', border: '1px solid var(--color-line-2)' }}
                >
                  {t.name}
                </span>
              ))}
              {cut.tags.length > 2 && (
                <span className="font-mono text-[8px]" style={{ color: 'var(--color-cream-3)' }}>
                  +{cut.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between font-mono text-[10px] mt-[8px]">
          <span style={{ color: 'var(--color-gold)' }}>{fmtMoney(cut.price)}</span>
          <span style={{ color: 'var(--color-cream-3)' }}>{fmtMin(cut.duration)}</span>
        </div>
      </div>
      <div className="flex items-center pr-1 text-[18px]" style={{ color: 'var(--color-cream-3)' }}>›</div>
    </button>
  );
}
