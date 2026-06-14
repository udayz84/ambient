import { ApplicationsCategoryNav } from "./ApplicationsCategoryNav";
import { ApplicationsCta } from "./ApplicationsCta";
import { ApplicationsFeatureCard } from "./ApplicationsFeatureCard";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsHeroVisual } from "./ApplicationsHeroVisual";
import { FEATURE_CARDS } from "./applications-data";

export function Applications() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Build the impossible today"
    >
      <div className="relative mx-auto flex h-[868px] w-full max-w-[1440px] justify-center">
        <div
          className="relative h-[868px] w-[1321px] shrink-0"
          data-node-id="2379:844"
          data-name="Build the impoosible"
        >
          <ApplicationsHeader />
          <ApplicationsCategoryNav />
          <ApplicationsHeroVisual />
          <ApplicationsFeatureCard {...FEATURE_CARDS.left} />
          <ApplicationsFeatureCard {...FEATURE_CARDS.right} />
          <ApplicationsCta />
        </div>
      </div>
    </section>
  );
}
