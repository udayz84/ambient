const GLASS_COLUMN_IDS = [
  "2379:967",
  "2379:968",
  "2379:969",
  "2379:970",
  "2379:971",
  "2379:972",
  "2379:973",
  "2379:974",
  "2379:975",
  "2379:976",
  "2379:977",
  "2379:978",
  "2379:979",
  "2379:980",
  "2379:981",
  "2379:982",
  "2379:983",
  "2379:984",
  "2379:985",
] as const;

function FractalGlassColumn({
  nodeId,
  isLast,
}: {
  nodeId: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full min-w-px flex-[1_0_0] items-center justify-center mix-blend-overlay ${isLast ? "" : "-mr-[3px]"}`}
      style={{ containerType: "size" }}
    >
      <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
        <div
          className="relative size-full bg-gradient-to-b from-[rgba(255,255,255,0.3)] via-[31.127%] via-[rgba(9,21,44,0.3)] to-[110.67%] to-[rgba(255,255,255,0.3)] backdrop-blur-[100px]"
          data-node-id={nodeId}
        />
      </div>
    </div>
  );
}

export function DeveloperPlatformBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#214c32]" />

      <div className="absolute top-0 right-0 left-0 h-[883px] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 h-[883px] w-[1440px] origin-center"
          style={{
            transform: "translateX(-50%) scaleX(max(1, calc(100vw / 1440px)))",
          }}
        >
          <div
            className="flex h-[883px] w-[1440px] items-start overflow-clip bg-gradient-to-b from-black from-[11.538%] to-[rgba(0,0,0,0)] to-[30.879%]"
            data-node-id="2379:966"
            data-name="Fractal Glass"
          >
            {GLASS_COLUMN_IDS.map((id, index) => (
              <FractalGlassColumn
                key={id}
                nodeId={id}
                isLast={index === GLASS_COLUMN_IDS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
