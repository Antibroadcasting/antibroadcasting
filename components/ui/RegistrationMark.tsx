export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <line
        x1="20"
        y1="2"
        x2="20"
        y2="38"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="2"
        y1="20"
        x2="38"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
