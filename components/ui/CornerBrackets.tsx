/** Four corner-bracket marks over a framed photo/panel — screen-print registration motif. */
export function CornerBrackets({
  color = "border-paper/60",
  size = "w-8 h-8",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute top-4 left-4 ${size} border-t-2 border-l-2 ${color}`}
      />
      <div
        aria-hidden="true"
        className={`absolute top-4 right-4 ${size} border-t-2 border-r-2 ${color}`}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-4 left-4 ${size} border-b-2 border-l-2 ${color}`}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-4 right-4 ${size} border-b-2 border-r-2 ${color}`}
      />
    </>
  );
}
