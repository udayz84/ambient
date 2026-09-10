function RotatedLine({ src, height }: { src: string; height: number }) {
  return (
    <div
      className="relative flex w-0 shrink-0 items-center justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="rotate-90 flex-none">
        <div className="relative h-0" style={{ width: `${height}px` }}>
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" src={src} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavDivider8({ src }: { src: string }) {
  return <RotatedLine src={src} height={8} />;
}

export function NavDivider7({ src }: { src: string }) {
  return <RotatedLine src={src} height={7} />;
}

export function NavDivider6({ src }: { src: string }) {
  return <RotatedLine src={src} height={6} />;
}

export function NavDivider5({ src }: { src: string }) {
  return <RotatedLine src={src} height={5} />;
}

export function NavDivider4({ src }: { src: string }) {
  return <RotatedLine src={src} height={4} />;
}
