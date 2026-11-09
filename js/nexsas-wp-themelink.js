(function () {
  if (globalThis.window === undefined) return;
  if (globalThis.window.__NEXSAS_DEMO_SHOWCASE_LOADED__) return;

  globalThis.window.__NEXSAS_DEMO_SHOWCASE_LOADED__ = true;

  const tech = {
    wp: "https://nextsaas-api.vercel.app/api/wp?query=homepage",
  };

  const purchaseByTech = {
    wp: "https://themeforest.net/checkout/from_item/61429174?license=regular&support=bundle_6month",
  };

  const ROOT_ID = "nexsas-demo-showcase-root";

  const styles = `
      #${ROOT_ID} * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
      }
  
      #${ROOT_ID} .nds-hidden {
        display: none !important;
      }
  
      #${ROOT_ID} .nds-trigger {
        writing-mode: sideways-lr;
        text-orientation: mixed;
        position: fixed;
        right: 0;
        bottom: 50%;
        transform: translateY(50%);
        z-index: 999999;
        display: flex;
        align-items: center;
        gap: 16px;
        border: 0;
        background: #DE4A40;
        border-radius: 12px 0 0 12px;
        padding: 16px 4px 4px 4px;
        cursor: pointer;
        color: #F5F5F7;
        font-weight: 500;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      }

      #${ROOT_ID} .nds-trigger > span:first-child {
        display: inline-flex;
        align-items: center;
      }
  
      #${ROOT_ID} .nds-trigger-text {
        font-size: 16px;
        line-height: 150%;
        color: #F5F5F7;
        font-weight: 400;
        letter-spacing: 0.03em;
        font-family: Inter, Arial, sans-serif;
      }

      @media (max-width: 640px) {

        #${ROOT_ID} .nds-trigger {
            border-radius: 10px 0 0 10px;
            padding: 4px 2px 4px 4px;
        }

        #${ROOT_ID} .nds-trigger > span:first-child {
          display: inline-flex;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        #${ROOT_ID} .nds-trigger > span:first-child svg {
          display: block;
        }

        #${ROOT_ID} .nds-trigger-text {
          display: none;
        }

        #${ROOT_ID} .nds-heading {
        font-size: 24px;
        }
      }
  
      #${ROOT_ID} .nds-modal {
        position: fixed;
        inset: 0;
        z-index: 999999;
        height: 100vh;
        width: 100%;
        transform-origin: center center;
        backface-visibility: hidden;
        will-change: transform, opacity, filter;
        transition:
          transform 0.9s cubic-bezier(0.23, 1, 0.32, 1),
          opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1),
          filter 0.9s cubic-bezier(0.23, 1, 0.32, 1);
      }
  
      #${ROOT_ID} .nds-modal.nds-closed {
        transform: translateX(100%) scale(0.65) rotateY(20deg);
        opacity: 0;
        filter: blur(22px);
        pointer-events: none;
      }
  
      #${ROOT_ID} .nds-modal.nds-open {
        transform: translateX(0) scale(1) rotateY(0deg);
        opacity: 1;
        filter: blur(0);
        pointer-events: auto;
      }
  
      #${ROOT_ID} .nds-overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        overflow-y: auto;
        background: #F1F4F6;
        padding: 56px 16px 64px;
        touch-action: pan-y;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
  
      #${ROOT_ID} .nds-inner {
        max-width: 1560px;
        margin: 0 auto;
      }
  
      #${ROOT_ID} .nds-heading {
        margin-bottom: 48px;
        text-align: center;
        color: #1c1c1c;
        font-family: Inter, Arial, sans-serif;
        font-size: 48px;
        font-weight: 500;
        line-height: 1.2;
      }
  
      #${ROOT_ID} .nds-close {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000000;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 6px solid #fff;
        border-radius: 999px;
        background: #23262D;
        padding: 12px;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      }
  
      #${ROOT_ID} .nds-list {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 20px;
      }
  
      #${ROOT_ID} .nds-item {
        grid-column: span 12 / span 12;
      }
  
      @media (min-width: 768px) {
        #${ROOT_ID} .nds-item {
          grid-column: span 6 / span 6;
        }
  
        #${ROOT_ID} .nds-close {
          top: 40px;
          right: 40px;
          border-width: 8px;
          padding: 16px;
        }
      }
  
      @media (min-width: 1280px) {
        #${ROOT_ID} .nds-item {
          grid-column: span 4 / span 4;
        }
  
        #${ROOT_ID} .nds-list {
          gap: 12px;
        }
      }
  
      #${ROOT_ID} .nds-card {
        display: block;
        max-width: 500px;
        margin: 0 auto;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 36px;
        padding: 8px;
        text-decoration: none;
        transition: all 0.3s ease-in-out;
      }
  
      #${ROOT_ID} .nds-card:hover {
        border-color: #8B5CF6;
        box-shadow: 0 0 0 1px #8B5CF6 inset;
      }
  
      #${ROOT_ID} .nds-card-inner {
        background: #fff;
        border-radius: 28px;
        padding: 8px;
        box-shadow: 0 1px 4px rgba(16,24,40,0.10);
        transition: all 0.4s ease-in-out;
      }
  
      #${ROOT_ID} .nds-card:hover .nds-card-inner {
        box-shadow: 0 8px 6px rgba(16,24,40,0.16);
      }
  
      #${ROOT_ID} .nds-figure {
        position: relative;
        max-height: 351px;
        overflow: hidden;
        border-radius: 20px;
        background: #f3f4f6;
      }
  
      #${ROOT_ID} .nds-card-image-overlay {
        display: none;
        position: absolute;
        inset: 0;
        z-index: 1;
        opacity: 0;
        transform-origin: bottom center;
        border-radius: 20px;
        pointer-events: none;
        background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0.1));
        transition: opacity 0.5s ease-in-out;
      }
  
      @media (min-width: 1024px) {
        #${ROOT_ID} .nds-card-image-overlay {
          display: block;
        }
      }
  
      #${ROOT_ID} .nds-card:hover .nds-card-image-overlay {
        opacity: 1;
      }
  
      #${ROOT_ID} .nds-card-figure-actions {
        display: none;
        list-style: none;
        position: absolute;
        bottom: 40px;
        left: 50%;
        z-index: 2;
        width: 100%;
        max-width: 90%;
        margin: 0;
        padding: 0;
        transform: translateX(-50%);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        pointer-events: none;
      }
  
      @media (min-width: 1024px) {
        #${ROOT_ID} .nds-card-figure-actions {
          display: flex;
          flex-direction: row;
          max-width: 75%;
        }
      }
  
      #${ROOT_ID} .nds-card:hover .nds-card-figure-actions {
        pointer-events: auto;
      }
  
      #${ROOT_ID} .nds-card-figure-actions > li {
        width: 100%;
        flex: 1 1 auto;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
      }
  
      @media (min-width: 1024px) {
        #${ROOT_ID} .nds-card-figure-actions > li {
          width: auto;
        }
      }
  
      #${ROOT_ID} .nds-card:hover .nds-card-figure-actions > li {
        opacity: 1;
        transform: translateY(0);
      }
  
      #${ROOT_ID} .nds-card-figure-link {
        pointer-events: auto;
        width: 100%;
        min-height: 36px;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 6px 16px;
        font-family: Inter, Arial, sans-serif;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 400;
        text-decoration: none;
        border: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        color: #fff;
        -webkit-tap-highlight-color: transparent;
      }
  
      @media (min-width: 640px) {
        #${ROOT_ID} .nds-card-figure-link {
          padding: 10px 24px;
          font-size: 14px;
        }
      }
  
      @media (min-width: 1024px) {
        #${ROOT_ID} .nds-card-figure-link {
          width: 100%;
        }
      }
  
      #${ROOT_ID} .nds-card-figure-link--primary {
        background: #864ffe;
      }
  
      #${ROOT_ID} .nds-card-figure-link--secondary {
        background: #1a1a1c;
      }
  
      #${ROOT_ID} .nds-card-figure-link--primary:hover:not(:disabled),
      #${ROOT_ID} .nds-card-figure-link--secondary:hover:not(:disabled) {
        filter: brightness(1.06);
      }
  
      #${ROOT_ID} .nds-card-figure-link--disabled,
      #${ROOT_ID} .nds-card-figure-link--disabled:disabled {
        cursor: not-allowed;
        filter: none;
        box-shadow: none;
      }
  
      #${ROOT_ID} .nds-card-figure-link--primary.nds-card-figure-link--disabled,
      #${ROOT_ID} .nds-card-figure-link--primary.nds-card-figure-link--disabled:disabled {
        background: rgba(134, 79, 254, 0.5);
        color: rgba(255, 255, 255, 0.55);
      }
  
      #${ROOT_ID} .nds-card-figure-link--secondary.nds-card-figure-link--disabled,
      #${ROOT_ID} .nds-card-figure-link--secondary.nds-card-figure-link--disabled:disabled {
        background: rgba(26, 26, 28, 0.7);
        color: rgba(255, 255, 255, 0.5);
      }
  
      #${ROOT_ID} .nds-card-figure-link .nds-card-link-icon {
        color: currentColor;
      }
  
      #${ROOT_ID} .nds-card-link-container.nds-card-links-below {
        display: none;
      }
  
      @media (max-width: 1023.98px) {
        #${ROOT_ID} .nds-card-link-container.nds-card-links-below {
          display: flex;
        }
      }
  
      #${ROOT_ID} .nds-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      #${ROOT_ID} .nds-card-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: rgba(15,17,21,0.82);
        text-align: center;
        font-family: Inter, Arial, sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.5;
      }
  
      #${ROOT_ID} .nds-card-content {
        padding: 16px 0;
        display: grid;
        gap: 16px;
      }
  
      #${ROOT_ID} .nds-card-link-container {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        max-width: 90%;
        margin: 0 auto;
        padding: 0 0 20px;
      }
  
      #${ROOT_ID} .nds-card-link-container > li {
        width: 100%;
        display: flex;
      }
  
      #${ROOT_ID} .nds-card-link-item,
      #${ROOT_ID} .nds-card-link-item-disabled {
        width: 100%;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: Inter, Arial, sans-serif;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 400;
        text-decoration: none;
        padding: 8px 16px;
        border: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        transition: filter 0.25s ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        color: #fff;
      }
  
      @media (min-width: 640px) {
        #${ROOT_ID} .nds-card-link-item,
        #${ROOT_ID} .nds-card-link-item-disabled {
          font-size: 14px;
          padding: 8px 24px;
        }
      }
  
      #${ROOT_ID} .nds-card-link-item {
        cursor: pointer;
      }
  
      #${ROOT_ID} .nds-card-link-item:hover {
        filter: brightness(1.06);
      }
  
      #${ROOT_ID} .nds-card-link-item--secondary {
        background: #1a1a1c;
      }
  
      #${ROOT_ID} .nds-card-link-item--primary {
        background: #864ffe;
      }
  
      #${ROOT_ID} .nds-card-link-item-disabled {
        cursor: not-allowed;
        box-shadow: none;
        filter: none;
      }
  
      #${ROOT_ID} .nds-card-link-item--primary.nds-card-link-item-disabled {
        background: rgba(134, 79, 254, 0.5);
        color: rgba(255, 255, 255, 0.55);
      }
  
      #${ROOT_ID} .nds-card-link-item--secondary.nds-card-link-item-disabled {
        background: rgba(26, 26, 28, 0.7);
        color: rgba(255, 255, 255, 0.5);
      }
  
      #${ROOT_ID} .nds-card-link-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        flex-shrink: 0;
        margin-top: 2px;
      }
  
      #${ROOT_ID} .nds-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #C6F56F;
        color: rgba(15,17,21,0.82);
        padding: 5px 16px;
        font-size: 12px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
      }
  
      #${ROOT_ID} .nds-error {
        grid-column: span 12 / span 12;
        padding: 32px 16px;
        text-align: center;
        color: #cbd5e1;
        font-family: Inter, Arial, sans-serif;
      }
  
      #${ROOT_ID} .nds-purchase {
        position: fixed;
        right: 50px;
        bottom: 50px;
        z-index: 999999;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        background: #87E64B;
        padding: 8px 8px 8px 20px;
        text-decoration: none;
        transition:
          background-color 0.3s ease,
          box-shadow 0.3s ease,
          transform 0.3s ease;
      }
  
      #${ROOT_ID} .nds-purchase-label {
        color: #050816;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        white-space: nowrap;
        transition: color 0.3s ease;
      }
  
      #${ROOT_ID} .nds-purchase-icon {
        display: inline-flex;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
  
      #${ROOT_ID} .nds-purchase-icon img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      #${ROOT_ID} .nds-card-image-link, #${ROOT_ID} .nds-card-title-link {
        display: block;
        width: 100%;
        text-decoration: none;
      }

      #${ROOT_ID} .nds-tab {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin: 0 auto 24px;
        width: 100%;
      }

      #${ROOT_ID} .nds-tab-button {
        border: none;
        border-radius: 9999px;
        background: #ffffff;
        color: rgba(15, 17, 21, 0.72);
        font-family: Inter, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.2;
        padding: 15px 24px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      #${ROOT_ID} .nds-tab-button.is-active {
        background: #1a1a1c;
        color: #ffffff;
      }
    `;

  const markup = `
      <button id="nds-open" class="nds-trigger" aria-label="Open demo showcase">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M10 44C4.47715 44 0 39.5228 0 34L0 0L44 0L44 44L10 44Z" fill="#1A1A1C" fill-opacity="0.1" />
            <path d="M16.1728 24.1932L14 21.9995L16.1728 19.8059L18.3456 21.9995L16.1728 24.1932Z" fill="#F5F5F7" />
            <path d="M23.2157 12.6936L25.3886 10.5L27.5614 12.6936L25.3886 14.8873L23.2157 12.6936Z" fill="#F5F5F7" />
            <path d="M19.2456 27.2955L17.0728 25.1018L19.2456 22.9082L21.4184 25.1018L19.2456 27.2955Z" fill="#F5F5F7" />
            <path d="M20.1429 15.7959L22.3157 13.6023L24.4885 15.7959L22.3157 17.9895L20.1429 15.7959Z" fill="#F5F5F7" />
            <path d="M22.3184 30.3977L20.1456 28.2041L22.3184 26.0105L24.4912 28.2041L22.3184 30.3977Z" fill="#F5F5F7" />
            <path d="M17.0701 18.8982L19.2429 16.7045L21.4157 18.8982L19.2429 21.0918L17.0701 18.8982Z" fill="#F5F5F7" />
            <path d="M25.3912 33.5L23.2184 31.3064L25.3912 29.1127L27.564 31.3064L25.3912 33.5Z" fill="#F5F5F7" />
            <path d="M20.1429 22.0005L22.3157 19.8068L24.4885 22.0005L22.3157 24.1941L20.1429 22.0005Z" fill="#F5F5F7" />
            <path d="M25.6544 22.0005L27.8272 19.8068L30 22.0005L27.8272 24.1941L25.6544 22.0005Z" fill="#F5F5F7" />
          </svg>
        </span>
        <span class="nds-trigger-text">
          <span class="nds-count">50</span>+ Pre-built websites
        </span>
      </button>
  
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        class="nds-purchase"
      >
        <span class="nds-purchase-label">Purchase</span>
        <figure class="nds-purchase-icon">
          <img
            src="https://demo-data.pixels71.com/images/themeforest-logo.svg"
            alt="themeforest logo"
          />
        </figure>
      </a>
  
      <div id="nds-modal" class="nds-modal nds-closed" aria-hidden="true" data-lenis-prevent="true">
        <button id="nds-close" class="nds-close" aria-label="Close demo showcase">
          <svg xmlns="http://www.w3.org/2000/svg" class="nds-card-link-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" stroke="white"></path>
            <path d="m6 6 12 12" stroke="white"></path>
          </svg>
        </button>

        <div class="nds-overlay">
          <div class="nds-inner">
            <div class="nds-heading">
              <span class="nds-count">43</span>+ Pre-built websites
            </div>
            <div class="nds-tab">
              <button class="nds-tab-button is-active" data-tab="light" aria-pressed="true">Light Mode</button>
              <button class="nds-tab-button" data-tab="dark" aria-pressed="false">Dark Mode</button>
            </div>
            <div id="nds-list" class="nds-list"></div>
          </div>
        </div>
      </div>
    `;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeHref(href) {
    const value = String(href ?? "").trim();
    if (!value || value === "#") return "#";
    return value;
  }

  function buildExternalLinkIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nds-card-link-icon lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      `.trim();
  }

  function buildCardLinks(item, tab = "light") {
    const isDark = tab === "dark";
    const darkPageUrl = normalizeHref(item?.darkPageUrl);
    const onePageUrl = normalizeHref(item?.onePageUrl);
    const multiPageUrl = normalizeHref(item?.url || item?.href);
    const icon = buildExternalLinkIcon();
    if (isDark) {
      const darkPage =
        darkPageUrl === "#"
          ? `
              <button type="button" title="Coming Soon" class="nds-card-link-item nds-card-link-item--primary nds-card-link-item-disabled" disabled>
                <span>Coming Soon</span>
                <span>${icon}</span>
              </button>
            `
          : `
              <a class="nds-card-link-item nds-card-link-item--primary" target="_blank" rel="noreferrer" href="${escapeHtml(darkPageUrl)}">
                <span>Dark Mode</span>
                <span>${icon}</span>
              </a>
            `;

      return `
          <ul class="nds-card-link-container nds-card-links-below">
            <li>${darkPage}</li>
          </ul>
        `;
    }

    const multiPage =
      multiPageUrl === "#"
        ? `
            <button type="button" title="Coming Soon" class="nds-card-link-item nds-card-link-item--secondary nds-card-link-item-disabled" disabled>
              <span>Multi Page</span>
              <span>${icon}</span>
            </button>
          `
        : `
            <a class="nds-card-link-item nds-card-link-item--secondary" target="_blank" rel="noreferrer" href="${escapeHtml(multiPageUrl)}">
              <span>Multi Page</span>
              <span>${icon}</span>
            </a>
          `;

    const onePage =
      onePageUrl === "#"
        ? `
            <button type="button" title="Coming Soon" class="nds-card-link-item nds-card-link-item--primary nds-card-link-item-disabled" disabled>
              <span>Coming Soon</span>
              <span>${icon}</span>
            </button>
          `
        : `
            <a class="nds-card-link-item nds-card-link-item--primary" target="_blank" rel="noreferrer" href="${escapeHtml(onePageUrl)}">
              <span>One Page</span>
              <span>${icon}</span>
            </a>
          `;

    return `
        <ul class="nds-card-link-container nds-card-links-below">
          <li>${multiPage}</li>
          <li>${onePage}</li>
        </ul>
      `;
  }

  function buildCardFigureActions(item, tab = "light") {
    const isDark = tab === "dark";
    const darkPageUrl = normalizeHref(item?.darkPageUrl);
    const onePageUrl = normalizeHref(item?.onePageUrl);
    const multiPageUrl = normalizeHref(item?.url || item?.href);
    const icon = buildExternalLinkIcon();
    if (isDark) {
      const darkPage =
        darkPageUrl === "#"
          ? `
              <button type="button" title="Coming Soon" class="nds-card-figure-link nds-card-figure-link--primary nds-card-figure-link--disabled" disabled>
                <span>Dark Mode</span>
                <span>${icon}</span>
              </button>
            `
          : `
              <a class="nds-card-figure-link nds-card-figure-link--primary" target="_blank" rel="noreferrer" href="${escapeHtml(darkPageUrl)}">
                <span>Dark Mode</span>
                <span>${icon}</span>
              </a>
            `;

      return `
          <ul class="nds-card-figure-actions">
            <li>${darkPage}</li>
          </ul>
        `;
    }

    const multiPage =
      multiPageUrl === "#"
        ? `
            <button type="button" title="Coming Soon" class="nds-card-figure-link nds-card-figure-link--primary nds-card-figure-link--disabled" disabled>
              <span>Multi Page</span>
              <span>${icon}</span>
            </button>
          `
        : `
            <a class="nds-card-figure-link nds-card-figure-link--primary" target="_blank" rel="noreferrer" href="${escapeHtml(multiPageUrl)}">
              <span>Multi Page</span>
              <span>${icon}</span>
            </a>
          `;

    const onePage =
      onePageUrl === "#"
        ? `
            <button type="button" title="Coming Soon" class="nds-card-figure-link nds-card-figure-link--secondary nds-card-figure-link--disabled" disabled>
              <span>One Page</span>
              <span>${icon}</span>
            </button>
          `
        : `
            <a class="nds-card-figure-link nds-card-figure-link--secondary" target="_blank" rel="noreferrer" href="${escapeHtml(onePageUrl)}">
              <span>One Page</span>
              <span>${icon}</span>
            </a>
          `;

    return `
        <ul class="nds-card-figure-actions">
          <li>${multiPage}</li>
          <li>${onePage}</li>
        </ul>
      `;
  }

  function getCardDataByTab(item, tab) {
    const isDark = tab === "dark";
    const href = isDark
      ? normalizeHref(item?.darkPageUrl || "#")
      : normalizeHref(item?.url || item?.href || "#");
    const image = isDark
      ? normalizeHref(item?.darkImage || item?.image || "")
      : normalizeHref(item?.image || "");

    return { href, image };
  }

  function buildCard(item, index, tab = "light") {
    const cardData = getCardDataByTab(item, tab);
    const href = cardData.href;
    const title = escapeHtml(item.title || "Untitled Demo");
    const image = escapeHtml(cardData.image || "");
    const badge = item.newRelease ? `<span class="nds-badge">New</span>` : "";

    return `
        <div class="nds-item">
          <div data-card-index="${index}" class="nds-card">
            <div class="nds-card-inner">
              <figure class="nds-figure">
                <a class="nds-card-image-link" target="_blank" rel="noreferrer" href="${escapeHtml(href)}">
                  <img src="${image}" alt="${title}" class="nds-image" />
                </a>
                <div class="nds-card-image-overlay" aria-hidden="true"></div>
                ${buildCardFigureActions(item, tab)}
              </figure>
              <div class="nds-card-content">
              <a class="nds-card-title-link" target="_blank" rel="noreferrer" href="${escapeHtml(href)}">
                <h2 class="nds-card-title">
                  ${title}
                  ${badge}
                </h2>
                </a>
                ${buildCardLinks(item, tab)}
              </div>
            </div>
          </div>
        </div>
      `;
  }

  function lockBodyScroll() {
    document.body.dataset.ndsOverflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    document.body.style.overflow = document.body.dataset.ndsOverflow || "";
    delete document.body.dataset.ndsOverflow;
  }

  function openModal(modal) {
    modal.classList.remove("nds-closed");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add("nds-open");
        modal.setAttribute("aria-hidden", "false");
      });
    });
    lockBodyScroll();
  }

  function closeModal(modal) {
    modal.classList.remove("nds-open");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add("nds-closed");
        modal.setAttribute("aria-hidden", "true");
      });
    });
    unlockBodyScroll();
  }

  function setCounts(root, count) {
    root.querySelectorAll(".nds-count").forEach((el) => {
      el.textContent = String(count);
    });
  }

  function getScriptParams() {
    let script = document.currentScript;
    if (!script) {
      const scripts = document.querySelectorAll(
        'script[src*="nexsas-wp-themelink.js"]',
      );
      script = scripts[scripts.length - 1];
    }

    if (!script) return {};

    const url = new URL(script.src, globalThis.location.origin);
    const params = new URLSearchParams(url.search);

    return Object.fromEntries(params.entries());
  }

  function renderCards(root, items, tab = "light") {
    const list = root.querySelector("#nds-list");
    if (!list) return;

    list.innerHTML = items
      .map((item, index) => buildCard(item, index, tab))
      .join("");
  }

  function normalizeItems(data) {
    const arr =
      (Array.isArray(data) && data) ||
      (Array.isArray(data?.items) && data.items) ||
      (Array.isArray(data?.data) && data.data) ||
      (Array.isArray(data?.result) && data.result) ||
      [];

    return arr.map((item) => ({
      id: item?.id ?? item?.demoId ?? item?.activeItemId ?? null,
      title: item?.title,
      image: item?.image,
      newRelease: !!item?.newRelease,
      href: item?.url || item?.href || "#",
      url: item?.url || item?.href || "#",
      onePageUrl: item?.onePageUrl || "#",
      darkPageUrl: item?.darkPageUrl || "#",
      darkImage: item?.darkImage || "#",
    }));
  }

  function getItemsByTab(items, tab) {
    if (tab === "dark") {
      return items.filter((item) => normalizeHref(item?.darkPageUrl) !== "#");
    }
    return items.filter(
      (item) => normalizeHref(item?.url || item?.href) !== "#",
    );
  }

  function setActiveTab(root, tab) {
    root.querySelectorAll(".nds-tab-button").forEach((button) => {
      const isActive = button.getAttribute("data-tab") === tab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  async function fetchShowcaseItems(apiUrl) {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch showcase data");
    }

    const data = await response.json();
    return normalizeItems(data);
  }

  function mountWidget() {
    const root = document.createElement("div");
    root.id = ROOT_ID;

    const style = document.createElement("style");
    style.textContent = styles;

    root.innerHTML = markup;
    root.prepend(style);

    document.body.appendChild(root);
    return root;
  }

  async function init() {
    const params = getScriptParams();
    const techKey = (params.tech || "wp").toString().toLowerCase();
    const apiUrl = tech[techKey] || "wp";
    const purchaseHref = purchaseByTech[techKey] || purchaseByTech.wp;

    try {
      const items = await fetchShowcaseItems(apiUrl);
      if (!items.length) return;

      const root = mountWidget();
      const modal = root.querySelector("#nds-modal");
      const openBtn = root.querySelector("#nds-open");
      const closeBtn = root.querySelector("#nds-close");
      const purchaseLink = root.querySelector(".nds-purchase");

      if (!modal || !openBtn || !closeBtn) return;

      if (purchaseLink && purchaseHref) {
        purchaseLink.setAttribute("href", purchaseHref);
      }

      openBtn.addEventListener("click", () => openModal(modal));
      closeBtn.addEventListener("click", () => closeModal(modal));

      const renderTab = (tab) => {
        const tabItems = getItemsByTab(items, tab);
        renderCards(root, tabItems, tab);
        setActiveTab(root, tab);
      };

      root.querySelectorAll(".nds-tab-button").forEach((button) => {
        button.addEventListener("click", () => {
          const nextTab =
            button.getAttribute("data-tab") === "dark" ? "dark" : "light";
          renderTab(nextTab);
        });
      });

      const onePageCount = items.filter(
        (item) => normalizeHref(item?.onePageUrl) !== "#",
      ).length;
      const totalItems = items.length + onePageCount;
      setCounts(root, totalItems);
      renderTab("light");
    } catch {
      console.error("Failed to fetch showcase data");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
