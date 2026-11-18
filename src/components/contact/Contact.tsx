import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactMap } from "./ContactMap";
import { ContactMobile } from "./ContactMobile";
import { ContactResources } from "./ContactResources";
import { ContactSchedule } from "./ContactSchedule";
import { TabletScaleInit } from "../shared/TabletScaleInit";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function Contact({
  data,
  bookingForm,
  pressKitHref,
}: {
  data?: any;
  bookingForm?: any;
  pressKitHref?: string | null;
}) {
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
            {data?.resources && (
              <ContactResources data={data.resources} pressKitHref={pressKitHref} />
            )}
            {data?.map && <ContactMap data={data.map} />}
            {data?.schedule && <ContactSchedule data={data.schedule} bookingForm={bookingForm} />}
            {data?.form && <ContactForm data={data.form} />}
          </div>
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-transparent min-[600px]:hidden z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ContactMobile data={data} bookingForm={bookingForm} pressKitHref={pressKitHref} />
        </div>
      </div>
    </main>
  );
}
