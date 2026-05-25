const DNA_TOP_FADE =
  "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 42%, rgba(0, 0, 0, 0) 100%)";

const DNA_BOTTOM_FADE =
  "linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0) 100%)";

export function CompanyDnaBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[230px] left-0 h-[970px] w-[1440px] overflow-hidden"
      data-node-id="2388:3753"
      data-name="Image"
      aria-hidden
    >
      <div
        className="absolute top-[38px] left-[-60px] h-[932px] w-[1545px] overflow-hidden"
        data-node-id="2379:2088"
        data-name="image 137"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/company/image%20137.png"
          className="absolute inset-0 size-full max-w-none object-cover object-center"
        />
      </div>
      <div
        className="absolute top-0 left-[2px] h-[516px] w-[1441px]"
        style={{ backgroundImage: DNA_TOP_FADE }}
        data-node-id="2379:2089"
        aria-hidden
      />
      <div
        className="absolute top-[907px] left-[1px] h-[208px] w-[1442px]"
        style={{ backgroundImage: DNA_BOTTOM_FADE }}
        data-node-id="2379:2134"
        aria-hidden
      />
    </div>
  );
}
