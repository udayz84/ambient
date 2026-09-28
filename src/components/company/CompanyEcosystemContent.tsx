import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { GradientTitle } from "../contact/contact-shared";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyStandardCorners, CornerDecor } from "./company-corners";

const FALLBACK_HEADING = "A globally resilient\necosystem";
const FALLBACK_SUBTITLE =
  "Backed by Tier-1 foundries and integrated with the world's leading technology distributors and platforms.";

const FALLBACK_COLUMNS = [
  {
    icon: "/company/ecosystem-icon-footprint.svg",
    title: "Global Footprint",
    description:
      "Headquartered in Santa Clara, CA with dedicated R&D and hardware labs in Bangalore and Singapore.",
    iconNodeId: "2379:4652",
    titleNodeId: "2379:4654",
    descNodeId: "2379:4655",
    titleWidth: "w-[197px]",
    descWidth: "w-[361.999px]",
    left: "left-[42px]",
  },
  {
    icon: "/company/ecosystem-icon-distribution.svg",
    title: "Distribution & Supply Chain",
    description:
      "Authorized global distribution through trusted enterprise partners ensuring secure, high-volume silicon delivery.",
    iconNodeId: "2379:4658",
    titleNodeId: "2379:4662",
    descNodeId: "2379:4663",
    titleWidth: "w-[326px]",
    descWidth: "w-[389px]",
    left: "left-[42px]",
  },
] as const;

function EcosystemColumnIcon({
  src,
  nodeId,
}: {
  src: string;
  nodeId: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={32}
      height={32}
      className="absolute top-0 left-0 size-[32px] shrink-0"
      data-node-id={nodeId}
      aria-hidden
    />
  );
}

type CompanyEcosystemContentProps = {
  data?: any;
};

export function CompanyEcosystemContent({ data }: CompanyEcosystemContentProps = {}) {
  const heading = (data?.heading as string) || FALLBACK_HEADING;
  const subtitle = (data?.subtitle as string) || FALLBACK_SUBTITLE;
  const headingLines = heading.split("\n");

  const strapiColumns = Array.isArray(data?.columns) ? data.columns : null;
  const columns: readonly {
    icon: string;
    title: string;
    description: string;
    iconNodeId: string;
    titleNodeId: string;
    descNodeId: string;
    titleWidth: string;
    descWidth: string;
    left: string;
  }[] =
    strapiColumns && strapiColumns.length > 0
      ? strapiColumns.map((c: any, i: number) => {
          const fallback = FALLBACK_COLUMNS[i] ?? FALLBACK_COLUMNS[FALLBACK_COLUMNS.length - 1];
          return {
            icon: mediaUrl(c?.icon) || fallback.icon,
            title: (c?.title as string) || fallback.title,
            description: (c?.description as string) || fallback.description,
            iconNodeId: fallback.iconNodeId,
            titleNodeId: fallback.titleNodeId,
            descNodeId: fallback.descNodeId,
            titleWidth: fallback.titleWidth,
            descWidth: fallback.descWidth,
            left: fallback.left,
          };
        })
      : FALLBACK_COLUMNS;

  return (
    <div
      className="absolute top-[0.708px] left-[118px] z-10 h-[390px] w-[1204px] border-[0.5px] border-b-0 border-solid border-[rgba(255,255,255,0.15)]"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.5) 100%)",
      }}
      data-node-id="2379:4637"
      data-name="Content Section"
    >
      <CompanyStandardCorners />

      <div
        className="absolute top-[40px] left-[40px] h-[310px] w-[1124px]"
        data-node-id="2379:4638"
      >
        <div
          className="absolute top-0 left-0 h-[98px] w-[1124px]"
          data-node-id="2379:4639"
        >
          <div
            className="absolute top-0 left-0 h-[98px] w-[485px]"
            data-node-id="2379:4640"
          >
            <div
              className="absolute top-0 left-[1px] h-[98px] w-[483px]"
              data-node-id="2379:4641"
            >
              <div className="relative h-[98px] w-[483px] px-[10px]">
                <GradientTitle
                  nodeId="2379:4642"
                  gradientDeg="105.739deg"
                  className="w-[463px]"
                  maxLines={2}
                >
                  {headingLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        i === headingLines.length - 1
                          ? "leading-[49px]"
                          : "mb-0 leading-[49px]"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </GradientTitle>
                <CornerDecor />
              </div>
            </div>
          </div>
          <p
            className={`${interRegular.className} absolute top-[8.5px] left-[680px] h-[81px] w-[444px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2379:4647"
          >
            {subtitle}
          </p>
        </div>

        <div
          className="absolute top-[146px] left-0 h-px w-[1124px] bg-[#224A10]"
          data-node-id="2379:4648"
          aria-hidden
        />

        <div
          className="absolute top-[194px] left-0 flex h-[116px] w-[1068.999px] items-start justify-between"
          data-node-id="2379:4649"
        >
          {columns.map((col, i) => (
            <div
              key={i}
              className={`relative h-[116px] ${col.descWidth}`}
              data-node-id={i === 0 ? "2379:4650" : `2379:eco-col-${i}`}
            >
              <div
                className={`relative h-[32px] ${col.descWidth}`}
                data-node-id={i === 0 ? "2379:4651" : `2379:eco-col-hdr-${i}`}
              >
                <EcosystemColumnIcon
                  src={col.icon}
                  nodeId={col.iconNodeId}
                />
                <p
                  className={`${gilroyMedium.className} absolute top-[1.5px] ${col.left} h-[29px] ${col.titleWidth} text-[26px] leading-[28px] font-medium whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis`}
                  data-node-id={col.titleNodeId}
                >
                  {col.title}
                </p>
              </div>
              <p
                className={`${interRegular.className} absolute top-[44px] left-0 h-[72px] ${col.descWidth} text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
                data-node-id={col.descNodeId}
              >
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
