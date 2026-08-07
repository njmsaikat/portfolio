const paths: Record<string, string> = {
  server: "M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01",
  layers: "m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5",
  box: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8",
  cloud: "M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.16 4 4 0 0 1 16 18H7Z",
  "shopping-bag": "M6 8h12l-1 12H7L6 8ZM9 8V6a3 3 0 0 1 6 0v2",
  "life-buoy": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6.3 6.3l3.1 3.1M17.7 6.3l-3.1 3.1M6.3 17.7l3.1-3.1M17.7 17.7l-3.1-3.1",
};

export function ServiceIcon({ icon, className = "h-5 w-5" }: { icon: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={paths[icon] ?? paths.box} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
