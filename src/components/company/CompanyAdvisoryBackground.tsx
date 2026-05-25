import Image from "next/image";

/** Pattern visible behind cards only (cards use solid black). */
export function CompanyAdvisoryBackground() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-1/2 z-0 h-[438px] w-[1440px] -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      <Image
        src="/company/image%20124.png"
        alt=""
        width={1440}
        height={438}
        className="absolute top-0 left-0 size-full max-w-none object-cover object-top"
        unoptimized
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.75) 28%, rgba(0, 0, 0, 0.2) 55%, rgba(0, 0, 0, 0) 72%), linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.08) 38%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />
    </div>
  );
}
