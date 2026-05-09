interface TagPillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
}

export function TagPill({ children, active, onClick, size = 'md', type = 'button' }: TagPillProps) {
  const padding = size === 'sm' ? 'px-[14px] pt-[7px] pb-[5px]' : 'px-[20px] pt-[10px] pb-[8px]';
  const fontSize = size === 'sm' ? 'text-[10px]' : 'text-[11px]';
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        border: `1px solid ${active ? 'var(--color-gold)' : 'var(--color-line)'}`,
        background: active ? 'var(--color-gold)' : 'transparent',
        color: active ? 'var(--color-ink)' : 'var(--color-cream-2)',
        transition: 'all 0.18s ease',
      }}
      className={`${padding} ${fontSize} font-mono tracking-[0.10em] uppercase rounded-full whitespace-nowrap font-medium inline-flex items-center justify-center leading-none`}
    >
      {children}
    </button>
  );
}
