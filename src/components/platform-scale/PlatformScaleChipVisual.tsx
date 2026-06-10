import { gilroyMedium } from "../hero/fonts";

const chipGlassCropClass =
  "absolute top-[-79.23%] left-[-39.91%] h-[258.46%] w-[179.82%] max-w-none";

function ChipGlassImage({ nodeId }: { nodeId: string }) {
  return (
  // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      src="/platform-scale/chip-glass.png"
      className={chipGlassCropClass}
      aria-hidden
      data-node-id={nodeId}
    />
  );
}

function GpxLabel({
  nodeId,
  left,
  top,
  label,
  fontSize,
  paddingX,
  paddingY,
  opacity,
}: {
  nodeId: string;
  left: number;
  top: number;
  label: string;
  fontSize: 18 | 32;
  paddingX: number;
  paddingY: number;
  opacity: number;
}) {
  const tracking = fontSize === 32 ? "-0.32px" : "-0.18px";

  return (
    <div
      className="absolute flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        padding: `${paddingY}px ${paddingX}px`,
        opacity,
      }}
      data-node-id={nodeId}
    >
      <p
        className={`${gilroyMedium.className} text-center leading-[36px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
        style={{
          fontSize: `${fontSize}px`,
          letterSpacing: tracking,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function PlatformScaleChipVisual() {
  return (
    <>
      {/* Side chips — image 79/80 */}
      <div
        className="absolute top-[491.20703125px] left-[calc(50%-648.69px)] h-[220px] w-[212.14378356933594px] -translate-x-1/2 overflow-hidden opacity-25"
        data-node-id="2379:627"
        data-name="image 80"
      >
        <ChipGlassImage nodeId="2379:627-img" />
      </div>
      <div
        className="absolute top-[491.20703125px] left-[calc(50%+644.33px)] h-[220px] w-[212.14378356933594px] -translate-x-1/2 overflow-hidden opacity-25"
        data-node-id="2379:626"
        data-name="image 79"
      >
        <ChipGlassImage nodeId="2379:626-img" />
      </div>
      <div
        className="absolute top-[466.20703125px] left-[237.955078125px] h-[270px] w-[260.3582763671875px] overflow-hidden opacity-50"
        data-node-id="2379:629"
        data-name="image 81"
      >
        <ChipGlassImage nodeId="2379:629-img" />
      </div>
      <div
        className="absolute top-[466.20703125px] left-[937.16796875px] h-[270px] w-[260.3582763671875px] overflow-hidden opacity-50"
        data-node-id="2379:628"
        data-name="image 78"
      >
        <ChipGlassImage nodeId="2379:628-img" />
      </div>

      {/* Chip group 2379:630 — children positioned per Figma (display:contents pattern) */}
      <div
        className="absolute top-[375.001953125px] left-[calc(50%-0.33984375px)] contents"
        data-node-id="2379:630"
        data-name="Chip"
      >
        <div
          className="absolute top-[375.001953125px] left-[578.3828125px] h-[136.73727416992188px] w-[297.23162841796875px]"
          data-node-id="2379:632"
          data-name="Shade"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/platform-scale/chip-shade.svg"
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </div>

        <div
          className="absolute top-[440.515625px] left-[calc(50%-3.80859375px)] h-[321.382080078125px] w-[321.7456359863281px] -translate-x-1/2 shadow-[0px_21px_20px_0px_#0d2006]"
          data-node-id="2379:631"
          data-name="image 70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/platform-scale/chip-hero.png"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-bottom"
            aria-hidden
          />
        </div>

        <div
          className="absolute top-[432.81640625px] right-[552.56640625px] h-[340.0953674316406px] w-[335.546875px]"
          data-node-id="2379:636"
          data-name="Group 88"
        >
          <div className="absolute inset-[-0.15%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/platform-scale/chip-frame.svg"
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Glass cube overlay — image 77 */}
      <div
        className="pointer-events-none absolute top-[436.400390625px] left-[559.21484375px] h-[329.6122741699219px] w-[317.841796875px] overflow-hidden"
        data-node-id="2379:659"
        data-name="image 77"
      >
        <ChipGlassImage nodeId="2379:659-img" />
      </div>

      <GpxLabel
        nodeId="2379:655"
        left={34.31212615966797}
        top={675.158203125}
        label="GPX 1"
        fontSize={18}
        paddingX={14}
        paddingY={4}
        opacity={0.5}
      />
      <GpxLabel
        nodeId="2379:651"
        left={304.63421630859375}
        top={697.158203125}
        label="GPX 5"
        fontSize={32}
        paddingX={20}
        paddingY={10}
        opacity={0.75}
      />
      <GpxLabel
        nodeId="2379:653"
        left={995.8479614257812}
        top={697.158203125}
        label="GPX 32"
        fontSize={32}
        paddingX={20}
        paddingY={10}
        opacity={0.75}
      />
      <GpxLabel
        nodeId="2379:657"
        left={1320.83203125}
        top={675.158203125}
        label="GPX 64"
        fontSize={18}
        paddingX={14}
        paddingY={4}
        opacity={0.5}
      />
    </>
  );
}
