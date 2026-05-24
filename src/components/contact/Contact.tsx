import { SiteFooter } from "../site-footer/SiteFooter";
import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactMap } from "./ContactMap";
import { ContactResources } from "./ContactResources";
import { ContactSchedule } from "./ContactSchedule";

export function Contact() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative -mt-[78px] mx-auto h-[4031px] w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
        data-node-id="2379:4950"
        data-name="Contact - 3"
      >
        <ContactHero />
        <ContactResources />
        <ContactMap />
        <ContactSchedule />
        <ContactForm />

        <div className="absolute top-[2779px] left-0 w-full [&_footer]:mt-0">
          <SiteFooter />
        </div>

        <div className="pointer-events-none absolute top-[4026.57px] right-[269.72px] size-[4px]">
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
    </main>
  );
}
