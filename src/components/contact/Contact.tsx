import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactMap } from "./ContactMap";
import { ContactResources } from "./ContactResources";
import { ContactSchedule } from "./ContactSchedule";

/** Figma canvas 2379:4950 — form ends ~3120px; footer from 2779px; page height 4031px */
const CONTACT_PAGE_HEIGHT_PX = 2779;
const CONTACT_FOOTER_TOP_PX = 2779;

export function Contact() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative mx-auto -mt-[78px] w-full overflow-x-clip overflow-y-visible bg-black"
        style={{ height: CONTACT_PAGE_HEIGHT_PX }}
        data-node-id="2379:4950"
        data-name="Contact - 3"
      >
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          <ContactHero />
          <ContactResources />
          <ContactMap />
          <ContactSchedule />
          <ContactForm />

          <div
            className="pointer-events-none absolute right-[269.72px] size-[4px]"
            style={{ top: 4026.57 }}
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
    </main>
  );
}
