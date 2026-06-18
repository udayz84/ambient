import Image from "next/image";

const articleCornerLeft = "/hero/vector-55.svg";
const articleCornerRight = "/hero/vector-57.svg";

export function CompanyArticleCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden>
      <div className="absolute left-[-0.5px] top-[-0.5px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={articleCornerLeft} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[-0.5px] top-[-0.5px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={articleCornerRight} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.5px] right-[-0.5px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={articleCornerRight} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.5px] left-[-0.5px] size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src={articleCornerLeft} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
        </div>
      </div>
    </div>
  );
}
