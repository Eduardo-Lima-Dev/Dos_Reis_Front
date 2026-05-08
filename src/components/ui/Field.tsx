import { useState } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface FieldProps {
  label: string;
  type?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
}

export function Field({ label, type = 'text', registration, error, placeholder }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: 'block' }}>
      <div
        className="font-mono text-[9px] tracking-[0.22em] uppercase mb-[6px] transition-colors duration-[180ms]"
        style={{ color: focused ? 'var(--color-gold)' : 'var(--color-cream-3)' }}
      >
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { registration?.onBlur?.(e); setFocused(false); }}
        style={{
          width: '100%',
          padding: '12px 0',
          background: 'transparent',
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          border: '0',
          borderBottom: `1px solid ${focused ? 'var(--color-gold)' : 'var(--color-line)'}`,
          outline: 'none',
          transition: 'border-color 0.18s',
        }}
      />
      {error && (
        <div className="text-red-400 text-[11px] mt-1 font-mono tracking-wide">{error}</div>
      )}
    </label>
  );
}
