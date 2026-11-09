(function ($, elementor) {
  "use strict";

  // Pricing toggle: radios (monthly/quarterly/yearly) control .monthly / .quarterly / .yearly inside .pricing-card within .price-scope
  var PricingToggle = {
    init: function (root) {
      if (!root) root = document;
      var el = root instanceof jQuery ? root[0] : root;
      var scopes = el
        ? el.querySelectorAll(".price-scope")
        : document.querySelectorAll(".price-scope");
      for (var i = 0; i < scopes.length; i++) {
        this._initScope(scopes[i], i);
      }

      // Also initialize any pricing toggle UI wrappers (tab-slider) inside this root
      var wrappers = el
        ? el.querySelectorAll(".tab-slider-wrapper")
        : document.querySelectorAll(".tab-slider-wrapper");
      for (var w = 0; w < wrappers.length; w++) {
        this._initToggleUI(wrappers[w]);
      }
    },
    _initScope: function (scope, scopeIdx) {
      var radioSelector =
        'input[type="radio"][value="monthly"], input[type="radio"][value="quarterly"], input[type="radio"][value="yearly"]';
      var radios = scope.querySelectorAll(radioSelector);

      // If there are no period radios but a simple checkbox switcher exists,
      // fall back to the simple monthly/yearly switcher behavior.
      if (!radios.length) {
        var toggle = scope.querySelector(".price-switcher-input");
        if (toggle) {
          this._initSimpleSwitcher(scope, toggle);
        }
        return;
      }

      var uniqueGroupName = "pricing-toggle-auto-" + scopeIdx;
      for (var r = 0; r < radios.length; r++) {
        radios[r].name = uniqueGroupName;
      }

      var usedIds = {};
      for (var r2 = 0; r2 < radios.length; r2++) {
        var radio = radios[r2];
        var originalId = (radio.id && radio.id.trim()) || "";
        var newId = originalId;
        var period = this._periodFromIdOrValue(radio.id, radio.value) || "p";
        if (
          !newId ||
          usedIds[newId] ||
          (document.getElementById(newId) &&
            document.getElementById(newId) !== radio)
        ) {
          newId =
            "pricing-" +
            period +
            "-" +
            scopeIdx +
            "-" +
            Math.random().toString(36).slice(2, 7);
          radio.id = newId;
        }
        usedIds[newId] = true;
        var label = scope.querySelector(
          'label[for="' +
            CSS.escape(originalId) +
            '"], label[for="' +
            CSS.escape(newId) +
            '"]',
        );
        if (label) label.setAttribute("for", newId);
      }

      var cards = scope.querySelectorAll(".pricing-card");
      if (!cards.length) return;

      var available = this._availablePeriods(cards);

      for (var r3 = 0; r3 < radios.length; r3++) {
        var rad = radios[r3];
        var period = this._periodFromIdOrValue(rad.id, rad.value);
        var label = scope.querySelector(
          'label[for="' + CSS.escape(rad.id) + '"]',
        );
        var isAvailable = period && available.indexOf(period) !== -1;
        rad.style.display = isAvailable ? "" : "none";
        if (label) label.style.display = isAvailable ? "" : "none";
      }

      var self = this;
      for (var r4 = 0; r4 < radios.length; r4++) {
        radios[r4].addEventListener("change", function (e) {
          if (e.target.checked) {
            var period = self._periodFromIdOrValue(e.target.id, e.target.value);
            if (period) self._apply(scope, cards, period);
          }
        });
      }

      var checked = null;
      for (var c = 0; c < radios.length; c++) {
        if (
          radios[c].checked &&
          available.indexOf(
            this._periodFromIdOrValue(radios[c].id, radios[c].value),
          ) !== -1
        ) {
          checked = radios[c];
          break;
        }
      }
      if (checked) {
        this._apply(
          scope,
          cards,
          this._periodFromIdOrValue(checked.id, checked.value),
        );
      } else {
        var first = null;
        for (var f = 0; f < radios.length; f++) {
          if (
            available.indexOf(
              this._periodFromIdOrValue(radios[f].id, radios[f].value),
            ) !== -1
          ) {
            first = radios[f];
            break;
          }
        }
        if (first) {
          first.checked = true;
          this._apply(
            scope,
            cards,
            this._periodFromIdOrValue(first.id, first.value),
          );
        }
      }
    },
    _apply: function (scope, cards, period) {
      var all = ["monthly", "quarterly", "yearly"];
      for (var c = 0; c < cards.length; c++) {
        for (var p = 0; p < all.length; p++) {
          var el = cards[c].querySelector("." + all[p]);
          if (!el) continue;
          el.classList.toggle("hidden", all[p] !== period);
        }
      }
    },
    _initSimpleSwitcher: function (scope, toggle) {
      var monthlyPrices = scope.querySelectorAll(".price-month");
      var yearlyPrices = scope.querySelectorAll(".price-year");
      var monthlyLabels = scope.querySelectorAll(".price-label-monthly");
      var yearlyLabels = scope.querySelectorAll(".price-label-yearly");

      function apply(isYearly) {
        for (var i = 0; i < monthlyPrices.length; i++) {
          monthlyPrices[i].classList.toggle("hidden", isYearly);
        }
        for (var j = 0; j < yearlyPrices.length; j++) {
          yearlyPrices[j].classList.toggle("hidden", !isYearly);
        }
        for (var k = 0; k < monthlyLabels.length; k++) {
          monthlyLabels[k].classList.toggle("hidden", isYearly);
        }
        for (var l = 0; l < yearlyLabels.length; l++) {
          yearlyLabels[l].classList.toggle("hidden", !isYearly);
        }
      }

      // Set initial state
      apply(toggle.checked);

      // Update on change
      toggle.addEventListener("change", function () {
        apply(toggle.checked);
      });
    },
    _availablePeriods: function (cards) {
      var first = cards[0];
      if (!first) return [];
      var out = [];
      if (first.querySelector(".monthly")) out.push("monthly");
      if (first.querySelector(".quarterly")) out.push("quarterly");
      if (first.querySelector(".yearly")) out.push("yearly");
      return out;
    },
    _periodFromIdOrValue: function (id, value) {
      id = id || "";
      value = value || "";
      var m =
        (id && id.match(/^(monthly|quarterly|yearly)(?:[-_].+)?$/i)) ||
        (value && value.match(/^(monthly|quarterly|yearly)$/i));
      return m ? m[0].toLowerCase().replace(/[-_].*$/, "") : null;
    },
    _tabSliderDefaults: {
      animationDuration: 0.3,
      animationEase: "power2.out",
      activeTabBgColor: "var(--color-background-7)",
      activeTabTextColor: "var(--color-background-13)",
      inactiveTabTextColor: "rgba(255, 255, 255, 0.6)",
    },
    _getTabSliderConfig: function (wrapper) {
      var d = this._tabSliderDefaults;
      var durationAttr = wrapper.getAttribute("data-animation-duration");
      return {
        animationDuration: durationAttr
          ? parseFloat(durationAttr)
          : d.animationDuration,
        animationEase:
          wrapper.getAttribute("data-animation-ease") || d.animationEase,
        activeTabBgColor:
          wrapper.getAttribute("data-active-tab-bg-color") ||
          d.activeTabBgColor,
        activeTabTextColor:
          wrapper.getAttribute("data-active-tab-text-color") ||
          d.activeTabTextColor,
        inactiveTabTextColor:
          wrapper.getAttribute("data-inactive-tab-text-color") ||
          d.inactiveTabTextColor,
      };
    },
    _initToggleUI: function (wrapper) {
      if (!wrapper) return;

      var activeTab = wrapper.querySelector(".active-tab");
      var inputs = wrapper.querySelectorAll('input[type="radio"]');
      var labels = wrapper.querySelectorAll("label[for]");
      var fieldset = wrapper.querySelector("fieldset");

      if (!activeTab || !inputs.length || !labels.length || !fieldset) return;

      var config = this._getTabSliderConfig(wrapper);

      // Base pill styles (position relative to fieldset)
      activeTab.style.position = "absolute";
      activeTab.style.top = "0";
      activeTab.style.left = "0";
      activeTab.style.backgroundColor = config.activeTabBgColor;
      activeTab.style.borderRadius = "9999px";
      activeTab.style.boxSizing = "border-box";

      var self = this;

      function animateToTab(targetInput, animate) {
        var targetLabel = wrapper.querySelector(
          'label[for="' + CSS.escape(targetInput.id) + '"]',
        );
        if (!targetLabel) return;

        var fieldsetRect = fieldset.getBoundingClientRect();
        var labelRect = targetLabel.getBoundingClientRect();

        var translateX = labelRect.left - fieldsetRect.left;
        var translateY = labelRect.top - fieldsetRect.top;
        var width = labelRect.width;
        var height = labelRect.height;

        if (animate && typeof gsap !== "undefined") {
          gsap.to(activeTab, {
            width: width,
            height: height,
            x: translateX,
            y: translateY,
            duration: config.animationDuration,
            ease: config.animationEase,
          });
          self._updateTabSliderColors(wrapper, targetInput, config);
        } else {
          activeTab.style.width = width + "px";
          activeTab.style.height = height + "px";
          activeTab.style.transform =
            "translate(" + translateX + "px, " + translateY + "px)";
          self._updateTabSliderColors(wrapper, targetInput, config);
        }
      }

      // Initial state: position pill on the checked tab
      var checkedInput = wrapper.querySelector('input[type="radio"]:checked');
      if (checkedInput) {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () {
            setTimeout(function () {
              animateToTab(checkedInput, false);
            }, 50);
          });
        } else {
          setTimeout(function () {
            animateToTab(checkedInput, false);
          }, 50);
        }
      }

      // Change handlers
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", function (e) {
          if (e.target.checked) animateToTab(e.target, true);
        });
      }

      // Optional: label click so programmatic check still animates
      for (var j = 0; j < labels.length; j++) {
        labels[j].addEventListener("click", function (e) {
          var forId = this.getAttribute("for");
          var input = wrapper.querySelector(
            'input[id="' + CSS.escape(forId) + '"]',
          );
          if (input && !input.checked) {
            input.checked = true;
            input.dispatchEvent(new Event("change"));
          }
        });
      }

      // Resize: re-position pill
      window.addEventListener("resize", function () {
        var checked = wrapper.querySelector('input[type="radio"]:checked');
        if (checked) animateToTab(checked, false);
      });
    },
    _updateTabSliderColors: function (wrapper, activeInput, config) {
      var labels = wrapper.querySelectorAll("label[for]");
      for (var i = 0; i < labels.length; i++) {
        var forId = labels[i].getAttribute("for");
        var input = wrapper.querySelector(
          'input[id="' + CSS.escape(forId) + '"]',
        );
        if (input === activeInput) {
          if (typeof gsap !== "undefined") {
            gsap.to(labels[i], {
              color: config.activeTabTextColor,
              duration: 0.15,
              ease: "power2.out",
            });
          } else {
            labels[i].style.color = config.activeTabTextColor;
          }
        } else {
          if (typeof gsap !== "undefined") {
            gsap.to(labels[i], {
              color: config.inactiveTabTextColor || "",
              duration: 0.15,
              ease: "power2.out",
            });
          } else {
            labels[i].style.color = config.inactiveTabTextColor || "";
          }
        }
      }
    },
  };

  var Nextsaas = {
    init: function () {
      var widgets = {
        // "nextsaas-button.default": Nextsaas.Button,
        "nextsaas_customer_logos.default": Nextsaas.CustomerLogos,
        "nextsaas_accordion.default": Nextsaas.Accordion,
        "nextsaas_blog.default": Nextsaas.Blog,
        "nextsaas_testimonial.default": Nextsaas.Testimonial,
        "nextsaas_testimonial_slider.default": Nextsaas.TestimonialSlider,
        "nextsaas_tab.default": Nextsaas.Tab,
        "nextsaas_video.default": Nextsaas.ModalVideo,
        "nextsaas_counter.default": Nextsaas.Counter,
        "nextsaas_parallax.default": Nextsaas.ParallaxEffect,
        "nextsaas_progressbar.default": Nextsaas.Progressbar,
        "nextsaas_steps.default": Nextsaas.Steps,
        "nextsaas_text_reveal.default": Nextsaas.TextReveal,
        "nextsaas-heading.default": Nextsaas.HeadingTextShuffle,
        "nextsaas_card_marquee.default": Nextsaas.CardMarquee,
        "nextsaas_image_marquee.default": Nextsaas.ImageMarquee,
        "nextsaas_hero_slide.default": Nextsaas.HeroSlide,
        "nextsaas_blog_filter.default": Nextsaas.BlogFilter,
        "nextsaas_mega_menu.default": Nextsaas.MegaMenu,
        "nextsaas_customer_story.default": Nextsaas.CustomerStory,
        "nextsaas_image_before_after.default": Nextsaas.ImageBeforeAfter,
        "nextsaas_audio.default": Nextsaas.Audio,
        "nextsaas_stack_card.default": Nextsaas.StackCard,
        "nextsaas_voice_wave.default": Nextsaas.VoiceWave,
        "nextsaas_image_spin.default": Nextsaas.ImageSpin,
        "nextsaas_image_slider.default": Nextsaas.ImageSlider,
        "nextsaas_integration.default": Nextsaas.Integration,
        "nextsaas_pricing.default": Nextsaas.Pricing,
        "nextsaas_team.default": Nextsaas.Team,
        "nextsaas_case_study.default": Nextsaas.CaseStudy,
        "nextsaas_service.default": Nextsaas.Service,
        "nextsaas_table_of_content.default": Nextsaas.TableOfContent,
        "nextsaas_stair_card.default": Nextsaas.StairCard,
        "nextsaas_expand_card.default": Nextsaas.ExpandCard,
        "nextsaas_post_filter.default": Nextsaas.PostFilter,
        "nextsaas_prompt_box.default": function ($scope) {
          Nextsaas.PromptBox($scope);
          Nextsaas.TypeWriteAnimation($scope);
          Nextsaas.PromptBoxFileAttachment($scope);
        },
      };
      $.each(widgets, function (widget, callback) {
        elementor.hooks.addAction("frontend/element_ready/" + widget, callback);
      });
      elementor.hooks.addAction(
        "frontend/element_ready/nextsaas_stack_card.default",
        Nextsaas.StackCardV2,
      );
      elementor.hooks.addAction(
        "frontend/element_ready/global",
        Nextsaas.StackCardV2,
      );
      elementor.hooks.addAction(
        "frontend/element_ready/container",
        Nextsaas.StackCardV2,
      );
      /* -----------------------------
        GLOBAL Button V3 binding
      ----------------------------- */
      elementor.hooks.addAction(
        "frontend/element_ready/global",
        function ($scope) {
          Nextsaas.Button($scope);
          Nextsaas.ButtonV6($scope);
          Nextsaas.ButtonV7($scope);
        },
      );

      elementor.hooks.addAction(
        "frontend/element_ready/container",
        function ($scope) {
          Nextsaas.Button($scope);
          Nextsaas.ButtonV6($scope);
          Nextsaas.ButtonV7($scope);
        },
      );

      elementor.hooks.addAction(
        "frontend/element_ready/nextsaas-button.default",
        function ($scope) {
          Nextsaas.ButtonV6($scope);
          Nextsaas.ButtonV7($scope);
        },
      );

      elementor.hooks.addAction(
        "frontend/element_ready/container",
        Nextsaas.Nextsaas_Background,
      );

      elementor.hooks.addAction(
        "frontend/element_ready/container",
        Nextsaas.GlowingCard,
      );

      elementor.hooks.addAction(
        "frontend/element_ready/container",
        Nextsaas.BorderGlowAnimation,
      );
    },

    Button: function ($scope) {
      const root =
        $scope && $scope[0] && $scope[0].querySelectorAll
          ? $scope[0]
          : document;

      const buttonWrappers = root.querySelectorAll("[data-button-v3]");

      buttonWrappers.forEach((buttonWrapper) => {
        if (buttonWrapper.dataset.v3Bound) return;
        buttonWrapper.dataset.v3Bound = "true";

        const iconWrapper = buttonWrapper.querySelector(
          "[data-button-v3-icon]",
        );
        const buttonText = buttonWrapper.querySelector("[data-button-v3-text]");

        const calculateDistance = () => {
          // Get the flex container (parent of icon and text)
          const flexContainer = iconWrapper.parentElement;
          if (!flexContainer) {
            return { iconTranslateXDistance: 0, textTranslateXDistance: 0 };
          }

          const flexContainerWidth = Math.ceil(flexContainer.clientWidth);
          const iconWidth = iconWrapper.clientWidth;

          // Calculate the distance to move icon to the right edge of the flex container
          // Account for padding by using flex container width instead of wrapper width
          // Add a small margin (4px) to ensure icon stays within bounds
          const iconTranslateXDistance = flexContainerWidth - iconWidth;
          const textTranslateXDistance = iconWidth;

          return { iconTranslateXDistance, textTranslateXDistance };
        };

        const onEnter = () => {
          const { iconTranslateXDistance, textTranslateXDistance } =
            calculateDistance();
          iconWrapper.style.transform = `translateX(${iconTranslateXDistance}px)`;
          buttonText.style.transform = `translateX(-${textTranslateXDistance}px)`;
        };

        const onLeave = () => {
          iconWrapper.style.transform = "translateX(0)";
          buttonText.style.transform = "translateX(0)";
        };

        buttonWrapper.addEventListener("mouseenter", onEnter);
        buttonWrapper.addEventListener("mouseleave", onLeave);
      });
    },

    ButtonV6: function ($scope) {
      // Check if GSAP and SplitText are available
      if (typeof gsap === "undefined" || typeof SplitText === "undefined") {
        return;
      }

      const root =
        $scope?.[0]?.querySelectorAll
          ? $scope[0]
          : document;

      const buttonWrappers = root.querySelectorAll(".button-v6-wrapper");

      buttonWrappers.forEach((buttonWrapper) => {
        if (buttonWrapper.dataset.v6Bound) return;
        buttonWrapper.dataset.v6Bound = "true";

        const upperText = buttonWrapper.querySelector(".button-v6-upper-text");
        const lowerText = buttonWrapper.querySelector(".button-v6-lower-text");

        if (!upperText || !lowerText) return;

        // Register SplitText plugin if not already registered
        try {
          gsap.registerPlugin(SplitText);
        } catch (e) {
          // Plugin might already be registered
        }

        // Split text into characters
        let upperSplit, lowerSplit;
        try {
          // Try using SplitText.create() method (GSAP plugin style)
          if (typeof SplitText.create !== "undefined") {
            upperSplit = SplitText.create(upperText, {
              type: "chars",
              tag: "span",
            });
            lowerSplit = SplitText.create(lowerText, {
              type: "chars",
              tag: "span",
            });
          } else {
            // Fallback to constructor style
            upperSplit = new SplitText(upperText, {
              type: "chars",
              tag: "span",
            });
            lowerSplit = new SplitText(lowerText, {
              type: "chars",
              tag: "span",
            });
          }
        } catch (e) {
          console.warn("SplitText initialization failed:", e);
          return;
        }

        if (!upperSplit.chars || !lowerSplit.chars) return;

        const duration = 0.4;
        const stagger = 0.00625;

        // Set initial state for upper text (visible)
        gsap.set(upperSplit.chars, {
          opacity: 1,
          display: "inline-block",
        });

        // Set initial state for lower text (hidden below)
        gsap.set(lowerSplit.chars, {
          opacity: 0,
          display: "inline-block",
        });

        // Create hover in animation (flip effect)
        const hoverInTl = gsap.timeline({ paused: true });
        hoverInTl
          .to(upperSplit.chars, {
            y: "-100%",
            duration: duration,
            opacity: 0,
            ease: "power2.inOut",
            stagger: stagger,
          })
          .to(
            lowerSplit.chars,
            {
              y: "-100%",
              duration: duration,
              opacity: 1,
              stagger: stagger,
              ease: "power2.inOut",
            },
            "<", // Start at the same time as upper text animation
          );

        buttonWrapper.addEventListener("mouseenter", () => {
          hoverInTl.play();
        });

        buttonWrapper.addEventListener("mouseleave", () => {
          hoverInTl.reverse();
        });
      });
    },

    ButtonV7: function ($scope) {
      if (typeof gsap === "undefined" || typeof SplitText === "undefined") {
        return;
      }

      const root =
        $scope && $scope[0] && $scope[0].querySelectorAll
          ? $scope[0]
          : document;

      const buttonWrappers = root.querySelectorAll(
        ".button-split-text-wrapper",
      );

      const duration = 0.4;
      const stagger = 0.00625;

      buttonWrappers.forEach((buttonWrapper) => {
        if (buttonWrapper.dataset.v7Bound) return;
        buttonWrapper.dataset.v7Bound = "true";

        const upperText = buttonWrapper.querySelector(
          ".button-split-upper-text",
        );
        const lowerText = buttonWrapper.querySelector(
          ".button-split-lower-text",
        );

        if (!upperText || !lowerText) return;

        let upperSplit, lowerSplit;
        try {
          if (typeof SplitText.create !== "undefined") {
            upperSplit = SplitText.create(upperText, {
              type: "chars",
              tag: "span",
            });
            lowerSplit = SplitText.create(lowerText, {
              type: "chars",
              tag: "span",
            });
          } else {
            upperSplit = new SplitText(upperText, {
              type: "chars",
              tag: "span",
            });
            lowerSplit = new SplitText(lowerText, {
              type: "chars",
              tag: "span",
            });
          }
        } catch (e) {
          console.warn("ButtonV7 SplitText initialization failed:", e);
          return;
        }

        if (!upperSplit.chars || !lowerSplit.chars) return;

        gsap.set(upperSplit.chars, {
          opacity: 1,
          display: "inline-block",
        });
        gsap.set(lowerSplit.chars, {
          opacity: 0,
          display: "inline-block",
        });

        const hoverInTl = gsap.timeline({ paused: true });
        hoverInTl
          .to(upperSplit.chars, {
            y: "-100%",
            duration: duration,
            opacity: 0,
            ease: "power2.inOut",
            stagger: stagger,
          })
          .to(
            lowerSplit.chars,
            {
              y: "-100%",
              duration: duration,
              opacity: 1,
              stagger: stagger,
              ease: "power2.inOut",
            },
            "<",
          );

        buttonWrapper.addEventListener("mouseenter", () => {
          hoverInTl.play();
        });
        buttonWrapper.addEventListener("mouseleave", () => {
          hoverInTl.reverse();
        });
      });
    },

    CustomerLogos: function ($scope) {
      const customerLogosWrapper = $scope
        .find(".nextsaas_customer_logos_wrapper")
        .eq(0);
      const CustomerLogos = customerLogosWrapper.find(
        ".logos-marquee-container",
      );

      if (CustomerLogos.length > 0 && CustomerLogos[0]) {
        // Get settings from widget data attributes
        const direction = customerLogosWrapper.data("direction") || "left";
        const speed = customerLogosWrapper.data("speed") || 40000;
        const pauseHover = customerLogosWrapper.data("pause-hover") === "yes";
        const gap = customerLogosWrapper.data("gap") || 32;

        // Configure marquee with dynamic settings
        const marqueeConfig = {
          element: CustomerLogos[0],
          speed: parseInt(speed),
          smoothEdges: true,
          direction: direction,
          gap: gap + "px",
          duplicateCount: 1,
          pauseOnHover: pauseHover,
        };

        new InfiniteMarquee(marqueeConfig);
      }
    },

    Accordion: function ($scope) {
      const accordionContainer = $scope.find(".accordion").eq(0);

      if (accordionContainer.length > 0) {
        const accordionAnimation = {
          accordionItems: null,
          activeItem: null,

          init() {
            this.accordion = accordionContainer[0];
            this.accordionItems =
              this.accordion.querySelectorAll(".accordion-item");
            this.activeItem = null;
            this.accordionItems.forEach((item) => {
              const action = item.querySelector(".accordion-action");
              const content = item.querySelector(".accordion-content");

              if (item.classList.contains("active-accordion")) {
                content.classList.remove("hidden");
                content.style.height = "auto";
                this.activeItem = item;
                item.classList.add("active-accordion-item");
                this.setOpenState(item);
              } else {
                content.classList.add("hidden");
              }

              action.addEventListener("click", (e) => {
                e.preventDefault();

                if (this.activeItem && this.activeItem !== item) {
                  this.closeAccordion(this.activeItem);
                }

                if (this.activeItem === item) {
                  this.closeAccordion(item);
                  this.activeItem = null;
                } else {
                  this.openAccordion(item);
                  this.activeItem = item;
                }
              });
            });
            this.initAnimation();
          },

          setOpenState(item) {
            const accordionArrow = item.querySelector(".accordion-arrow svg");
            const accordionIcon = item.querySelector(".accordion-arrow i");
            const plusIcon = item.querySelector(".accordion-plus-icon");

            // Set icon states for default open item
            if (accordionArrow) {
              accordionArrow.style.transform = "rotate(180deg)";
            }

            if (accordionIcon) {
              accordionIcon.style.transform = "rotate(180deg)";
            }

            // Handle plus icon (layout-2) - set to minus state for active items
            if (plusIcon) {
              const verticalLine = plusIcon.querySelector("span:last-child");
              if (verticalLine) {
                verticalLine.style.transform = "rotate(0deg)";
                verticalLine.style.marginTop = "-2px";
                // Remove any existing rotation classes and ensure minus state
                verticalLine.classList.remove("rotate-90");
                verticalLine.classList.add("rotate-0");
              }
            }
          },

          initAnimation() {
            this.accordionItems.forEach((item, index) => {
              // Set initial state
              if (typeof gsap !== "undefined") {
                gsap.set(item, {
                  opacity: 0,
                  y: 50,
                  filter: "blur(20px)",
                  overflow: "hidden",
                });

                // Create scroll trigger animation
                gsap.fromTo(
                  item,
                  {
                    opacity: 0,
                    y: 50,
                    filter: "blur(20px)",
                  },
                  {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 90%",
                      end: "top 50%",
                      scrub: false,
                      once: true,
                    },
                  },
                );
              } else {
                // Fallback without GSAP
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
                item.style.filter = "blur(0px)";
              }
            });
          },

          openAccordion(item) {
            const content = item.querySelector(".accordion-content");
            const accordionArrow = item.querySelector(".accordion-arrow svg");
            const accordionIcon = item.querySelector(".accordion-arrow i");
            const plusIcon = item.querySelector(".accordion-plus-icon");

            // Add active class to accordion item
            item.classList.add("active-accordion-item");

            content.classList.remove("hidden");
            content.style.height = "auto";
            const contentHeight = content.scrollHeight;
            content.style.height = "0px";

            if (typeof gsap !== "undefined") {
              gsap.to(content, {
                height: contentHeight,
                opacity: 1,
                duration: 0.3,
              });

              if (accordionArrow) {
                gsap.to(accordionArrow, {
                  rotation: -180,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }

              if (accordionIcon) {
                gsap.to(accordionIcon, {
                  rotation: 180,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }

              // Handle plus icon animation (layout-2) - animate to minus state
              if (plusIcon) {
                const verticalLine = plusIcon.querySelector("span:last-child");
                if (verticalLine) {
                  gsap.to(verticalLine, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                      verticalLine.classList.remove("rotate-90");
                      verticalLine.classList.add("rotate-0");
                    },
                  });
                }
              }
            } else {
              // Fallback without GSAP
              content.style.height = contentHeight + "px";
              content.style.opacity = "1";

              if (accordionArrow) {
                accordionArrow.style.transform = "rotate(-180deg)";
              }

              if (accordionIcon) {
                accordionIcon.style.transform = "rotate(180deg)";
              }

              // Handle plus icon fallback (layout-2) - set to minus state
              if (plusIcon) {
                const verticalLine = plusIcon.querySelector("span:last-child");
                if (verticalLine) {
                  verticalLine.style.transform = "rotate(0deg)";
                  verticalLine.style.marginTop = "-2px";
                  verticalLine.classList.remove("rotate-90");
                  verticalLine.classList.add("rotate-0");
                }
              }
            }
          },

          closeAccordion(item) {
            const content = item.querySelector(".accordion-content");
            const accordionArrow = item.querySelector(".accordion-arrow svg");
            const accordionIcon = item.querySelector(".accordion-arrow i");
            const plusIcon = item.querySelector(".accordion-plus-icon");

            // Remove active class from accordion item
            item.classList.remove("active-accordion-item");

            content.style.height = "auto";
            const contentHeight = content.scrollHeight;
            content.style.height = contentHeight + "px";

            if (typeof gsap !== "undefined") {
              gsap.to(content, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  content.classList.add("hidden");
                  content.style.height = "0px";
                },
              });

              // Animate accordion arrow back (if exists)
              if (accordionArrow) {
                gsap.to(accordionArrow, {
                  rotation: 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }

              // Animate icon back to normal (if exists)
              if (accordionIcon) {
                gsap.to(accordionIcon, {
                  rotation: 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }

              // Handle plus icon animation back to plus (layout-2)
              if (plusIcon) {
                const verticalLine = plusIcon.querySelector("span:last-child");
                if (verticalLine) {
                  gsap.to(verticalLine, {
                    rotation: 90,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                      verticalLine.classList.remove("rotate-0");
                      verticalLine.classList.add("rotate-90");
                    },
                  });
                }
              }
            } else {
              // Fallback without GSAP
              content.style.height = "0px";
              content.style.opacity = "0";
              content.classList.add("hidden");

              if (accordionArrow) {
                accordionArrow.style.transform = "rotate(0deg)";
              }

              if (accordionIcon) {
                accordionIcon.style.transform = "rotate(0deg)";
              }

              // Handle plus icon fallback back to plus (layout-2)
              if (plusIcon) {
                const verticalLine = plusIcon.querySelector("span:last-child");
                if (verticalLine) {
                  verticalLine.style.transform = "rotate(90deg)";
                  verticalLine.style.marginTop = "-2px";
                  verticalLine.classList.remove("rotate-0");
                  verticalLine.classList.add("rotate-90");
                }
              }
            }
          },
        };

        // Initialize accordion
        accordionAnimation.init();
      }
    },

    Blog: function ($scope) {
      const blogWrapper = $scope.find(".nextsaas_blog_wrapper").eq(0);
      const blogSliderWrapper = blogWrapper.find(
        ".nextsaas-blog-slider-wrapper",
      );
      const blogSlider = blogWrapper.find(".nextsaas-blog-slider");
      const pagination = blogSlider.find(".pagination-bullets");

      if (blogSlider.length > 0 && blogSlider[0]) {
        const loop = blogSliderWrapper.data("loop");
        const speed = blogSliderWrapper.data("speed");
        const autoplay = blogSliderWrapper.data("autoplay") === "yes";
        const autoplayDelay =
          parseInt(blogSliderWrapper.data("autoplay-delay"), 10) || 5000;
        $(blogSlider).each(function (idx) {
          const el = blogSlider[idx];
          if (el && pagination[idx]) {
            new Swiper(el, {
              slidesPerView: 1,
              spaceBetween: 40,
              loop: loop,
              effect: "slide",
              speed: speed,
              autoplay: autoplay
                ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                  }
                : false,
              pagination: {
                el: pagination[idx],
                clickable: true,
                type: "bullets",
              },
            });
          }
        });
      }

      // ============ blog card active-card on hover (layout-7 Type 2) ============
      const searchRoot = blogWrapper.length ? blogWrapper : $scope;
      let blogCardsForActive = searchRoot.find(
        ".blog-cards-type-2 .blog-card, .blog-cards-layout-7 .blog-card",
      );
      if (blogCardsForActive.length === 0) {
        blogCardsForActive = searchRoot.find(
          ".blog-card.underline-hover-effect-black",
        );
      }
      if (blogCardsForActive.length > 0) {
        blogCardsForActive.removeClass("active-card");
        blogCardsForActive.eq(0).addClass("active-card");
        blogCardsForActive.on("mouseenter", function () {
          blogCardsForActive.removeClass("active-card");
          $(this).addClass("active-card");
        });
      }
    },

    Testimonial: function ($scope) {
      const testimonialWrapper = $scope
        .find(".nextsaas_testimonial_wrapper")
        .eq(0);

      if (testimonialWrapper.length) {
        // Initialize Swiper for slider testimonials
        const reviewsSwiper = testimonialWrapper.find(".reviews-swiper");

        if (reviewsSwiper.length > 0) {
          /* =========================
           Swiper sliders js 
          =========================== */
          function initReviewsSwiper() {
            // Get dynamic settings from data attributes
            const swiperElement = reviewsSwiper[0];
            const autoplay = swiperElement.dataset.autoplay === "true";
            const autoplayDelay =
              parseInt(swiperElement.dataset.autoplayDelay) || 3000;
            const speed = parseInt(swiperElement.dataset.speed) || 1500;
            const loop = swiperElement.dataset.loop === "true";
            const centeredSlides =
              swiperElement.dataset.centeredSlides === "true";
            const navigation = swiperElement.dataset.navigation === "true";

            // Responsive settings
            const slidesDesktop =
              parseInt(swiperElement.dataset.slidesDesktop) || 3;
            const slidesTablet =
              parseInt(swiperElement.dataset.slidesTablet) || 2;
            const slidesMobile =
              parseInt(swiperElement.dataset.slidesMobile) || 1;
            const spaceDesktop =
              parseInt(swiperElement.dataset.spaceDesktop) || 32;
            const spaceTablet =
              parseInt(swiperElement.dataset.spaceTablet) || 15;
            const spaceMobile =
              parseInt(swiperElement.dataset.spaceMobile) || 70;

            // Build Swiper configuration
            const swiperConfig = {
              slidesPerView: slidesMobile,
              padding: 10,
              spaceBetween: spaceMobile,
              loop: loop,
              centeredSlides: centeredSlides,
              speed: speed,
              effect: "slide",
              breakpoints: {
                768: {
                  slidesPerView: slidesTablet,
                  spaceBetween: spaceTablet,
                  centeredSlides: centeredSlides,
                },
                1024: {
                  slidesPerView: slidesDesktop,
                  spaceBetween: spaceDesktop,
                  centeredSlides: centeredSlides,
                },
              },
            };

            // Add autoplay if enabled
            if (autoplay) {
              swiperConfig.autoplay = {
                delay: autoplayDelay,
                disableOnInteraction: false,
              };
            }

            // Add navigation if enabled
            if (navigation) {
              swiperConfig.navigation = {
                nextEl: ".reviews-next",
                prevEl: ".reviews-prev",
              };
            }

            // Add event handlers for gradient overlay
            swiperConfig.on = {
              init: function () {
                // Initialize gradient overlay for first slide
                const slides = this.slides;
                slides.forEach((slide, index) => {
                  const gradientOverlay =
                    slide.querySelector(".gradient-overlay");
                  if (gradientOverlay) {
                    if (index === this.activeIndex) {
                      gradientOverlay.style.opacity = "1";
                    } else {
                      gradientOverlay.style.opacity = "0";
                    }
                  }
                });
              },
              slideChange: function () {
                // Update gradient overlay visibility
                const slides = this.slides;
                slides.forEach((slide, index) => {
                  const gradientOverlay =
                    slide.querySelector(".gradient-overlay");
                  if (gradientOverlay) {
                    if (index === this.activeIndex) {
                      gradientOverlay.style.opacity = "1";
                    } else {
                      gradientOverlay.style.opacity = "0";
                    }
                  }
                });
              },
            };

            const reviewsSwiperInstance = new Swiper(
              swiperElement,
              swiperConfig,
            );

            // single card reviews swiper
            const singleCardReviewsSwiper = new Swiper(
              ".single-card-reviews-swiper",
              {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                centeredSlides: true,
                speed: 1100,
                allowTouchMove: false,

                autoplay: {
                  delay: 4000,
                  disableOnInteraction: true,
                },

                navigation: {
                  nextEl: ".single-card-reviews-next",
                  prevEl: ".single-card-reviews-prev",
                },
              },
            );

            // blog article swiper
            const blogArticleSwiper = new Swiper(".blog-article-swiper", {
              slidesPerView: 1,
              spaceBetween: 40,
              loop: true,
              effect: "slide",
              speed: 1000,
              autoplay: {
                delay: 4000,
                disableOnInteraction: false,
              },
              pagination: {
                el: ".pagination-bullets",
                clickable: true,
                type: "bullets",
              },
            });

            return {
              reviewsSwiperInstance,
              singleCardReviewsSwiper,
              blogArticleSwiper,
            };
          }

          initReviewsSwiper();
        }

        // Initialize Marquee for marquee testimonials
        const marqueeContainer = testimonialWrapper.find(
          ".cards-marquee-container",
        );
        if (marqueeContainer.length > 0) {
          /* =========================
           Marquee testimonials js 
          =========================== */
          function initMarquee() {
            const container = marqueeContainer[0];

            // Get dynamic settings from data attributes
            const speed = parseInt(container.dataset.speed) || 140000;
            const direction = container.dataset.direction || "left";
            const gap = container.dataset.gap || "32px";
            const pauseOnHover = container.dataset.pauseOnHover === "true";
            const smoothEdges = container.dataset.smoothEdges === "true";

            // Check if InfiniteMarquee is available
            if (typeof InfiniteMarquee !== "undefined") {
              new InfiniteMarquee({
                element: "#" + container.id,
                speed: speed,
                smoothEdges: smoothEdges,
                direction: direction,
                gap: gap,
                pauseOnHover: pauseOnHover,
                duplicateCount: 0,
              });
            } else {
              console.error(
                "InfiniteMarquee library is not loaded. Please include the InfiniteMarquee library.",
              );
            }
          }
          initMarquee();
        }
      }
    },

    Tab: function ($scope) {
      const tabWrapper = $scope.find(".nextsaas_tab_wrapper").eq(0);

      if (tabWrapper.length > 0) {
        // Check layout type
        const layout = tabWrapper.data("layout") || "layout_1";

        // Handle Layout 2
        if (layout === "layout_2") {
          Nextsaas.initTabLayout2($scope);
          return;
        }

        // Get mobile active styles from data attributes
        const mobileActiveColor =
          tabWrapper.data("mobile-active-color") || "#ffffff";
        const mobileActiveBg = tabWrapper.data("mobile-active-bg") || "#864ffe";
        const mobileActiveBorder =
          tabWrapper.data("mobile-active-border") || "#5a19be";
        const mobileActiveScale =
          tabWrapper.data("mobile-active-scale") || 1.05;

        const tabAnimation = {
          // Configuration
          config: {
            animation: {
              duration: 0.3,
              delay: 0.05,
              ease: "power2.out",
              y: 20,
            },
            mobile: {
              activeBg: mobileActiveBg,
              activeColor: mobileActiveColor,
              activeBorder: mobileActiveBorder,
              scale: mobileActiveScale,
            },
          },

          // State
          state: {
            currentIndex: 0,
            isInitialized: false,
          },

          // Cached elements
          elements: {
            tabBarBtns: null,
            tabContent: null,
            activeTabBar: null,
            mobileTabBtns: null,
          },

          init() {
            try {
              // Check if already initialized
              if (this.state.isInitialized) {
                return;
              }

              this.cacheElements();

              // Check if elements exist before proceeding
              if (!this.hasRequiredElements()) {
                return;
              }

              this.validateElements();
              this.setupEventListeners();
              this.initializeFirstTab();
              this.setupResizeHandler();
              this.state.isInitialized = true;
            } catch (error) {
              console.error("Tab animation initialization failed:", error);
            }
          },

          cacheElements() {
            this.elements = {
              tabBarBtns: tabWrapper.find(".tab-bar button"),
              tabContent: tabWrapper.find(".tab-content"),
              activeTabBar: tabWrapper.find(".active-tab-bar"),
              mobileTabBtns: tabWrapper.find(".tab-mobile button"),
            };

            // Elements cached successfully
          },

          hasRequiredElements() {
            const { tabBarBtns, mobileTabBtns, tabContent } = this.elements;

            // Check if we have at least one type of tab buttons and tab content
            const hasButtons =
              tabBarBtns.length > 0 || mobileTabBtns.length > 0;
            const hasContent = tabContent.length > 0;

            return hasButtons && hasContent;
          },

          validateElements() {
            const { tabBarBtns, mobileTabBtns } = this.elements;

            if (!tabBarBtns.length && !mobileTabBtns.length) {
              throw new Error("Tab elements not found");
            }
          },

          setupEventListeners() {
            this.setupDesktopTabs();
            this.setupMobileTabs();
          },

          setupDesktopTabs() {
            const { tabBarBtns } = this.elements;

            if (!tabBarBtns.length) return;

            this.setupAccessibility(tabBarBtns);

            tabBarBtns.each((index, btn) => {
              $(btn).on("click", (e) => {
                e.preventDefault();
                this.switchToTab(index);
              });

              $(btn).on("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  this.switchToTab(index);
                }
              });
            });
          },

          setupMobileTabs() {
            const { mobileTabBtns } = this.elements;

            if (!mobileTabBtns.length) return;

            this.setupAccessibility(mobileTabBtns, "mobile-tab");

            mobileTabBtns.each((index, btn) => {
              $(btn).on("click", (e) => {
                e.preventDefault();
                this.switchToMobileTab(index);
              });

              $(btn).on("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  this.switchToMobileTab(index);
                }
              });
            });
          },

          setupAccessibility(buttons, idPrefix = "tab") {
            buttons.each((index, btn) => {
              $(btn).attr("role", "tab");
              $(btn).attr("aria-controls", `${idPrefix}-${index}`);
              $(btn).attr("id", `${idPrefix}-${index}`);
            });
          },

          initializeFirstTab() {
            const { tabBarBtns, mobileTabBtns } = this.elements;

            // Find the active tab or default to first
            let activeIndex = 0;
            let foundActiveTab = false;

            // Check for pre-selected active tab
            if (tabBarBtns.length > 0) {
              tabBarBtns.each((index, btn) => {
                const $btn = $(btn);
                const dataState = $btn.attr("data-state") || $btn.data("state");

                if (dataState === "selected") {
                  activeIndex = index;
                  foundActiveTab = true;
                  return false; // break jQuery each loop
                }
              });
            } else if (mobileTabBtns.length > 0) {
              mobileTabBtns.each((index, btn) => {
                if ($(btn).hasClass("mobile-tab-active")) {
                  activeIndex = index;
                  foundActiveTab = true;
                  return false; // break jQuery each loop
                }
              });
            }

            // If no active tab was found, force the first tab to be active
            if (!foundActiveTab) {
              activeIndex = 0;
            }

            // Initialize desktop tabs
            if (tabBarBtns.length > 0) {
              this.updateButtonStates(tabBarBtns, activeIndex);

              // Initialize active tab bar without transition first
              const activeTabBarElement = this.elements.activeTabBar[0];
              if (activeTabBarElement) {
                // Temporarily disable transition for initial positioning
                const originalTransition = activeTabBarElement.style.transition;
                activeTabBarElement.style.transition = "none";

                // Set initial position
                this.updateActiveTabBar(tabBarBtns.eq(activeIndex)[0]);

                // Force a reflow
                activeTabBarElement.offsetHeight;

                // Re-enable transition for future updates
                setTimeout(() => {
                  activeTabBarElement.style.transition =
                    originalTransition ||
                    "left 0.3s ease-in-out, width 0.3s ease-in-out";
                }, 50);
              }

              this.switchTabContent(activeIndex, -1);
            }

            // Initialize mobile tabs
            if (mobileTabBtns.length > 0) {
              this.updateMobileButtonStates(mobileTabBtns, activeIndex);
              this.switchTabContent(activeIndex, -1);
            }

            this.state.currentIndex = activeIndex;
          },

          setupResizeHandler() {
            const { activeTabBar, tabBarBtns } = this.elements;

            if (!activeTabBar.length || !tabBarBtns.length) return;

            let resizeTimeout;
            const handleResize = () => {
              // Debounce resize events
              clearTimeout(resizeTimeout);
              resizeTimeout = setTimeout(() => {
                if (tabBarBtns.eq(this.state.currentIndex).length) {
                  this.updateActiveTabBar(
                    tabBarBtns.eq(this.state.currentIndex)[0],
                  );
                }
              }, 150);
            };

            $(window).on("resize", handleResize);
          },

          updateButtonStates(buttons, activeIndex) {
            buttons.each((index, btn) => {
              const $btn = $(btn);
              const isActive = index === activeIndex;

              // Set data-state attribute (this triggers Tailwind's data-[state=selected] styles)
              $btn.attr("data-state", isActive ? "selected" : "");

              // Set ARIA attributes for accessibility
              $btn.attr("aria-selected", isActive);
              $btn.attr("tabindex", isActive ? "0" : "-1");
            });
          },

          updateMobileButtonStates(buttons, activeIndex) {
            const { mobile } = this.config;

            buttons.each((index, btn) => {
              const $btn = $(btn);
              const isActive = index === activeIndex;

              if (isActive) {
                $btn.addClass("mobile-tab-active");
                // Use Object.assign approach like the working HTML version
                Object.assign(btn.style, {
                  backgroundColor: mobile.activeBg,
                  color: mobile.activeColor,
                  borderColor: mobile.activeBorder,
                  transform: `scale(${mobile.scale})`,
                });
              } else {
                $btn.removeClass("mobile-tab-active");
                Object.assign(btn.style, {
                  backgroundColor: "",
                  color: "",
                  borderColor: "",
                  transform: "",
                });
              }

              $btn.attr("aria-selected", isActive);
              $btn.attr("tabindex", isActive ? "0" : "-1");
            });
          },

          updateActiveTabBar(activeButton) {
            const { activeTabBar, tabBarBtns } = this.elements;

            if (!activeTabBar.length || !activeButton) return;

            // Get the tab bar container and first button
            const $tabBarContainer = tabWrapper.find(".tab-bar");
            const firstButton = tabBarBtns[0];

            const activeButtonRect = activeButton.getBoundingClientRect();
            const firstButtonRect = firstButton.getBoundingClientRect();
            const containerRect = $tabBarContainer[0].getBoundingClientRect();

            // Calculate the offset where centered tabs actually start
            const tabsStartOffset = firstButtonRect.left - containerRect.left;

            // Calculate position relative to the first button, then add the start offset
            const relativeToFirstButton =
              activeButtonRect.left - firstButtonRect.left;
            const left = tabsStartOffset + relativeToFirstButton;
            const width = activeButtonRect.width;

            // Force a layout reflow to ensure transition works
            const tabBarElement = activeTabBar[0];

            // Ensure the element has transition properties
            if (!tabBarElement.style.transition) {
              tabBarElement.style.transition =
                "left 0.3s ease-in-out, width 0.3s ease-in-out";
            }

            // Set positioning using inline styles for smooth transitions
            tabBarElement.style.left = `${left}px`;
            tabBarElement.style.width = `${width}px`;
          },

          switchTabContent(targetIndex, previousIndex) {
            const { tabContent } = this.elements;
            const { animation } = this.config;

            tabContent.each((index, content) => {
              const $content = $(content);

              if (targetIndex === index) {
                // Show active content
                $content.removeClass("hidden");
                $content.css("display", "block");
                $content.attr("aria-hidden", "false");

                // Use GSAP for animation if available
                if (
                  previousIndex !== targetIndex &&
                  typeof gsap !== "undefined"
                ) {
                  gsap.fromTo(
                    content,
                    {
                      opacity: 0,
                      y: animation.y,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      duration: animation.duration,
                      delay: animation.delay,
                      ease: animation.ease,
                    },
                  );
                } else {
                  // Fallback without animation
                  $content.css("opacity", "1");
                }
              } else {
                // Hide inactive content
                $content.addClass("hidden");
                $content.css("display", "none");
                $content.attr("aria-hidden", "true");
              }
            });
          },

          switchToTab(targetIndex) {
            const { tabBarBtns } = this.elements;

            if (targetIndex < 0 || targetIndex >= tabBarBtns.length) return;

            const previousIndex = this.state.currentIndex;
            this.state.currentIndex = targetIndex;

            this.updateButtonStates(tabBarBtns, targetIndex);

            // Add a tiny delay to ensure transition is visible
            requestAnimationFrame(() => {
              this.updateActiveTabBar(tabBarBtns.eq(targetIndex)[0]);
            });

            this.switchTabContent(targetIndex, previousIndex);
          },

          switchToMobileTab(targetIndex) {
            const { mobileTabBtns } = this.elements;

            if (targetIndex < 0 || targetIndex >= mobileTabBtns.length) return;

            const previousIndex = this.state.currentIndex;
            this.state.currentIndex = targetIndex;

            this.updateMobileButtonStates(mobileTabBtns, targetIndex);
            this.switchTabContent(targetIndex, previousIndex);
          },
        };

        // Initialize tab animation
        tabAnimation.init();
      }
    },

    initTabLayout2: function ($scope) {
      const root =
        $scope && $scope[0] && $scope[0].querySelectorAll
          ? $scope[0]
          : document;

      // Trigger reveal animation for an element
      const triggerRevealAnimation = (element) => {
        if (!element || typeof gsap === "undefined") return;

        gsap.killTweensOf(element);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "linear",
          },
        );
      };

      // Only select buttons, not content divs
      const tabButtons = root.querySelectorAll(
        "[data-tab-items-container] button[data-tab-content]",
      );
      const activeIndicator = root.querySelector("[data-active-tab-indicator]");
      const tabContents = root.querySelectorAll(
        "[data-tab-contents-container] [data-tab-content]",
      );
      const tabContainer = root.querySelector("[data-tab-items-container]");

      if (!tabButtons.length || !activeIndicator || !tabContents.length) {
        return;
      }

      // Initialize: Find the selected tab button
      let selectedButton = root.querySelector(
        "[data-tab-items-container] button[data-selected]",
      );
      if (!selectedButton && tabButtons.length > 0) {
        selectedButton = tabButtons[0];
        selectedButton.dataset.selected = "";
      }

      // Set initial position, width, and height of indicator
      const updateIndicator = (button) => {
        if (!tabContainer || !button) return;
        const containerRect = tabContainer.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const left = buttonRect.left - containerRect.left;
        const top = buttonRect.top - containerRect.top;
        const width = buttonRect.width;
        const height = buttonRect.height;
        activeIndicator.style.left = `${left}px`;
        activeIndicator.style.top = `${top}px`;
        activeIndicator.style.width = `${width}px`;
        activeIndicator.style.height = `${height}px`;
      };

      // Show the correct content
      const showContent = (contentName) => {
        tabContents.forEach((content) => {
          if (content.dataset.tabContent === contentName) {
            // Remove hidden class and add flex
            content.classList.remove("hidden");
            content.classList.add("flex");
            // Update accessibility attributes
            content.setAttribute("aria-hidden", "false");

            // Trigger reveal animation
            triggerRevealAnimation(content);
          } else {
            content.classList.add("hidden");
            content.classList.remove("flex");
            // Update accessibility attributes
            content.setAttribute("aria-hidden", "true");
          }
        });
      };

      // Update button states
      const updateButtonStates = (activeButton) => {
        tabButtons.forEach((button) => {
          if (button === activeButton) {
            button.dataset.selected = "";
            button.setAttribute("aria-selected", "true");
            button.setAttribute("tabindex", "0");
            button.classList.remove("text-secondary/60");
            button.classList.add("text-white");
          } else {
            delete button.dataset.selected;
            button.setAttribute("aria-selected", "false");
            button.setAttribute("tabindex", "-1");
            button.classList.remove("text-white");
            button.classList.add("text-secondary/60");
          }
        });
      };

      // Initialize on page load
      if (selectedButton) {
        const contentName = selectedButton.dataset.tabContent;
        updateIndicator(selectedButton);
        showContent(contentName);
        updateButtonStates(selectedButton);
      }

      // Add click handlers to all tab buttons
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const contentName = button.dataset.tabContent;

          // Update indicator position
          updateIndicator(button);

          // Show/hide content
          showContent(contentName);

          // Update button states
          updateButtonStates(button);
        });
      });

      // Handle window resize to recalculate indicator position
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const currentSelected = root.querySelector(
            "[data-tab-items-container] button[data-selected]",
          );
          if (currentSelected) {
            updateIndicator(currentSelected);
          }
        }, 150);
      });
    },

    ModalVideo: function ($scope) {
      const modalWrapper = $scope.find(".nextsaas_video_wrapper");

      if (modalWrapper.length > 0) {
        /* =========================
         Modal video animation js 
        =========================== */
        class ModalVideoAnimation {
          constructor() {
            this.modalAction = null;
            this.modalOverlay = null;
            this.modalCloseBtn = null;
            this.modalContent = null;
            this.isModalOpen = false;

            this.animationConfig = {
              open: {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              close: {
                opacity: 0,
                y: -50,
                duration: 0.2,
                ease: "power2.in",
              },
            };
          }

          init() {
            this.cacheElements();
            this.bindEvents();
          }

          cacheElements() {
            this.modalAction = modalWrapper.find(".modal-action")[0];
            this.modalOverlay = modalWrapper.find(".modal-overlay")[0];
            this.modalCloseBtn = modalWrapper.find(".modal-close-btn")[0];
            this.modalContent = modalWrapper.find(".modal-content")[0];
            this.videoEmbedContainer = modalWrapper.find(
              ".video-embed-container",
            )[0];
          }

          bindEvents() {
            if (this.modalAction) {
              this.modalAction.addEventListener("click", () =>
                this.openModal(),
              );
            }

            if (this.modalCloseBtn) {
              this.modalCloseBtn.addEventListener("click", () =>
                this.closeModal(),
              );
            }

            if (this.modalOverlay) {
              this.modalOverlay.addEventListener("click", (e) => {
                if (e.target === this.modalOverlay) {
                  this.closeModal();
                }
              });
            }

            document.addEventListener("keydown", (e) => {
              if (e.key === "Escape" && this.isModalOpen) {
                this.closeModal();
              }
            });
          }

          async closeModal() {
            if (!this.isModalOpen || !this.modalOverlay) return;

            this.isModalOpen = false;
            document.body.style.overflow = "auto";

            try {
              if (this.modalContent && typeof gsap !== "undefined") {
                await gsap.to(this.modalContent, {
                  ...this.animationConfig.close,
                  onComplete: () => {
                    this.modalOverlay.classList.remove("modal-open");
                    this.modalOverlay.classList.add("modal-close");
                    if (this.modalOverlay.close) {
                      this.modalOverlay.close();
                    }
                    this.clearVideoEmbed();
                  },
                });
              } else {
                this.modalOverlay.classList.remove("modal-open");
                this.modalOverlay.classList.add("modal-close");
                if (this.modalOverlay.close) {
                  this.modalOverlay.close();
                }
                this.clearVideoEmbed();
              }
            } catch (error) {
              console.error("Error closing modal:", error);
            }
          }

          openModal() {
            if (this.isModalOpen || !this.modalOverlay) return;

            this.isModalOpen = true;
            document.body.style.overflow = "hidden";

            this.modalOverlay.classList.remove("modal-close");
            this.modalOverlay.classList.add("modal-open");

            if (this.modalOverlay.showModal) {
              this.modalOverlay.showModal();
            }

            // Load video content if this is a video modal
            this.loadVideoContent();

            if (this.modalContent && typeof gsap !== "undefined") {
              // Set initial state for opening animation
              gsap.set(this.modalContent, {
                opacity: 0,
                y: -50,
              });

              gsap.to(this.modalContent, this.animationConfig.open);
            }
          }

          loadVideoContent() {
            if (!this.modalAction || !this.videoEmbedContainer) return;

            const videoUrl = this.modalAction.getAttribute("data-video-url");
            const videoTitle =
              this.modalAction.getAttribute("data-video-title") ||
              "Video Player";
            const aspectRatio =
              this.modalAction.getAttribute("data-aspect-ratio") || "16:9";
            const autoplay =
              this.modalAction.getAttribute("data-autoplay") === "true";
            const muted =
              this.modalAction.getAttribute("data-muted") === "true";
            const controls =
              this.modalAction.getAttribute("data-controls") === "true";
            const loop = this.modalAction.getAttribute("data-loop") === "true";

            if (!videoUrl) return;

            // Apply aspect ratio to modal content
            this.applyAspectRatio(aspectRatio);

            // Check if it's an embed URL (already processed by PHP) or direct video file
            const isEmbedUrl =
              videoUrl.includes("/embed/") ||
              videoUrl.includes("player.vimeo.com");

            if (isEmbedUrl) {
              // YouTube/Vimeo embed URL - already processed by PHP with all settings applied
              this.videoEmbedContainer.innerHTML = `
                <iframe 
                  src="${videoUrl}" 
                  title="${videoTitle}"
                  frameborder="0" 
                  allowfullscreen 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  class="w-full h-full max-[400px]:rounded-2xl rounded-[20px]">
                </iframe>
              `;
            } else {
              // Direct video file - apply JavaScript settings
              const videoAttributes = [];
              if (controls) videoAttributes.push("controls");
              if (autoplay) videoAttributes.push("autoplay");
              if (muted) videoAttributes.push("muted");
              if (loop) videoAttributes.push("loop");

              // Add playsinline for mobile compatibility
              videoAttributes.push("playsinline");

              // Determine video type from URL
              let videoType = "video/mp4";
              if (videoUrl.includes(".webm")) videoType = "video/webm";
              else if (videoUrl.includes(".ogg")) videoType = "video/ogg";
              else if (videoUrl.includes(".avi")) videoType = "video/avi";
              else if (videoUrl.includes(".mov")) videoType = "video/mov";
              else if (videoUrl.includes(".m4v")) videoType = "video/mp4";

              this.videoEmbedContainer.innerHTML = `
                <video 
                  ${videoAttributes.join(" ")}
                  class="w-full h-full object-contain max-[400px]:rounded-2xl rounded-[20px]">
                  <source src="${videoUrl}" type="${videoType}">
                  Your browser does not support the video tag.
                </video>
              `;
            }
          }

          applyAspectRatio(aspectRatio) {
            if (!this.modalContent) return;

            // Remove existing aspect ratio classes
            const aspectClasses = [
              "aspect-video",
              "aspect-square",
              "aspect-[4/3]",
              "aspect-[21/9]",
              "aspect-[9/16]",
            ];
            aspectClasses.forEach((cls) =>
              this.modalContent.classList.remove(cls),
            );

            // Add appropriate aspect ratio class
            switch (aspectRatio) {
              case "16:9":
                this.modalContent.classList.add("aspect-video");
                break;
              case "4:3":
                this.modalContent.classList.add("aspect-[4/3]");
                break;
              case "21:9":
                this.modalContent.classList.add("aspect-[21/9]");
                break;
              case "1:1":
                this.modalContent.classList.add("aspect-square");
                break;
              case "9:16":
                this.modalContent.classList.add("aspect-[9/16]");
                break;
              default:
                this.modalContent.classList.add("aspect-video");
            }
          }

          clearVideoEmbed() {
            if (this.videoEmbedContainer) {
              this.videoEmbedContainer.innerHTML = "";
            }
          }
        }

        // Initialize modal video animation
        const modalVideoAnimation = new ModalVideoAnimation();
        modalVideoAnimation.init();
      }
    },

    Counter: function ($scope) {
      const counterWrapper = $scope.find(".nextsaas_counter_wrapper").eq(0);

      if (counterWrapper.length > 0) {
        // Initialize number animations when DOM is loaded
        function initCounterAnimations() {
          // Create Intersection Observer for number animations
          const numberObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const element = entry.target;
                  const number = parseInt(element.getAttribute("data-number"));
                  const speed =
                    parseInt(element.getAttribute("data-speed")) || 800;
                  const interval =
                    parseInt(element.getAttribute("data-interval")) || 150;
                  const rooms =
                    parseInt(element.getAttribute("data-rooms")) || 2;
                  const dataSpace = element.getAttribute("data-height-space");

                  // Only animate if not already animated
                  if (!element.classList.contains("animated")) {
                    element.classList.add("animated");

                    // Check if NumberAnimation is available
                    if (typeof NumberAnimation !== "undefined") {
                      NumberAnimation(element, {
                        number: number,
                        speed: speed,
                        interval: interval,
                        rooms: rooms,
                        dataSpace: dataSpace, // Pass the data-space attribute
                        fontStyle: {
                          "font-size": "inherit",
                          color: "inherit",
                        },
                      });
                    } else {
                      console.error(
                        "NumberAnimation library is not loaded. Please include the NumberAnimation library.",
                      );
                      // Fallback: just show the final number
                      element.textContent = number;
                    }
                  }
                }
              });
            },
            {
              threshold: 0.5,
              rootMargin: "0px 0px -50px 0px",
            },
          );

          // Observe number elements within this widget
          const numberElements = counterWrapper.find("[data-counter]");
          numberElements.each(function () {
            numberObserver.observe(this);
          });
        }

        // Initialize counter animations
        initCounterAnimations();
      }
    },

    Nextsaas_Background: function ($scope) {
      var isEnableBackground = $scope.hasClass(
        "nextsaas-custom-background-yes",
      );

      $(".nextsaas-background-wrapper").each(function () {
        try {
          var elem = $(this).next(".nextsaas-custom-background-yes")[0];
          $(this).prependTo(elem);
        } catch (e) {}
      });
      if (isEnableBackground) {
        const heroLines = document.querySelectorAll("[data-hero-line]");
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

        const wrapper = $scope.find(".nextsaas-background-wrapper")[0];
        const paths = [
          "curve-path-1",
          "curve-path-2",
          "curve-path-3",
          "curve-path-4",
          "curve-path-5",
          "curve-path-6",
          "curve-path-7",
          "curve-path-8",
        ];
        if (wrapper) {
          const color1 =
            wrapper.getAttribute("data-gradient-color-1") || "#83E7EE";
          const color2 =
            wrapper.getAttribute("data-gradient-color-2") || "#F9EB57";

          function toHex(c) {
            if (!c || typeof c !== "string") return c;
            if (c.charAt(0) === "#") return c;
            const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (m) {
              const r = parseInt(m[1], 10);
              const g = parseInt(m[2], 10);
              const b = parseInt(m[3], 10);
              return (
                "#" +
                [r, g, b]
                  .map((n) => n.toString(16).padStart(2, "0"))
                  .join("")
              );
            }
            return c;
          }

          const c1 = toHex(color1);
          const c2 = toHex(color2);

          function interpolateColor(hex1, hex2, factor) {
            if (hex1.charAt(0) !== "#" || hex2.charAt(0) !== "#") {
              return hex1;
            }
            const r1 = parseInt(hex1.slice(1, 3), 16);
            const g1 = parseInt(hex1.slice(3, 5), 16);
            const b1 = parseInt(hex1.slice(5, 7), 16);
            const r2 = parseInt(hex2.slice(1, 3), 16);
            const g2 = parseInt(hex2.slice(3, 5), 16);
            const b2 = parseInt(hex2.slice(5, 7), 16);
            const r = Math.round(r1 + (r2 - r1) * factor);
            const g = Math.round(g1 + (g2 - g1) * factor);
            const b = Math.round(b1 + (b2 - b1) * factor);
            return `#${r.toString(16).padStart(2, "0")}${g
              .toString(16)
              .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          }

          paths.forEach((pathId, index) => {
            const path = wrapper.querySelector("#" + pathId);
            if (!path) return;
            const duration = gsap.utils.random(3, 6);
            const delay = gsap.utils.random(0, 2);
            const rectRow = index + 1;
            const fromTo =
              index % 2 === 0 ? [c1, c2] : [c2, c1];
            for (let i = 1; i <= 60; i++) {
              const rect = wrapper.querySelector(`#rect-${rectRow}-${i}`);
              if (rect) {
                const factor = (i - 1) / 59;
                const gradientColor = interpolateColor(
                  fromTo[0],
                  fromTo[1],
                  factor,
                );
                rect.setAttribute("fill", gradientColor);
                gsap.to(rect, {
                  motionPath: {
                    path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                  },
                  duration,
                  ease: "power1.inOut",
                  repeat: -1,
                  delay: delay + i * 2e-3,
                });
              }
            }
          });
        }
      }
    },

    BorderGlowAnimation: function ($scope) {
      if (!$scope || !$scope.length) {
        return;
      }
      // $scope is the container element. Both classes live on the same node (not parent/child).
      if (!$scope.hasClass("nextsaas-custom-border-glow-animation-yes")) {
        return;
      }
      var $container = $scope;
      if ($container.children(".ai-kw-generator-border-animation").length) {
        return;
      }
      $container.prepend(
        '<div class="ai-kw-generator-border-animation size-[40px]" aria-hidden="true"></div>',
      );
    },

    GlowingCard: function ($scope) {
      // Elementor passes the container wrapper as $scope.
      const root = $scope && $scope[0] ? $scope[0] : null;
      if (!root) return;

      // Look for either class (prefix_class or before_render added class)
      // Check if root itself has the class, or find it within root
      let container = null;
      if (
        root.matches &&
        root.matches(
          ".nextsaas-custom-glowing-card-yes, .has-nextsaas-glowing-card",
        )
      ) {
        container = root;
      } else {
        container = root.querySelector(
          ".nextsaas-custom-glowing-card-yes, .has-nextsaas-glowing-card",
        );
      }

      // Also check for .e-con element inside if container is a wrapper
      if (!container) {
        const eCon = root.querySelector(".e-con");
        if (
          eCon &&
          (eCon.matches(
            ".nextsaas-custom-glowing-card-yes, .has-nextsaas-glowing-card",
          ) ||
            eCon.classList.contains("nextsaas-custom-glowing-card-yes") ||
            eCon.classList.contains("has-nextsaas-glowing-card"))
        ) {
          container = eCon;
        }
      }

      if (!container) {
        return;
      }

      // Avoid binding multiple times
      if (container.dataset.glowBound) return;
      container.dataset.glowBound = "true";

      let isMouseInside = false;
      let rafId = null;

      const updatePosition = (event, setOpacity = true) => {
        // Cancel any pending animation frame
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          // Get container's bounding rect relative to viewport
          const rect = container.getBoundingClientRect();

          // Calculate mouse position relative to container
          // event.clientX/Y are viewport coordinates
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          // Ensure values are within container bounds (optional, but helps with edge cases)
          const clampedX = Math.max(0, Math.min(x, rect.width));
          const clampedY = Math.max(0, Math.min(y, rect.height));

          // Set CSS variables on the container element
          // Always set position first
          container.style.setProperty("--xPos", `${clampedX}px`);
          container.style.setProperty("--yPos", `${clampedY}px`);

          // Only set opacity if requested (for smooth entry)
          if (setOpacity) {
            container.style.setProperty("--glowOpacity", "1");
          }
        });
      };

      // Handle mouse enter - glow appears smoothly at entry point
      container.addEventListener("mouseenter", (event) => {
        isMouseInside = true;

        // First, set position WITHOUT opacity (position is set instantly, no transition)
        updatePosition(event, false);

        // Then, in the next frame, set opacity to trigger smooth fade-in at the correct position
        requestAnimationFrame(() => {
          container.style.setProperty("--glowOpacity", "1");
        });
      });

      // Handle mouse move - glow follows mouse
      container.addEventListener("mousemove", (event) => {
        if (!isMouseInside) return;
        updatePosition(event);
      });

      // Handle mouse leave - fade out glow but keep last position
      container.addEventListener("mouseleave", () => {
        isMouseInside = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        // Fade out but keep the last position (CSS transition handles the fade)
        container.style.setProperty("--glowOpacity", "0");
      });
    },

    HeadingTextShuffle: function ($scope) {
      const root = $scope && $scope[0] ? $scope[0] : document;
      const elements = root.querySelectorAll(
        ".nextsaas-heading-shuffle-enabled",
      );
      if (!elements.length) return;

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const duration = 2000;

      elements.forEach((element) => {
        if (element.dataset.shuffleBound) return;
        element.dataset.shuffleBound = "true";

        const spanElement = element.querySelector("span");
        const textNode = spanElement || element;
        const originalText = (textNode.textContent || "").trim();
        if (!originalText.length) return;

        let startTime = null;

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const revealed = Math.floor(progress * originalText.length);

          const animatedText = originalText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              return i < revealed
                ? originalText[i]
                : chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          textNode.textContent = animatedText;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            textNode.textContent = originalText;
          }
        };

        const shuffle = () => {
          startTime = null;
          requestAnimationFrame(animate);
        };

        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.create({
            trigger: element,
            start: "top 100%",
            onEnter: shuffle,
            once: true,
          });
        } else if ("IntersectionObserver" in window) {
          const io = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  shuffle();
                  io.disconnect();
                }
              });
            },
            { threshold: 0.2 },
          );
          io.observe(element);
        } else {
          shuffle();
        }
      });
    },

    ParallaxEffect: function ($scope) {
      const scene = $scope[0].querySelector(".nextsaas-parallax-wrapper");
      if (!scene) return;

      initializeParallaxEffect(scene);

      function initializeParallaxEffect(scene) {
        freezeParallaxElements(scene);
        if (document.readyState === "complete") {
          startParallaxAfterLoad(scene);
        } else {
          window.addEventListener("load", () => startParallaxAfterLoad(scene));
        }
      }

      function freezeParallaxElements(scene) {
        const parallaxElements = scene.querySelectorAll(".parallax-effect");
        parallaxElements.forEach((element) => {
          element.style.willChange = "transform";
          element.style.transform = "translate3d(0px, 0px, 0)";
          element.style.transition = "none";
          element.classList.add("parallax-frozen");
        });
      }

      function startParallaxAfterLoad(scene) {
        waitForImagesToLoad(scene, () => {
          setTimeout(() => {
            unfreezeAndStartParallax(scene);
          }, 300);
        });
      }

      function unfreezeAndStartParallax(scene) {
        const parallaxElements = scene.querySelectorAll(".parallax-effect");
        parallaxElements.forEach((element) => {
          element.classList.remove("parallax-frozen");
          element.style.transition = "transform 0.3s ease-out";
        });
        setupParallaxAnimation(scene);
      }

      function waitForImagesToLoad(scene, onComplete) {
        const parallaxImages = scene.querySelectorAll(".parallax-effect img");
        if (parallaxImages.length === 0) {
          onComplete();
          return;
        }
        let loadedCount = 0;
        const totalImages = parallaxImages.length;
        const checkCompletion = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            onComplete();
          }
        };
        parallaxImages.forEach((img) => {
          if (img.complete) {
            checkCompletion();
          } else {
            img.addEventListener("load", checkCompletion);
            img.addEventListener("error", checkCompletion);
          }
        });
      }

      function setupParallaxAnimation(scene) {
        const parallaxElements = scene.querySelectorAll(".parallax-effect");
        const elementConfigs = createElementConfigs(parallaxElements);

        let isAnimating = false;
        let mouseX = scene.offsetWidth / 2;
        let mouseY = scene.offsetHeight / 2;

        initializeElements(elementConfigs);
        updateParallaxPositions(elementConfigs, mouseX, mouseY, scene);

        const throttledMouseHandler = createThrottledHandler((event) => {
          mouseX = event.pageX;
          mouseY = event.pageY;
          if (!isAnimating) {
            requestAnimationFrame(() => {
              updateParallaxPositions(elementConfigs, mouseX, mouseY, scene);
              isAnimating = false;
            });
            isAnimating = true;
          }
        });

        scene.addEventListener("mousemove", throttledMouseHandler, {
          passive: true,
        });

        // Optional: Mobile device orientation support
        if (window.DeviceOrientationEvent) {
          window.addEventListener("deviceorientation", (event) => {
            const tiltX = (event.gamma || 0) / 45; // -45 to 45
            const tiltY = (event.beta || 0) / 45; // -45 to 45
            updateParallaxPositions(
              elementConfigs,
              tiltX * scene.offsetWidth,
              tiltY * scene.offsetHeight,
              scene,
            );
          });
        }

        setupPerformanceOptimization(scene, elementConfigs);
      }

      function createElementConfigs(elements) {
        return Array.from(elements).map((element) => ({
          element,
          depth: parseFloat(element.getAttribute("data-parallax-value")) || 1,
          directionX:
            parseFloat(element.getAttribute("data-data-parallax-x")) || 1,
          directionY:
            parseFloat(element.getAttribute("data-data-parallax-y")) || 1,
          // movementScale:
          //   parseFloat(element.getAttribute("data-movement-scale")) || 25,
          movementScale: 25,
        }));
      }

      function initializeElements(elementConfigs) {
        elementConfigs.forEach(({ element }) => {
          element.style.willChange = "transform";
          element.style.transform = "translateZ(0)";
        });
      }

      function updateParallaxPositions(elementConfigs, mouseX, mouseY, scene) {
        const centerX = scene.offsetWidth / 2;
        const centerY = scene.offsetHeight / 2;
        const relativeX = (mouseX - centerX) / centerX;
        const relativeY = (mouseY - centerY) / centerY;
        elementConfigs.forEach(
          ({ element, depth, directionX, directionY, movementScale }) => {
            if (!element.classList.contains("parallax-frozen")) {
              const moveX = relativeX * depth * directionX * movementScale;
              const moveY = relativeY * depth * directionY * movementScale;
              element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
          },
        );
      }

      function createThrottledHandler(handler) {
        let timeoutId = null;
        return (event) => {
          if (timeoutId) return;
          timeoutId = setTimeout(() => {
            handler(event);
            timeoutId = null;
          }, 16);
        };
      }

      function setupPerformanceOptimization(scene, elementConfigs) {
        let resetTimeout;
        scene.addEventListener("mouseleave", () => {
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            elementConfigs.forEach(({ element }) => {
              element.style.willChange = "auto";
            });
          }, 1000);
        });
      }
    },

    Progressbar: function ($scope) {
      const progressWrapper = $scope
        .find(".nextsaas_progressbar_wrapper")
        .eq(0);

      if (progressWrapper.length > 0) {
        /* =========================
         Progress Bar Animation js 
        =========================== */
        const progressAnimation = {
          init() {
            const items = progressWrapper.find("[data-progress-item]");

            items.each((index, item) => {
              const $item = $(item);
              const value =
                parseInt($item.attr("data-progress-value"), 10) || 0;
              const bar = $item.find("[data-progress-bar]")[0];
              const text = $item.find("[data-progress-text]")[0];
              const duration =
                parseFloat($item.attr("data-progress-duration")) || 1.5;
              const animationDelay =
                parseFloat($item.attr("data-animation-delay")) || 0.3;

              if (!bar) return;

              // Check if GSAP is available
              if (typeof gsap !== "undefined") {
                // Animate progress bar
                gsap.set(bar, { width: "0%", opacity: 0.8 });
                gsap.to(bar, {
                  width: `${value}%`,
                  opacity: 1,
                  duration: duration,
                  delay: animationDelay,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "bottom 15%",
                    scrub: false,
                    once: true,
                  },
                });

                // Animate text appearance if text element exists
                if (text) {
                  gsap.set(text, { opacity: 0 });
                  gsap.to(text, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: animationDelay,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 90%",
                      end: "bottom 15%",
                      scrub: false,
                      once: true,
                    },
                  });

                  // Animate counter
                  const counter = { val: 0 };
                  gsap.to(counter, {
                    val: value,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 90%",
                      end: "bottom 15%",
                      scrub: false,
                      once: true,
                    },
                    onUpdate: () => {
                      text.textContent = `${Math.floor(counter.val)}%`;
                    },
                  });
                }
              } else {
                // Fallback without GSAP - use Intersection Observer
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        // Simple CSS animation fallback
                        setTimeout(() => {
                          bar.style.width = `${value}%`;
                          bar.style.transition = `width ${duration}s ease-out`;

                          if (text) {
                            text.style.opacity = "1";
                            text.textContent = `${value}%`;
                            text.style.transition = "opacity 0.8s ease-out";
                          }
                        }, animationDelay * 1000);

                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  {
                    threshold: 0.5,
                    rootMargin: "0px 0px -50px 0px",
                  },
                );

                observer.observe(item);
              }
            });
          },
        };

        // Initialize progress bar animation
        progressAnimation.init();
      }
    },

    Steps: function ($scope) {
      const stepsWrapper = $scope.find(".nextsaas-steps-wrapper").eq(0);

      if (stepsWrapper.length > 0) {
        /* =========================
         Steps Progress Animation js (based on main.js commonAnimation)
        =========================== */
        const stepsContainer = stepsWrapper.find(
          ".nextsaas-steps-container",
        )[0];
        const progressLines = stepsWrapper.find(".nextsaas-progress-line");

        if (progressLines.length > 0 && stepsContainer) {
          // Set initial width to 0% (like main.js)
          if (typeof gsap !== "undefined") {
            gsap.set(progressLines, {
              width: "0%",
            });

            // Create timeline with ScrollTrigger (like main.js)
            const progressTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: stepsContainer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            });

            // Animate each progress line (like main.js)
            progressLines.each((index, line) => {
              progressTimeline.to(
                line,
                {
                  width: "100%",
                  duration: 2,
                  ease: "power2.inOut",
                },
                index * 2,
                // Each animation starts after the previous one completes (2 seconds duration)
              );
            });
          } else {
            // Fallback without GSAP - use Intersection Observer
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    progressLines.each((index, line) => {
                      setTimeout(() => {
                        $(line).css({
                          width: "0%",
                          transition: "width 2s ease-in-out",
                        });

                        setTimeout(() => {
                          $(line).css("width", "100%");
                        }, 50);
                      }, index * 2000); // Stagger like GSAP version
                    });

                    observer.unobserve(entry.target);
                  }
                });
              },
              {
                threshold: 0.3,
                rootMargin: "0px 0px -50px 0px",
              },
            );

            observer.observe(stepsContainer);
          }
        }
      }
    },

    TextReveal: function ($scope) {
      var TextRevealWrapper = $scope
        .find(".nextsaas_text_reveal_wrapper")
        .eq(0);
      const splitTextTeamTitle = document.querySelector(
        ".split-text-team-title",
      );
      gsap.registerPlugin(SplitText);
      let split = SplitText.create(".split-text-team-title", { type: "words" });
      gsap.from(split.words, {
        scrollTrigger: {
          trigger: splitTextTeamTitle,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0.1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    },

    HeroSlide: function ($scope) {
      const heroSlideWrapper = $scope
        .find(".nextsaas-hero-slide-wrapper")
        .eq(0);

      if (heroSlideWrapper.length > 0) {
        /* =========================
         Hero Slide Scroll Expand Effect js 
        =========================== */
        const initHeroSlideExpand = () => {
          const scrollExpand = heroSlideWrapper.find(".scroll-expand")[0];
          if (!scrollExpand) return;

          // Get all settings from data attributes
          const container = heroSlideWrapper.find(".hero-slides-container")[0];
          if (!container) return;

          const expandInitialWidth =
            parseInt(container.getAttribute("data-expand-initial-width")) ||
            500;
          const expandMaxWidth =
            parseInt(container.getAttribute("data-expand-max-width")) || 950;
          const slidesGap =
            parseInt(container.getAttribute("data-slides-gap")) || 16;
          const slideMaxHeight =
            parseInt(container.getAttribute("data-slide-max-height")) || 380;
          const slideMinWidth =
            parseInt(container.getAttribute("data-slide-min-width")) || 257;

          // Apply gap setting to container
          if (typeof gsap !== "undefined") {
            gsap.set(container, {
              gap: slidesGap + "px",
            });
          } else {
            container.style.gap = slidesGap + "px";
          }

          // Apply height and width settings to all slide items
          const allSlides = heroSlideWrapper.find(".hero-slide-item");
          allSlides.each((index, slide) => {
            if (typeof gsap !== "undefined") {
              gsap.set(slide, {
                maxHeight: slideMaxHeight + "px",
              });
            } else {
              slide.style.maxHeight = slideMaxHeight + "px";
            }

            // Apply min width to non-expandable slides
            if (!slide.classList.contains("scroll-expand")) {
              if (typeof gsap !== "undefined") {
                gsap.set(slide, {
                  minWidth: slideMinWidth + "px",
                });
              } else {
                slide.style.minWidth = slideMinWidth + "px";
              }
            }
          });

          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            if (typeof gsap !== "undefined") {
              gsap.set(scrollExpand, {
                minWidth: "auto",
              });
            } else {
              scrollExpand.style.minWidth = "auto";
            }
          } else {
            // Set initial width from controller settings
            if (typeof gsap !== "undefined") {
              gsap.set(scrollExpand, {
                minWidth: expandInitialWidth + "px",
              });

              ScrollTrigger.create({
                trigger: scrollExpand,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => {
                  gsap.to(scrollExpand, {
                    minWidth: expandMaxWidth + "px",
                    duration: 0.5,
                    ease: "power2.out",
                  });
                },
                onEnterBack: () => {
                  gsap.to(scrollExpand, {
                    minWidth: expandMaxWidth + "px",
                    duration: 0.5,
                    ease: "power2.out",
                  });
                },
                onLeaveBack: () => {
                  gsap.to(scrollExpand, {
                    minWidth: expandInitialWidth + "px",
                    duration: 0.5,
                    ease: "power2.out",
                  });
                },
              });
            }
          }
        };

        // Initialize hero slide expand effect
        initHeroSlideExpand();

        // Re-initialize on window resize
        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
            initHeroSlideExpand();
          }, 150);
        };

        $(window).on("resize", handleResize);
      }
    },

    TestimonialSlider: function ($scope) {
      const testimonialSliderWrapper = $scope
        .find(".nextsaas_testimonial_slider_wrapper")
        .eq(0);

      if (testimonialSliderWrapper.length) {
        // Check if this is layout-2
        if (
          testimonialSliderWrapper.hasClass(
            "nextsaas_testimonial_slider_layout2",
          )
        ) {
          Nextsaas.TestimonialSliderLayout2($scope);
          return;
        }

        // Check if this is layout-3
        if (
          testimonialSliderWrapper.hasClass(
            "nextsaas_testimonial_slider_layout3",
          )
        ) {
          Nextsaas.TestimonialSliderLayout3($scope);
          return;
        }

        // Check if this is layout-4
        if (
          testimonialSliderWrapper.hasClass(
            "nextsaas_testimonial_slider_layout4",
          )
        ) {
          Nextsaas.TestimonialSliderLayout4($scope);
          return;
        }

        // Check if this is layout-5
        if (
          testimonialSliderWrapper.hasClass(
            "nextsaas_testimonial_slider_layout5",
          )
        ) {
          Nextsaas.TestimonialSliderLayout5($scope);
          return;
        }

        // Get the swiper element within this specific widget scope (Layout-1)
        const swiperElement = testimonialSliderWrapper.find(
          ".reviews-fade-in-swiper",
        )[0];

        if (!swiperElement) {
          return;
        }

        // Destroy existing swiper instance if it exists
        if (swiperElement.swiper) {
          swiperElement.swiper.destroy(true, true);
        }

        // Read dynamic settings from data attributes
        const autoplay = swiperElement.getAttribute("data-autoplay") === "true";
        const autoplayDelay =
          parseInt(swiperElement.getAttribute("data-autoplay-delay")) || 3500;
        const pauseOnHover =
          swiperElement.getAttribute("data-pause-on-hover") === "true";
        const speed =
          parseInt(swiperElement.getAttribute("data-speed")) || 1000;
        const loop = swiperElement.getAttribute("data-loop") === "true";

        // Build Swiper configuration with dynamic settings
        const swiperConfig = {
          slidesPerView: 1,
          spaceBetween: 70,
          loop: loop,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          speed: speed,
        };

        // Add autoplay if enabled
        if (autoplay) {
          swiperConfig.autoplay = {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: pauseOnHover,
          };
        } else {
          // Ensure autoplay is completely disabled
          swiperConfig.autoplay = false;
        }

        // Add navigation (scoped to this widget)
        const nextButton = testimonialSliderWrapper.find(
          ".reviews-fade-in-next",
        )[0];
        const prevButton = testimonialSliderWrapper.find(
          ".reviews-fade-in-prev",
        )[0];

        if (nextButton && prevButton) {
          swiperConfig.navigation = {
            nextEl: nextButton,
            prevEl: prevButton,
          };
        }

        // Add pagination (scoped to this widget)
        const paginationElement = testimonialSliderWrapper.find(
          ".reviews-fade-in-pagination",
        )[0];
        if (paginationElement) {
          swiperConfig.pagination = {
            el: paginationElement,
            clickable: true,
            dynamicBullets: true,
          };
        }

        // Add event handlers for animations
        swiperConfig.on = {
          init: function () {
            // Generate unique class for this widget instance
            const uniqueClass =
              "testimonial-slider-" + Math.random().toString(36).substr(2, 9);
            testimonialSliderWrapper.addClass(uniqueClass);

            // Remove any existing styles for this widget
            const existingStyle = document.querySelector(
              `style[data-testimonial-slider="${uniqueClass}"]`,
            );
            if (existingStyle) {
              existingStyle.remove();
            }

            const style = document.createElement("style");
            style.setAttribute("data-testimonial-slider", uniqueClass);
            style.textContent = `
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide {
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out;
                    opacity: 0;
                    transform: scale(0.6);
                    filter: blur(7px);
                  }
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-active {
                    opacity: 1;
                    transform: scale(1);
                    filter: blur(0);
                  }
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-prev,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-next {
                    opacity: 0;
                    transform: scale(0.6);
                    filter: blur(7px);
                  }
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide .review-text,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide .review-name,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide .review-title,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide .avatar-ring {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
                  }
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-active .review-text,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-active .review-name,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-active .review-title,
                  .${uniqueClass} .reviews-fade-in-swiper .swiper-slide-active .avatar-ring {
                    opacity: 1;
                    transform: translateY(0);
                  }
                `;
            document.head.appendChild(style);
          },
          slideChangeTransitionStart: function () {
            // Clear all animations and reset content immediately
            const slides = this.slides;
            slides.forEach((slide) => {
              const elements = slide.querySelectorAll(
                ".review-text, .review-name, .review-title, .avatar-ring",
              );
              elements.forEach((el) => {
                el.style.animation = "none";
                el.style.transition = "none";
                el.style.opacity = "0";
                el.style.transform = "translateY(30px)";
              });
            });
          },
          slideChangeTransitionEnd: function () {
            // Animate content after slide transition is complete
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              const elements = activeSlide.querySelectorAll(
                ".review-text, .review-name, .review-title, .avatar-ring",
              );

              // Reset transition property
              elements.forEach((el) => {
                el.style.transition =
                  "opacity 0.4s ease-out, transform 0.4s ease-out";
              });

              // Stagger the animations
              elements.forEach((el, index) => {
                setTimeout(() => {
                  el.style.opacity = "1";
                  el.style.transform = "translateY(0)";
                }, index * 100);
              });
            }
          },
        };

        // Initialize the swiper with the specific element
        const reviewsFadeInSwiper = new Swiper(swiperElement, swiperConfig);

        // Store swiper instance on the element for later cleanup
        swiperElement.swiperInstance = reviewsFadeInSwiper;
      }
    },

    TestimonialSliderLayout2: function ($scope) {
      if (typeof gsap === "undefined") {
        return;
      }

      const testimonialSliderWrapper = $scope
        .find(".nextsaas_testimonial_slider_layout2")
        .eq(0);

      if (testimonialSliderWrapper.length) {
        const testimonialElement =
          testimonialSliderWrapper.find("#testimonial")[0];

        if (!testimonialElement) {
          return;
        }

        // Get testimonials data from script tag
        const widgetId = testimonialElement.getAttribute("data-widget-id");
        let testimonials = [];

        if (widgetId) {
          const dataScript = document.getElementById(widgetId + "_data");
          if (dataScript) {
            try {
              const scriptContent =
                dataScript.textContent || dataScript.innerHTML;
              testimonials = JSON.parse(scriptContent) || [];
            } catch (error) {
              return;
            }
          } else {
            return;
          }
        } else {
          return;
        }

        if (testimonials.length === 0) {
          return;
        }

        // Initialize slider animation
        let currentIndex = 0;

        const avatarImgs = testimonialSliderWrapper.find(".testimonial-avatar");
        const quoteEl = testimonialSliderWrapper.find(
          "#testimonial-quote h3",
        )[0];
        const nameEl = testimonialSliderWrapper.find("#testimonial-info h4")[0];
        const positionEl = testimonialSliderWrapper.find(
          "#testimonial-info p",
        )[0];

        // Guard clause to avoid running if elements are missing
        if (avatarImgs.length === 0 || !quoteEl || !nameEl || !positionEl) {
          return;
        }

        const displayCount = avatarImgs.length;
        const centerOffset = Math.floor(displayCount / 2);

        function updateAvatarImages() {
          for (let i = 0; i < displayCount; i++) {
            const avatarIndex =
              (currentIndex + i - centerOffset + testimonials.length) %
              testimonials.length;
            const testimonial = testimonials[avatarIndex];
            const imgEl = avatarImgs[i];

            if (!imgEl) continue;

            // Update image src and alt
            imgEl.src = testimonial.image;
            imgEl.alt = `${testimonial.name}'s avatar`;

            // Animate image with GSAP
            gsap.fromTo(
              imgEl,
              {
                opacity: 1,
                scale: 1.1,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: i * 0.05,
                ease: "power2.out",
              },
            );
          }
        }

        function updateTextContent() {
          const t = testimonials[currentIndex];

          if (quoteEl) {
            gsap.to(quoteEl, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              onComplete: () => {
                quoteEl.textContent = `"${t.quote}"`;
                gsap.to(quoteEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }

          if (nameEl) {
            gsap.to(nameEl, {
              opacity: 0,
              y: 5,
              duration: 0.2,
              onComplete: () => {
                nameEl.textContent = t.name;
                gsap.to(nameEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }

          if (positionEl) {
            gsap.to(positionEl, {
              opacity: 0,
              y: 5,
              duration: 0.2,
              onComplete: () => {
                positionEl.textContent = t.position;
                gsap.to(positionEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }
        }

        function updateTestimonial() {
          updateAvatarImages();
          updateTextContent();
        }

        updateTestimonial();

        setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          updateTestimonial();
        }, 3000);
      }
    },

    TestimonialSliderLayout3: function ($scope) {
      const testimonialSliderWrapper = $scope
        .find(".nextsaas_testimonial_slider_layout3")
        .eq(0);

      if (testimonialSliderWrapper.length) {
        // Get the swiper element within this specific widget scope
        const swiperElement = testimonialSliderWrapper.find(
          ".single-card-reviews-swiper",
        )[0];

        if (!swiperElement) {
          return;
        }

        // Destroy existing swiper instance if it exists
        if (swiperElement.swiper) {
          swiperElement.swiper.destroy(true, true);
        }

        // Read dynamic settings from data attributes
        const autoplay = swiperElement.getAttribute("data-autoplay") === "true";
        const autoplayDelay =
          parseInt(swiperElement.getAttribute("data-autoplay-delay")) || 3500;
        const pauseOnHover =
          swiperElement.getAttribute("data-pause-on-hover") === "true";
        const speed =
          parseInt(swiperElement.getAttribute("data-speed")) || 1000;
        const loop = swiperElement.getAttribute("data-loop") === "true";

        // Build Swiper configuration with dynamic settings
        const swiperConfig = {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: loop,
          centeredSlides: true,
          speed: speed,
          allowTouchMove: true,
          navigation: {
            nextEl: testimonialSliderWrapper.find(
              ".single-card-reviews-next",
            )[0],
            prevEl: testimonialSliderWrapper.find(
              ".single-card-reviews-prev",
            )[0],
          },
        };

        // Add autoplay if enabled
        if (autoplay) {
          swiperConfig.autoplay = {
            delay: autoplayDelay,
            disableOnInteraction: pauseOnHover,
          };
        }

        // Initialize Swiper
        const swiperInstance = new Swiper(swiperElement, swiperConfig);
      }
    },

    TestimonialSliderLayout4: function ($scope) {
      const testimonialSliderWrapper = $scope
        .find(".nextsaas_testimonial_slider_layout4")
        .eq(0);

      if (testimonialSliderWrapper.length) {
        // Get the swiper element within this specific widget scope
        const swiperElement = testimonialSliderWrapper.find(
          ".financial-management-platform-swiper",
        )[0];

        if (!swiperElement) {
          return;
        }

        // Destroy existing swiper instance if it exists
        if (swiperElement.swiper) {
          swiperElement.swiper.destroy(true, true);
        }

        // Read dynamic settings from data attributes
        const autoplay = swiperElement.getAttribute("data-autoplay") === "true";
        const autoplayDelay =
          parseInt(swiperElement.getAttribute("data-autoplay-delay")) || 2500;
        const speed =
          parseInt(swiperElement.getAttribute("data-speed")) || 1100;
        const loop = swiperElement.getAttribute("data-loop") === "true";

        // Build Swiper configuration
        const swiperConfig = {
          breakpoints: {
            425: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1290: {
              slidesPerView: 4,
            },
          },
          spaceBetween: 4,
          initialSlide: 4,
          loop: loop,
          speed: speed,
          allowTouchMove: true,
        };

        // Add autoplay if enabled
        if (autoplay) {
          swiperConfig.autoplay = {
            delay: autoplayDelay,
            disableOnInteraction: false,
          };
        }

        // Add pagination
        const paginationElement = testimonialSliderWrapper.find(
          ".financial-management-platform-pagination",
        )[0];
        if (paginationElement) {
          swiperConfig.pagination = {
            el: paginationElement,
            clickable: true,
          };
        }

        // Add event handlers for blur effect
        swiperConfig.on = {
          init: function () {
            const slides = this.slides;
            const activeIndex = this.activeIndex;
            const slidesPerView = 4;

            slides.forEach((slide, index) => {
              slide.style.transition =
                "opacity 0.6s ease-out, filter 0.6s ease-out";

              let offset = index - activeIndex;
              if (offset < 0) offset += slides.length;

              if (offset >= 0 && offset < slidesPerView) {
                slide.style.opacity = "1";
                slide.style.filter = "blur(0px)";
              } else {
                slide.style.opacity = "0.3";
                slide.style.filter = "blur(30px)";
              }
            });
          },
          slideChangeTransitionStart: function () {
            const slides = this.slides;
            const activeIndex = this.activeIndex;
            const slidesPerView = 4;

            slides.forEach((slide, index) => {
              slide.style.transition =
                "opacity 0.6s ease-out, filter 0.6s ease-out";

              let offset = index - activeIndex;
              if (offset < 0) offset += slides.length;

              if (offset >= 0 && offset < slidesPerView) {
                slide.style.opacity = "1";
                slide.style.filter = "blur(0px)";
              } else {
                slide.style.opacity = "0.3";
                slide.style.filter = "blur(30px)";
              }
            });
          },
        };

        // Initialize Swiper
        const swiperInstance = new Swiper(swiperElement, swiperConfig);
      }
    },

    TestimonialSliderLayout5: function ($scope) {
      const testimonialSliderWrapper = $scope
        .find(".nextsaas_testimonial_slider_layout5")
        .eq(0);

      if (!testimonialSliderWrapper.length) {
        return;
      }

      const swiperElement = testimonialSliderWrapper.find(
        ".ai-kw-generator-testimonial-swiper",
      )[0];

      if (!swiperElement) {
        return;
      }

      // Destroy existing swiper instance for this element if it exists
      if (swiperElement.swiper) {
        swiperElement.swiper.destroy(true, true);
      }

      const nextButton = testimonialSliderWrapper.find(
        ".ai-kw-generator-testimonial-next",
      )[0];
      const prevButton = testimonialSliderWrapper.find(
        ".ai-kw-generator-testimonial-prev",
      )[0];

      // Read dynamic settings from data attributes
      const autoplay =
        swiperElement.getAttribute("data-autoplay") === "true";
      const autoplayDelay =
        parseInt(swiperElement.getAttribute("data-autoplay-delay")) || 3000;
      const pauseOnHover =
        swiperElement.getAttribute("data-pause-on-hover") === "true";
      const speed =
        parseInt(swiperElement.getAttribute("data-speed")) || 1400;
      const loop = swiperElement.getAttribute("data-loop") === "true";
      console.log(loop);

      const swiperConfig = {
        initialSlide: 3,
        centeredSlides: true,
        spaceBetween: 0,
        speed: speed,
        allowTouchMove: true,
        loop: loop,
        breakpoints: {
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        },
        navigation: {},
        on: {
          init: function () {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              activeSlide.style.transition =
                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              activeSlide.style.transform = "scale(1)";
              activeSlide.style.opacity = "1";
              activeSlide.style.filter = "blur(0)";
            }
          },
          slideChange: function () {
            const slides = this.slides;
            slides.forEach((slide) => {
              slide.style.transition =
                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              slide.style.transform = "scale(0.8)";
              slide.style.opacity = "0.3";
              slide.style.filter = "blur(3px)";
            });
          },
          slideChangeTransitionStart: function () {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              activeSlide.style.transition =
                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              activeSlide.style.transform = "scale(1)";
              activeSlide.style.opacity = "1";
              activeSlide.style.filter = "blur(0)";
            }
          },
        },
      };

      if (autoplay) {
        swiperConfig.autoplay = {
          delay: autoplayDelay,
          disableOnInteraction: pauseOnHover,
        };
      }

      if (nextButton && prevButton) {
        swiperConfig.navigation = {
          nextEl: nextButton,
          prevEl: prevButton,
        };
      }

      new Swiper(swiperElement, swiperConfig);
    },

    CardMarquee: function ($scope) {
      const cardAnimationWrapper = $scope
        .find(".nextsaas_card_marquee_wrapper")
        .eq(0);
      const cardMarqueeContainer = cardAnimationWrapper.find(
        ".cards-marquee-container",
      );

      const direction = cardMarqueeContainer.data("scroll_direction");
      const speed = cardMarqueeContainer.data("speed");
      const pause_on_hover = cardMarqueeContainer.data("pause_on_hover");

      $(cardMarqueeContainer).each(function (el) {
        new InfiniteMarquee({
          element: cardMarqueeContainer[el],
          speed: speed,
          smoothEdges: true,
          direction: direction,
          pauseOnHover: pause_on_hover,
          gap: "30px",
        });
      });
    },

    ImageMarquee: function ($scope) {
      const imageMarqueeWrapper = $scope
        .find(".nextsaas_image_marquee_wrapper")
        .eq(0);
      const imageMarqueeContainer = imageMarqueeWrapper.find(
        ".image-marquee-container",
      );
      const direction =
        imageMarqueeContainer.data("scroll_direction") || "left";
      const speed = imageMarqueeContainer.data("speed") || 40000;
      const gap = imageMarqueeContainer.data("gap") || "24px";
      const pause_on_hover = imageMarqueeContainer.data("pause_on_hover");
      $(imageMarqueeContainer).each(function (el) {
        new InfiniteMarquee({
          element: imageMarqueeContainer[el],
          speed: speed,
          smoothEdges: true,
          direction: direction,
          pauseOnHover: pause_on_hover,
          gap: gap,
        });
      });
    },

    BlogFilter: function ($scope) {
      const blogFilterWrapper = $scope
        .find(".nextsaas-blog-filter-wrapper")
        .eq(0);

      if (!blogFilterWrapper.length) return;

      // Get both desktop and mobile tabs
      const filterTabs = blogFilterWrapper.find(".blog-filter-tab");
      const postsContent = blogFilterWrapper.find(".blog-posts-content");
      const filterType = blogFilterWrapper.attr("data-filter-type");

      // Ensure "All" tab is active by default
      const allTab = filterTabs.filter('[data-filter="all"]');
      if (allTab.length > 0) {
        filterTabs.removeClass("filter-active");
        allTab.addClass("filter-active");
      }

      // Tab click handler
      filterTabs.on("click", function () {
        const $this = $(this);
        const filterValue = $this.attr("data-filter");
        const termId = $this.attr("data-term-id");
        const termType = $this.attr("data-term-type");

        // Update active tab (sync desktop and mobile)
        filterTabs.removeClass("filter-active");
        // Activate the corresponding tab (desktop or mobile)
        filterTabs
          .filter(`[data-filter="${filterValue}"]`)
          .addClass("filter-active");

        // Make AJAX request
        const formData = new FormData();
        formData.append("action", "nextsaas_blog_filter");
        formData.append("nonce", nextsaas_elementor.nonce);
        formData.append("filter_type", filterType);
        formData.append("filter_value", filterValue);
        formData.append("term_id", termId || "0");
        formData.append("term_type", termType || "");
        formData.append(
          "post_count",
          blogFilterWrapper.attr("data-post-count") || "3",
        );
        formData.append(
          "order",
          blogFilterWrapper.attr("data-order") || "DESC",
        );
        formData.append(
          "title_length",
          blogFilterWrapper.attr("data-title-length") || "0",
        );
        formData.append(
          "excerpt_length",
          blogFilterWrapper.attr("data-excerpt-length") || "20",
        );
        formData.append(
          "show_excerpt",
          blogFilterWrapper.attr("data-show-excerpt") || "yes",
        );
        formData.append(
          "show_category",
          blogFilterWrapper.attr("data-show-category") || "yes",
        );
        formData.append(
          "button_style",
          blogFilterWrapper.attr("data-button-style") || "style-1",
        );
        formData.append(
          "btn_label",
          blogFilterWrapper.attr("data-btn-label") || "Read more",
        );

        fetch(nextsaas_elementor.ajax_url, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            if (postsContent.length) {
              postsContent.html(data);
              // Re-initialize Button animation for dynamically loaded content
              // Use a small delay to ensure DOM is ready
              setTimeout(function () {
                Nextsaas.Button(postsContent);
              }, 10);
            }
          })
          .catch((error) => {
            console.error("AJAX Error:", error);
          });
      });
    },

    MegaMenu: function ($scope) {
      var nextsaasMegaMenu = $scope.find(".nextsaas-mega-menu").eq(0);
      var id = $scope.data("id");
      var menuwrapper = $scope.find(".nextsaas-mega-menu-wrapper");
      var menuList = $scope.find(
        ".nextsaas-mega-menu-wrapper ul.nextsaas-mega-menu-list",
      );
      var oriantation = nextsaasMegaMenu.data("mega-menu-oriantation");

      nextsaasMegaMenu.find(".nextsaas-sub-menu").each(function () {
        var parent = $(this).closest(".menu-item");
        $(parent)
          .addClass("parent-has-child")
          .removeClass("parent-has-no-child");
      });

      // helper function to support both container systems
      function getClosestSection($el) {
        return $el.closest(".elementor-section, .e-con"); // support both legacy and flexbox
      }

      function getClosestContainer($el) {
        return $el.closest(
          ".elementor-container, .e-con-inner, .e-con-boxed, .e-con",
        ); // new + old
      }

      function getClosestColumn($el) {
        return $el.closest(".elementor-column, .e-con"); // support both
      }

      if ("horizontal" === oriantation) {
        $(
          ".elementor-element-" +
            id +
            " .nextsaas-mega-menu-list > li.menu-item",
        ).each(function () {
          var $this = $(this);
          var dropdown_width = $this.data("dropdown_width");

          if ("section" === dropdown_width) {
            // Support both old and new structure
            var closest_section = getClosestSection(
              $(".elementor-element-" + id),
            );

            // Try to find full content wrapper inside section
            var content_wrapper = closest_section.find(".e-con-inner").first();

            var target_wrapper = content_wrapper.length
              ? content_wrapper
              : closest_section;

            var full_width = target_wrapper.outerWidth();
            var left_offset =
              target_wrapper.offset().left - $this.offset().left;

            $this.find("ul.nextsaas-sub-menu").css({
              left: left_offset + "px",
              width: full_width + "px",
            });
          } else if ("container" === dropdown_width) {
            var closest_container = getClosestContainer(
              $(".elementor-element-" + id),
            );
            var cont_width = closest_container.outerWidth();
            var cont_pos =
              closest_container.offset().left - $this.offset().left;
            $this
              .find("ul.nextsaas-sub-menu")
              .css({ left: cont_pos + "px", width: cont_width + "px" });
          } else if ("column" === dropdown_width) {
            var closest_column = getClosestColumn(
              $(".elementor-element-" + id),
            );
            var col_width = closest_column.outerWidth();
            var col_pos = closest_column.offset().left - $this.offset().left;
            $this
              .find("ul.nextsaas-sub-menu")
              .css({ left: col_pos + "px", width: col_width + "px" });
          }
        });
      } else {
        $(
          ".elementor-element-" +
            id +
            " .nextsaas-mega-menu-list > li.menu-item",
        ).each(function () {
          var $this = $(this);
          var ver_dropdown_width = $this.data("vertical_dropdown_width");

          if ("vertical-container" === ver_dropdown_width) {
            var closest_container = getClosestContainer(
              $(".elementor-element-" + id),
            );
            var container_width = closest_container.outerWidth();
            var ver_width = $scope
              .find(
                ".nextsaas-mega-menu.nextsaas-mega-menu-oriantation-vertical",
              )
              .outerWidth();
            var total_width = container_width - ver_width;
            $this.find("ul.nextsaas-sub-menu").css("width", total_width + "px");
          }
        });
      }

      if ($.isFunction($.fn.slicknav)) {
        menuList.slicknav({
          appendTo: menuwrapper,
          label: "",
          afterOpen: function () {
            var navClass = $scope.find(
              ".nextsaas-mega-menu-wrapper .slicknav_menu .slicknav_nav",
            );
            var navSection = getClosestSection($(".elementor-element-" + id));
            var navSectionWidth = navSection.outerWidth();
            navClass.css("width", navSectionWidth + "px");
          },
        });
      }
    },

    CustomerStory: function ($scope) {
      const activeFilters = {
        industry: "all",
        product: "all",
        service: "all",
        solution: "all",
      };

      $scope.on("click", ".dropdown-button", function (e) {
        e.stopPropagation();
        const $btn = $(this);
        const $menu = $btn
          .closest(".nextsaas-filter-wrap")
          .find(".customer-dropdown-menu");

        $scope
          .find(".customer-dropdown-menu")
          .not($menu)
          .removeClass("active")
          .css({
            opacity: 0,
            "pointer-events": "none",
          });

        $menu.toggleClass("active").css({
          opacity: $menu.hasClass("active") ? 1 : 0,
          "pointer-events": $menu.hasClass("active") ? "auto" : "none",
        });
      });

      $(document).on("click.customerStory", function (e) {
        if (!$(e.target).closest($scope).length) {
          $scope.find(".customer-dropdown-menu").removeClass("active").css({
            opacity: 0,
            "pointer-events": "none",
          });
        }
      });

      $scope.on("click", ".customer-dropdown-menu > div", function (e) {
        e.stopPropagation();
        const $item = $(this);
        const type = $item.data("filter-type");
        const value = $item.data("value");
        const label = $item.find("span:first").text();
        const $menu = $item.closest(".customer-dropdown-menu");

        // Remove active class from all items in this menu
        $menu.find("> div").removeClass("active");
        // Add active class to clicked item
        $item.addClass("active");

        activeFilters[type] = value;
        $item
          .closest(".nextsaas-filter-wrap")
          .find(".dropdown-button span:first")
          .text(label);

        $menu.removeClass("active").css({
          opacity: 0,
          "pointer-events": "none",
        });

        filterStories();
      });

      // Initialize active states on page load - set "all" items as active by default
      $scope.find(".customer-dropdown-menu > div").each(function () {
        const $item = $(this);
        const type = $item.data("filter-type");
        const value = $item.data("value");
        // Since all filters default to "all", mark "all" items as active
        if (activeFilters[type] === value) {
          $item.addClass("active");
        }
      });

      function filterStories() {
        const $cards = $scope.find(".story-card");
        let visibleCount = 0;

        $cards.each(function () {
          const $card = $(this);

          const match =
            (activeFilters.industry === "all" ||
              ($card.data("industry") + "").includes(activeFilters.industry)) &&
            (activeFilters.product === "all" ||
              ($card.data("product") + "").includes(activeFilters.product)) &&
            (activeFilters.service === "all" ||
              ($card.data("service") + "").includes(activeFilters.service)) &&
            (activeFilters.solution === "all" ||
              ($card.data("solution") + "").includes(activeFilters.solution));

          if (match) {
            $card.show();
            visibleCount++;
          } else {
            $card.hide();
          }
        });

        const $grid = $scope.find(".success-stories-cards");
        if (visibleCount === 0) {
          if (!$grid.find(".no-results").length) {
            $grid.append(
              '<p class="no-results text-center col-span-full mt-6 text-gray-500">No matching stories found.</p>',
            );
          }
        } else {
          $grid.find(".no-results").remove();
        }
      }
    },

    ImageBeforeAfter: function ($scope) {
      const slider = $scope.find(".slider")[0];
      const handle = $scope.find(".slider-handle")[0];
      const afterImage = $scope.find(".after")[0];

      if (!slider || !handle || !afterImage) {
        return;
      }

      let isDragging = false;
      let startX = 0;
      let startLeft = 0;

      /* ---------- INIT ---------- */
      function initSlider() {
        const rect = slider.getBoundingClientRect();
        const center = rect.width / 2;
        handle.style.left = `${center}px`;
        updateClipPath(center);
      }

      /* ---------- CLIP ---------- */
      function updateClipPath(position) {
        const rect = slider.getBoundingClientRect();
        const percentage = (position / rect.width) * 100;
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        handle.setAttribute("aria-valuenow", Math.round(percentage));
      }

      /* ---------- MOUSE ---------- */
      handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;

        handle.classList.add("active", "no-transition");
        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";
      });

      document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;

        handle.classList.remove("active", "no-transition");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const rect = slider.getBoundingClientRect();
        const pos = Math.max(
          0,
          Math.min(rect.width, startLeft + (e.clientX - startX)),
        );

        handle.style.left = `${pos}px`;
        updateClipPath(pos);
      });

      /* ---------- TOUCH ---------- */
      handle.addEventListener("touchstart", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.touches[0].clientX;
        startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;
        handle.classList.add("active", "no-transition");
      });

      document.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        handle.classList.remove("active", "no-transition");
      });

      document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;

        const rect = slider.getBoundingClientRect();
        const pos = Math.max(
          0,
          Math.min(rect.width, startLeft + (e.touches[0].clientX - startX)),
        );

        handle.style.left = `${pos}px`;
        updateClipPath(pos);
      });

      /* ---------- CLICK ---------- */
      slider.addEventListener("click", (e) => {
        const rect = slider.getBoundingClientRect();
        const pos = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        handle.style.left = `${pos}px`;
        updateClipPath(pos);
      });

      /* ---------- KEYBOARD ---------- */
      handle.addEventListener("keydown", (e) => {
        const rect = slider.getBoundingClientRect();
        const step = rect.width / 20;
        let pos = parseInt(handle.style.left) || rect.width / 2;

        if (e.key === "ArrowLeft") pos -= step;
        if (e.key === "ArrowRight") pos += step;
        if (e.key === "Home") pos = 0;
        if (e.key === "End") pos = rect.width;

        pos = Math.max(0, Math.min(rect.width, pos));
        handle.style.left = `${pos}px`;
        updateClipPath(pos);
      });

      /* ---------- ACCESSIBILITY ---------- */
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("role", "slider");
      handle.setAttribute("aria-valuemin", "0");
      handle.setAttribute("aria-valuemax", "100");

      /* ---------- RESIZE ---------- */
      window.addEventListener("resize", initSlider);

      initSlider();
    },

    Audio: function ($scope) {
      const audioWrapper = $scope.find(".nextsaas_audio_wrapper").eq(0);
      if (!audioWrapper.length) {
        return;
      }

      // Check if GSAP is available
      if (typeof gsap === "undefined") {
        console.warn(
          "Audio widget: GSAP is not loaded. Waveform animations will not work.",
        );
      }

      const aiVoiceSampleAnimation = {
        init() {
          const voiceSampleItems =
            audioWrapper[0].querySelectorAll(".voice-sample-item");

          if (voiceSampleItems.length === 0) {
            console.warn("Audio widget: No voice sample items found");
            return;
          }

          voiceSampleItems.forEach((item) => {
            // Get audio URL from data attribute
            const audioPath = item.getAttribute("data-audio-url");
            if (!audioPath || audioPath === "") {
              console.warn("Audio widget: No audio URL found for item", item);
              return;
            }

            const audio = new Audio(audioPath);
            item.audio = audio;
            item.waveformTimelines = []; // Store GSAP timelines for this item

            // Initialize waveform animation
            aiVoiceSampleAnimation.initWaveform(item);

            // Add error handler for audio loading
            audio.addEventListener("error", (e) => {
              console.error(
                "Audio widget: Error loading audio file",
                audioPath,
                e,
              );
            });

            // When audio ends, reset to initial state
            audio.addEventListener("ended", () => {
              toggleAnimation(item, false);
            });

            // Handle play/pause on click
            const playButton = item.querySelector(".voice-sample-play-button");
            if (playButton) {
              playButton.addEventListener("click", () => {
                const isPlaying = item.classList.contains(
                  "voice-sample-item-active",
                );
                if (isPlaying) {
                  // Pause
                  audio.pause();
                  audio.currentTime = 0;
                  toggleAnimation(item, false);
                } else {
                  // Play
                  stopAllOthers(item);
                  audio
                    .play()
                    .catch((error) =>
                      console.error("Error playing audio:", error),
                    );
                  toggleAnimation(item, true);
                }
              });
            }
          });

          const toggleAnimation = (item, isPlaying) => {
            const content = item.querySelector(".voice-sample-item-content");
            const svg = item.querySelector(".voice-sample-svg");
            const playIcon = item.querySelector(".play-icon");
            const pauseIcon = item.querySelector(".pause-icon");

            if (isPlaying) {
              item.classList.add("voice-sample-item-active");
              // Start waveform animation
              aiVoiceSampleAnimation.startWaveform(item);
            } else {
              item.classList.remove("voice-sample-item-active");
              // Stop waveform animation
              aiVoiceSampleAnimation.stopWaveform(item);
            }

            if (typeof gsap !== "undefined") {
              if (content) {
                gsap.to(content, {
                  y: isPlaying ? -100 : 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }
              if (svg) {
                gsap.to(svg, {
                  y: isPlaying ? -36 : 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }
              if (playIcon) {
                gsap.to(playIcon, {
                  y: isPlaying ? -35 : -9,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }
              if (pauseIcon) {
                gsap.to(pauseIcon, {
                  y: isPlaying ? 0 : 25,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }
            }
          };

          // Stop all other playing items
          const stopAllOthers = (currentItem) => {
            voiceSampleItems.forEach((item) => {
              if (item !== currentItem && item.audio && !item.audio.paused) {
                item.audio.pause();
                item.audio.currentTime = 0;
                toggleAnimation(item, false);
              }
            });
          };
        },

        initWaveform(item) {
          const svgContainer = item.querySelector(
            '[id^="voice-sample-waveform"]',
          );
          if (!svgContainer) {
            return;
          }

          const voiceBars = svgContainer.querySelectorAll(".voice-bar");
          if (voiceBars.length === 0) {
            return;
          }

          const originalWidths = Array.from(voiceBars).map((rect) => {
            const width = Number.parseFloat(rect.getAttribute("width")) || 0;
            return width;
          });

          // Store original widths and bars for this item
          item.waveformBars = voiceBars;
          item.waveformOriginalWidths = originalWidths;
        },

        startWaveform(item) {
          if (
            !item.waveformBars ||
            !item.waveformOriginalWidths ||
            typeof gsap === "undefined"
          ) {
            return;
          }

          const voiceBars = item.waveformBars;
          const originalWidths = item.waveformOriginalWidths;
          const timelines = [];

          voiceBars.forEach((singleBar, index) => {
            const originalWidth = originalWidths[index];

            // Skip if original width is 0 or very small
            if (originalWidth <= 1) {
              return;
            }

            // Determine if this is a "high" bar (white) or "low" bar (semi-transparent)
            // Low bars have fill-opacity attribute, high bars don't
            const isHighBar = !singleBar.hasAttribute("fill-opacity");

            const minHeight = isHighBar
              ? originalWidth * 0.2 // High bars start at 20% of original
              : originalWidth * 0.1; // Low bars start at 10% of original

            const maxHeight = originalWidth; // Never exceed original height

            // Create wave effect with staggered delays
            // Use sine wave pattern for more natural voice-like flow
            const position = index / voiceBars.length; // 0 to 1
            const sineOffset = Math.sin(position * Math.PI * 4) * 0.1; // Wave pattern
            const baseDelay = index * 0.012; // Stagger based on position
            const delay = baseDelay + sineOffset;

            // Duration varies to create natural rhythm - faster for high bars
            const duration = isHighBar
              ? 0.4 + Math.random() * 0.25 // High bars: 0.4-0.65s (faster)
              : 0.6 + Math.random() * 0.3; // Low bars: 0.6-0.9s (slower)

            // Set initial width to a random value between min and max for variety
            const initialHeight =
              minHeight + (maxHeight - minHeight) * (0.3 + Math.random() * 0.2);

            gsap.set(singleBar, {
              attr: { width: initialHeight },
            });

            const tl = gsap.timeline({
              repeat: -1,
              delay: delay,
            });

            tl.to(singleBar, {
              attr: { width: maxHeight },
              duration: duration,
              ease: "sine.inOut",
            }).to(singleBar, {
              attr: { width: minHeight },
              duration: duration,
              ease: "linear",
            });

            timelines.push(tl);
          });

          // Store timelines for this item
          item.waveformTimelines = timelines;
        },

        stopWaveform(item) {
          if (!item.waveformTimelines || typeof gsap === "undefined") {
            return;
          }

          // Kill all timelines and reset bars to original widths
          item.waveformTimelines.forEach((tl) => {
            tl.kill();
          });

          // Reset all bars to their original widths
          if (item.waveformBars && item.waveformOriginalWidths) {
            item.waveformBars.forEach((bar, index) => {
              const originalWidth = item.waveformOriginalWidths[index];
              gsap.set(bar, {
                attr: { width: originalWidth },
              });
            });
          }

          item.waveformTimelines = [];
        },
      };

      // Initialize the audio widget
      aiVoiceSampleAnimation.init();
    },

    StackCard: function ($scope) {
      const movingCardWrapper = $scope
        .find(".nextsaas_moving_card_wrapper")
        .eq(0);
      if (!movingCardWrapper.length) {
        return;
      }

      const stepCards = movingCardWrapper[0].querySelectorAll(".step-card");
      const stepNumbers = movingCardWrapper[0].querySelectorAll(".step-number");

      if (stepCards.length > 0 && stepNumbers.length > 0) {
        const observerOptions = {
          root: null,
          rootMargin: "-400px 0px -50% 0px",
          threshold: [0, 0.1, 0.5, 1],
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stepNumber = entry.target.getAttribute("data-step");
              const correspondingNumber = movingCardWrapper[0].querySelector(
                `.step-number[data-step-number="${stepNumber}"]`,
              );

              // Remove active state from all numbers
              stepNumbers.forEach((num) => {
                num.classList.remove("bg-ns-linen", "text-accent");
                num.classList.add("bg-ns-ivory", "text-secondary/40");
              });

              // Add active state to corresponding number
              if (correspondingNumber) {
                correspondingNumber.classList.remove(
                  "bg-ns-ivory",
                  "text-secondary/40",
                );
                correspondingNumber.classList.add("bg-ns-linen", "text-accent");
              }
            }
          });
        }, observerOptions);

        stepCards.forEach((card) => {
          observer.observe(card);
        });

        // Add click handlers to step number buttons for scrolling
        stepNumbers.forEach((button) => {
          button.addEventListener("click", function () {
            const stepNumber = this.getAttribute("data-step-number");
            const targetCard = movingCardWrapper[0].querySelector(
              `#step-${stepNumber}`,
            );

            if (targetCard) {
              // Check if Lenis is available (for smooth scrolling)
              if (window.lenis) {
                window.lenis.scrollTo(`#step-${stepNumber}`, {
                  offset: -156, // Account for sticky header offset
                  duration: 1.5,
                  easing: (t) => 1 - Math.pow(1 - t, 3),
                });
              } else {
                // Fallback for when Lenis is not available (mobile devices)
                const targetPosition =
                  targetCard.getBoundingClientRect().top +
                  window.pageYOffset -
                  156;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }
          });
        });
      }
    },

    StackCardV2: function ($scope) {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        return;
      }

      const scopeEl = $scope && $scope[0];
      if (!scopeEl || typeof scopeEl.querySelectorAll !== "function") {
        return;
      }

      let cardWrappers;
      if (
        typeof scopeEl.matches === "function" &&
        scopeEl.matches("[data-stack-card-wrapper]")
      ) {
        cardWrappers = [scopeEl];
      } else {
        cardWrappers = gsap.utils.toArray(
          scopeEl.querySelectorAll("[data-stack-card-wrapper]"),
        );
      }

      if (!cardWrappers.length) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      cardWrappers.forEach((wrapper) => {
        const cardItems = wrapper.querySelectorAll("[data-stack-card-item]");
        if (!cardItems.length) {
          return;
        }

        if (typeof ScrollTrigger.getAll === "function") {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st && st.trigger && wrapper.contains(st.trigger)) {
              st.kill();
            }
          });
        }

        gsap.utils.toArray(cardItems).forEach(function (item) {
          gsap.killTweensOf(item);
        });

        const uid =
          wrapper.dataset.stackCardV2Uid ||
          (wrapper.dataset.stackCardV2Uid =
            "sc" + Math.random().toString(36).slice(2, 11));

        const markers = wrapper.dataset.stackCardMarkers || false;
        const stackStyle = wrapper.dataset.stackStyle || "scale";
        const scaleValue = Number.parseFloat(wrapper.dataset.scaleValue) || 0.9;

        gsap.utils.toArray(cardItems).forEach(function (item, i) {
          let animationProps = {};
          if (stackStyle === "rotate") {
            let rotation = 0;
            if (i % 2 === 1) {
              rotation = Math.floor(i / 2) % 2 === 0 ? 4 : -4;
            }
            animationProps = {
              rotation: rotation,
              transformOrigin: "top center",
            };
          } else {
            let scale = 1;
            if (i !== cardItems.length - 1) {
              scale = scaleValue + 0.025 * i;
            }
            animationProps = {
              scale: scale,
              transformOrigin: "top center",
            };
          }

          gsap.to(item, {
            ...animationProps,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top " + (150 + 10 * i),
              end: "bottom 550",
              endTrigger: wrapper,
              scrub: 1,
              pin: item,
              pinSpacing: false,
              invalidateOnRefresh: true,
              markers: markers
                ? {
                    indent: 100 * i,
                    startColor: "#0ae448",
                    endColor: "#fec5fb",
                    fontSize: "14px",
                  }
                : false,
              id: "stack-card-v2-" + uid + "-" + i,
            },
          });
        });

        requestAnimationFrame(function () {
          if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.refresh) {
            ScrollTrigger.refresh();
          }
        });
      });
    },

    VoiceWave: function ($scope) {
      const voiceWaveWrapper = $scope
        .find(".nextsaas_voice_wave_wrapper")
        .eq(0);
      if (!voiceWaveWrapper.length) {
        return;
      }

      const svgContainer = voiceWaveWrapper[0].querySelector("#voice-waveform");

      if (!svgContainer) {
        return;
      }

      // Check if GSAP is available
      if (typeof gsap === "undefined") {
        console.warn(
          "Voice Wave widget: GSAP is not loaded. Waveform animations will not work.",
        );
        return;
      }

      const voiceBars = svgContainer.querySelectorAll(".voice-bar");

      if (voiceBars.length === 0) {
        return;
      }

      const originalWidths = Array.from(voiceBars).map((rect) => {
        const width = Number.parseFloat(rect.getAttribute("width")) || 0;
        return width;
      });

      voiceBars.forEach((singleBar, index) => {
        const originalWidth = originalWidths[index];

        // Skip if original width is 0 or very small
        if (originalWidth <= 1) {
          return;
        }

        // Determine if this is a "high" bar (white) or "low" bar (semi-transparent)
        // Low bars have fill-opacity attribute, high bars don't
        const isHighBar = !singleBar.hasAttribute("fill-opacity");

        const minHeight = isHighBar
          ? originalWidth * 0.2 // High bars start at 20% of original
          : originalWidth * 0.1; // Low bars start at 10% of original

        const maxHeight = originalWidth; // Never exceed original height

        // Create wave effect with staggered delays
        // Use sine wave pattern for more natural voice-like flow
        const position = index / voiceBars.length; // 0 to 1
        const sineOffset = Math.sin(position * Math.PI * 4) * 0.1; // Wave pattern
        const baseDelay = index * 0.012; // Stagger based on position
        const delay = baseDelay + sineOffset;

        // Duration varies to create natural rhythm - faster for high bars
        const duration = isHighBar
          ? 0.4 + Math.random() * 0.25 // High bars: 0.4-0.65s (faster)
          : 0.6 + Math.random() * 0.3; // Low bars: 0.6-0.9s (slower)

        // Set initial width to a random value between min and max for variety
        const initialHeight =
          minHeight + (maxHeight - minHeight) * (0.3 + Math.random() * 0.2);
        gsap.set(singleBar, {
          attr: { width: initialHeight },
        });

        const tl = gsap.timeline({
          repeat: -1,
          delay: delay,
        });

        tl.to(singleBar, {
          attr: { width: maxHeight },
          duration: duration,
          ease: "sine.inOut",
        }).to(singleBar, {
          attr: { width: minHeight },
          duration: duration,
          ease: "linear",
        });
      });
    },

    ImageSpin: function ($scope) {
      const imageSpinWrapper = $scope
        .find(".nextsaas_image_spin_wrapper")
        .eq(0);
      if (!imageSpinWrapper.length) {
        return;
      }
      const items = imageSpinWrapper[0].querySelectorAll(
        ".financial-management-platform-hero-spin",
      );

      if (!items.length) return;

      items.forEach((item) => {
        let lastScrollTop = window.pageYOffset || 0;
        let scrollTimeout;
        let currentTween;
        let lastDirection = "down";

        const scrollSpeed = parseFloat(item.dataset.scrollSpeed) || 12;
        const idleSpeed = parseFloat(item.dataset.idleSpeed) || 60;

        const startRotation = (direction, duration) => {
          if (currentTween) currentTween.kill();

          currentTween = gsap.to(item, {
            rotate: direction === "up" ? "-=360" : "+=360",
            duration: duration,
            ease: "linear",
            transformOrigin: "center center",
            repeat: -1,
          });
        };

        window.addEventListener("scroll", () => {
          const st = window.pageYOffset || document.documentElement.scrollTop;
          let direction = null;

          if (st > lastScrollTop) direction = "down";
          else if (st < lastScrollTop) direction = "up";

          if (direction) {
            lastDirection = direction;
            startRotation(direction, scrollSpeed);
          }

          lastScrollTop = Math.max(st, 0);

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            startRotation(lastDirection, idleSpeed);
          }, 150);
        });

        // Initial rotation
        startRotation("down", idleSpeed);
      });
    },

    ImageSlider: function ($scope) {
      const imageSliderWrapper = $scope
        .find(".nextsaas_image_slider_wrapper")
        .eq(0);

      if (imageSliderWrapper.length === 0) {
        return;
      }

      const layout = imageSliderWrapper.data("layout") || "fancy_slider";

      // Sliding Slider (Swiper) - layout 2
      if (layout === "sliding_slider") {
        const slidingEl = imageSliderWrapper.find(".sliding-swiper")[0];
        if (!slidingEl || typeof Swiper === "undefined") {
          return;
        }
        const autoplay = imageSliderWrapper.data("autoplay") === "yes";
        const autoplayDelay =
          parseInt(imageSliderWrapper.data("autoplay-speed"), 10) || 2000;
        const swiperConfig = {
          initialSlide: 3,
          centeredSlides: true,
          spaceBetween: 0,
          speed: 1400,
          loop: true,
          allowTouchMove: true,
          breakpoints: {
            480: {
              slidesPerView: 1,
              spaceBetween: 0,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          },
          on: {
            init: function () {
              const activeSlide = this.slides[this.activeIndex];
              if (activeSlide) {
                activeSlide.style.transition =
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                activeSlide.style.transform = "scale(1)";
                activeSlide.style.opacity = "1";
                activeSlide.style.filter = "blur(0)";
              }
            },
            slideChange: function () {
              const slides = this.slides;
              slides.forEach((slide) => {
                slide.style.transition =
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                slide.style.transform = "scale(0.8)";
                slide.style.opacity = "0.3";
                slide.style.filter = "blur(3px)";
              });
            },
            slideChangeTransitionStart: function () {
              const activeSlide = this.slides[this.activeIndex];
              if (activeSlide) {
                activeSlide.style.transition =
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                activeSlide.style.transform = "scale(1)";
                activeSlide.style.opacity = "1";
                activeSlide.style.filter = "blur(0)";
              }
            },
          },
        };
        if (autoplay) {
          swiperConfig.autoplay = {
            delay: autoplayDelay,
            disableOnInteraction: true,
          };
        }
        const swiperInstance = new Swiper(slidingEl, swiperConfig);
        $scope.on("elementor/popup/hide", function () {
          if (swiperInstance && swiperInstance.destroy) {
            swiperInstance.destroy(true, true);
          }
        });
        return;
      }

      // Fancy Slider (layout 1)
      const sliderId = imageSliderWrapper.data("slider-id");
      const autoplay = imageSliderWrapper.data("autoplay") === "yes";
      const autoplaySpeed =
        parseInt(imageSliderWrapper.data("autoplay-speed"), 10) || 2500;

      const slider = document.getElementById(sliderId);
      if (!slider) {
        return;
      }

      const slides = slider.querySelectorAll("figure");
      if (slides.length === 0) {
        return;
      }

      let index = 0;

      function updateSlides() {
        const computedStyle = window.getComputedStyle(slider);
        const activeSize =
          computedStyle.getPropertyValue("--active-size") || "200px";
        const activeBorderColor =
          computedStyle.getPropertyValue("--active-border-color") || "#ffffff";
        const activeBorderWidth =
          computedStyle.getPropertyValue("--active-border-width") || "4px";
        const activeBorderRadius =
          computedStyle.getPropertyValue("--active-border-radius") || "11px";
        const activeBoxShadow =
          computedStyle.getPropertyValue("--active-box-shadow") ||
          "0 0 40px rgba(0,0,0,1)";

        const sideSize =
          computedStyle.getPropertyValue("--side-size") || "180px";
        const sideBlur = computedStyle.getPropertyValue("--side-blur") || "4px";
        const sideBorderColor =
          computedStyle.getPropertyValue("--side-border-color") ||
          "var(--color-background-1)";
        const sideBorderWidth =
          computedStyle.getPropertyValue("--side-border-width") || "4px";
        const sideBorderRadius =
          computedStyle.getPropertyValue("--side-border-radius") || "8px";

        const backSize =
          computedStyle.getPropertyValue("--back-size") || "180px";
        const backScale =
          computedStyle.getPropertyValue("--back-scale") || "0.87";
        const backOpacity =
          computedStyle.getPropertyValue("--back-opacity") || "0";
        const backBlur = computedStyle.getPropertyValue("--back-blur") || "4px";

        slides.forEach((slide, i) => {
          const offset = (i - index + slides.length) % slides.length;

          slide.style.zIndex = 0;
          slide.style.border = `${sideBorderWidth} solid`;
          slide.style.borderRadius = sideBorderRadius;
          slide.style.borderColor = sideBorderColor;
          slide.style.filter = `blur(${sideBlur})`;
          slide.style.transform = "scale(0.7) translateX(0) rotate(0deg)";
          slide.style.width = sideSize;
          slide.style.height = sideSize;
          slide.style.opacity = "1";

          if (offset === 0) {
            slide.style.zIndex = 10;
            slide.style.filter = "blur(0)";
            slide.style.transform = "scale(1) translateX(0) rotate(0)";
            slide.style.border = `${activeBorderWidth} solid`;
            slide.style.boxShadow = activeBoxShadow;
            slide.style.borderColor = activeBorderColor;
            slide.style.borderRadius = activeBorderRadius;
            slide.style.width = activeSize;
            slide.style.height = activeSize;
          } else if (offset === 1 || offset === slides.length - 1) {
            slide.style.zIndex = 5;
            const sideOffset = parseInt(sideSize, 10) + 5;
            slide.style.transform = `scale(1) translateX(${offset === 1 ? sideOffset : -sideOffset}px) translateY(40px) rotate(${offset === 1 ? "20deg" : "-20deg"})`;
          } else {
            slide.style.zIndex = 1;
            slide.style.filter = `blur(${backBlur})`;
            const backOffset = parseInt(backSize, 10) * 2;
            slide.style.transform = `scale(${backScale}) translateX(${offset === 2 ? backOffset : -backOffset}px) translateY(140px) rotate(${offset === 2 ? "50deg" : "-50deg"})`;
            slide.style.opacity = backOpacity;
            slide.style.width = backSize;
            slide.style.height = backSize;
          }
        });
      }

      function nextSlide() {
        index = (index + 1) % slides.length;
        updateSlides();
      }

      updateSlides();

      let autoplayInterval = null;
      if (autoplay) {
        autoplayInterval = setInterval(nextSlide, autoplaySpeed);
      }

      $scope.on("elementor/popup/hide", function () {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      });
    },

    Integration: function ($scope) {
      const integrationWrapper = $scope
        .find(".nextsaas_integration_wrapper")
        .eq(0);
      if (!integrationWrapper.length) {
        return;
      }
      const svgs = integrationWrapper.find(".integration-v7-svg");

      if (svgs.length === 0) {
        return;
      }

      // Get animation settings from data attributes
      const dotColor = integrationWrapper.data("dot-color") || "#09F671";
      const dotSize = integrationWrapper.data("dot-size") || 2;
      const dotOpacity = integrationWrapper.data("dot-opacity") || 0.8;
      const dotDuration = integrationWrapper.data("dot-duration") || 4;

      // Process each SVG element
      svgs.each(function () {
        const svg = this;
        // Get all groups in this SVG
        const pathGroups = svg.querySelectorAll("g");

        pathGroups.forEach((group, index) => {
          const path = group.querySelector("path");
          if (!path) return;

          // Check if dot already exists to avoid duplicates
          if (group.querySelector("circle")) {
            return;
          }

          // Create a dot
          const dot = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
          );
          dot.setAttribute("r", dotSize);
          dot.setAttribute("fill", dotColor);
          dot.setAttribute("opacity", dotOpacity);

          group.appendChild(dot);

          gsap.to(dot, {
            duration: dotDuration,
            repeat: -1,
            scale: 2.5,
            ease: "none",
            filter: "blur(1px)",
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1,
            },
          });
        });
      });
    },

    Pricing: function ($scope) {
      var pricingWrapper = $scope.find(".nextsaas_pricing_wrapper").eq(0);
      if (!pricingWrapper.length) {
        return;
      }
      PricingToggle.init(pricingWrapper);
    },

    Service: function ($scope) {
      // Image reveal on hover (Layout 4 - Service List)
      const container = $scope[0].querySelector("[data-image-reveal]");
      if (!container) return;

      const cursor = container.querySelector("[data-image-reveal-cursor]");
      const medias = container.querySelectorAll("[data-image-reveal-media]");
      const items = container.querySelectorAll("[data-image-reveal-item]");
      if (!cursor || medias.length === 0 || items.length === 0) return;

      if (cursor.parentElement !== document.body) {
        document.body.appendChild(cursor);
        cursor.style.zIndex = "999999";
      }

      const deactivateAll = () => {
        medias.forEach((m) => {
          m.setAttribute("data-active", "false");
          m.style.opacity = "";
        });
      };
      const activateMedia = (index) => {
        deactivateAll();
        const i = Number(index);
        if (!Number.isNaN(i) && medias[i]) {
          medias[i].setAttribute("data-active", "true");
          medias[i].style.opacity = "1";
        }
      };

      const showCursor = () => {
        cursor.style.opacity = "1";
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      };
      const hideCursor = () => {
        cursor.style.opacity = "0";
        cursor.style.transform = "translate(-50%, -50%) scale(0)";
      };

      if (typeof gsap !== "undefined") {
        const followDuration =
          Number.parseFloat(container.dataset.followDuration) || 0.8;
        const showDuration =
          Number.parseFloat(container.dataset.showDuration) || 0.45;
        const ease = container.dataset.ease || "expo";

        gsap.set(cursor, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0,
          x: 0,
          y: 0,
        });

        const setX = gsap.quickTo(cursor, "x", {
          duration: followDuration,
          ease,
        });
        const setY = gsap.quickTo(cursor, "y", {
          duration: followDuration,
          ease,
        });

        const onMove = (e) => {
          setX(e.clientX);
          setY(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        const tl = gsap.timeline({ paused: true });
        tl.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: showDuration,
          ease: ease + ".inOut",
        });

        items.forEach((item) => {
          const link = item.closest("a");
          const target = link || item;
          const index =
            item.dataset.index ?? item.getAttribute("data-index") ?? "0";
          target.addEventListener("mouseenter", () => {
            activateMedia(index);
            tl.play();
          });
          target.addEventListener("mouseleave", () => {
            tl.reverse();
            deactivateAll();
          });
        });

        window.addEventListener("blur", () => {
          tl.reverse();
          deactivateAll();
        });
      }
    },

    Team: function ($scope) {
      const teamWrapper = $scope.find(".nextsaas-team-wrapper").eq(0);
      if (!teamWrapper.length) {
        return;
      }

      const blurElements = teamWrapper[0].querySelectorAll(
        "[data-progressive-blur-effect]",
      );

      blurElements.forEach((element) => {
        // Get attributes with defaults
        const intensity = element.dataset.intensity
          ? Number.parseFloat(element.dataset.intensity)
          : 50;
        const position = element.dataset.position
          ? element.dataset.position
          : "top";
        const className = element.dataset.class ? element.dataset.class : "";

        // Calculate intensity factor
        const intensityFactor = intensity / 50;

        // Define blur layers
        const blurLayers = [
          {
            blur: `${1 * intensityFactor}px`,
            maskStart: 0,
            maskEnd: 25,
            zIndex: 1,
          },
          {
            blur: `${3 * intensityFactor}px`,
            maskStart: 25,
            maskEnd: 75,
            zIndex: 2,
          },
          {
            blur: `${6 * intensityFactor}px`,
            maskStart: 75,
            maskEnd: 100,
            zIndex: 3,
          },
        ];

        // Position styles
        const positionStyles = {
          bottom: { bottom: "0", left: "0", right: "0", top: "auto" },
          top: { top: "0", left: "0", right: "0", bottom: "auto" },
          left: { left: "0", top: "0", bottom: "0", right: "auto" },
          right: { right: "0", top: "0", bottom: "0", left: "auto" },
        };

        // Gradient direction
        const gradientDirection = {
          bottom: "to bottom",
          top: "to top",
          left: "to left",
          right: "to right",
        };

        // Apply container styles
        Object.assign(
          element.style,
          {
            position: "absolute",
            zIndex: "10",
            pointerEvents: "auto",
          },
          positionStyles[position],
        );

        // Add custom class if provided
        if (className) {
          className.split(" ").forEach((cls) => {
            if (cls.trim()) {
              element.classList.add(cls.trim());
            }
          });
        }

        // Create blur layers
        blurLayers.forEach((layer, index) => {
          const layerElement = document.createElement("div");

          const maskImage = `linear-gradient(${gradientDirection[position]}, transparent ${layer.maskStart}%, black ${layer.maskEnd}%)`;

          Object.assign(layerElement.style, {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            pointerEvents: "none",
            zIndex: String(layer.zIndex),
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: maskImage,
            WebkitMaskImage: maskImage,
          });

          element.appendChild(layerElement);
        });
      });
    },

    CaseStudy: function ($scope) {
      if (typeof gsap === "undefined") {
        return;
      }
      const root = $scope && $scope[0] ? $scope[0] : null;
      if (!root || !root.querySelectorAll) {
        return;
      }
      const imagesLoadingReveal = root.querySelectorAll(
        ".image-loading-reveal img",
      );
      if (!imagesLoadingReveal.length) {
        return;
      }
      imagesLoadingReveal.forEach((img) => {
        const triggerEl = img.closest(".image-loading-reveal") || img;

        gsap.set(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          opacity: 0,
          scale: 0.9,
        });

        gsap.fromTo(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            opacity: 0,
            scale: 0.9,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            scale: 1,
            ease: "back.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 94%",
              end: "bottom 58%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    TableOfContent: function ($scope) {
      let root =
        $scope && $scope[0] && $scope[0].querySelectorAll
          ? $scope[0]
          : document;

      let widget = root.querySelector(".nextsaas-toc__body");
      if (!widget) return;

      // Find the real widget wrapper (Elementor widget root)
      let wrapper = widget.closest(".elementor-widget");
      if (!wrapper) wrapper = root;

      if (wrapper.dataset.tocBound) return;
      wrapper.dataset.tocBound = "true";

      let body = widget;
      let header = wrapper.querySelector(".nextsaas-toc__header");
      let expandBtn = wrapper.querySelector(
        ".nextsaas-toc__toggle-button--expand",
      );
      let collapseBtn = wrapper.querySelector(
        ".nextsaas-toc__toggle-button--collapse",
      );

      if (!body) {
        return;
      }

      // Build TOC items from page headings.
      let headingsTagsAttr = body.getAttribute("data-headings-tags") || "";
      let headingsTags = headingsTagsAttr
        .split(",")
        .map(function (t) {
          return t.trim();
        })
        .filter(Boolean);
      if (!headingsTags.length) {
        headingsTags = ["h2", "h3", "h4", "h5", "h6"];
      }
      let headingsSelector = headingsTags.join(",");

      let containerSelector = (body.dataset.container || "").trim();
      let excludeSelector = body.dataset.excludeSelectors || "";
      let hierarchical = body.dataset.hierarchical
      let markerView = body.dataset.markerView || "numbers";
      let collapseSubitems = body.dataset.collapseSubitems === "yes";
      let iconTemplate = body.querySelector(".nextsaas-toc__marker-icon-template");

      let searchRoot = null;
      if (containerSelector) {
        try {
          searchRoot = document.querySelector(containerSelector);
        } catch (e) {
          searchRoot = null;
        }
      }
      if (!searchRoot) {
        let defaultContentSelectors = [
          "main",
          "#main",
          "#content",
          ".site-main",
          ".content-area",
          ".entry-content",
          ".post-content",
          ".elementor-location-single .elementor-section",
          "article",
        ];
        for (const element of defaultContentSelectors) {
          let el = document.querySelector(element);
          if (el) {
            searchRoot = el;
            break;
          }
        }
      }
      if (!searchRoot) {
        searchRoot = wrapper.closest("article, .post, .single-post") || null;
      }
      if (!searchRoot) {
        searchRoot = document;
      }

      let excludeFromToc =
        "header, footer, aside, nav, [data-elementor-type='header'], [data-elementor-type='footer'], .demo-showcase, [class*='demo-showcase'], [class*='sidebar'], .sidebar, [class*='site-footer'], [class*='site-header']";

      let headings = Array.prototype.slice
        .call(searchRoot.querySelectorAll(headingsSelector))
        .filter(function (el) {
          if (wrapper.contains(el)) return false;
          if (el.closest(excludeFromToc)) return false;
          if (!excludeSelector) return true;
          try {
            return !el.matches(excludeSelector);
          } catch (e) {
            return true;
          }
        });

      let listEl = body.querySelector(".nextsaas-toc__list");
      let noHeadingsMessage = body.querySelector(
        ".nextsaas-toc__no-headings-message",
      );

      if (!headings.length) {
        if (listEl) listEl.innerHTML = "";
        if (noHeadingsMessage) {
          noHeadingsMessage.style.display = "";
        }
      } else {
        if (noHeadingsMessage) {
          noHeadingsMessage.style.display = "none";
        }
        let listTagName = markerView === "numbers" ? "ol" : "ul";
        let listModifierClass =
          markerView === "numbers"
            ? "nextsaas-toc__list--numbers"
            : "nextsaas-toc__list--bullets";

        if (!listEl) {
          listEl = document.createElement(listTagName);
          listEl.className =
            "nextsaas-toc__list nextsaas-toc__list-level-0 " + listModifierClass;
          body.appendChild(listEl);
        } else {
          listEl.tagName && listEl.tagName.toLowerCase() !== listTagName && (listEl = (function () {
            let newList = document.createElement(listTagName);
            newList.className = listEl.className;
            newList.id = listEl.id || "";
            while (listEl.firstChild) newList.appendChild(listEl.firstChild);
            listEl.parentNode.replaceChild(newList, listEl);
            return newList;
          })());
          listEl.className =
            "nextsaas-toc__list nextsaas-toc__list-level-0 " + listModifierClass;
        }

        listEl.innerHTML = "";

        let usedIds = {};
        function makeSlug(text) {
          return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        function ensureId(el) {
          if (el.id) {
            usedIds[el.id] = true;
            return el.id;
          }
          let base = makeSlug(el.textContent || "section");
          if (!base) base = "section";
          let candidate = base;
          let i = 1;
          while (usedIds[candidate]) {
            candidate = base + "-" + i++;
          }
          el.id = candidate;
          usedIds[candidate] = true;
          return candidate;
        }

        let currentLevel = 0;
        let rootList = listEl;
        let stack = [rootList];

        headings.forEach(function (heading) {
          let tagMatch = heading.tagName.match(/^H([1-6])$/);
          if (!tagMatch) return;
          let level = parseInt(tagMatch[1], 10);

          let targetId = ensureId(heading);
          let text = heading.textContent || "";

          let li = document.createElement("li");
          li.className = "nextsaas-toc__list-item";

          let textWrapper = document.createElement("div");
          textWrapper.className = "nextsaas-toc__list-item-text-wrapper";

          if (markerView === "bullets" && iconTemplate) {
            let markerWrap = document.createElement("span");
            markerWrap.className = "nextsaas-toc__list-item-marker";
            markerWrap.setAttribute("aria-hidden", "true");
            let iconEl =
              iconTemplate.querySelector(
                ".nextsaas-toc__marker-icon, i, svg"
              ) || iconTemplate.firstElementChild;
            if (iconEl) {
              markerWrap.appendChild(iconEl.cloneNode(true));
            }
            textWrapper.appendChild(markerWrap);
          }

          let a = document.createElement("a");
          a.className =
            "nextsaas-toc__list-item-text text-[var(--item-text-color)] [.nextsaas-toc--content-ellipsis_&]:truncate transition-colors hover:text-[var(--item-text-hover-color)]";
          a.href = "#" + targetId;
          a.textContent = text;
          textWrapper.appendChild(a);

          li.appendChild(textWrapper);

          if (!hierarchical) {
            rootList.appendChild(li);
            return;
          }

          if (currentLevel === 0) {
            currentLevel = level;
          }

          if (level > currentLevel) {
            let newList = document.createElement(listTagName);
            newList.className =
              "nextsaas-toc__list " + listModifierClass + " nextsaas-toc__list-level-" + (stack.length - 1);
            if (stack[stack.length - 1].lastElementChild) {
              stack[stack.length - 1].lastElementChild.appendChild(newList);
            } else {
              stack[stack.length - 1].appendChild(newList);
            }
            stack.push(newList);
            currentLevel = level;
          } else if (level < currentLevel) {
            while (stack.length > 1 && currentLevel > level) {
              stack.pop();
              currentLevel--;
            }
          }

          stack[stack.length - 1].appendChild(li);
        });

        if (hierarchical && collapseSubitems) {
          body.querySelectorAll(".nextsaas-toc__list-item").forEach(function (li) {
            let nestedList = li.querySelector(":scope > .nextsaas-toc__list");
            if (!nestedList) return;
            li.classList.add("nextsaas-toc__list-item--has-children");
            let toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "nextsaas-toc__list-item-toggle";
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Toggle subitems");
            toggle.innerHTML =
              '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M2 4 L5 7 L8 4"/></svg>';
            toggle.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              let open = li.classList.toggle("nextsaas-toc__list-item--open");
              toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });
            li.insertBefore(toggle, nestedList);
          });
        }
      }

      let isCollapsed = false;

      function setAria(expanded) {
        let value = expanded ? "true" : "false";
        if (expandBtn) expandBtn.setAttribute("aria-expanded", value);
        if (collapseBtn) collapseBtn.setAttribute("aria-expanded", value);
      }

      function animate(open) {
        let duration = 0.35;
        let ease = "power3.inOut";

        // No GSAP: simple show/hide
        if (typeof gsap === "undefined") {
          if (open) {
            body.style.display = "";
            body.style.height = "";
            body.style.overflow = "";
          } else {
            body.style.display = "none";
            body.style.height = "";
            body.style.overflow = "";
          }
          return;
        }

        gsap.killTweensOf(body);

        if (open) {
          let targetHeight = body.scrollHeight;
          body.style.display = "";
          body.style.overflow = "hidden";
          gsap.fromTo(
            body,
            { height: 0 },
            {
              height: targetHeight,
              duration: duration,
              ease: ease,
              onComplete: function () {
                body.style.height = "auto";
                body.style.overflow = "";
              },
            },
          );
        } else {
          let currentHeight = body.offsetHeight;
          body.style.overflow = "hidden";
          gsap.fromTo(
            body,
            { height: currentHeight },
            {
              height: 0,
              duration: duration,
              ease: ease,
              onComplete: function () {
                body.style.overflow = "";
                body.style.display = "none";
              },
            },
          );
        }
      }

      function toggle(open) {
        isCollapsed = !open;
        wrapper.classList.toggle("nextsaas-toc--collapsed", !open);
        setAria(open);
        animate(open);
      }

      wrapper.classList.remove("nextsaas-toc--collapsed");
      body.style.height = "auto";
      setAria(true);

      if (expandBtn) {
        expandBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (isCollapsed) toggle(true);
        });
        expandBtn.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(true);
          }
        });
      }
      if (collapseBtn) {
        collapseBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (!isCollapsed) toggle(false);
        });
        collapseBtn.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(false);
          }
        });
      }
      if (header) {
        header.addEventListener("click", function (e) {
          if (expandBtn && expandBtn.contains(e.target)) return;
          if (collapseBtn && collapseBtn.contains(e.target)) return;
          e.preventDefault();
          toggle(isCollapsed);
        });
        header.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(isCollapsed);
          }
        });
      }
    },
    StairCard: function ($scope) {
      if (typeof gsap === "undefined") return;

      const root = $scope?.[0] ? $scope[0] : null;
      if (!root?.querySelectorAll) return;

      if (typeof ScrollTrigger !== "undefined" && typeof gsap.registerPlugin === "function") {
        try {
          gsap.registerPlugin(ScrollTrigger);
        } catch (e) {
          console.error(e);
        }
      }
      
      const hasScrollTrigger =
        typeof ScrollTrigger !== "undefined" && ScrollTrigger && typeof ScrollTrigger.create === "function";

      const containers = root.querySelectorAll("[data-stairs-wrapper]");
      if (!containers.length) return;

      if (hasScrollTrigger && typeof ScrollTrigger.getAll === "function") {
        ScrollTrigger.getAll().forEach(function (st) {
          if (st?.trigger && root.contains(st.trigger)) st.kill();
        });
      }

      containers.forEach(function (container) {
        const cardSelector = container.dataset.stairsWrapper;
        if (!cardSelector) return;

        const cards = container.querySelectorAll(cardSelector);
        if (!cards.length) return;

        const baseOffset =
          container.dataset.baseOffset == null
            ? 150
            : Number.parseFloat(container.dataset.baseOffset);
        const stepOffset =
          container.dataset.stepOffset == null
            ? 22
            : Number.parseFloat(container.dataset.stepOffset);
        const duration =
          container.dataset.duration == null ? 1 : Number.parseFloat(container.dataset.duration);
        const stagger =
          container.dataset.stagger == null ? 0.1 : Number.parseFloat(container.dataset.stagger);
        const start = container.dataset.start || "top 80%";
        const end = container.dataset.end || "top 10%";
        const useScrub = !(
          container.dataset.scrub == null || container.dataset.scrub === "false"
        );
        const once = !(container.dataset.once == null || container.dataset.once === "false");

        cards.forEach(function (card, index) {
          const offsetY = baseOffset + index * stepOffset;
          gsap.set(card, { y: offsetY });
        });

        const animationProps = {
          y: 0,
          duration: duration,
          ease: "power3.out",
          stagger: stagger,
        };

        if (hasScrollTrigger) {
          animationProps.scrollTrigger = {
            trigger: container,
            start: start,
            end: end,
            once: once,
          };

          if (useScrub) {
            animationProps.scrollTrigger.scrub = true;
          }
        }

        gsap.to(cards, animationProps);
      });
    },
    ExpandCard: function ($scope) {
      const root =
        $scope?.[0]?.querySelectorAll
          ? $scope[0]
          : document;

      const partnerShipCards = root.querySelectorAll(".partner-ship-card");
      if (!partnerShipCards.length) return;

      partnerShipCards.forEach((card) => {
        if (card.dataset.expandCardBound) return;
        card.dataset.expandCardBound = "true";

        card.addEventListener("mouseenter", function () {
          partnerShipCards.forEach((c) =>
            c.classList.remove("active-partner-ship-card"),
          );
          this.classList.add("active-partner-ship-card");
        });
      });
    },
    PostFilter: function ($scope) {
      gsap.registerPlugin(Flip);

      const categoriesBtn = gsap.utils.toArray('[data-flip-id]');
      const flipCardItems = gsap.utils.toArray('[data-flip-item]');

      const cardContainer = document.querySelector('[data-cards-container]');

      function setActiveButton(activeBtn) {
        categoriesBtn.forEach((btn) => btn.removeAttribute('data-state'));
        if (activeBtn) activeBtn.setAttribute('data-state', 'selected');
      }

      function updateFilters() {
        const clickedBtn = this;
        const categoryId = clickedBtn?.dataset?.flipId || 'all';

        const currentContainerHeight = cardContainer ? cardContainer.offsetHeight : 0;

        const state = Flip.getState(flipCardItems);

        if (cardContainer) {
          cardContainer.style.height = `${currentContainerHeight}px`;
        }

        flipCardItems.forEach((item) => {
          const itemCategory = item.dataset.flipCategory;
          const match = categoryId === 'all' || itemCategory === categoryId;
          item.style.display = match ? 'block' : 'none';
        });

        Flip.from(state, {
          duration: 0.8,
          scale: true,
          absolute: true,
          ease: 'power1.inOut',
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, scale: 0.98 },
              { opacity: 1, scale: 1, duration: 0.1 }
            ),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.98, duration: 0.3 }),
          onComplete: () => {
            if (cardContainer) cardContainer.style.height = '';
            // Recalculate ScrollTrigger positions so sections below
            if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
            }
          },
        });

        setActiveButton(clickedBtn);
      }

      categoriesBtn.forEach((btn) => btn.addEventListener('click', updateFilters));

      const allBtn = document.querySelector('[data-flip-id="all"]');
      if (allBtn) setActiveButton(allBtn);
    },

    PromptBox: function ($scope) {
      const root = $scope && $scope[0] ? $scope[0] : $scope;
      if (!root) return;

      const textareas = root.querySelectorAll('[data-auto-grow]');
      if (!textareas.length) return;

      textareas.forEach((textarea) => {
        const setHeight = () => {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        };

        textarea.addEventListener('input', setHeight);
        setHeight();
      });
    },

    TypeWriteAnimation: function ($scope) {
      const root = $scope && $scope[0] ? $scope[0] : $scope;
      if (!root) return;

      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const containers = root.querySelectorAll('[data-typewriter]');
      if (!containers.length) return;

      containers.forEach((container) => {
        const typewriterElement = container.querySelector('[data-typewriter-text]');

        if (!typewriterElement) {
          return;
        }

        const duration = Number.parseFloat(container.dataset.duration) || 3;

        const isFormElementWithPlaceholder =
          (typewriterElement.tagName === 'INPUT' || typewriterElement.tagName === 'TEXTAREA') &&
          typewriterElement.placeholder;

        if (isFormElementWithPlaceholder) {
          const formElement = typewriterElement;
          const originalPlaceholder = formElement.placeholder;
          const placeholderText = originalPlaceholder;

          formElement.placeholder = '';

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              once: true,
            },
          });

          const typingDuration = duration;
          const charDelay = typingDuration / placeholderText.length;

          placeholderText.split('').forEach((char, index) => {
            tl.call(
              () => {
                formElement.placeholder += char;
              },
              null,
              index * charDelay
            );
          });
        } else if (typeof SplitText !== 'undefined') {
          const split = new SplitText(typewriterElement, {
            type: 'chars',
            tag: 'span',
          });

          gsap.set(split.chars, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              once: true,
            },
          });

          const typingDuration = duration;
          const charDelay = typingDuration / split.chars.length;

          split.chars.forEach((char, index) => {
            tl.to(char, { opacity: 1, duration: 0.01 }, index * charDelay);
          });
        }
      });
    },

    PromptBoxFileAttachment: function ($scope) {
      const root = $scope && $scope[0] ? $scope[0] : $scope;
      if (!root) return;

      const fileUploadContainers = root.querySelectorAll('.file-upload-label');
      if (!fileUploadContainers.length) return;

      const hasGsap = typeof gsap !== 'undefined';

      const initFileUpload = (container) => {
        if (container.hasAttribute('data-file-upload-initialized')) return;
        container.setAttribute('data-file-upload-initialized', 'true');

        const fileInput = container.querySelector('input[type="file"]');
        const fileIcon = container.querySelector('.file-upload-icon');
        const fileNameWrapper = container.querySelector('.file-upload-filename');
        const fileName = container.querySelector('.file-upload-name');
        const removeButton = container.querySelector('.file-upload-remove-btn');

        if (!fileInput || !fileIcon || !fileNameWrapper || !fileName || !removeButton) return;

        const handleFileSelect = (event) => {
          const file = event.target.files && event.target.files[0];
          if (!file) return;

          fileName.textContent = file.name;

          fileIcon.classList.add('hidden');
          fileNameWrapper.classList.remove('hidden');
          fileNameWrapper.classList.add('flex');
          container.classList.remove('size-9', 'min-w-9');
          container.classList.add('h-9', 'min-w-fit');

          if (!hasGsap) {
            return;
          }

          const finalWidth = container.offsetWidth;
          gsap.fromTo(
            container,
            { width: '36px' },
            { width: finalWidth, duration: 0.3, ease: 'linear' }
          );

          gsap.fromTo(
            fileNameWrapper,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' }
          );
        };

        const handleFileRemove = (event) => {
          event.preventDefault();
          event.stopPropagation();

          const resetState = () => {
            fileNameWrapper.classList.add('hidden');
            fileNameWrapper.classList.remove('flex');
            fileIcon.classList.remove('hidden');
            fileInput.value = '';
            container.classList.remove('h-9', 'min-w-fit');
            container.classList.add('size-9', 'min-w-9');
            if (hasGsap) {
              gsap.set(container, { clearProps: 'width' });
            } else {
              container.style.removeProperty('width');
            }
          };

          if (!hasGsap) {
            resetState();
            return;
          }

          gsap.to(fileNameWrapper, {
            opacity: 0,
            x: -10,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
              fileNameWrapper.classList.add('hidden');
              fileNameWrapper.classList.remove('flex');
              fileIcon.classList.remove('hidden');
              fileInput.value = '';

              gsap.to(container, {
                width: '36px',
                duration: 0.3,
                ease: 'power3.out',
                onComplete: () => {
                  container.classList.remove('h-9', 'min-w-fit');
                  container.classList.add('size-9', 'min-w-9');
                  gsap.set(container, { clearProps: 'width' });
                },
              });

              gsap.fromTo(
                fileIcon,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
              );
            },
          });
        };

        fileInput.addEventListener('change', handleFileSelect);
        removeButton.addEventListener('click', handleFileRemove);
      };

      fileUploadContainers.forEach(initFileUpload);
    }
  };
  $(window).on("elementor/frontend/init", Nextsaas.init);

  //MailChimp Newsletter
  $("[data-nextsaas-form]").each(function () {
    var $this = $(this);
    $(".form-result", $this).css("display", "none");
    $this.submit(function () {
      $('button[type="submit"]', $this).addClass("clicked"); // Create a object and assign all fields name and value.

      var values = {};
      $("[name]", $this).each(function () {
        var $this = $(this),
          $name = $this.attr("name"),
          $value = $this.val();
        values[$name] = $value;
      }); // Make Request

      $.ajax({
        url: nextsaas_elementor.ajax_url,
        type: "POST",
        data: values,
        success: function success(data) {
          if (data.error == true) {
            $(".form-result", $this)
              .addClass("alert-warning")
              .removeClass("alert-success alert-danger")
              .css("display", "block");
          } else {
            $(".form-result", $this)
              .addClass("alert-success")
              .removeClass("alert-warning alert-danger")
              .css("display", "block");
            $this.trigger("reset");
          }

          $(".form-result > .content", $this).html(data.message);
          $('button[type="submit"]', $this).removeClass("clicked");
        },
        error: function error() {
          $(".form-result", $this)
            .addClass("alert-danger")
            .removeClass("alert-warning alert-success")
            .css("display", "block");
          $(".form-result > .content", $this).html("Sorry, an error occurred.");
          $('button[type="submit"]', $this).removeClass("clicked");
        },
      });
      return false;
    });
  });
})(jQuery, window.elementorFrontend);
