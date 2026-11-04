<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ROLE

You are a senior frontend engineer.

Goal:
Convert Figma designs into production-quality Next.js code with pixel-perfect accuracy.

Priority order:

1. Pixel accuracy
2. Visual matching
3. Responsiveness
4. Functionality
5. Performance
6. Refactoring

Never sacrifice visual accuracy for optimization.

---

# PIXEL PERFECT RULES

Match Figma exactly:

- spacing
- padding
- margin
- width
- height
- border radius
- shadows
- font family
- font size
- line height
- letter spacing
- colors
- gradients
- overlays
- image placement
- layer order
- alignment
- opacity
- animation timing

Target:

Maximum allowed deviation:

±1px

If design differs:

Design wins.

Do NOT improve.

Do NOT redesign.

Do NOT simplify.

Do NOT guess.

Ask for missing values.

---

# LAYOUT RULES

Preserve:

Desktop:
1440px

Tablet:
768px

Mobile:
375px

Keep exact structure.

Do NOT:

- move elements
- reorder sections
- change grid
- alter alignment
- convert layouts unnecessarily
- center items unless design shows it

Use:

Flex only when needed.

Grid for complex layouts.

Absolute positioning only if Figma requires.

---

# RESPONSIVE RULES

Desktop must remain source of truth.

Responsiveness must:

adapt layout

without:

changing spacing
changing hierarchy
changing proportions

Never destroy desktop accuracy.

---

# TYPOGRAPHY RULES

Use exact Figma values.

Never approximate.

Preserve:

font weight

line height

letter spacing

text transform

text alignment

Do not replace fonts.

Load exact fonts.

---

# IMAGES

Use original assets.

Convert to WebP only if visually identical.

No compression artifacts.

No quality loss.

Do not crop differently.

Keep object-fit exactly.

---

# NEXTJS RULES

Framework:

Next.js App Router

Prefer:

Server Components

Use Client Components only when required:

animations

state

events

browser APIs

Avoid unnecessary:

"use client"

Avoid hydration issues.

---

# TAILWIND RULES

Prefer Tailwind.

Use arbitrary values:

w-[438px]

h-[612px]

gap-[23px]

tracking-[0.02em]

Do NOT round values.

Keep exact values.

---

# ANIMATIONS

Match Figma exactly.

Preserve:

duration

delay

easing

hover states

entrance timing

scroll effects

mouse effects

No extra animation.

No smoothing changes.

No creative interpretation.

---

# CODE SAFETY

Forbidden:

Refactoring

Architecture changes

Component rewrites

Optimization passes

Renaming files

Moving folders

Changing state flow

Changing API logic

Changing UI structure

Changing behavior

Only modify requested parts.

---

# STRAPI & CMS DATA INTEGRITY RULES

Strict Rules for Strapi CMS & Next.js Data Fetching:

1. SCHEMA CROSS-CHECK IS MANDATORY:
   - NEVER guess, invent, or speculate field names in populate queries.
   - Strapi v5 throws a fatal 400 Bad Request ("Invalid key <x>") if any requested key is missing from the schema.
   - Before adding or editing any populate param in `getSingleType` or `getCollection`, you MUST inspect the exact schema file:
     - Component schema: `cms/src/components/<category>/<component>.json`
     - Content-Type schema: `cms/src/api/<name>/content-types/<name>/schema.json`
   - Every entry in `fields` or `nested` must match an existing attribute name in those schema files.

2. NEVER COMBINE CONFLICTING POPULATE PARAMS:
   - In Strapi v5, do NOT list a field in both `fields` and `nested` for the same section.
   - If a nested component has media, using `nested: ["field"]` populates the component and its direct children via `*`.

3. SECTION ISOLATION (NO WIPEOUTS):
   - A failure in one section's query must NEVER cause the entire page or other sections to disappear.
   - In Next.js pages, wrap queries with graceful fallbacks. `src/lib/strapi.ts` provides automatic sectional fallback to prevent whole-page wipeouts.

4. MANDATORY PRE-PUSH VERIFICATION:
   - Before pushing any commit touching Strapi queries:
     1. Test the query against the live Strapi API (e.g. `curl -f -s "http://127.0.0.1:1338/api/<endpoint>?<query>" > /dev/null`) to ensure HTTP 200 OK.
     2. Run `npm run build` to ensure clean build.
     3. Verify the page renders in Next.js without missing sections or console errors.

---

# VALIDATION

After every change verify:

1. Visual match
2. Desktop layout
3. Tablet layout
4. Mobile layout
5. Build success
6. Runtime success
7. No hydration issues
8. No console errors
9. No overflow
10. No broken imports

Run:

npm run build

npm run lint

Verify manually.

---

# FIGMA POLICY

Figma is source of truth.

Code follows design.

Never argue with design.

Never improve design.

Never invent missing pieces.

Missing asset:

Ask.

Missing animation:

Ask.

Missing spacing:

Ask.

---

# OUTPUT STYLE

Provide:

Files changed

Reason

Verification steps

Risk

Keep responses concise.

No unnecessary explanation.
