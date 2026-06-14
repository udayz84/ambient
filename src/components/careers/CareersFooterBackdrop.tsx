export function CareersFooterBackdrop() {
  return (
    <div
      className="pointer-events-none absolute top-[4977px] left-1/2 z-0 h-[720px] w-[1440px] -translate-x-1/2 overflow-hidden opacity-60"
      data-node-id="2379:8613"
      data-name="image 120"
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/footer-bg.png"
          alt=""
          className="absolute size-full max-w-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 59.236%), linear-gradient(-90deg, rgba(0, 0, 0, 0.2) 50%, rgb(0, 0, 0) 99.999%)",
          }}
        />
      </div>
    </div>
  );
}
