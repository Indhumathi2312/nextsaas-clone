import './globals.css';

export const metadata = {
  title: 'AI Marketing Agency One Page — Nexsas',
  description:
    'Intelligent, community-focused & AI-powered marketing. Your trusted local digital marketing agency, powered by data and AI.',
  icons: {
    icon: '/images/purple-white-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/purple-white-logo.svg" type="image/svg+xml" />

        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        />

        {/* Original Stylesheets */}
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/infinite-marquee.css" />
        <link rel="stylesheet" href="/css/nextsaas-social-share.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/nextsaas-header-footer.css" />
        <link rel="stylesheet" href="/css/frontend.min.css" />
        <link rel="stylesheet" href="/css/post-15.css" />
        <link rel="stylesheet" href="/css/nextsaas-border-glow-animation.css" />
        <link rel="stylesheet" href="/css/widget-image.min.css" />
        <link rel="stylesheet" href="/css/icon-font.css" />
        <link rel="stylesheet" href="/css/widget-divider.min.css" />
        <link rel="stylesheet" href="/css/post-10.css" />
        <link rel="stylesheet" href="/css/base-desktop.css" />
        <link rel="stylesheet" href="/css/post-47514.css" />
        <link rel="stylesheet" href="/css/post-47480.css" />
        <link rel="stylesheet" href="/css/tailwind.css" />
        <link rel="stylesheet" href="/css/theme-custom-style.css" />
        <link rel="stylesheet" href="/css/dynamic-style.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/style_1.css" />
        <link rel="stylesheet" href="/css/gsap-frontend.css" />
        <link rel="stylesheet" href="/css/widget-icon-list.min.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
      </head>
      <body className="home wp-singular page-template page-template-elementor_header_footer page page-id-10 wp-embed-responsive wp-theme-nexsas bg-background-3 dark:bg-background-5 nextsaas-hf-header nextsaas-hf-footer nextsaas-hf-template-nexsas nextsaas-hf-stylesheet-nexsas no-js page-homepage elementor-default elementor-template-full-width elementor-kit-15 elementor-page elementor-page-10 loaded">
        <div id="page" className="site">
          {children}
        </div>
      </body>
    </html>
  );
}
