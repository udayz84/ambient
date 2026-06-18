export function DeveloperPlatformBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/contact/Fractal%20Glass.png"
        className="absolute inset-0 size-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}
