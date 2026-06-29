import { gilroyExtraBold, gilroySemiBold } from "../hero/fonts";

const watermarkGradient =
  "linear-gradient(259.734deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const industrialWatermarkGradient =
  "linear-gradient(259.467deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const smartHomeWatermarkGradient =
  "linear-gradient(259.588deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const wearablesWatermarkGradient =
  "linear-gradient(260.505deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const dronesWatermarkGradient =
  "linear-gradient(263.497deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const agricultureWatermarkGradient =
  "linear-gradient(259.313deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const hearablesWatermarkGradient =
  "linear-gradient(261.051deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const HERO_IMAGES: Record<string, string> = {
  AUTOMOTIVE: "/applications/car-hero.png",
  MEDICAL: "/applications/app-medical.png",
  INDUSTRIAL: "/applications/app-industrial.png",
  "SMART HOMES": "/applications/app-smart-home.png",
  WEARABLES: "/applications/app-wearables.png",
  DRONES: "/applications/app-drones.png",
  AGRICULTURE: "/applications/app-agriculture.png",
  HEARABLES: "/applications/app-hearables.png",
};

export function ApplicationsHeroVisual({ activeTab }: { activeTab: string }) {
  const imgSrc = HERO_IMAGES[activeTab] || "/applications/car-hero.png";

  if (activeTab === "INDUSTRIAL") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%-0.3px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: industrialWatermarkGradient }}
          data-node-id="2901:1272"
        >
          Industry 4.0
        </p>

        <div
          className="absolute left-[calc(50%-32.8px)] top-[calc(50%+105.03px)] h-[500px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="2901:1273"
          data-name="Image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div
          className="contents"
          data-node-id="2901:1290"
          data-name="Indicator"
        >
          <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.623px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.661px] w-[76.623px]"
                data-node-id="2901:1291"
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

        <div
          className="contents"
          data-node-id="2901:1296"
          data-name="Indicator"
        >
          <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.623px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[87.661px] w-[76.623px]"
                data-node-id="2901:1297"
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

  if (activeTab === "SMART HOMES") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: smartHomeWatermarkGradient }}
          data-node-id="2901:1480"
        >
          Smart Home
        </p>

        <div
          className="absolute left-[calc(50%+12.55px)] top-[calc(50%+113.78px)] size-[661.006px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="3202:465"
          data-name="Product image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div
          className="contents"
          data-node-id="2901:1498"
          data-name="Indicator"
        >
          <div className="absolute left-[490.05px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[88.181px] w-[14.142px]"
                data-node-id="2901:1499"
                data-name="Indicator"
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
            </div>
          </div>
        </div>

        <div
          className="contents"
          data-node-id="2901:1504"
          data-name="Indicator"
        >
          <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:1505"
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

  if (activeTab === "WEARABLES") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%-0.3px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: wearablesWatermarkGradient }}
          data-node-id="2901:1580"
        >
          Wearables
        </p>

        <div
          className="absolute left-[calc(50%+0.2px)] top-[calc(50%+113.19px)] h-[603.374px] w-[763.727px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="2901:1581"
          data-name="Image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div
          className="contents"
          data-node-id="2901:1598"
          data-name="Indicator"
        >
          <div className="absolute left-[490.05px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[88.181px] w-[14.142px]"
                data-node-id="2901:1599"
                data-name="Indicator"
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
            </div>
          </div>
        </div>

        <div
          className="contents"
          data-node-id="2901:1604"
          data-name="Indicator"
        >
          <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:1605"
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

  if (activeTab === "DRONES") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: dronesWatermarkGradient }}
          data-node-id="2901:1895"
        >
          {"Drones "}
        </p>

        <div
          className="absolute left-[calc(50%+0.2px)] top-[calc(50%+87.96px)] h-[544.309px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="2901:1896"
          data-name="Image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div
          className="contents"
          data-node-id="2901:1913"
          data-name="Indicator"
        >
          <div className="absolute left-[843.23px] top-[578.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:1914"
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

        <div
          className="contents"
          data-node-id="2901:1919"
          data-name="Indicator"
        >
          <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:1920"
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

  if (activeTab === "AGRICULTURE") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: agricultureWatermarkGradient }}
          data-node-id="2901:1999"
        >
          Agriculture
        </p>

        <div
          className="absolute left-[calc(50%+0.2px)] top-[calc(50%+87.96px)] h-[544.309px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="2901:2000"
          data-name="Image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div
          className="contents"
          data-node-id="2901:2017"
          data-name="Indicator"
        >
          <div className="absolute left-[843.23px] top-[578.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:2018"
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

        <div
          className="contents"
          data-node-id="2901:2023"
          data-name="Indicator"
        >
          <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[87.661px] w-[76.622px]"
                data-node-id="2901:2024"
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

  if (activeTab === "HEARABLES") {
    return (
      <>
        <p
          className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-125.5px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: hearablesWatermarkGradient }}
          data-node-id="3206:935"
        >
          Hearables
        </p>

        <div
          className="absolute left-[calc(50%+0.2px)] top-[calc(50%+84.53px)] h-[500px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="3206:936"
          data-name="image 145"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        <div className="contents" data-node-id="3206:953">
          <div className="absolute left-[490.24px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div
                className="relative h-[88.181px] w-[14.142px]"
                data-node-id="3206:954"
                data-name="Indicator"
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
            </div>
          </div>
        </div>

        <div className="contents" data-node-id="3206:959">
          <div className="absolute left-[843.43px] top-[618.8px] flex h-[76.623px] w-[87.659px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div
                className="relative h-[87.659px] w-[76.623px]"
                data-node-id="3206:960"
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

  return (
    <>
      <p
        className={`${gilroySemiBold.className} absolute top-[291.2783203125px] left-1/2 -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-semibold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
        style={{ backgroundImage: watermarkGradient }}
        data-node-id="2379:848"
      >
        {activeTab}
      </p>

      <div
        className="absolute top-[301.22119140625px] left-[calc(50%+26.3896484375px)] flex h-[435.28900146484375px] w-[984.82421875px] -translate-x-1/2 items-center justify-center"
        data-node-id="2379:850"
        data-name="unnamed-(1) 1"
      >
        <div className={activeTab === "AUTOMOTIVE" ? "-scale-y-100 rotate-180 flex-none" : "flex-none w-full h-full flex items-center justify-center"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className={`pointer-events-none max-w-none ${
              activeTab === "AUTOMOTIVE" 
                ? "h-[435.28900146484375px] w-[984.82421875px] object-bottom" 
                : "max-h-[435px] max-w-[984px] w-auto h-auto object-contain"
            }`}
            aria-hidden
          />
        </div>
      </div>

      {activeTab === "AUTOMOTIVE" && (
        <>
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
      )}
    </>
  );
}
