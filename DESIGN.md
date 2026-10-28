---
version: alpha
colors:
  background: "#ffffff"
  ink: "#202725"
  muted: "#68706d"
  line: "#e3e7e4"
  primary: "#087fb5"
  accent: "#536b70"
  accentLight: "#c4d3d4"
  interactionHover: "#294b50"
  surface: "#f2f4f2"
typography:
  sans:
    fontFamily: "Barlow, Arial, sans-serif"
rounded:
  DEFAULT: "2px"
spacing:
  base: "4px"
---

# İş Modası

## Overview

Turkish B2B workwear catalog for corporate buyers. Product photography and practical navigation lead; the home page uses a restrained industrial brand register. Product and category routes share the same catalog language.

## Colors

Runtime token owner: `src/app/globals.css` :root. Values above document that source; components consume variables. Logo blue supports focus and selected states. Muted slate (#536b70) replaces orange accents throughout the interface; pale silver (#c4d3d4) keeps the embroidery needle visible over blue fabric. Buttons and links use deep petrol (#294b50) on hover, with white text on filled buttons. Runtime tokens --accent, --accent-light, --accent-glow and --interaction-hover in :root own these values. White background, an ink foreground, muted green-gray photo stages. One light theme.

## Typography

Barlow, locally hosted with next/font, regular through bold including Turkish characters. Strong, compact sans headings; readable product names. No decorative serif, gradient text, or fabricated evidence.

## Layout

1328px maximum container; desktop 56px side margins, tablet 32px, phone 20px. Product grid: four columns desktop, three tablet, two phone. Images use object-fit contain with reserved aspect ratios. Native select intentionally uses the operating system popup. Search and category state persist in URL parameters; no pagination for twelve products.

## Elevation & Depth

No card shadows. Dropdowns have a light functional shadow. Real product photos supply depth.

## Shapes

2px button radius. Circular detail arrow is a small navigation affordance, never a general card treatment.

## Components

Shared Header, Footer, Catalog, ProductCard and Breadcrumbs own cross-route presentation. Phosphor icons only. Pointer and keyboard focus feedback. Search clear returns focus to the field; empty results offer reset. Header disclosures close on Escape, outside pointer and focus departure. Reduced motion disables transitions.

The home hero uses GSAP ScrollTrigger and CSS sticky. It presents only the same solid-blue fleece on the same model, using the supplied front and back photographs. No color split, yoke mask, or swap to a different garment is allowed. The narrative is product → chest embroidery → a registered directional shutter reveal → company name embroidered across the back. Registered text outlines, a needle sweep, and placement guides explain the branding process. Scroll is reversible; step buttons provide direct navigation. Reduced motion and short viewports use instantaneous steps without a scroll runway. Source photos stay in `herosection/`, with WebP derivatives in `public/images/hero/`. All branding is explicitly illustrative. Hero copy: “Ekibinizin imzasını giydirin.”

## Do's and Don'ts

Use existing product photography and honest product information. No prices, stock, certifications or customer references without evidence. Contact is tel/mailto only; no stored personal information, form backend or checkout. Do not claim protective performance from a photo.

Hero refinements: no decorative background word behind the model. The catalog offers multiple models; hero labels say “Ekibinize uygun iş giyim” and “İşinize uygun modeller.” The illustrative back branding is centered in the upper back (41.5% top, 44% frame width).

The hero photo surface is #fcfcfc, sampled from the supplied studio backgrounds. Photos use normal compositing to preserve garment and skin colors. A CSS mask feathers only the empty outer photo margins to hide the rectangular edge; source assets stay unchanged.

The current opening hook is “Ekibiniz ilk bakışta fark edilsin.”, superseding the earlier hero copy above. Three compact lines at semibold weight establish the opening hierarchy; the final line uses brand blue. Supporting copy makes chest logo and back company-name placement explicit. The primary action is “Ekibinize özel teklif alın”, leading to the contact page; the collection link is secondary. The existing product and embroidery sequence remains the visual narrative.

The hero now spans the page width with a continuous right-to-left gradient (photo-side #fafbfa → #edf2ef → left-side #dfe8e3). Content retains the existing container alignment through responsive padding; the photo stage is transparent, and the registered photo frame blends into the shared gradient.

Desktop hero composition uses a continuous scene with a wider text region (58% text / 42% image), no grid gap, and a two-line headline: “Ekibiniz ilk bakışta / fark edilsin.” The intro wraps to the established three-line treatment on phones. Supporting copy wraps naturally instead of using a forced line break.

The final headline line, “fark edilsin.”, uses Barlow Bold lettering, superseding its earlier brand-blue treatment. Only “fark” has a black #111111 background and white #ffffff lettering; “edilsin.” has a transparent background and inherits the headline ink color, including the period. Square corners, tight tracking, and optical em-based insets keep this typographic emphasis consistent across desktop and mobile; these colors are owned by the local Hero CSS module.

Photo annotations (placement callouts, turn indicator, caption bar) use an opaque #f8faf9 surface with #d5ded7 borders and dark text. Text must remain legible over the blue fabric, skin, and trousers at every scroll phase; mobile annotations retain the same contrast treatment.

Hero background remains a plain continuous gradient, with no decorative illustrations or wave animations.

Mobile hero uses a vertical #edf2ef → #fcfcfc gradient that settles onto the studio surface before the model. Photo and stage blending is normal on phones; masks feather empty photo margins. The layout flows naturally with a 420px stage and no sticky scroll runway. Three stage buttons select the registered front/logo/back story, initially showing the product. Hide floating callouts, turn badge, stage-top labels, and scroll footer on phones; retain one caption below the model with the illustrative-branding note.
