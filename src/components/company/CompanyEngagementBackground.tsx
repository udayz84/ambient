import Image from "next/image";

const ENGAGEMENT_BG_HEIGHT = 1102;

export function CompanyEngagementBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[5991px] left-0 z-[6] h-[1102px] w-[1440px] overflow-hidden"
      data-name="image 124"
      aria-hidden
    >
      <Image
        src="/company/image%20124.png"
        alt=""
        width={1440}
        height={ENGAGEMENT_BG_HEIGHT}
        className="absolute inset-0 size-full max-w-none object-cover object-top"
        unoptimized
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.12) 22%, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.25) 72%, rgb(0, 0, 0) 100%)",
        }}
      />
    </div>
  );
}
