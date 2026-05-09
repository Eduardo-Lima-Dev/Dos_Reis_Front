import { useEffect, useRef, useState } from 'react';
import { CutPlaceholder } from '../../components/ui/CutPlaceholder';
import { TagPill } from '../../components/ui/TagPill';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';
import { fmtMoney, fmtMin } from '../../lib/formatters';
import type { Haircut } from '../../types/api';

const SHOP_WHATSAPP = '558893308530';

interface CutModalProps {
  cut: Haircut;
  onClose: () => void;
}

export function CutModal({ cut, onClose }: CutModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-end animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] sm:max-w-2xl md:max-w-3xl max-h-[92vh] overflow-y-auto animate-slide-up relative"
        style={{
          background: 'var(--color-ink)',
          borderTop: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2">
          <div className="w-9 h-[3px] rounded-sm" style={{ background: 'var(--color-line)' }} />
        </div>

        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[16px] z-[2]"
          style={{
            border: '1px solid var(--color-line)',
            color: 'var(--color-cream)',
            background: 'rgba(10,10,10,0.6)',
          }}
        >
          ×
        </button>

        <ImageCarousel cut={cut} />

        <div className="p-[22px_22px_32px]">
          {/* Tags */}
          {cut.tags && cut.tags.length > 0 && (
            <div className="flex gap-[6px] flex-wrap mb-[14px]">
              {cut.tags.map((t) => (
                <TagPill key={t.id} size="sm" active>{t.name}</TagPill>
              ))}
            </div>
          )}

          <h2
            className="m-0 text-[38px] leading-[1]"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-cream)',
            }}
          >
            {cut.name}
          </h2>

          {/* Stat bar */}
          <div
            className="mt-[20px] py-[16px] grid grid-cols-3"
            style={{ borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}
          >
            <Stat label="Preço" value={fmtMoney(cut.price)} accent />
            <Stat label="Duração" value={fmtMin(cut.duration)} divider />
            <Stat label="Serviço" value={cut.name.charAt(0).toUpperCase()} />
          </div>

          <p className="mt-[22px] text-[14px] leading-[1.65]" style={{ color: 'var(--color-cream-2)' }}>
            {cut.description}
          </p>

          {/* CTA */}
          <a
            href={`https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(`Olá! Quero agendar o corte "${cut.name}" (${fmtMoney(cut.price)}).`)}`}
            target="_blank" rel="noreferrer"
            className="mt-[24px] btn-primary"
            style={{ letterSpacing: '0.22em' }}
          >
            <WhatsAppIcon size={14} />
            Agendar pelo WhatsApp
          </a>

          <button
            onClick={onClose}
            className="mt-[10px] btn-outline"
          >
            Voltar ao catálogo
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ cut }: { cut: Haircut }) {
  const images = cut.images ?? [];
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) {
    return <CutPlaceholder cut={cut} aspect="4/3" label="FOTO · DETALHE" />;
  }

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--color-ink-2)' }}>
      <img
        key={idx}
        src={images[idx]}
        alt={`${cut.name} ${idx + 1}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="animate-fade-in"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(10,10,10,0.6)', border: '1px solid var(--color-line)',
              color: 'var(--color-cream)', fontSize: 20, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >‹</button>

          <button
            onClick={next}
            aria-label="Próxima"
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(10,10,10,0.6)', border: '1px solid var(--color-line)',
              color: 'var(--color-cream)', fontSize: 20, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >›</button>

          <div style={{
            position: 'absolute', bottom: 12, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 6,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Imagem ${i + 1}`}
                style={{
                  width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === idx ? 'var(--color-gold)' : 'rgba(245,239,225,0.35)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'width 0.2s ease, background 0.2s ease',
                }}
              />
            ))}
          </div>

          <div style={{
            position: 'absolute', top: 12, right: 12,
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.18em', color: 'var(--color-cream)',
            background: 'rgba(10,10,10,0.6)', padding: '3px 8px',
          }}>
            {idx + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, accent, divider }: {
  label: string; value: string; accent?: boolean; divider?: boolean;
}) {
  return (
    <div style={{
      padding: '0 14px',
      borderLeft: divider ? '1px solid var(--color-line-2)' : 'none',
      borderRight: divider ? '1px solid var(--color-line-2)' : 'none',
    }}>
      <div className="font-mono text-[8.5px] tracking-[0.22em] uppercase mb-[6px]" style={{ color: 'var(--color-cream-3)' }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: 22,
        color: accent ? 'var(--color-gold)' : 'var(--color-cream)',
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        {value}
      </div>
    </div>
  );
}
