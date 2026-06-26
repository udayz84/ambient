import { gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";

export function SomPrototypeTitle() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:5083"
      aria-label="Prototype to Product in a Snap"
    >
      <div
        className="relative w-fit max-w-full px-[10px] pt-[72px] pb-[48px] min-[1024px]:pt-[100px] min-[1024px]:pb-[60px]"
        data-name="Title"
      >
        <h2
          className={`${gilroyMedium.className} text-center text-[34px] leading-[38px] font-medium text-white not-italic [word-break:break-word] min-[1024px]:whitespace-nowrap min-[1024px]:text-[46px] min-[1024px]:leading-[49px]`}
        >
          Prototype to Product in a Snap
        </h2>
        <Corners />
      </div>
    </section>
  );
}
