interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className = 'h-10' }: WordmarkProps) {
  return (
    <img
      src="/logo.svg"
      alt="Barbearia dos Reis"
      className={`w-auto object-contain ${className}`}
    />
  );
}
