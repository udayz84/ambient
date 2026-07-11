import { Fragment } from "react";
import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroySemiBold } from "../hero/fonts";
import { EcosystemPartnerRow } from "../ecosystem/EcosystemPartnerRow";
import { EcosystemGridLine } from "../ecosystem/EcosystemGridLine";
import { Corners } from "../shared/Corners";
import {
  COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES,
  COMPANY_TECHNOLOGY_PARTNER_ROW,
  TECHNOLOGY_PARTNERS_TITLE_GRADIENT,
} from "./company-technology-partners-data";

const FALLBACK_TITLE = "TECHNOLOGY PARTNERS";

function buildPartnerLogo(p: any) {
  const logoUrl = mediaUrl(p?.logo);
  if (!logoUrl) return null;
  const naturalW = p?.logo?.width ?? 100;
  const naturalH = p?.logo?.height ?? 30;
  const maxW = 120;
  const maxH = 40;
  const scale = Math.min(maxW / naturalW, maxH / naturalH, 1);
  return {
    src: logoUrl,
    width: Math.max(1, Math.round(naturalW * scale)),
    height: Math.max(1, Math.round(naturalH * scale)),
  };
}

type CompanyTechnologyPartnersProps = {
  data?: any;
};

export function CompanyTechnologyPartners({ data }: CompanyTechnologyPartnersProps = {}) {
  const title = (data?.title as string) || FALLBACK_TITLE;

  const strapiPartners = Array.isArray(data?.partners) ? data.partners : null;
  const partnerLogos = strapiPartners
    ? (strapiPartners
        .map(buildPartnerLogo)
        .filter(Boolean) as { src: string; width: number; height: number }[])
    : null;
  const hasStrapiLogos = partnerLogos !== null && partnerLogos.length > 0;

  return (
    <section
      className="absolute top-[4584px] left-[118px] z-[8] h-[285px] w-[1204px] bg-black"
      data-node-id="2379:4669"
      data-name="Frame 1618875819"
      aria-label="Technology partners"
    >
      <p
        className={`${gilroySemiBold.className} absolute top-0 left-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-transparent opacity-90 not-italic [word-break:break-word]`}
        style={{ backgroundImage: TECHNOLOGY_PARTNERS_TITLE_GRADIENT }}
        data-node-id="2379:4670"
      >
        {title}
      </p>

      <div
        className="absolute top-[60px] left-0 h-[225px] w-[1204px]"
        data-node-id="2379:4671"
      >
        {hasStrapiLogos ? (
          <div className="relative flex h-full w-full items-center justify-between bg-[rgba(255,255,255,0.04)] px-[40px]">
            <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
              <Image
                src="/ecosystem/partner-frame-border.svg"
                alt=""
                fill
                className="object-fill"
                sizes="1204px"
              />
            </div>

            {partnerLogos.map((logo, i) => (
              <Fragment key={i}>
                <div
                  className="relative flex w-[150px] shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
                  data-node-id={COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES[i] ?? `2379:tp-logo-${i}`}
                  data-name="Stat"
                >
                  <div
                    className="relative shrink-0 overflow-clip"
                    style={{ width: logo.width, height: logo.height }}
                    data-name="Icon"
                  >
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      className="block size-full max-w-none object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                {i < partnerLogos.length - 1 ? (
                  <EcosystemGridLine
                    nodeId={`2379:tp-grid-${i}`}
                    capTopNodeId={`2379:tp-ct-${i}`}
                    lineNodeId={`2379:tp-ln-${i}`}
                    capBottomNodeId={`2379:tp-cb-${i}`}
                  />
                ) : null}
              </Fragment>
            ))}

            <Corners
              leftSrc="/ecosystem/corner-tl.svg"
              rightSrc="/ecosystem/corner-tr.svg"
              className="z-[3]"
            />
          </div>
        ) : (
          <EcosystemPartnerRow
            config={COMPANY_TECHNOLOGY_PARTNER_ROW}
            logoStatNodeIds={COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES}
          />
        )}
      </div>
    </section>
  );
}
