export default function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "down-left" | "up" | "right" }) {
  const paths = {
    "up-right": "M6 18 18 6M6 6h12v12",
    "down-left": "M18 6 6 18M6 6v12h12",
    up: "M12 20V4M5 11l7-7 7 7",
    right: "M4 12h16M13 5l7 7-7 7",
  };
  return <svg className="arrow-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
