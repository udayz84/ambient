const bgOverlayStyle = {
  backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0) 85.843%, rgb(0, 0, 0) 100%), linear-gradient(180deg, rgb(0, 0, 0) 17.653%, rgba(0, 0, 0, 0) 55.299%)",
} as const;

export function PlatformScaleBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[-189px] left-[0.11279296875px] h-[1286px] w-[1440px]"
      data-node-id="2379:618"
      data-name="image 69"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/platform-scale/bg-image-69.png"
          className="absolute size-full max-w-none object-bottom"
        />
        <div className="absolute inset-0" style={bgOverlayStyle} />
      </div>
    </div>
  );
}
