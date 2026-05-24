import Image from "next/image";
import { Inter } from "next/font/google";

const interSemiBold = Inter({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export function NavbarCta() {
  return (
    <a
      href="#"
      className={`${interSemiBold.className} relative block h-[36px] w-[147px] shrink-0 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2379:1589"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <span className="absolute left-[20px] top-[calc(50%-8px)] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase">
        GET IN TOUCH
      </span>
      <Image
        src="/navbar/cta-dot.svg"
        alt=""
        width={6}
        height={6}
        className="pointer-events-none absolute top-1/2 left-[121px] size-[6px] -translate-y-1/2"
        aria-hidden
      />
      <Image
        src="/navbar/corner-br-tr.svg"
        alt=""
        width={4}
        height={4}
        className="pointer-events-none absolute top-0 right-0 size-[4px]"
        aria-hidden
      />
      <Image
        src="/navbar/corner-br-tl.svg"
        alt=""
        width={4}
        height={4}
        className="pointer-events-none absolute top-0 left-0 size-[4px] -scale-y-100"
        aria-hidden
      />
      <Image
        src="/navbar/corner-br-tr.svg"
        alt=""
        width={4}
        height={4}
        className="pointer-events-none absolute right-0 bottom-0 size-[4px] -scale-y-100 rotate-180"
        aria-hidden
      />
      <Image
        src="/navbar/corner-br-tl.svg"
        alt=""
        width={4}
        height={4}
        className="pointer-events-none absolute bottom-0 left-0 size-[4px]"
        aria-hidden
      />
    </a>
  );
}
