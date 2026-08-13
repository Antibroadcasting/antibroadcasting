/** Small pinging status dot — "live"/booking/response-time indicator. */
export function PulseDot({
  color = "bg-gold",
  opacity = "opacity-75",
}: {
  color?: string;
  opacity?: string;
}) {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span
        aria-hidden="true"
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} ${opacity}`}
      />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}
