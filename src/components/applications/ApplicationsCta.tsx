import { gilroySemiBold } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function ApplicationsCta() {
  return (
    <a
      href="#"
      className={`${gilroySemiBold.className} absolute top-[819.2216796875px] left-1/2 h-[48px] w-[205px] -translate-x-1/2 shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2379:952"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <p
        className="absolute top-[calc(50%-8px)] left-[20px] text-[14px] leading-[normal] font-semibold whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
        data-node-id="2379:953"
      >
        EXPLORE APPLICATION
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/applications/cta-dot.svg"
        className="absolute top-1/2 left-[178px] size-[6px] -translate-y-1/2"
        aria-hidden
      />
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:959">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cornerRight} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:960">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cornerLeft} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:962">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cornerRight} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]" data-node-id="2379:963">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cornerLeft} alt="" className="block size-full max-w-none" aria-hidden />
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}
