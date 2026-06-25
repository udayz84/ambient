import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ARTICLE_ICON_BG,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEVELOPER_ARTICLES,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_SHADOW,
  SECTION_TITLE_GRADIENT,
} from "./developer-data";

/**
 * Mobile (<1024px) stacked adaptation of the Developer hero + code section.
 * Built responsive from the same Figma content (no dedicated mobile frame supplied).
 */
export function DeveloperMobile() {
  return (
    <div className="flex w-full flex-col">
      <DeveloperHeroMobile />
      <DeveloperCodeSectionMobile />
    </div>
  );
}

function DeveloperHeroMobile() {
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] pt-[140px] pb-[56px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: HERO_TITLE_GRADIENT }}
        >
          Model to deployment in 15 Minutes
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[24px] max-w-[327px] text-center text-[15px] leading-[24px] font-normal text-[#f0f0f0] not-italic`}
      >
        ModelForge bridges training and deployment. Quantize, compile, and merge
        neural networks with your firmware.
      </p>
      <div className="mt-[32px] flex w-full flex-col gap-[12px]">
        <a
          href="#"
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[20px] py-[10px]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            Download ModelForge SDK
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
        <a
          href="#"
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
        >
          <span className="relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            Read the Documentation
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}

function DeveloperCodeSectionMobile() {
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
        >
          Hello world in three lines
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic opacity-65`}
      >
        We invisibly map AI cores to your host drop your model straight into
        your existing application.
      </p>

      {/* Code editor */}
      <div className="mt-[32px] w-full overflow-clip rounded-[12px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]">
        <div className="flex h-[44px] w-full items-center gap-[16px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[16px]">
          <div className="flex h-[10px] items-center gap-[6px]">
            <span className="size-[10px] rounded-full bg-[rgba(251,44,54,0.6)]" />
            <span className="size-[10px] rounded-full bg-[rgba(240,177,0,0.6)]" />
            <span className="size-[10px] rounded-full bg-[rgba(0,201,80,0.6)]" />
          </div>
          <span
            className={`${interRegular.className} text-[13px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
          >
            main.c
          </span>
        </div>
        <div className="overflow-x-auto px-[16px] py-[16px]">
          <pre
            className="whitespace-pre text-[12px] leading-[20px] text-[rgba(255,255,255,0.4)]"
            style={{ fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}
          >
{`#include <ambient.h>
#include <sensor_drivers.h>

int main(void) {
    ambient_init();
    sensor_config_t sensor;
    model_t model_obj;
    ambient_load_model(&model_obj, "fall_detect.bin");

    while(1) {
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              ambient_read_i2s_mic
            </span>
            {`(&sensor);
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              ambient_run_fft
            </span>
            {`(&sensor);
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              run_ai_inference
            </span>
            {`(&model_obj);
        if(model_obj.result > THRESHOLD) {
            trigger_alert();
        }
    }
}`}
          </pre>
        </div>
      </div>

      {/* Articles */}
      <div className="mt-[24px] flex w-full flex-col gap-[16px]">
        {DEVELOPER_ARTICLES.map((article) => (
          <div
            key={article.title}
            className="relative flex items-start gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] p-[16px]"
          >
            <div
              className="relative h-[44px] w-[44px] shrink-0 overflow-clip rounded-[10px]"
              style={{
                backgroundImage: ARTICLE_ICON_BG,
                backgroundColor: "#1d221c",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                aria-hidden
                src={article.icon}
                className="absolute left-1/2 top-1/2 size-[22px] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <p
                className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {article.title}
              </p>
              <p
                className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
              >
                {article.description}
              </p>
            </div>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>
    </section>
  );
}
