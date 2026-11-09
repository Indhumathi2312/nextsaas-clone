(function ($, elementor) {
  "use strict";

  var GsapAnimation = {
    init: function () {
      // Trigger for all Elementor containers and widgets
      elementor.hooks.addAction(
        "frontend/element_ready/container",
        GsapAnimation.initGsapRevealAnimation
      );
      elementor.hooks.addAction(
        "frontend/element_ready/section",
        GsapAnimation.initGsapRevealAnimation
      );
      elementor.hooks.addAction(
        "frontend/element_ready/widget",
        GsapAnimation.initGsapRevealAnimation
      );
    },

    initGsapRevealAnimation: function ($scope) {
      const Springer = window.Springer.default;

      // Check if the current scope element itself has animation enabled
      const scopeElement = $scope[0];
      if (scopeElement.hasAttribute("data-gsap-animate")) {
        // Process only the current element, not nested ones
        GsapAnimation.processElementAnimation(scopeElement, Springer);
      }

      // Also check for any direct children (not descendants) that have animation
      const directChildren = scopeElement.querySelectorAll(
        ":scope > [data-gsap-animate]"
      );
      directChildren.forEach((elem) => {
        GsapAnimation.processElementAnimation(elem, Springer);
      });
    },

    processElementAnimation: function (elem, Springer) {
      // Prevent double animation by checking if already processed
      if (elem.hasAttribute("data-gsap-processed")) {
        return;
      }

      // Mark as processed to prevent double animation
      elem.setAttribute("data-gsap-processed", "true");

      const duration = elem.dataset.duration
        ? parseFloat(elem.dataset.duration)
        : 0.6;
      const delay = elem.dataset.delay ? parseFloat(elem.dataset.delay) : 0;
      const offset = elem.dataset.offset ? parseFloat(elem.dataset.offset) : 60;
      const instant =
        elem.dataset.instant !== undefined && elem.dataset.instant !== "false";
      const start = elem.dataset.start || "top 90%";
      const end = elem.dataset.end || "top 50%";
      const direction = elem.dataset.direction || "down";
      const useSpring = elem.dataset.spring === "true";
      const spring = useSpring && Springer ? Springer(0.2, 0.8) : null;
      const rotation = elem.dataset.rotation
        ? parseFloat(elem.dataset.rotation)
        : 0;
      const animationType = elem.dataset.animationType || "from";

      // Force initial state with !important equivalent
      elem.style.opacity = "1";
      elem.style.filter = "blur(0)";

      // Set animation properties based on animation type
      let animationProps;

      if (animationType === "to") {
        // gsap.to() - animate TO the specified values
        animationProps = {
          opacity: 1,
          filter: "blur(0)",
          duration: duration,
          delay: delay,
          ease: useSpring ? spring : "power2.out",
        };

        // Add rotation if specified
        if (rotation !== 0) {
          animationProps.rotation = rotation;
        }
      } else {
        // gsap.from() - animate FROM the specified values to normal
        animationProps = {
          opacity: 0,
          filter: "blur(16px)",
          duration: duration,
          delay: delay,
          ease: useSpring ? spring : "power2.out",
        };

        // Add rotation if specified
        if (rotation !== 0) {
          animationProps.rotation = rotation;
        }
      }

      if (!instant) {
        animationProps.scrollTrigger = {
          trigger: elem,
          start: start,
          end: end,
          scrub: false,
        };
      }

      // Set animation direction based on data-direction
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

      // Use appropriate GSAP method based on animation type
      if (animationType === "to") {
        gsap.to(elem, animationProps);
      } else {
        gsap.from(elem, animationProps);
      }
    },
  };

  $(window).on("elementor/frontend/init", GsapAnimation.init);
})(jQuery, window.elementorFrontend);
