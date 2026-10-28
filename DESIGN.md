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
  interactionHover: "#444444"
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

Runtime token owner: `src/app/globals.css` :root. Logo blue and orange are reserved for the logo asset. Interface buttons, selected states, progress lines, focus rings and icons use ink (#202725); hover uses a lighter neutral charcoal (#444444), without a green tint. Filled buttons have white text. Muted slate (#536b70) and silver (#c4d3d4) support decorative embroidery details. Product photographs retain their real garment colors. Runtime tokens --ink, --accent, --accent-light, --accent-glow and --interaction-hover own these values. White background, muted green-gray surfaces and one light theme.

## Typography

Barlow, locally hosted with next/font, regular through bold including Turkish characters. Strong, compact sans headings; readable product names. No decorative serif, gradient text, or fabricated evidence.

## Layout

1328px maximum container; desktop 56px side margins, tablet 32px, phone 20px. Product grid: four columns desktop, three tablet, two phone. Images use object-fit contain with reserved aspect ratios. Native select intentionally uses the operating system popup. Search and category state persist in URL parameters; all products are available in the full catalog, while the home page shows one representative per category.

## Elevation & Depth

No card shadows. Dropdowns have a light functional shadow. Real product photos supply depth.

## Shapes

2px button radius. Circular detail arrow is a small navigation affordance, never a general card treatment.

## Components

Shared Header, Footer, Catalog, ProductCard and Breadcrumbs own cross-route presentation. Phosphor icons only. Pointer and keyboard focus feedback. Search clear returns focus to the field; empty results offer reset. Header disclosures close on Escape, outside pointer and focus departure. Reduced motion disables transitions.

Catalog category and search controls share a 44px height, 2px corners, line-token borders and an ink focus outline around the entire control. Active filters use the surface background and muted border after focus leaves. Category keeps the native operating-system popup with a decorative Phosphor caret; the search clear target is 44px and returns focus to the input. Mobile input text is 16px to avoid focus zoom. Runtime styles live in src/app/globals.css.

The home hero uses GSAP ScrollTrigger and CSS sticky. It presents only the same solid-blue fleece on the same model, using the supplied front and back photographs. No color split, yoke mask, or swap to a different garment is allowed. The narrative is product → chest embroidery → a registered directional shutter reveal → company name embroidered across the back. Registered text outlines, a needle sweep, and placement guides explain the branding process. Scroll is reversible; step buttons provide direct navigation. Reduced motion and short viewports use instantaneous steps without a scroll runway. Source photos stay in `assets/source/hero/`, with WebP derivatives in `public/images/hero/`. All branding is explicitly illustrative. Hero copy: “Ekibinizin imzasını giydirin.”

## Do's and Don'ts

Use existing product photography and honest product information. No prices, stock, certifications or customer references without evidence. Contact uses tel/mailto and a WhatsApp chat link. The contact form uses the Worker backend described below; there is no application database for inquiries or checkout. Do not claim protective performance from a photo.

The Contact page includes an inquiry form that validates name, email, message and optional quantity on the client and Worker, then submits to /api/contact. The Worker delivers a plain-text message through Resend to info@ismodasi.com with the visitor as Reply-To. Personal information is processed for delivery but is not written to application logs, browser storage or an application database. The form waits for provider acceptance before showing success, blocks duplicate submits, preserves fields and the idempotency key after uncertain failures, and resets only after success. Pending controls retain their footprint, and feedback uses an inline live region. Shared field validation is owned by src/lib/contact.ts; CONTACT_FROM is configured in wrangler.json and RESEND_API_KEY is a Worker secret. Inline field errors and first-error focus belong to ContactForm; the existing email link remains available. The editorial photo of hands selecting workwear fabric is AI-generated illustrative imagery, not evidence of an owned workshop. Active asset: public/images/contact/workwear-consultation.webp; original and generation prompt: assets/source/contact/. The desktop intro pairs text and photo above a contact-details/form split; phones stack each region. Form styling consumes existing globals.css color tokens and shared button styles.

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

The current hero model is the supplied charcoal fleece woman from assets/source/hero/ucceplipolarfume-front.png and assets/source/hero/ucceplipolarfüme-back.png, superseding the earlier blue garment. Imagegen produced identity-preserving quality-restored transparent derivatives; charcoal color, pose and garment construction remain the reference. Active assets: public/images/hero/fleece-worn-charcoal-front-transparent.webp and fleece-worn-charcoal-back-transparent.webp. Existing embroidery, parallax and scroll sequence remain.

The active charcoal front/back WebP assets are compressed with TinyPNG/Tinify after quality restoration and alpha extraction. Transparent alpha and source dimensions are preserved; the compressed files are approximately 138 KB front and 191 KB back.

About page (/hakkimizda) is linked from the footer and included in the sitemap. It uses existing Barlow typography, neutral surfaces, shared buttons and the charcoal model photo. Copy describes the existing catalog and inquiry process without fabricated history, certifications or manufacturing claims. Desktop has an editorial text/photo split; mobile stacks content.

The About intro now uses an imagegen-created neutral workwear-material still-life as a shared background behind its text and transparent charcoal model. Asset: public/images/about/workwear-background.webp. Prompt direction: pale grey cutting table, folded charcoal twill/fleece, thread spool and stitching on the right, calm left negative space, soft daylight, no people/logos or blue/orange. It is decorative illustrative imagery, not a photograph of an owned workshop. Opacity 48% desktop / 32% mobile preserves text contrast; the model panel is transparent.

Asset organization: public/images/{brand,products,hero,about} contains only active site imagery. Original inputs live under assets/source/{brand,products,hero}; unused hero derivatives are preserved under assets/archive/hero. Catalog JSON lives in src/data/catalog.json and shared types in src/types/types.ts; src/lib contains runtime helpers. Fonts remain in src/assets/fonts for next/font/local.

The About intro no longer includes the model cutout; only its text, action and generated textile-material background remain. Mobile padding closes below the action without a reserved photo area. The home hero model is unchanged.

The About approach section uses a compact full-width heading stack instead of reserving a left label column. Its two paragraphs sit side-by-side on desktop and stack on mobile; reduced vertical padding keeps the following icon-led steps close.

Active product photos use quality-84 WebP with intact alpha and a non-upscaling 1600px bounding box. Logo WebP is lossless; favicon remains a separate 64px PNG. Existing optimized hero and About WebP assets are not recompressed. Former public PNGs remain archived outside public.

The active catalog is entirely regenerated from assets/source/products/all-products: 141 files in 20 populated categories. Empty KABAN is omitted. Each source file has a distinct product slug and category-scoped optimized WebP; catalog-sources.json records provenance. Product names/colors come only from supplied filenames, and unknown colors are omitted in details. The home catalog shows up to twenty-four category representatives; full/category listings show all matching products and actual counts. Old category-based product URLs redirect to category pages. Previous source catalogs are archived outside public.

Catalog refresh: source folders now also cover short-sleeve polos, boots, general gloves, safety harnesses, eye/face, hearing, respiratory protection and YDS footwear. Folder/category/menu mappings are maintained in src/data/catalog-categories.json, independently of generated data. Small, correctly oriented WebP inputs are copied without lossy re-encoding. Every source file remains represented in its supplied category, including the distinct Eldiven and Polar Eldiven folders.

The home hero now pairs the existing charcoal fleece woman with a generated male model in the catalog's royal-blue short-sleeve polo. The male anchors the viewport's right edge; both models remain side by side on phones. HeroModel owns each registered front/back frame, and the same GSAP timeline scrubs both models' embroidery and shutter transitions. Needle/shutter distances are measured per element, and embroidery SVG pattern IDs are instance-unique. Active assets: public/images/hero/polo-worn-male-{front,back}-transparent.webp. Original PNGs and prompt notes are retained in assets/source/hero/. These are illustrative model images; branding remains explicitly illustrative. This two-model composition supersedes earlier single-model layout guidance.

Both hero models use identical 1000/1573 frames and width limits at every breakpoint. The male photo uses cover with uniform front/back registration corrections derived from the source alpha bounds, so visible heads and lower crops match the female reference without stretching anatomy. Chest/back embroidery coordinates follow those same corrections. The source image files are unchanged.

Hero model frames have no lower-edge fade or mask. Photos remain fully opaque down to the caption's top edge; the shared bottom-anchored layout replaces the earlier gradient masking treatment.

Hero captions participate in the stage's vertical flex flow beneath a dedicated modelStage. Both photo frames are bottom-anchored to that photo area, so their lower edge always meets the caption's top edge. Photo width is capped by both available width and container height (cqh), preserving the existing aspect ratio, equal model sizes and visible heads as the viewport narrows. Placement callouts and the turn indicator share the photo area's coordinate system.

Header and Footer use the approved complete custom wordmark lockup, public/images/brand/is-modasi-logo-v2.webp, instead of an icon beside HTML text. The lossless WebP preserves transparency, with outer empty margins trimmed for alignment. Desktop logo width is 240px (220px footer/tablet), and mobile is 212px. Source master: assets/source/brand/is-modasi-logo-v2.png. Home links keep their Turkish accessible names.

Hero placement labels are docked 18px above the caption at the photo area's lower left (16px inset), keeping both chest and back embroidery and their moving guides unobstructed. Existing mobile label hiding remains.

The male polo chest branding begins at 55.5% of its registered frame width, shifted inward from 59.39% to give the sleeve seam more breathing room. Its size, height and embroidery animation remain unchanged.
