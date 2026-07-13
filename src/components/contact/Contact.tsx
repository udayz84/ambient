import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactMap } from "./ContactMap";
import { ContactMobile } from "./ContactMobile";
import { ContactResources } from "./ContactResources";
import { ContactSchedule } from "./ContactSchedule";

const CONTACT_PAGE_HEIGHT_PX = 2674;
const CONTACT_FOOTER_TOP_PX = 2674;

export function Contact({ data }: { data?: any }) {
  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip min-[1024px]:bg-black">
      {/* DESKTOP (>=1024px) — absolute canvas, untouched */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip overflow-y-visible bg-black min-[1024px]:block"
        style={{ height: CONTACT_PAGE_HEIGHT_PX }}
        data-node-id="2379:4950"
        data-name="Contact - 3"
      >
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          {data?.hero && <ContactHero data={data.hero} />}
          {data?.resources && <ContactResources data={data.resources} />}
          {data?.map && <ContactMap data={data.map} />}
          {data?.schedule && <ContactSchedule data={data.schedule} />}
          {data?.form && <ContactForm data={data.form} />}

          <div
            className="pointer-events-none absolute right-[269.72px] size-[4px]"
            style={{ top: 3116 }}
          >
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]" data-node-id="2379:5085">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="block size-full max-w-none"
                    src="/hero/corner-tag-2.svg"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-transparent min-[1024px]:hidden z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ContactMobile data={data} />
        </div>
      </div>
    </main>
  );
}
