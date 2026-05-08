import type { Haircut } from '../../types/api';

const DEFAULT_SWATCH = ['#1a1a1a', '#2a2522'];

interface CutPlaceholderProps {
  cut?: Partial<Haircut> & { swatch?: string[]; name?: string; id?: string };
  aspect?: string;
  label?: string;
  showLabel?: boolean;
}

export function CutPlaceholder({
  cut,
  aspect = '4/5',
  label = 'FOTO · CORTE',
  showLabel = true,
}: CutPlaceholderProps) {
  const images = cut?.images;
  if (images && images.length > 0) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden' }}>
        <img
          src={images[0]}
          alt={cut?.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  const swatch = (cut as any)?.swatch ?? DEFAULT_SWATCH;
  const seed = ((cut?.id || 'x').charCodeAt(0) + ((cut?.id || 'x').charCodeAt(1) || 0));
  const angle = (seed * 13) % 30 + 30;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspect,
        background: `linear-gradient(135deg, ${swatch[0]}, ${swatch[1]})`,
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%" height="100%"
        viewBox="0 0 100 125" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.13 }}
      >
        <defs>
          <pattern
            id={`stripes-${cut?.id || 'x'}`}
            patternUnits="userSpaceOnUse"
            width="8" height="8"
            patternTransform={`rotate(${angle})`}
          >
            <rect width="8" height="8" fill="transparent" />
            <rect width="1" height="8" fill="#c9a961" />
          </pattern>
        </defs>
        <rect width="100" height="125" fill={`url(#stripes-${cut?.id || 'x'})`} />
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 6,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 22%, 96px)',
          fontWeight: 500,
          fontStyle: 'italic',
          color: 'var(--color-gold-soft)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          textShadow: '0 4px 30px rgba(0,0,0,0.4)',
        }}>
          {(cut?.name || '?').charAt(0).toUpperCase()}
        </div>
        {showLabel && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: 'rgba(245,239,225,0.45)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            {label}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute', top: 8, left: 8,
        width: 12, height: 12,
        borderTop: '1px solid rgba(201,169,97,0.4)',
        borderLeft: '1px solid rgba(201,169,97,0.4)',
      }} />
      <div style={{
        position: 'absolute', bottom: 8, right: 8,
        width: 12, height: 12,
        borderBottom: '1px solid rgba(201,169,97,0.4)',
        borderRight: '1px solid rgba(201,169,97,0.4)',
      }} />
    </div>
  );
}
