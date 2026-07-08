import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";

const FALLBACK_BACKDROP = "/careers/image 107.png";

const VIGNETTE =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

type NewsBackdropProps = {
  data?: any;
};

export function NewsBackdrop({ data }: NewsBackdropProps = {}) {
  const backdropSrc = mediaUrl(data?.backdrop_image) || FALLBACK_BACKDROP;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      data-node-id="2500:1654"
      data-name="image 107"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backdropSrc}
          alt=""
          fill
          sizes="1440px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
    </div>
  );
}
