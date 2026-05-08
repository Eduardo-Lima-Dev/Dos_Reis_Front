interface TagPillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
}

export function TagPill({ children, active, onClick, size = 'md', type = 'button' }: TagPillProps) {
  const padding = size === 'sm' ? 'px-[10px] py-[5px]' : 'px-[14px] py-[8px]';
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
      className={`${padding} ${fontSize} font-mono tracking-[0.16em] uppercase rounded-full whitespace-nowrap font-medium`}
    >
      {children}
    </button>
  );
}
