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
      className="relative h-full w-[8px] shrink-0 overflow-clip"
      data-node-id={nodeId}
      data-name="Grid Line'"
    >
      <div className="absolute top-[0.46px] left-0 flex h-[4px] w-[8px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[8px]" data-node-id={capTopNodeId}>
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
      </div>
      <div className="absolute top-[4px] left-[3.5px] flex h-[259px] w-0 items-center justify-center">
        <div className="rotate-90 flex-none">
          <div className="relative h-0 w-[259px]" data-node-id={lineNodeId}>
            <div className="absolute inset-[-1px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ecosystem/line-87.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
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
