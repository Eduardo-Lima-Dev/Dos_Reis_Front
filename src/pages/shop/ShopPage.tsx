import { Wordmark } from '../../components/ui/Wordmark';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5"/>
      <circle cx="8" cy="8" r="3.2"/>
      <circle cx="11.6" cy="4.4" r="0.6" fill="currentColor"/>
    </svg>
  );
}

const SHOP = {
  address: 'Av. Estados Unidos, 1445, posto Itajubá, Quixadá - CE',
  hours: 'Ter–Sáb · 09h–20h',
  phone: '+55 88 9330-8530',
  instagram: '@barbeariadosreis',
  whatsapp: '558893308530',
};

export function ShopPage() {
  return (
    <div className="pb-[30px]">
      <header
        className="flex justify-between items-center px-[22px] sm:px-8 md:px-12 pt-[10px] pb-[18px]"
        style={{ borderBottom: '1px solid var(--color-line-2)' }}
      >
        <Wordmark className="h-7" />
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: 'var(--color-gold)' }}>
          Sobre
        </div>
      </header>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[30px]">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[8px]" style={{ color: 'var(--color-gold)' }}>
          Quixadá – CE
        </div>
        <h1
          className="m-0 text-[40px] leading-[1]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-cream)',
          }}
        >
          Tradição<br />em navalha.
        </h1>
        <p className="mt-[18px] text-[14px] leading-[1.6]" style={{ color: 'var(--color-cream-2)' }}>
          Cada corte tratado como peça única — feito à mão, com tempo e calma de quem entende que estilo não tem pressa.
        </p>
      </section>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[26px]">
        <div
          className="p-[20px_18px]"
          style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line)' }}
        >
          {[
            { label: 'Endereço', value: SHOP.address },
            { label: 'Horário', value: SHOP.hours },
            { label: 'Telefone', value: SHOP.phone },
            { label: 'Instagram', value: SHOP.instagram, last: true },
          ].map(({ label, value, last }) => (
            <div
              key={label}
              className="flex justify-between gap-[14px] py-[10px]"
              style={{ borderBottom: last ? 'none' : '1px dashed var(--color-line-2)' }}
            >
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase shrink-0"
                style={{ color: 'var(--color-cream-3)' }}
              >
                {label}
              </span>
              <span
                className="text-[13px] text-right leading-[1.4] break-words min-w-0"
                style={{ color: 'var(--color-cream)', wordBreak: 'break-word' }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[22px] sm:px-8 md:px-12 pt-[30px] flex flex-col sm:flex-row gap-[10px]">
        <a
          href={`https://instagram.com/${SHOP.instagram.replace('@', '')}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-[10px] py-[16px] font-mono text-[11px] tracking-[0.22em] uppercase"
          style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)' }}
        >
          <InstagramIcon size={14} />
          Seguir no Instagram
        </a>
        <a
          href={`https://wa.me/${SHOP.whatsapp}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-[10px] py-[16px] font-mono text-[11px] tracking-[0.22em] uppercase font-semibold"
          style={{ background: 'var(--color-gold)', color: 'var(--color-ink)' }}
        >
          <WhatsAppIcon size={14} />
          Falar conosco
        </a>
      </section>
    </div>
  );
}
