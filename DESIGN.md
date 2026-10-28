---
version: alpha
colors:
  background: "#ffffff"
  ink: "#202725"
  muted: "#68706d"
  line: "#e3e7e4"
  primary: "#202725"
  accent: "#536b70"
  accentLight: "#c4d3d4"
  interactionHover: "#3b4842"
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

Runtime token owner: `src/app/globals.css` :root. Logo blue and orange are reserved for the logo asset. Interface buttons, selected states, progress lines, focus rings and icons use ink (#202725); hover uses a complementary lighter charcoal (#3b4842). Filled buttons have white text. Muted slate (#536b70) and silver (#c4d3d4) support decorative embroidery details. Product photographs retain their real garment colors. Runtime tokens --ink, --accent, --accent-light, --accent-glow and --interaction-hover own these values. White background, muted green-gray surfaces and one light theme.

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

The final headline line, “fark edilsin.”, uses Barlow Bold lettering, superseding its earlier brand-blue treatment. Only “fark” has a black #000000 background and white #ffffff lettering; the rest of the headline uses the shared ink color (var(--ink), #202725) on a transparent background, including the period. Square corners, tight tracking, and optical em-based insets keep this typographic emphasis consistent across desktop and mobile; these colors are owned by the local Hero CSS module.

Photo annotations (placement callouts, turn indicator, caption bar) use an opaque #f8faf9 surface with #d5ded7 borders and dark text. Text must remain legible over the blue fabric, skin, and trousers at every scroll phase; mobile annotations retain the same contrast treatment.

Hero background layers an AI-generated pale grey woven workwear textile photograph over the established gradient. The decorative texture spans the full hero behind both copy and model, with low opacity (38% desktop, 24% mobile). Existing GSAP story progress moves only the texture vertically by 56px desktop / 24px mobile; reduced motion keeps it static. The headline and controls remain stationary. Asset: public/images/hero/workwear-texture.webp.

Mobile hero uses a vertical #edf2ef → #fcfcfc gradient that settles onto the studio surface before the model. Photo and stage blending is normal on phones; masks feather empty photo margins. The layout keeps a 420px stage. Mobile scroll drives the registered front/logo/back story inside a sticky scene; its measured offset lets taller copy scroll away before holding the model in view. The gradient belongs to the sticky scene so extending the scroll runway does not shift its color stops. Three stage buttons also jump to each phase. Reduced motion keeps manual stage selection, initially showing the product. Hide floating callouts, turn badge, stage-top labels, and scroll footer on phones; retain one caption below the model with the illustrative-branding note.

The visible desktop hero scene fills the first viewport below the header: 100svh minus header height (127px desktop / 116px tablet) and the existing 8px top margin, without the former 760px cap. Mobile retains its flowing content and scroll-driven stage, with a minimum scene height of the viewport minus its 106px header.

The hero now uses real alpha-transparent front/back WebP cutouts (fleece-worn-blue-transparent.webp and fleece-worn-back-transparent.webp), extracted with imagegen from the supplied photos on their original 1000×1573 canvases. These supersede the earlier studio-background mask/blending approach: both model frame and stage composite normally, and photo masks are disabled to preserve hair and garment edges. Original source images remain available.

The generated fabric photograph now covers the entire visible hero, including behind the alpha-transparent model, on desktop and mobile. No directional fade masks or opaque stage backgrounds interrupt this shared texture. Existing low opacity and parallax remain.

The current hero model is the supplied charcoal fleece woman from herosection/ucceplipolarfume-front.png and herosection/ucceplipolarfüme-back.png, superseding the earlier blue garment. Imagegen produced identity-preserving quality-restored transparent derivatives; charcoal color, pose and garment construction remain the reference. Active assets: public/images/hero/fleece-worn-charcoal-front-transparent.webp and fleece-worn-charcoal-back-transparent.webp. Existing embroidery, parallax and scroll sequence remain.

The active charcoal front/back WebP assets are compressed with TinyPNG/Tinify after quality restoration and alpha extraction. Transparent alpha and source dimensions are preserved; the compressed files are approximately 138 KB front and 191 KB back.
