Project Requirements — Exact Website Clone

1. Project Objective

Convert the existing HTML website into a fully functional Next.js application using JavaScript and Tailwind CSS.

The primary goal is to reproduce the original HTML website as accurately as possible, including its design, layout, assets, typography, colors, spacing, content, and section order.

Reference website: https://nextsaas-wp.pixels71.com/ai-marketing-agency-one-page/

Source of truth: The existing HTML files, CSS files, JavaScript files, assets, and section-specific data files provided in the project.

Do not redesign the website or introduce unnecessary design changes.

2. Technology Stack

Use the following technologies:

- Next.js with the App Router
- JavaScript (JSX)
- Tailwind CSS
- Reusable React components
- JSON or JavaScript data files for section content
- Existing project assets
- npm for package management

Use the existing project configuration whenever possible. Do not unnecessarily replace or upgrade working dependencies.

3. Exact Design Requirements

Recreate the original HTML website as closely as possible.

Preserve:

- Exact page structure and section order
- Header and navigation design
- Hero section layout
- Original text and content
- Font families, font sizes, weights, and line heights
- Background colors and gradients
- Container widths and spacing
- Margins, padding, borders, and border radius
- Buttons, icons, cards, and illustrations
- Images, image positions, sizes, and aspect ratios
- Responsive layouts and breakpoints
- Footer design
- Hover effects, transitions, animations, and interactions

Inspect the original HTML, CSS, JavaScript, and assets before implementing each section.

Do not approximate the design when the exact styles or assets are available.

4. Use the Existing Assets

Reuse the original project assets wherever available.

Requirements:

- Inspect all existing images, SVGs, icons, fonts, and other media.
- Use the correct asset for each section.
- Preserve the original image proportions and positioning.
- Use the original font files if available.
- Avoid replacing original assets with emojis, placeholders, or unrelated images.
- Do not generate substitute assets when the original asset exists.
- Use correct Next.js image handling where appropriate.
- Ensure all asset paths resolve correctly.
- Check for broken images and missing fonts.

Keep reusable static assets inside the "public/assets/" directory when appropriate.

Do not rename or move assets unnecessarily.

5. Next.js Project Structure

Organize the application using reusable components and section-specific data files.

Suggested structure:

website-clone/
├── public/
│   └── assets/
│       ├── images/
│       ├── icons/
│       ├── fonts/
│       └── other/
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── SectionTwo.jsx
│   │   │   ├── SectionThree.jsx
│   │   │   └── ...
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── SectionHeading.jsx
│   ├── data/
│   │   ├── headerData.js
│   │   ├── heroData.js
│   │   ├── sectionTwoData.js
│   │   ├── sectionThreeData.js
│   │   ├── footerData.js
│   │   └── ...
│   └── lib/
│       └── assets.js
├── package.json
├── next.config.js
├── jsconfig.json
└── project.md

This is a suggested structure. Adapt it to the existing project and installed Next.js version. Create section files according to the actual sections found in the source HTML.

Do not create unnecessary empty components or data files.

6. Component-Based Develop