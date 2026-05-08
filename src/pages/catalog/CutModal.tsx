import { useEffect } from 'react';
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
        className="w-full max-h-[92vh] overflow-y-auto animate-slide-up relative"
        style={{
          maxWidth: 440,
          background: 'var(--color-ink)',
          borderTop: '1px solid var(--color-gold)',
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

        <CutPlaceholder cut={cut} aspect="4/3" label="FOTO · DETALHE" />

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
            className="mt-[24px] flex items-center justify-center gap-[10px] py-[16px] font-mono text-[11px] tracking-[0.22em] uppercase font-semibold"
            style={{ background: 'var(--color-gold)', color: 'var(--color-ink)' }}
          >
            <WhatsAppIcon size={14} />
            Agendar pelo WhatsApp
          </a>

          <button
            onClick={onClose}
            className="mt-[10px] w-full py-[14px] font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ border: '1px solid var(--color-line)', color: 'var(--color-cream-2)' }}
          >
            Voltar ao catálogo
          </button>
        </div>
      </div>
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
