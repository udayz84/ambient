import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactMap } from "./ContactMap";
import { ContactMobile } from "./ContactMobile";
import { ContactResources } from "./ContactResources";
import { ContactSchedule } from "./ContactSchedule";
import { TabletScaleInit } from "../shared/TabletScaleInit";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function Contact({ data, bookingForm }: { data?: any; bookingForm?: any }) {
  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip min-[600px]:bg-black">
      <TabletScaleInit />
      {/* DESKTOP & TABLET (>=600px) */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full justify-center overflow-x-clip bg-black min-[600px]:flex"
        data-node-id="2379:4950"
        data-name="Contact - 3"
      >
        <TabletScaleCanvas className="relative h-[2674px] w-[1440px] shrink-0 min-[600px]:block">
          <div className="relative mx-auto h-full w-[1440px]">
            {data?.hero && <ContactHero data={data.hero} />}
            {data?.resources && <ContactResources data={data.resources} />}
            {data?.map && <ContactMap data={data.map} />}
            {data?.schedule && <ContactSchedule data={data.schedule} bookingForm={bookingForm} />}
            {data?.form && <ContactForm data={data.form} />}

            <div
              className="pointer-events-none absolute right-[269.72px] size-[4px]"
              style={{ top: 3116 }}
            >
              <div className="-scale-y-100 rotate-180 flex-none">
                <div className="relative size-[4px]" data-node-id="2379:5085">
                  <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async"
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
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-transparent min-[600px]:hidden z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ContactMobile data={data} bookingForm={bookingForm} />
        </div>
      </div>
    </main>
  );
}
