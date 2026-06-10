import { gilroySemiBold } from "../hero/fonts";

const watermarkGradient =
  "linear-gradient(259.734deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

export function ApplicationsHeroVisual() {
  return (
    <>
      <p
        className={`${gilroySemiBold.className} absolute top-[291.2783203125px] left-1/2 -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-semibold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
        style={{ backgroundImage: watermarkGradient }}
        data-node-id="2379:848"
      >
        AUTOMOTIVE
      </p>

      <div
        className="absolute top-[301.22119140625px] left-[calc(50%+26.3896484375px)] flex h-[435.28900146484375px] w-[984.82421875px] -translate-x-1/2 items-center justify-center"
        data-node-id="2379:850"
        data-name="unnamed-(1) 1"
      >
        <div className="-scale-y-100 rotate-180 flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/applications/car-hero.png"
            className="pointer-events-none h-[435.28900146484375px] w-[984.82421875px] max-w-none object-bottom"
            aria-hidden
          />
        </div>
      </div>

      <div
        className="absolute top-[516.041015625px] left-[372.0654296875px] z-[10] h-[88.18115234375px] w-[14.142134666442871px]"
        data-node-id="2379:940"
        data-name="Group 57"
      >
        <div className="absolute inset-[-4.54%_-28.28%_0_-28.28%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/applications/indicator-vertical.svg"
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>

      <div className="contents" data-node-id="2379:946" data-name="Group 58">
        <div className="absolute top-[618.8037109375px] left-[743.226318359375px] z-[10] flex h-[76.62291822064526px] w-[87.66146941957857px] items-center justify-center">
          <div className="-rotate-90 flex-none">
            <div
              className="relative h-[87.66146941957857px] w-[76.62291822064526px]"
              data-node-id="2379:947"
              data-name="Indicator"
            >
              <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src="/applications/indicator-angled.svg"
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
