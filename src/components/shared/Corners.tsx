import Image from "next/image";

const DEFAULT_LEFT = "/hero/corner-tag-1.svg";
const DEFAULT_RIGHT = "/hero/corner-tag-2.svg";

export function Corners({
  leftSrc = DEFAULT_LEFT,
  rightSrc = DEFAULT_RIGHT,
  className = "",
}: {
  leftSrc?: string;
  rightSrc?: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center ${className}`}
      >
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <Image
              src={rightSrc}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div
        className={`pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center ${className}`}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <Image
              src={leftSrc}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div
        className={`pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center ${className}`}
      >
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <Image
              src={rightSrc}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div
        className={`pointer-events-none absolute bottom-0 left-0 flex size-[4px] items-center justify-center ${className}`}
      >
        <div className="flex-none">
          <div className="relative size-[4px]">
            <Image
              src={leftSrc}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </>
  );
}
