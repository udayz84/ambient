const bgOverlayStyle = {
  backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0) 85.843%, rgb(0, 0, 0) 100%), linear-gradient(180deg, rgb(0, 0, 0) 17.653%, rgba(0, 0, 0, 0) 55.299%)",
} as const;

export function PlatformScaleBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[-189px] right-0 left-0 z-0 h-[1286px] overflow-hidden"
      data-node-id="2379:618"
      data-name="image 69"
    >
      <div
        className="absolute top-0 left-1/2 h-[1286px] w-[1440px] origin-center"
        style={{
          transform: "translateX(-50%) scaleX(max(1, calc(100vw / 1440px)))",
        }}
      >
        <div
          className="absolute top-0 left-[0.11279296875px] h-[1286px] w-[1440px]"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/platform-scale/bg-image-69.webp"
            className="absolute size-full max-w-none object-bottom"
          />
          <div className="absolute inset-0" style={bgOverlayStyle} />
        </div>
      </div>
    </div>
  );
}
