/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";

/* Node 2500:1654 vignette, mapped into the final landscape 1440x810 box
 * (Figma applies the radial gradient to the 810x1440 portrait box and then
 * rotates it with the box; this is the equivalent direct-landscape gradient:
 * center (720,446.14), radii (891.52,460.09), rgba(0,0,0,0.6) -> rgba(0,0,0,1)). */
const VIGNETTE =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 810' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(89.152 0 0 46.009 720 446.14)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

type NewsBackdropProps = {
  data?: any;
};

export function NewsBackdrop({ data }: NewsBackdropProps = {}) {
  const backdropSrc = mediaUrl(data?.backdrop_image);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[104px] bottom-auto z-0 h-[810px] overflow-hidden"
      aria-hidden
      data-node-id="2500:1654"
      data-name="image 107"
    >
      <div className="absolute inset-0 w-full h-full">
        {backdropSrc ? (
          <img
            src={backdropSrc}
            alt={data?.alt || ""}
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
      </div>
    </div>
  );
}
