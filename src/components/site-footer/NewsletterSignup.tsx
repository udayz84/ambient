import Image from "next/image";
import { gilroyMedium, interRegular, gilroySemiBold } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function NewsletterSignup() {
  return (
    <div
      className="relative flex w-full max-w-[600px] flex-col items-center px-[24px] sm:px-0"
      data-node-id="2379:1393"
      data-name="Group 90"
    >
      <div className="relative inline-grid w-full grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0] max-md:flex max-md:flex-col max-md:items-center">
        <h2
          className={`${gilroyMedium.className} relative z-[1] col-start-1 row-start-1 mt-[14px] max-md:mt-0 w-full bg-clip-text text-center text-[32px] sm:text-[46px] leading-[1.1] font-medium text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(104.93deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1394"
        >
          <span className="block bg-clip-text">Want to stay in the</span>
          <span className="block bg-clip-text">forefront of AI tech.</span>
        </h2>

        <Corner
          className="z-[2] col-start-1 row-start-1 mt-0 ml-[549px] max-md:hidden"
          src={cornerRight}
          rotate
        />
        <Corner
          className="z-[2] col-start-1 row-start-1 mt-[130px] ml-[549px] max-md:hidden"
          src={cornerRight}
          rotate
          flipY
        />
        <div className="relative z-[2] col-start-1 row-start-1 mt-[130px] ml-[51px] size-[4px] max-md:hidden">
          <Image
            src={cornerLeft}
            alt=""
            width={4}
            height={4}
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
        <Corner
          className="z-[2] col-start-1 row-start-1 mt-0 ml-[51px] max-md:hidden"
          src={cornerLeft}
          flipY
        />

        <p
          className={`${interRegular.className} relative col-start-1 row-start-1 mt-[154px] max-md:mt-[16px] w-full text-center text-[16px] sm:text-[18px] leading-[1.5] font-normal text-white not-italic [word-break:break-word]`}
          data-node-id="2379:1399"
        >
          Sign up to receive regular updates.
        </p>
      </div>

      <form
        className="mt-[34px] flex w-full flex-col items-center gap-[16px] md:flex-row md:justify-center md:gap-0"
        data-node-id="2379:1400"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <div
          className="flex h-[48px] w-full max-w-[300px] shrink-0 items-center border border-solid border-white bg-transparent px-[20px]"
          data-node-id="2379:1401"
        >
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your Email ID"
            className={`${interRegular.className} w-full border-0 bg-transparent text-[14px] leading-[1.4] text-white outline-none placeholder:text-white`}
          />
        </div>
        <button
          type="submit"
          className={`${gilroySemiBold.className} relative flex h-[48px] w-full max-w-[300px] md:w-[158px] shrink-0 items-center justify-center text-[14px] leading-[normal] font-semibold text-[#121212] uppercase shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
          data-node-id="2379:1404"
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
            style={{ backgroundImage: "url(/contact/cta-texture.png)" }}
          />
          <span className="relative">SUBSCRIBE</span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
        </button>
      </form>
    </div>
  );
}

function Corner({
  className,
  src,
  rotate,
  flipY,
}: {
  className: string;
  src: string;
  rotate?: boolean;
  flipY?: boolean;
}) {
  return (
    <div className={`flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${rotate ? "rotate-180" : ""} ${flipY ? "-scale-y-100" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image
              src={src}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
