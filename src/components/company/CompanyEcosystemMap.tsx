import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";

const FALLBACK_MAP = "/company/Map.png";

type CompanyEcosystemMapProps = {
  data?: any;
};

export function CompanyEcosystemMap({ data }: CompanyEcosystemMapProps = {}) {
  const mapSrc = mediaUrl(data?.map_image) || FALLBACK_MAP;
  return (
    <div
      className="absolute top-[151.084px] left-[50px] h-[765.427px] w-[1340px] overflow-hidden"
      data-node-id="2379:2371"
      data-name="Map"
    >
      <Image
        src={mapSrc}
        alt=""
        width={1340}
        height={766}
        className="block h-[765.427px] w-[1340px] max-w-none object-fill mix-blend-screen"
        data-node-id="2379:2373"
        priority={false}
        aria-hidden
      />
    </div>
  );
}
