export function TechnologyGridLine() {
  return (
    <div
      className="relative w-[8px] shrink-0 self-stretch overflow-clip"
      data-name="Grid Line'"
    >
      <div className="absolute top-[0px] left-0 h-[4.5px] w-[8px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src="/technology/grid-cap.svg"
          alt=""
          className="block size-full max-w-none rotate-180"
          aria-hidden
        />
      </div>
      <div className="absolute top-[4.5px] bottom-[4.5px] left-[3.5px] w-[1px] bg-white/20"></div>
      <div className="absolute bottom-[0.5px] left-0 flex h-[4px] w-[8px] items-center justify-center">
        <div className="flex-none">
          <div className="relative h-[4px] w-[8px]">
            <div className="absolute inset-[0_0_-12.5%_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src="/technology/grid-cap.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
