type EcosystemGridLineProps = {
  nodeId: string;
  capTopNodeId: string;
  lineNodeId: string;
  capBottomNodeId: string;
};

export function EcosystemGridLine({
  nodeId,
  capTopNodeId,
  lineNodeId,
  capBottomNodeId,
}: EcosystemGridLineProps) {
  return (
    <div
      className="relative h-full w-[8px] shrink-0"
      data-node-id={nodeId}
      data-name="Grid Line'"
    >
      <div className="absolute top-[0px] left-0 h-[4.5px] w-[8px]" data-node-id={capTopNodeId}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ecosystem/grid-cap.svg"
          alt=""
          className="block size-full max-w-none rotate-180"
          aria-hidden
        />
      </div>
      <div className="absolute top-[4px] left-[3.5px] flex h-[217px] w-[1px] items-center justify-center overflow-visible bg-white/10">
        {/* Simple fallback in case SVG doesn't load/render well */}
      </div>
      <div className="absolute bottom-[0.5px] left-0 h-[4px] w-[8px]" data-node-id={capBottomNodeId}>
        <div className="absolute inset-[0_0_-12.5%_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ecosystem/grid-cap.svg"
            alt=""
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
