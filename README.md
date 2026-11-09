# NextSaaS AI Marketing Agency — Next.js 1:1 Clone

An accurate 1:1 conversion of the NextSaaS AI Marketing Agency one-page design into a fully functional Next.js application using JavaScript, Tailwind CSS, modular components, and separated data architecture.

Reference website: [NextSaaS AI Marketing Agency One Page](https://nextsaas-wp.pixels71.com/ai-marketing-agency-one-page/)

---

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (JSX)
- **Styling:** Tailwind CSS + Original PostCSS Theme & Keyframe Animations
- **Typography:** Google Fonts (`Inter Tight`, `Instrument Serif`, `IBM Plex Mono`, `Inter`) + Phosphor & NextSaaS Icon Fonts
- **Package Manager:** npm

---

## 📁 Project Structure

```
nextsaas-clone/
├── public/
│   ├── css/                # Original stylesheets & animations
│   ├── fonts/              # Custom icon fonts (Phosphor, Next-SaaS)
│   ├── images/             # All original SVGs, logos, illustrations, avatars
│   └── assets/             # Mirrored asset directory for compatibility
├── src/
│   ├── app/
│   │   ├── layout.js       # Root layout with font definitions and metadata
│   │   ├── page.js         # Master one-page layout orchestrating all sections
│   │   ├── not-found.js    # Custom graceful fallback for unmatched routes
│   │   ├── ai-marketing-agency-one-page/
│   │   │   └── page.js     # Route alias matching reference URL structure
│   │   └── globals.css     # Global styles, variables, keyframes & animations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx  # Floating pill navbar with mobile drawer
│   │   │   ├── Footer.jsx  # Newsletter, links, watermark, social icons
│   │   │   └── Container.jsx
│   │   ├── sections/
│   │   │   ├── BackgroundWrapper.jsx     # Atmospheric grid lines & gradients
│   │   │   ├── HeroSection.jsx           # Hero headline, badges, avatars & preview
│   │   │   ├── BrandsSection.jsx         # Trusted client logos
│   │   │   ├── ServicesSection.jsx       # 5 Core marketing solutions (#services)
│   │   │   ├── WhyChooseUsSection.jsx    # Strategic advantages & value pillars
│   │   │   ├── ToolsSection.jsx          # AI tech stack & integrations
│   │   │   ├── AboutSection.jsx          # Growth partner overview (#about)
│   │   │   ├── ProcessSection.jsx        # 4-step execution framework
│   │   │   ├── PricingSection.jsx        # Pricing plans with Monthly/Yearly toggle (#pricing)
│   │   │   ├── TestimonialsSection.jsx   # Client quotes & ratings (#testimonial)
│   │   │   ├── CertificationsSection.jsx # Partner credentials (Meta, Google, Klaviyo)
│   │   │   ├── TeamSection.jsx           # Specialists with interactive hover cards (#team)
│   │   │   ├── BlogSection.jsx           # Latest AI automation articles (#blog)
│   │   │   ├── FaqSection.jsx            # Interactive accordion FAQ
│   │   │   ├── ContactSection.jsx        # Working contact form (#contact)
│   │   │   └── CtaSection.jsx            # Call-to-action banner
│   │   └── ui/
│   │       ├── Button.jsx                # Reusable v6/v8 animated roll buttons
│   │       ├── Card.jsx                  # Glow-border card component
│   │       └── SectionHeading.jsx        # Star-badge section header component
│   ├── data/
│   │   ├── headerData.js
│   │   ├── heroData.js
│   │   ├── brandsData.js
│   │   ├── servicesData.js
│   │   ├── whyChooseUsData.js
│   │   ├── toolsData.js
│   │   ├── aboutData.js
│   │   ├── processData.js
│   │   ├── pricingData.js
│   │   ├── testimonialsData.js
│   │   ├── certificationsData.js
│   │   ├── teamData.js
│   │   ├── blogData.js
│   │   ├── faqData.js
│   │   ├── contactData.js
│   │   ├── ctaData.js
│   │   └── footerData.js
│   └── lib/
│       └── assets.js       # Asset path resolution utility
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
├── jsconfig.json
└── package.json
```

---

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the development server at [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production with full static prerendering.

### `npm run start`
Starts the production server on port 3000.

---

## ✨ Features & Preserved Fidelity

- **Pixel-Perfect 1:1 Conversion:** All colors, gradients, font families (`Instrument Serif`, `Inter Tight`, `IBM Plex Mono`), line heights, container widths, and spacings are preserved identically from the original HTML design.
- **Interactive Floating Header:** Fixed pill navigation that transforms smoothly on scroll, with smooth scrolling to sections (`#about`, `#services`, `#pricing`, `#team`, `#blog`, `#contact`) and a slide-out mobile drawer with backdrop.
- **Interactive Pricing Switcher:** Toggle between Monthly and Yearly billing options dynamically updating plan pricing and period indicators.
- **Interactive FAQ Accordion:** Expandable/collapsible FAQ questions with animated chevron arrows.
- **Interactive Contact & Newsletter Forms:** Client-side forms with submission feedback and field validation.
- **Original Media & Icon Fonts:** Uses the exact original SVGs, logos, avatars, and Phosphor icon fonts without third-party substitutes.
