import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Wordmark } from '../../components/ui/Wordmark';
import { TagPill } from '../../components/ui/TagPill';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CutPlaceholder } from '../../components/ui/CutPlaceholder';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';
import { useHaircuts } from '../../hooks/queries/useHaircuts';
import { useTags } from '../../hooks/queries/useTags';
import { fmtMoney, fmtMin } from '../../lib/formatters';
import type { Haircut, Tag } from '../../types/api';
import { CutModal } from './CutModal';

const SHOP_WHATSAPP = '558893308530';

export function CatalogPage() {
  const { data: haircuts = [], isLoading: loadingCuts } = useHaircuts();
  const { data: tags = [], isLoading: loadingTags } = useTags();

  const [activeTagId, setActiveTagId] = useState<string>('all');
  const [priceMax, setPriceMax] = useState(200);
  const [showFilters, setShowFilters] = useState(false);
  const [openCut, setOpenCut] = useState<Haircut | null>(null);

  const allTag: Tag = { id: 'all', name: 'Todos' };
  const allTags = [allTag, ...tags];

  const filteredCuts = useMemo(() => {
    return haircuts.filter((c) => {
      if (c.price > priceMax) return false;
      if (activeTagId !== 'all') {
        const hasTag = c.tags?.some((t) => t.id === activeTagId);
        if (!hasTag) return false;
      }
      return true;
    });
  }, [haircuts, activeTagId, priceMax]);

  const popularCuts = haircuts.slice(0, 3);

  const maxPrice = Math.max(200, ...haircuts.map((c) => c.price));

  return (
    <div>
      {/* Hero */}
      <section className="px-[22px] sm:px-8 md:px-12 pt-[32px] pb-[24px] relative flex justify-between items-center gap-[24px]">
        <div className="flex-1">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[14px]" style={{ color: 'var(--color-gold)' }}>
          Quixadá – CE
        </div>
        <h1
          className="m-0 text-[54px] leading-[0.95]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-cream)',
          }}
        >
          O corte<br />
          <span style={{ color: 'var(--color-gold)' }}>de um rei</span><br />
          começa aqui.
        </h1>
        <p className="mt-[18px] text-[14px] leading-[1.55] max-w-[32ch]" style={{ color: 'var(--color-cream-2)' }}>
          Tradição em navalha desde 1998. Catálogo de cortes, preços e tempos — escolha o seu e fale conosco.
        </p>

        <div className="flex gap-[10px] mt-[22px]">
          <a
            href={`https://wa.me/${SHOP_WHATSAPP}?text=Olá! Vim pelo catálogo da Barbearia dos Reis.`}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 py-[14px] px-[32px] font-mono text-[11px] tracking-[0.18em] uppercase font-semibold text-center transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-gold)', color: 'var(--color-ink)', borderRadius: 'var(--radius)' }}
          >
            <WhatsAppIcon size={14} />
            Agendar
          </a>
        </div>
        </div>
        <div className="shrink-0 mt-4 sm:mt-0">
          <Wordmark className="h-16 sm:h-24 md:h-32" />
        </div>
      </section>

      {/* Barber pole stripe */}
      <div
        className="h-[28px] my-[8px] opacity-85"
        style={{
          background: 'repeating-linear-gradient(115deg, var(--color-gold) 0 12px, var(--color-ink) 12px 24px, var(--color-cream) 24px 26px, var(--color-ink) 26px 38px)',
        }}
      />

      {/* Popular */}
      {!loadingCuts && popularCuts.length > 0 && (
        <section className="py-[20px] pb-[28px]">
          <SectionHeader kicker="Mais procurados" title="Em destaque" />
          <div className="flex overflow-x-auto gap-[12px] px-[22px] sm:px-8 md:px-12 hide-scroll" style={{ scrollSnapType: 'x mandatory' }}>
            {popularCuts.map((cut) => (
              <button
                key={cut.id}
                onClick={() => setOpenCut(cut)}
                className="flex-none text-left w-[70%] sm:w-[45%] md:w-1/3"
                style={{
                  scrollSnapAlign: 'start',
                  background: 'var(--color-ink-2)',
                  border: '1px solid var(--color-line)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                }}
              >
                <CutPlaceholder cut={cut} aspect="4/3" />
                <div className="p-[12px_14px_14px]">
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'var(--color-cream)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>{cut.name}</div>
                  <div className="flex justify-between items-baseline mt-[8px] font-mono text-[11px]" style={{ color: 'var(--color-gold)' }}>
                    <span>{fmtMoney(cut.price)}</span>
                    <span style={{ color: 'var(--color-cream-3)' }}>{fmtMin(cut.duration)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Catalog */}
      <section
        id="cuts-grid"
        className="pt-[24px]"
        style={{ borderTop: '1px solid var(--color-line-2)' }}
      >
        <SectionHeader
          kicker={loadingCuts ? 'Carregando...' : `${filteredCuts.length} cortes`}
          title="Catálogo"
          action={
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-[6px] font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              <SlidersHorizontal size={12} />
              <span className="relative top-[1px]">{showFilters ? 'Fechar' : 'Filtrar'}</span>
            </button>
          }
        />

        {/* Tag pills */}
        {!loadingTags && (
          <div className="flex gap-2 overflow-x-auto px-[22px] sm:px-8 md:px-12 pb-1 hide-scroll">
            {allTags.map((t) => (
              <TagPill
                key={t.id}
                active={activeTagId === t.id}
                onClick={() => setActiveTagId(t.id)}
              >
                {t.name}
              </TagPill>
            ))}
          </div>
        )}

        {/* Expanded filters */}
        {showFilters && (
          <div
            className="mx-[22px] sm:mx-8 md:mx-12 mt-[16px] p-[20px]"
            style={{ border: '1px solid var(--color-line)', background: 'var(--color-ink-2)', borderRadius: 'var(--radius)' }}
          >
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-[8px]" style={{ color: 'var(--color-gold)' }}>
              Preço máximo
            </div>
            <div
              className="text-[24px] mb-[6px]"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-cream)' }}
            >
              até {fmtMoney(priceMax)}
            </div>
            <input
              type="range"
              min="20"
              max={maxPrice}
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-gold)' }}
            />
            <div className="flex justify-between font-mono text-[9px] tracking-[0.18em] uppercase mt-1" style={{ color: 'var(--color-cream-3)' }}>
              <span>R$ 20</span><span>R$ {maxPrice}</span>
            </div>
          </div>
        )}

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-[10px] mt-[18px] mx-[22px] sm:mx-8 md:mx-12"
          style={{}}
        >
          {loadingCuts
            ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5]" style={{ background: 'var(--color-ink-2)' }} />
            ))
            : filteredCuts.map((cut) => (
              <CutCard key={cut.id} cut={cut} onClick={() => setOpenCut(cut)} />
            ))}
          {!loadingCuts && filteredCuts.length === 0 && (
            <div
              className="col-span-2 py-[60px] text-center text-[18px]"
              style={{
                background: 'var(--color-ink)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--color-cream-3)',
              }}
            >
              Nenhum corte encontrado.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <ShopFooter />

      {openCut && <CutModal cut={openCut} onClose={() => setOpenCut(null)} />}
    </div>
  );
}

function CutCard({ cut, onClick }: { cut: Haircut; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left relative p-0 card card-hover"
      style={{}}
    >
      <CutPlaceholder cut={cut} aspect="4/5" />
      <div className="p-[12px_12px_16px]">
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 17,
          color: 'var(--color-cream)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          minHeight: 38,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>{cut.name}</div>
        <div className="flex justify-between items-baseline mt-[8px] font-mono text-[10px]">
          <span style={{ color: 'var(--color-gold)' }}>{fmtMoney(cut.price)}</span>
          <span style={{ color: 'var(--color-cream-3)', marginLeft: 4, whiteSpace: 'nowrap' }}>{fmtMin(cut.duration)}</span>
        </div>
      </div>
    </button>
  );
}

function ShopFooter() {
  return (
    <section
      className="mt-[30px] px-[22px] sm:px-8 md:px-12 py-[32px]"
      style={{
        background: 'var(--color-ink-2)',
        borderTop: '1px solid var(--color-line)',
        borderBottom: '1px solid var(--color-line)',
      }}
    >
      <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[8px]" style={{ color: 'var(--color-gold)' }}>
        Visite-nos
      </div>
      <h3
        className="m-0 text-[30px] leading-[1]"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 600,
          color: 'var(--color-cream)',
          letterSpacing: '-0.01em',
        }}
      >
        Onde rei se sente em casa.
      </h3>

      <div className="mt-[22px] flex flex-col gap-[14px]">
        {[
          { label: 'Endereço', value: 'Av. Estados Unidos, 1445, posto Itajubá, Quixadá - CE' },
          { label: 'Horário', value: 'Ter–Sáb · 09h–20h' },
          { label: 'Telefone', value: '+55 88 9330-8530' },
          { label: 'Instagram', value: '@barbeariadosreis' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between gap-[14px] items-start pb-[10px]"
            style={{ borderBottom: '1px dashed var(--color-line-2)' }}
          >
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase shrink-0 pt-[2px]" style={{ color: 'var(--color-cream-3)' }}>
              {label}
            </span>
            <span className="text-[13px] text-right leading-[1.4] min-w-0 break-words" style={{ color: 'var(--color-cream)', wordBreak: 'break-word' }}>{value}</span>
          </div>
        ))}
      </div>

      <a
        href={`https://wa.me/${SHOP_WHATSAPP}`}
        target="_blank" rel="noreferrer"
        className="mt-[22px] flex items-center justify-center gap-[10px] pt-[15px] pb-[13px] font-mono text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-80 leading-none"
        style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)', borderRadius: 'var(--radius)' }}
      >
        <WhatsAppIcon size={14} />
        Falar no WhatsApp
      </a>
    </section>
  );
}
