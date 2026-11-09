const headerAnimation = {
  headerOne() {
    const header = document.querySelector(".header-one");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("scroll-header");
        } else {
          header.classList.remove("scroll-header");
        }
      });
    }
  },
  headerTwo() {
    const header = document.querySelector(".header-two");
    const headerBtn = document.querySelector(".header-btn");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-two-scroll");
          headerBtn.classList.remove("btn-secondary");
          headerBtn.classList.add("btn-white");
        } else {
          header.classList.remove("header-two-scroll");
          headerBtn.classList.remove("btn-white");
          headerBtn.classList.add("btn-secondary");
        }
      });
    }
  },
  headerThree() {
    const header = document.querySelector(".header-three");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-three-scroll");
        } else {
          header.classList.remove("header-three-scroll");
        }
      });
    }
  },
  headerFour() {
    const header = document.querySelector(".header-four");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-four-scroll");
        } else {
          header.classList.remove("header-four-scroll");
        }
      });
    }
  },
  headerFive() {
    const header = document.querySelector(".header-five");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 25) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-five-scroll");
        } else {
          header.classList.remove("header-five-scroll");
        }
      });
    }
  },
  headerSix() {
    const header = document.querySelector(".header-six");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-six-scroll");
        } else {
          header.classList.remove("header-six-scroll");
        }
      });
    }
  },
};
if (typeof window !== "undefined") {
  headerAnimation.headerOne();
  headerAnimation.headerTwo();
  headerAnimation.headerThree();
  headerAnimation.headerFour();
  headerAnimation.headerFive();
  headerAnimation.headerSix();
}
document.addEventListener("DOMContentLoaded", function () {
  if (typeof InfiniteMarquee === "undefined") {
    console.error("InfiniteMarquee is not loaded.");
    return;
  }
});

const sidebarAnimation = {
  elements: null,
  init() {
    try {
      this.cacheElements();
      this.bindEvents();
    } catch (error) {
      console.error("Sidebar animation initialization failed:", error);
    }
  },
  cacheElements() {
    this.elements = {
      navHamburger: document.querySelector(".nav-hamburger"),
      navHamburgerClose: document.querySelector(".nav-hamburger-close"),
      sidebar: document.querySelector(".sidebar"),
      subMenu: document.querySelectorAll(".sub-menu"),
    };
  },
  bindEvents() {
    const { navHamburger, navHamburgerClose, subMenu, sidebar } = this.elements;
    const closeSidebar = () => {
      if (!this.elements?.sidebar) return;
      this.elements.sidebar.classList.remove("show-sidebar");
      document.body.classList.remove("overflow-hidden");
    };
    if (navHamburger) {
      navHamburger.addEventListener("click", () => {
        if (!this.elements?.sidebar) return;
        this.elements.sidebar.classList.add("show-sidebar");
        document.body.classList.add("overflow-hidden");
      });
    }
    if (navHamburgerClose) {
      navHamburgerClose.addEventListener("click", closeSidebar);
    }

    // Close sidebar when clicking a real navigation link inside it
    if (sidebar) {
      sidebar.addEventListener("click", (e) => {
        const link = e.target?.closest?.("a");
        if (!link) return;

        // If this link is being used to toggle a submenu, don't close
        if (link.closest(".sub-menu")) return;

        closeSidebar();
      });
    }
    subMenu.forEach((menu) => {
      menu.addEventListener("click", () => {
        menu.classList.toggle("active-menu");
        menu.nextElementSibling.classList.toggle("hidden");
        menu.children[1].classList.toggle("rotate-90");
        subMenu.forEach((otherMenu) => {
          if (otherMenu !== menu) {
            otherMenu.nextElementSibling.classList.add("hidden");
            otherMenu.children[1].classList.remove("rotate-90");
            otherMenu.classList.remove("active-menu");
          }
        });
      });
    });
  },
};
if (typeof window !== "undefined") {
  sidebarAnimation.init();
}
const testimonials = [
  {
    name: "Jessica Lee",
    position: "Head of customer Success",
    image: "images/avatar/avatar-9.png",
    quote:
      "The investment insights are clear, easy to understand and follow. I love the automation and feel like I'm making real progress every day.",
  },
  {
    name: "Mark Thompson",
    position: "Marketing Director",
    image: "images/avatar/avatar-10.png",
    quote:
      "This platform helps our team move faster, stay aligned, and reduce errors. It's a powerful tool that boosts productivity all around.",
  },
  {
    name: "Amina Yusuf",
    position: "Product Manager",
    image: "images/avatar/avatar-11.png",
    quote:
      "Our planning is finally clear and consistent. I feel more confident in how my team executes tasks and reaches project goals on time.",
  },
  {
    name: "Leo Chen",
    position: "Founder, ScaleX",
    image: "images/avatar/avatar-13.png",
    quote:
      "The design is clean and the interface is effortless to use. It saves time, improves clarity, and just makes everything run smoother.",
  },
  {
    name: "John Doe",
    position: "CEO",
    image: "images/avatar/avatar-14.png",
    quote:
      "A great platform for managing projects with clarity and speed. It's intuitive, efficient, and keeps everyone on the same page easily.",
  },
];
const svgDraw = () => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  const selectors = ["#svg-one", "#svg-two", "#svg-three"];
  gsap.set(selectors.join(", "), {
    visibility: "visible",
  });
  if (selectors.length > 0) {
    selectors.forEach((selector) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
        },
      });
      tl.from(selector, {
        duration: 1,
        drawSVG: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    });
  }
};
if (typeof window !== "undefined") {
  svgDraw();
}

function isDOMReady() {
  return document.readyState === "loading" ? false : true;
}

function waitForDOM() {
  return new Promise((resolve) => {
    if (isDOMReady()) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", resolve);
    }
  });
}

function dividerExpand(divider) {
  gsap.to(divider, {
    scrollTrigger: {
      trigger: divider,
      start: "top 100%",
      end: "top 50%",
      scrub: false,
      toggleActions: "play none none none",
    },
    width: "100%",
    duration: 1,
    delay: 0.7,
    ease: "power2.out",
  });
}
const commonAnimation = {
  init() {
    const divider = document.querySelector(".divider");
    const footerDivider = document.querySelector(".footer-divider");
    const stepLine = document.querySelectorAll(".step-line");
    const heroPerspective = document.querySelector(".hero-perspective");
    const heroLines = document.querySelectorAll("[data-hero-line]");
    if (divider) {
      dividerExpand(divider);
    }
    if (footerDivider) {
      dividerExpand(footerDivider);
    }
    if (stepLine.length > 0) {
      gsap.set(stepLine, {
        height: "0px",
      });
      stepLine.forEach((line, index) => {
        gsap.to(line, {
          height: "380px",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 15%",
            toggleActions: "play none none reverse",
            // Add a small stagger delay for sequential feel
            onEnter: () => {
              gsap.delayedCall(index * 0.15, () => {
                gsap.to(line, {
                  height: "380px",
                  duration: 1.5,
                  ease: "power3.out",
                });
              });
            },
          },
        });
      });
    }
    if (heroPerspective) {
      gsap.set(heroPerspective, {
        opacity: 0,
        filter: "blur(20px)",
        transform: "perspective(1200px) scale(0.896871) rotateX(14.4381deg)",
      });
      ScrollTrigger.create({
        trigger: heroPerspective,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(heroPerspective, {
            opacity: 1,
            filter: "blur(0px)",
            transform: "perspective(1200px) scale(1) rotateX(0deg)",
            duration: 0.8,
            delay: 0.7,
            ease: "power2.out",
          });
        },
      });
    }
    if (heroLines.length > 0) {
      heroLines.forEach((line) => {
        gsap.to(line, {
          height: "100%",
          duration: 0.8,
          delay: 0.7,
          ease: "power2.out",
        });
      });
    }
  },
};
if (typeof window !== "undefined") {
  commonAnimation.init();
}
const priceSwitcher = {
  // Store DOM elements
  elements: null,
  // Initialize the price switcher
  init() {
    try {
      this.getElements();
      this.addEventListeners();
      this.updatePrices();
    } catch (error) {
      console.error("Price switcher initialization failed:", error);
    }
  },
  // Get all the DOM elements we need
  getElements() {
    this.elements = {
      toggle: document.getElementById("priceCheck"),
      monthlyPrices: document.getElementsByClassName("price-month"),
      yearlyPrices: document.getElementsByClassName("price-year"),
    };
  },
  // Update which prices are shown based on toggle state
  updatePrices() {
    const { toggle, monthlyPrices, yearlyPrices } = this.elements;
    if (!toggle) return;
    for (let i = 0; i < monthlyPrices.length; i++) {
      const monthly = monthlyPrices[i];
      const yearly = yearlyPrices[i];
      if (toggle.checked) {
        monthly.style.display = "none";
        yearly.style.display = "block";
      } else {
        monthly.style.display = "block";
        yearly.style.display = "none";
      }
    }
  },
  // Add click event to the toggle
  addEventListeners() {
    const { toggle } = this.elements;
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      this.updatePrices();
    });
  },
};
if (typeof window !== "undefined") {
  priceSwitcher.init();
}
const initRevealElements = () => {
  const elements = document.querySelectorAll("[data-ns-animate]");
  const Springer = window.Springer.default;
  elements.forEach((elem) => {
    const duration = elem.getAttribute("data-duration")
      ? parseFloat(elem.getAttribute("data-duration"))
      : 0.6;
    const delay = elem.getAttribute("data-delay")
      ? parseFloat(elem.getAttribute("data-delay"))
      : 0;
    const offset = elem.getAttribute("data-offset")
      ? parseFloat(elem.getAttribute("data-offset"))
      : 60;
    const instant =
      elem.hasAttribute("data-instant") &&
      elem.getAttribute("data-instant") !== "false";
    const start = elem.getAttribute("data-start") || "top 90%";
    const end = elem.getAttribute("data-end") || "top 50%";
    const direction = elem.getAttribute("data-direction") || "down";
    const useSpring = elem.hasAttribute("data-spring");
    const spring = useSpring ? Springer(0.2, 0.8) : null;
    const rotation = elem.getAttribute("data-rotation")
      ? parseFloat(elem.getAttribute("data-rotation"))
      : 0;
    const animationType = elem.getAttribute("data-animation-type") || "from";
    elem.style.opacity = "1";
    elem.style.filter = "blur(0)";
    let animationProps;
    if (animationType === "to") {
      animationProps = {
        opacity: 1,
        filter: "blur(0)",
        duration,
        delay,
        ease: useSpring ? spring : "power2.out",
      };
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    } else {
      animationProps = {
        opacity: 0,
        filter: "blur(16px)",
        duration,
        delay,
        ease: useSpring ? spring : "power2.out",
      };
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    }
    if (!instant) {
      animationProps.scrollTrigger = {
        trigger: elem,
        start,
        end,
        scrub: false,
      };
    }
    switch (direction) {
      case "left":
        animationProps.x = -offset;
        break;
      case "right":
        animationProps.x = offset;
        break;
      case "down":
        animationProps.y = offset;
        break;
      case "up":
      default:
        animationProps.y = -offset;
        break;
    }
    if (animationType === "to") {
      gsap.to(elem, animationProps);
    } else {
      gsap.from(elem, animationProps);
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  initRevealElements();
});
let lenis;
const smoothScrolling = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    window.innerWidth <= 768 ||
    "ontouchstart" in window;
  if (!isMobile) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add((time) => {
      lenis.raf(time * 1e3);
    });
    gsap.ticker.lagSmoothing(0);
  }
};
const resetTocItems = (sidebarList) => {
  const allListItems = sidebarList.querySelectorAll("li");
  allListItems.forEach((item) => {
    const icon = item.querySelector("span:last-child");
    const text = item.querySelector("span:first-child, a span");
    if (icon) icon.classList.add("invisible");
    if (text) {
      text.classList.remove(
        "font-medium",
        "text-secondary",
        "dark:text-accent"
      );
      text.classList.add(
        "font-normal",
        "text-secondary/60",
        "dark:text-accent/60"
      );
    }
  });
};
const activateTocItem = (item) => {
  const icon = item.querySelector("span:last-child");
  const text = item.querySelector("span:first-child, a span");
  if (icon) icon.classList.remove("invisible");
  if (text) {
    text.classList.remove(
      "font-normal",
      "text-secondary/60",
      "dark:text-accent/60"
    );
    text.classList.add("font-medium", "text-secondary", "dark:text-accent");
  }
};
const handleTocItemClick = (clickedItem, sidebarList) => {
  resetTocItems(sidebarList);
  activateTocItem(clickedItem);
};
const lenisSmoothScrollLinks = () => {
  const lenisTargetElements = document.querySelectorAll(".lenis-scroll-to");
  const sidebarList = document.querySelector(
    ".table-of-contents .table-of-list"
  );
  lenisTargetElements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      const target = ele.getAttribute("href");
      if (sidebarList) {
        const clickedItem = ele.closest("li");
        if (clickedItem) {
          handleTocItemClick(clickedItem, sidebarList);
        }
      }
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.7,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        } else {
          const targetElement = document.querySelector(target);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setTimeout(() => {
              window.scrollBy(0, -100);
            }, 100);
          }
        }
      }
    });
  });
};
const handleTocListClicks = () => {
  const sidebarList = document.querySelector(
    ".table-of-contents .table-of-list"
  );
  if (!sidebarList) return;
  const listItems = sidebarList.querySelectorAll("li");
  listItems.forEach((item) => {
    if (item.querySelector(".lenis-scroll-to")) {
      return;
    }
    item.addEventListener("click", function () {
      handleTocItemClick(item, sidebarList);
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  lenisSmoothScrollLinks();
  handleTocListClicks();
});
const leaflet = {
  init() {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      return;
    }
    const leafletMap = L.map("map").setView([39.8283, -98.5795], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 3,
    }).addTo(leafletMap);
    window.addEventListener("resize", () => {
      leafletMap.invalidateSize();
    });
    leafletMap.zoomControl.setPosition("bottomright");
  },
};
document.addEventListener("DOMContentLoaded", () => {
  leaflet.init();
});

jQuery(document).ready(function ($) {
  function adjustMegaMenu() {
    var is_rtl = nextsaas_theme.is_rtl;
    // Handle full-width mega menus
    $(".menu_full_width.mega-menu").each(function () {
      var $submenu = $(this).find(".submenu-wrapper");
      var $navContainer = $(this).closest(".nav-menu");

      if ($navContainer.length === 0) {
        return; // no container
      }

      var containerWidth = 1290;
      var containerLeftPos = $navContainer.offset().left;

      $submenu.css({
        width: containerWidth + "px",
        "max-width": containerWidth + "px",
        position: "fixed",
      });
    });

    // New handler for 75% width mega menus
    $(".menu_75_width.mega-menu").each(function () {
      var $submenu = $(this).find(".submenu-wrapper");
      var $navContainer = $(this).closest(".nav-menu");
      var $menuItem = $(this);

      if ($navContainer.length === 0) {
        $navContainer = $("body");
      }

      // var containerWidth = $navContainer.width();
      var containerWidth = 1290;
      var submenuWidth = Math.round(containerWidth * 0.75);

      var menuItemWidth = $menuItem.outerWidth();
      var menuItemLeftPos = $menuItem.offset().left;
      var containerLeftPos = $navContainer.offset().left;

      var leftOffset =
        menuItemLeftPos -
        containerLeftPos +
        menuItemWidth / 2 -
        submenuWidth / 2;

      $submenu.css({
        width: submenuWidth + "px",
        left: "50%",
        "max-width": submenuWidth + "px",
        position: "fixed",
      });
    });

    // New handler for 50% width mega menus
    $(".menu_half_width.mega-menu").each(function () {
      var $submenu = $(this).find(" div.submenu-wrapper");
      var $navContainer = $(this).closest(".nav-menu");
      var $menuItem = $(this);

      if ($navContainer.length === 0) {
        $navContainer = $("body");
      }

      // var containerWidth = $navContainer.width();
      var containerWidth = 1290;
      var submenuWidth = Math.round(containerWidth * 0.6);

      var menuItemWidth = $menuItem.outerWidth();
      var menuItemLeftPos = $menuItem.offset().left;
      var containerLeftPos = $navContainer.offset().left;

      var leftOffset =
        menuItemLeftPos - menuItemWidth - submenuWidth - containerLeftPos;

      $submenu.css({
        width: submenuWidth + "px",
        left:  "40px",
        "max-width": submenuWidth + "px",
      });
    });

    // New handler for 25% width mega menus
    $(".single_width.mega-menu").each(function () {
      var $submenu = $(this).find(" div.submenu-wrapper");
      var $navContainer = $(this).closest(".nav-menu");
      var $menuItem = $(this);

      if ($navContainer.length === 0) {
        $navContainer = $("body");
      }

      // var containerWidth = $navContainer.width();
      var containerWidth = 1290;
      var submenuWidth = Math.round(containerWidth * 0.25);

      var menuItemWidth = $menuItem.outerWidth();
      var menuItemLeftPos = $menuItem.offset().left;
      var containerLeftPos = $navContainer.offset().left;

      var leftOffset = submenuWidth - containerLeftPos;

      $submenu.css({
        width: submenuWidth + "px",
        "max-width": submenuWidth + "px",
      });
    });
  }
  adjustMegaMenu();

  $(window).on("resize", function () {
    adjustMegaMenu();
  });

  const links = document.querySelectorAll('.nextsaas-changelog a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      setActiveLink(href);

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  window.addEventListener('scroll', () => {
    let currentSection = null;

    document.querySelectorAll('.nextsaas-changelog [id]').forEach(section => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= 150 && rect.bottom > 150) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const id = '#' + currentSection.id;

      setActiveLink(id);
    }
  });

  function setActiveLink(href) {
    links.forEach(a => a.classList.remove('changelog-active'));
    const activeLink = document.querySelector('.nextsaas-changelog a[href="' + href + '"]');
    if (activeLink) activeLink.classList.add('changelog-active');
  }

  function headerOffset() {
    // Change selector to your sticky header if needed
    var $header = $('header:visible').first();
    return $header.length ? $header.outerHeight() : 0;
  }
  function smoothScrollToHash(hash) {
    if (!hash || hash === '#') return;
    var $target = $(hash);
    if (!$target.length) return;
    var y = $target.offset().top - headerOffset();
    $('html, body').stop().animate({ scrollTop: y }, 1200);
  }
  // Click on same-page hash links
  $(document).on('click', 'a[href*="#"]', function (e) {
    var href = $(this).attr('href');
    if (!href) return;
    // Only handle same-page links
    var linkUrl = this.href.split('#')[0].replace(/\/$/, '');
    var pageUrl = window.location.href.split('#')[0].replace(/\/$/, '');
    if (linkUrl !== pageUrl) return;
    var hash = this.hash;
    if (!hash) return;
    e.preventDefault();
    smoothScrollToHash(hash);
    // Update URL hash without jumping
    history.pushState(null, '', hash);
  });
  // If page loads with a hash, scroll after load
  $(window).on('load', function () {
    smoothScrollToHash(window.location.hash);
  });

  // One-page menu "active" state (desktop + mobile)
  (function initOnePageMenuActive() {
    // Don't rely on dynamic WP menu IDs; use theme structure instead.
    // Desktop: ul.nextsaas_nav_menu
    // Mobile: the menu inside the sidebar
    const menuSelectors = [".nextsaas_nav_menu", ".sidebar"];
    const menuLinks = Array.from(
      document.querySelectorAll(
        menuSelectors.map((s) => `${s} a[href^="#"]`).join(",")
      )
    ).filter((a) => {
      const href = a.getAttribute("href");
      return href && href !== "#";
    });

    if (!menuLinks.length) return;

    const targets = menuLinks
      .map((a) => a.getAttribute("href"))
      .filter((href, i, arr) => arr.indexOf(href) === i)
      .map((hash) => ({ hash, el: document.querySelector(hash) }))
      .filter((t) => t.el);

    const setActiveOnePageHash = (hash) => {
      if (!hash) return;
      menuLinks.forEach((a) => {
        a.classList.remove("menu-item-link-active");
        a.closest("li")?.classList.remove("menu-item-active");
      });
      menuLinks
        .filter((a) => a.getAttribute("href") === hash)
        .forEach((a) => {
          a.classList.add("menu-item-link-active");
          a.closest("li")?.classList.add("menu-item-active");
        });
    };

    // Update active immediately on click
    menuLinks.forEach((a) => {
      a.addEventListener("click", () => {
        setActiveOnePageHash(a.getAttribute("href"));
      });
    });

    // Update active on scroll (scrollspy)
    const computeActiveHash = () => {
      const offset = Math.max(100, headerOffset() + 20);
      let current = null;
      for (const t of targets) {
        const rect = t.el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = t;
        }
      }
      return current?.hash || null;
    };

    const onScroll = () => {
      const hash = computeActiveHash();
      if (hash) setActiveOnePageHash(hash);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial state (hash or current viewport section)
    setActiveOnePageHash(window.location.hash || computeActiveHash() || targets[0]?.hash);
  })();
});
