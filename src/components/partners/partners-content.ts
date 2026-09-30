/**
 * src/components/partners/partners-content.ts
 * ----------------------------------------------------------------------------
 * Server-side mapper: converts the raw Strapi `partners-page` single-type
 * response into the exact content shapes the partners components render.
 *
 * Fallback rules:
 *   - Strapi unreachable / entry missing → every section falls back to the
 *     hardcoded copy in partners-data.ts (page keeps working).
 *   - Section present but a field null/undefined → that field falls back.
 *   - Section present but a repeatable list empty → the hardcoded list is
 *     used (an emptied list in the CMS is treated as editor error).
 *
 * Icons, small images and background images are deliberately NOT in Strapi —
 * they stay hardcoded here, keyed by position (see partners-data.ts header).
 * ----------------------------------------------------------------------------
 */
import { mediaUrl, type StrapiMedia } from "@/lib/strapi";
import {
  PARTNER_REGIONS,
  PARTNER_CAPABILITIES,
  PARTNERS,
  PARTNERS_HERO,
  PARTNERS_WHY,
  PARTNERS_BENEFITS,
  PARTNERS_ECOSYSTEM,
  PARTNERS_PROOF,
  PARTNERS_DIRECTORY,
  PARTNERS_MATCH,
  PARTNERS_BECOME,
  PARTNERS_FOOTER_CTAS,
} from "./partners-data";

/* Hardcoded visuals keyed by card position (not CMS-managed by design). */
const JOURNEY_IMAGES = [
  "/partners/svg 2/7.svg",
  "/partners/svg 2/8.svg",
  "/partners/svg 2/9.svg",
  "/partners/svg 2/10.svg",
  "/partners/svg 2/11.svg",
];
const BENEFIT_ICONS = ["speed", "target", "shield", "focus"] as const;
const CAPABILITY_ICONS = ["model", "firmware", "hardware", "product", "manufacturing"];
const PROOF_ICONS = [
  "/applications/dvk-icon-1.svg",
  "/developer/pipeline-icon-train.svg",
  "/navbar/nav-icon-chip.svg",
  "/company/ecosystem-icon-footprint.svg",
];
const PARTNER_ICONS = [
  "/partners/icons_partners/1.svg",
  "/partners/icons_partners/2.svg",
  "/partners/icons_partners/3.svg",
  "/partners/icons_partners/4.svg",
  "/partners/icons_partners/5.svg",
  "/partners/icons_partners/6.svg",
];
const BECOME_BENEFIT_ICONS = ["signal", "chip", "showcase"] as const;

export type HeroContent = {
  tag: string;
  title: string;
  subtitle: string;
  /** Resolved CMS image URL; null → component renders the local hardcoded asset. */
  image: string | null;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type JourneyStep = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export type WhyContent = typeof PARTNERS_WHY & { journey: JourneyStep[] };

export type BenefitCard = { title: string; description: string; icon: string };
export type BenefitsContent = Omit<typeof PARTNERS_BENEFITS, "cards"> & {
  cards: BenefitCard[];
};

export type Capability = {
  id: string;
  title: string;
  short: string;
  description: string;
  journeyIcon: string;
};

export type EcosystemContent = typeof PARTNERS_ECOSYSTEM;

export type ProofPoint = { title: string; description: string; icon: string };
export type ProofContent = Omit<typeof PARTNERS_PROOF, "points"> & {
  points: ProofPoint[];
};

export type PartnerEntry = {
  name: string;
  monogram: string;
  icon?: string;
  capability: string;
  region: string;
  badges: string[];
  oneLiner: string;
};

export type DirectoryContent = Omit<typeof PARTNERS_DIRECTORY, "partners"> & {
  partners: PartnerEntry[];
};

export type MatchFormContent = typeof PARTNERS_MATCH;
export type BecomeContent = typeof PARTNERS_BECOME;
export type FooterCtasContent = typeof PARTNERS_FOOTER_CTAS;

export type PartnersContent = {
  hero: HeroContent;
  why: WhyContent;
  benefits: BenefitsContent;
  ecosystem: EcosystemContent;
  capabilities: Capability[];
  proof: ProofContent;
  directory: DirectoryContent;
  matchForm: MatchFormContent;
  become: BecomeContent;
  footerCtas: FooterCtasContent;
  regions: string[];
};

/** nullable helper — falls back when the CMS value is null/undefined. */
const or = <T,>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined ? fallback : value;

const mapButton = (
  raw: { label?: string | null; href?: string | null } | null | undefined,
  fallback: { label: string; href: string },
): { label: string; href: string } =>
  raw ? { label: or(raw.label, fallback.label), href: or(raw.href, fallback.href) } : fallback;

const mapTag = (raw: { text?: string | null } | null | undefined, fallback: string): string =>
  or(raw?.text, fallback);

/** List with empty-means-missing semantics (see header). */
function mapList<T>(raw: T[] | null | undefined, fallback: readonly T[]): T[] {
  const list = Array.isArray(raw) ? raw.filter(Boolean) : [];
  return list.length ? list : [...fallback];
}

export function mapPartnersPage(raw: any | null): PartnersContent {
  const heroRaw = raw?.hero;
  const hero: HeroContent = heroRaw
    ? {
        tag: mapTag(heroRaw.tag, PARTNERS_HERO.tag),
        title: or(heroRaw.title, PARTNERS_HERO.title),
        subtitle: or(heroRaw.subtitle, PARTNERS_HERO.subtitle),
        image: mediaUrl(heroRaw.image as StrapiMedia),
        primaryCta: mapButton(heroRaw.primary_cta, PARTNERS_HERO.primaryCta),
        secondaryCta: mapButton(heroRaw.secondary_cta, PARTNERS_HERO.secondaryCta),
      }
    : { ...PARTNERS_HERO, image: null };

  const whyRaw = raw?.why;
  const why: WhyContent = whyRaw
    ? {
        tag: mapTag(whyRaw.tag, PARTNERS_WHY.tag),
        heading: or(whyRaw.heading, PARTNERS_WHY.heading),
        subheading: or(whyRaw.subheading, PARTNERS_WHY.subheading),
        body: or(whyRaw.body, PARTNERS_WHY.body),
        journey: mapList(whyRaw.journey, PARTNERS_WHY.journey).map((step: any, i) => ({
          number: or(step.number, PARTNERS_WHY.journey[i]?.number ?? String(i + 1).padStart(2, "0")),
          title: or(step.title, PARTNERS_WHY.journey[i]?.title ?? ""),
          description: or(step.description, PARTNERS_WHY.journey[i]?.description ?? ""),
          image: JOURNEY_IMAGES[i % JOURNEY_IMAGES.length],
        })),
        legendStrong: or(whyRaw.legend_strong, PARTNERS_WHY.legendStrong),
        legendGap: or(whyRaw.legend_gap, PARTNERS_WHY.legendGap),
      }
    : { ...PARTNERS_WHY, journey: PARTNERS_WHY.journey.map((step, i) => ({ ...step, image: JOURNEY_IMAGES[i] })) };

  const benefitsRaw = raw?.benefits;
  const benefits: BenefitsContent = benefitsRaw
    ? {
        tag: mapTag(benefitsRaw.tag, PARTNERS_BENEFITS.tag),
        heading: or(benefitsRaw.heading, PARTNERS_BENEFITS.heading),
        subheading: or(benefitsRaw.subheading, PARTNERS_BENEFITS.subheading),
        cards: mapList(benefitsRaw.cards, PARTNERS_BENEFITS.cards).map((card: any, i) => ({
          title: or(card.title, PARTNERS_BENEFITS.cards[i]?.title ?? ""),
          description: or(card.description, PARTNERS_BENEFITS.cards[i]?.description ?? ""),
          icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length],
        })),
        bridge: or(benefitsRaw.bridge, PARTNERS_BENEFITS.bridge),
      }
    : PARTNERS_BENEFITS;

  const capsRaw = raw?.capabilities;
  const ecosystem: EcosystemContent = capsRaw
    ? {
        tag: mapTag(capsRaw.tag, PARTNERS_ECOSYSTEM.tag),
        heading: or(capsRaw.heading, PARTNERS_ECOSYSTEM.heading),
        subheading: or(capsRaw.subheading, PARTNERS_ECOSYSTEM.subheading),
        bridge: or(capsRaw.bridge, PARTNERS_ECOSYSTEM.bridge),
      }
    : PARTNERS_ECOSYSTEM;

  const capabilities: Capability[] = capsRaw
    ? mapList(capsRaw.cards, PARTNER_CAPABILITIES).map((card: any, i) => {
        const short = or(card.short, card.title);
        return {
          id: short,
          title: or(card.title, PARTNER_CAPABILITIES[i]?.title ?? ""),
          short,
          description: or(card.description, PARTNER_CAPABILITIES[i]?.description ?? ""),
          journeyIcon: CAPABILITY_ICONS[i % CAPABILITY_ICONS.length],
        };
      })
    : [...PARTNER_CAPABILITIES];

  const proofRaw = raw?.proof;
  const proof: ProofContent = proofRaw
    ? {
        tag: mapTag(proofRaw.tag, PARTNERS_PROOF.tag),
        heading: or(proofRaw.heading, PARTNERS_PROOF.heading),
        subheading: or(proofRaw.subheading, PARTNERS_PROOF.subheading),
        points: mapList(proofRaw.points, PARTNERS_PROOF.points).map((point: any, i) => ({
          title: or(point.title, PARTNERS_PROOF.points[i]?.title ?? ""),
          description: or(point.description, PARTNERS_PROOF.points[i]?.description ?? ""),
          icon: PROOF_ICONS[i % PROOF_ICONS.length],
        })),
        links: mapList(proofRaw.links, PARTNERS_PROOF.links).map((link: any, i) => ({
          label: or(link.label, PARTNERS_PROOF.links[i]?.label ?? ""),
          href: or(link.href, PARTNERS_PROOF.links[i]?.href ?? "#"),
        })),
      }
    : PARTNERS_PROOF;

  const dirRaw = raw?.directory;
  const directory: DirectoryContent = dirRaw
    ? {
        tag: mapTag(dirRaw.tag, PARTNERS_DIRECTORY.tag),
        heading: or(dirRaw.heading, PARTNERS_DIRECTORY.heading),
        subheading: or(dirRaw.subheading, PARTNERS_DIRECTORY.subheading),
        filters: {
          capability: or(dirRaw.filter_capability_label, PARTNERS_DIRECTORY.filters.capability),
          region: or(dirRaw.filter_region_label, PARTNERS_DIRECTORY.filters.region),
          all: or(dirRaw.filter_all_label, PARTNERS_DIRECTORY.filters.all),
        },
        expanding: {
          title: or(dirRaw.expanding_title, PARTNERS_DIRECTORY.expanding.title),
          description: or(dirRaw.expanding_description, PARTNERS_DIRECTORY.expanding.description),
        },
        noMatch: {
          message: or(dirRaw.no_match_message, PARTNERS_DIRECTORY.noMatch.message),
          cta: mapButton(dirRaw.no_match_cta, PARTNERS_DIRECTORY.noMatch.cta),
        },
        connect: or(dirRaw.connect_label, PARTNERS_DIRECTORY.connect),
        bridge: or(dirRaw.bridge, PARTNERS_DIRECTORY.bridge),
        partners: mapList(dirRaw.partners, PARTNERS).map((p: any, i) => ({
          name: or(p.name, PARTNERS[i]?.name ?? ""),
          monogram: or(p.monogram, PARTNERS[i]?.monogram ?? ""),
          icon: PARTNER_ICONS[i % PARTNER_ICONS.length],
          capability: or(p.capability, PARTNERS[i]?.capability ?? ""),
          region: or(p.region, PARTNERS[i]?.region ?? ""),
          badges: mapList(
            (p.badges ?? []).map((b: any) => b?.text).filter(Boolean),
            PARTNERS[i]?.badges ?? [],
          ),
          oneLiner: or(p.one_liner, PARTNERS[i]?.oneLiner ?? ""),
        })),
      }
    : { ...PARTNERS_DIRECTORY, partners: [...PARTNERS] };

  const matchRaw = raw?.match_form;
  const matchForm: MatchFormContent = matchRaw
    ? {
        tag: mapTag(matchRaw.tag, PARTNERS_MATCH.tag),
        heading: or(matchRaw.heading, PARTNERS_MATCH.heading),
        subheading: or(matchRaw.subheading, PARTNERS_MATCH.subheading),
        submitLabel: or(matchRaw.submit_label, PARTNERS_MATCH.submitLabel),
        confirmation: or(matchRaw.confirmation, PARTNERS_MATCH.confirmation),
        fields: {
          firstName: or(matchRaw.first_name_label, PARTNERS_MATCH.fields.firstName),
          lastName: or(matchRaw.last_name_label, PARTNERS_MATCH.fields.lastName),
          company: or(matchRaw.company_label, PARTNERS_MATCH.fields.company),
          email: or(matchRaw.email_label, PARTNERS_MATCH.fields.email),
          region: or(matchRaw.region_label, PARTNERS_MATCH.fields.region),
          helpAreas: or(matchRaw.help_areas_label, PARTNERS_MATCH.fields.helpAreas),
          message: or(matchRaw.message_label, PARTNERS_MATCH.fields.message),
        },
        emailHint: or(matchRaw.email_hint, PARTNERS_MATCH.emailHint),
      }
    : PARTNERS_MATCH;

  const becomeRaw = raw?.become;
  const become: BecomeContent = becomeRaw
    ? {
        tag: mapTag(becomeRaw.tag, PARTNERS_BECOME.tag),
        heading: or(becomeRaw.heading, PARTNERS_BECOME.heading),
        subheading: or(becomeRaw.subheading, PARTNERS_BECOME.subheading),
        benefits: mapList(becomeRaw.benefits, PARTNERS_BECOME.benefits).map((b: any, i) => ({
          title: or(b.title, PARTNERS_BECOME.benefits[i]?.title ?? ""),
          description: or(b.description, PARTNERS_BECOME.benefits[i]?.description ?? ""),
          icon: BECOME_BENEFIT_ICONS[i % BECOME_BENEFIT_ICONS.length],
        })),
        lookingFor: {
          title: or(becomeRaw.looking_for_title, PARTNERS_BECOME.lookingFor.title),
          description: or(becomeRaw.looking_for_description, PARTNERS_BECOME.lookingFor.description),
          chips: mapList(
            (becomeRaw.looking_for_chips ?? []).map((c: any) => c?.text).filter(Boolean),
            PARTNERS_BECOME.lookingFor.chips,
          ),
        },
        form: {
          title: or(becomeRaw.form_title, PARTNERS_BECOME.form.title),
          name: or(becomeRaw.form_name_label, PARTNERS_BECOME.form.name),
          company: or(becomeRaw.form_company_label, PARTNERS_BECOME.form.company),
          website: or(becomeRaw.form_website_label, PARTNERS_BECOME.form.website),
          email: or(becomeRaw.form_email_label, PARTNERS_BECOME.form.email),
          region: or(becomeRaw.form_region_label, PARTNERS_BECOME.form.region),
          capabilities: or(becomeRaw.form_capabilities_label, PARTNERS_BECOME.form.capabilities),
          experience: or(becomeRaw.form_experience_label, PARTNERS_BECOME.form.experience),
          submit: or(becomeRaw.form_submit_label, PARTNERS_BECOME.form.submit),
          confirmation: or(becomeRaw.form_confirmation, PARTNERS_BECOME.form.confirmation),
        },
        secondaryCta: mapButton(becomeRaw.secondary_cta, PARTNERS_BECOME.secondaryCta),
      }
    : PARTNERS_BECOME;

  const footerRaw = raw?.footer_ctas;
  const footerCtas: FooterCtasContent = footerRaw
    ? {
        heading: or(footerRaw.heading, PARTNERS_FOOTER_CTAS.heading),
        primary: mapButton(footerRaw.primary_cta, PARTNERS_FOOTER_CTAS.primary),
        secondary: mapButton(footerRaw.secondary_cta, PARTNERS_FOOTER_CTAS.secondary),
      }
    : PARTNERS_FOOTER_CTAS;

  return {
    hero,
    why,
    benefits,
    ecosystem,
    capabilities,
    proof,
    directory,
    matchForm,
    become,
    footerCtas,
    regions: [...PARTNER_REGIONS],
  };
}
