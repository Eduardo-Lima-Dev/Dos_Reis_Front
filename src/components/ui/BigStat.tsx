interface BigStatProps {
  label: string;
  value: string | number;
  divider?: boolean;
  small?: boolean;
}

export function BigStat({ label, value, divider, small }: BigStatProps) {
  return (
    <div
      style={{
        padding: '18px 14px',
        borderLeft: divider ? '1px solid var(--color-line-2)' : 'none',
        borderRight: divider ? '1px solid var(--color-line-2)' : 'none',
        textAlign: 'left',
      }}
    >
      <div
        className="font-mono text-[8.5px] tracking-[0.22em] uppercase mb-[8px]"
        style={{ color: 'var(--color-cream-3)' }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: small ? 22 : 30,
          color: 'var(--color-cream)',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}
