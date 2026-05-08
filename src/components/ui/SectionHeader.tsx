interface SectionHeaderProps {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
}

export function SectionHeader({ kicker, title, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end px-[22px] sm:px-8 md:px-12 mb-[14px]">
      <div>
        {kicker && (
          <div
            className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[6px]"
            style={{ color: 'var(--color-gold)' }}
          >
            {kicker}
          </div>
        )}
        <h2
          className="m-0 text-[26px] leading-[1.05]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'var(--color-cream)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
