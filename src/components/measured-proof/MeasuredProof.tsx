import Image from "next/image";
import { MeasuredProofCards } from "./MeasuredProofCards";
import { MeasuredProofCtas } from "./MeasuredProofCtas";
import { MeasuredProofHeader } from "./MeasuredProofHeader";
import { MeasuredProofMobile } from "./MeasuredProofMobile";

export function MeasuredProof() {
  return (
    <section
      id="measured-proof"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-black max-[1023px]:h-auto min-[1024px]:h-[300vh]"
      data-node-id="2379:1464"
      data-name="Section 6"
      aria-label="Measured proof in silicon"
    >
      {/* DESKTOP (>=1024px) Sticky Container */}
      <div className="sticky top-0 hidden h-[100vh] min-h-[945px] w-full overflow-hidden min-[1024px]:block">
        <div
          className="pointer-events-none absolute top-[calc(50%-15.5px)] right-0 left-0 h-[880px] -translate-y-1/2"
          data-node-id="2379:1466"
          data-name="image 90"
        >
          <Image
            src="/measured-proof/bg-image-90.png"
            alt=""
            fill
            className="object-cover object-bottom opacity-75"
            sizes="100vw"
          />
        </div>

        <div
          className="pointer-events-none absolute top-0 right-0 left-0 h-[260px]"
          data-node-id="2379:1467"
        >
          <Image
            src="/measured-proof/gradient-top.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex h-[341px] items-center justify-center">
          <div className="-scale-y-100 h-full w-full flex-none">
            <div className="relative h-full w-full" data-node-id="2379:1468">
              <Image
                src="/measured-proof/gradient-bottom.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-full w-full">
          <MeasuredProofHeader />
          <MeasuredProofCards />
          <MeasuredProofCtas />
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden overflow-hidden">
        {/* Background elements for mobile (matching desktop) */}
        <div className="pointer-events-none absolute top-[30%] right-0 left-0 h-[600px] -translate-y-1/2">
          <Image
            src="/measured-proof/bg-image-90.png"
            alt=""
            fill
            className="object-cover object-bottom opacity-75"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute top-0 right-0 left-0 h-[260px]">
          <Image
            src="/measured-proof/gradient-top.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute right-0 bottom-[-200px] left-0 flex h-[341px] items-center justify-center">
          <div className="-scale-y-100 h-full w-full flex-none">
            <div className="relative h-full w-full">
              <Image
                src="/measured-proof/gradient-bottom.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <MeasuredProofMobile />
      </div>
    </section>
  );
}
