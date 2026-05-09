import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <label style={{ display: 'block' }}>
      <div
        className="font-mono text-[9px] tracking-[0.22em] uppercase mb-[6px] transition-colors duration-[180ms]"
        style={{ color: focused ? 'var(--color-gold)' : 'var(--color-cream-3)' }}
      >
        {label}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type={inputType}
          placeholder={placeholder}
          {...registration}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { registration?.onBlur?.(e); setFocused(false); }}
          style={{
            width: '100%',
            padding: isPassword ? '12px 36px 12px 0' : '12px 0',
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
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', padding: '4px',
              color: focused ? 'var(--color-gold)' : 'var(--color-cream-3)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              transition: 'color 0.18s',
            }}
          >
            {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-400 text-[11px] mt-1 font-mono tracking-wide">{error}</div>
      )}
    </label>
  );
}
