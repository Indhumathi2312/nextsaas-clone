'use client';

import React, { useState } from 'react';
import { footerData } from '@/data/footerData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="nextsass-footer" className="nextsass-footer" style={{'backgroundColor': '#ffffff'}}>
      <div data-elementor-type="wp-post" data-elementor-id="47480" className="elementor elementor-47480">
        <div className="elementor-element elementor-element-66e79f1b e-flex e-con-boxed nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-parent" data-id="66e79f1b" data-element_type="container" data-e-type="container">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-46996431 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="46996431" data-element_type="container" data-e-type="container">
              <div className="gsap-animation elementor-element elementor-element-443e3fe7 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.1" data-direction="down" data-offset="60" data-rotation="0" data-id="443e3fe7" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-6af50e78 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="6af50e78" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                  <div className="elementor-widget-container">
                    <div className="nextsaas_heading_wrap nextsaas-element">
                      <h3 className="font-medium mb-4 nextsaas_heading">Join our newsletter</h3>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-231c2694 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="231c2694" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                  <div className="elementor-widget-container">
                    <div className="nextsaas_heading_wrap nextsaas-element">
                      <p className="font-medium mb-4 nextsaas_heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gsap-animation elementor-element elementor-element-67ee8579 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.2" data-direction="down" data-offset="60" data-rotation="0" data-id="67ee8579" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-d6ccc1d nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-newsletter" data-id="d6ccc1d" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-newsletter.default">
                  <div className="elementor-widget-container">
                    <div className="nextsaas_newsletter_wrapper">
                      <form action="" method="post" className="newsletter-form" data-nextsaas-form="newsletter-subscribe">
                        <div className="flex items-center flex-col gap-5 sm:flex-row justify-start lg:gap-3 newsletter-form-inner">
                          <input type="email" name="email" placeholder="Enter your email" required="" className="px-[18px] shadow-1 h-12 py-3 placeholder:text-secondary/50 rounded-full border border-stroke-1 lg:max-w-[340px] md:w-[71%] w-full max-[376px]:w-full dark:border-stroke-7 dark:placeholder:text-accent/60 focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 dark:text-accent placeholder:font-normal font-normal" />
                          <input type="hidden" name="action" value="nextsaas_mailchimp_subscribe" />
                          <button type="submit" className="nextsaas-newsletter-btn btn-v6 group bg-background-6 hover:bg-background-4 border-stroke-3/18 relative flex max-h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-[13px] transition-all duration-300 ease-in-out">
                            <div className="relative overflow-hidden">
                              <div className="h-5.5 flex items-center justify-center">
                                <div className="font-ibm-plex-mono text-tagline-2 button-v6-upper-text block cursor-pointer leading-[1.4] font-medium text-nowrap text-white/90">Learn more</div>
                              </div>
                              <div className="absolute h-5.5 flex items-center justify-center">
                                <div className="font-ibm-plex-mono text-tagline-2 button-v6-lower-text block cursor-pointer leading-[1.4] font-medium text-nowrap text-white/90">Learn more</div>
                              </div>
                            </div>
                            <div className="relative mt-[2px] flex size-6 items-center justify-center overflow-hidden">
                              {/* arrow */}
                              <span className="ease-custom-ease-1 absolute translate-x-0 stroke-white/90 stroke-[1.5px] transition-all duration-500 group-hover:translate-x-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                  </path>
                                </svg>
                              </span>
                              {/* arrow */}
                              <span className="ease-custom-ease-1 absolute -translate-x-6 stroke-white/90 stroke-[1.5px] transition-all duration-500 group-hover:translate-x-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                  </path>
                                </svg>
                              </span>
                            </div>
                          </button>
                        </div>
                        <div className="form-result alert mt-3">
                          <div className="content">
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-5f2dd090 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="5f2dd090" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                  <div className="elementor-widget-container">
                    <div className="nextsaas_heading_wrap nextsaas-element">
                      <p className="font-medium mb-4 nextsaas_heading">
                        
				By subscribing you agree to with our                         <span className="text-primary-500 highlited-text">Privacy Policy</span>
                                               </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gsap-animation elementor-element elementor-element-197fc77e elementor-widget-divider--view-line nextsaas-filter-effect-no elementor-widget elementor-widget-divider" data-gsap-animate="true" data-duration="0.6" data-delay="0.1" data-direction="down" data-offset="60" data-rotation="0" data-id="197fc77e" data-element_type="widget" data-e-type="widget" data-widget_type="divider.default">
              <div className="elementor-divider">
                <span className="elementor-divider-separator">
                </span>
              </div>
            </div>
            <div className="elementor-element elementor-element-464ac9d7 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="464ac9d7" data-element_type="container" data-e-type="container">
              <div className="gsap-animation elementor-element elementor-element-508a3869 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.1" data-direction="down" data-offset="60" data-rotation="0" data-id="508a3869" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-5a2ac528 nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-id="5a2ac528" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                  <img width="153" height="44" src="/images/Nexsas_White-1.svg" className="attachment-large size-large wp-image-47484" alt="" />
                                   </div>
                <div className="elementor-element elementor-element-6b247a46 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="6b247a46" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-1266ae2b nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="1266ae2b" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">Address:</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-5dee157 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="5dee157" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">30 North Gould Street, Sheridan, WY 8280</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-7b73b2d5 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="7b73b2d5" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-6a7f4fdb nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="6a7f4fdb" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">Contact:</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-361bbf18 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="361bbf18" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">+1 (202) 555-0130</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-75986184 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="75986184" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">hello@pixels71.com</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-10266374 elementor-icon-list--layout-inline elementor-align-start elementor-list-item-link-full_width nextsaas-filter-effect-no elementor-widget elementor-widget-icon-list" data-id="10266374" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
                  <ul className="elementor-icon-list-items elementor-inline-items">
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-icon">
                          <i aria-hidden="true" className="ph ph-facebook-logo">
                          </i>
                                                   </span>
                        <span className="elementor-icon-list-text">
                        </span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-icon">
                          <i aria-hidden="true" className="ph ph-instagram-logo">
                          </i>
                                                   </span>
                        <span className="elementor-icon-list-text">
                        </span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-icon">
                          <i aria-hidden="true" className="ph ph-youtube-logo">
                          </i>
                                                   </span>
                        <span className="elementor-icon-list-text">
                        </span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-icon">
                          <i aria-hidden="true" className="ph ph-x-logo">
                          </i>
                                                   </span>
                        <span className="elementor-icon-list-text">
                        </span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-icon">
                          <i aria-hidden="true" className="ph ph-linkedin-logo">
                          </i>
                                                   </span>
                        <span className="elementor-icon-list-text">
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="elementor-element elementor-element-3dc2380 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="3dc2380" data-element_type="container" data-e-type="container">
                <div className="gsap-animation elementor-element elementor-element-32e0d8c6 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.4" data-direction="down" data-offset="60" data-rotation="0" data-id="32e0d8c6" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-5b38454c nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="5b38454c" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">Company</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-36ecc03b nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_menu" data-id="36ecc03b" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas_menu.default">
                    <div className="elementor-widget-container">
                      <nav className="nextsaas-menu nextsaas-menu-footer">
                        <ul id="menu-footer-menu-1" className="menu">
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">About Us</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Career</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Contact Us</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Pricing</a>
                          </li>
                        </ul>
                      </nav>
                                           </div>
                  </div>
                </div>
                <div className="gsap-animation elementor-element elementor-element-7289bf0c e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.5" data-direction="down" data-offset="60" data-rotation="0" data-id="7289bf0c" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-12a541fc nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="12a541fc" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">Support</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-224b89e9 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_menu" data-id="224b89e9" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas_menu.default">
                    <div className="elementor-widget-container">
                      <nav className="nextsaas-menu nextsaas-menu-footer">
                        <ul id="menu-footer-menu-2" className="menu">
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Documentation</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Tutorial</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Support</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Blog</a>
                          </li>
                        </ul>
                      </nav>
                                           </div>
                  </div>
                </div>
                <div className="gsap-animation elementor-element elementor-element-ad0e4c7 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-gsap-animate="true" data-duration="0.6" data-delay="0.6" data-direction="down" data-offset="60" data-rotation="0" data-id="ad0e4c7" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-368240bc nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="368240bc" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <h2 className="font-medium mb-4 nextsaas_heading">Legal Policies</h2>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-341c3ee6 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_menu" data-id="341c3ee6" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas_menu.default">
                    <div className="elementor-widget-container">
                      <nav className="nextsaas-menu nextsaas-menu-footer">
                        <ul id="menu-footer-menu-3" className="menu">
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Terms & Conditions</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Privacy Policy</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Refund Policy</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">GDPR Compliance</a>
                          </li>
                          <li>
                            <a href="#" className="nextsaas-menu-item footer-link">Affiliate Policy</a>
                          </li>
                        </ul>
                      </nav>
                                           </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-6d422a96 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="6d422a96" data-element_type="container" data-e-type="container">
              <div className="gsap-animation elementor-element elementor-element-5c886990 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-gsap-animate="true" data-duration="0.6" data-delay="0.1" data-direction="down" data-offset="60" data-rotation="0" data-id="5c886990" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                <div className="elementor-widget-container">
                  <div className="nextsaas_heading_wrap nextsaas-element">
                    <h1 className="font-medium mb-4 nextsaas_heading nextsaas-heading-shuffle-enabled">Nexsas</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-1e01cda9 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="1e01cda9" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-78791679 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="78791679" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-67bc0d1a nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-id="67bc0d1a" data-element_type="widget" data-e-type="widget" data-widget_type="nextsaas-heading.default">
                  <div className="elementor-widget-container">
                    <div className="nextsaas_heading_wrap nextsaas-element">
                      <p className="font-medium mb-4 nextsaas_heading">©2026 pixels71. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-ac75905 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-id="ac75905" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-4a03535e elementor-icon-list--layout-inline elementor-list-item-link-full_width nextsaas-filter-effect-no elementor-widget elementor-widget-icon-list" data-id="4a03535e" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
                  <ul className="elementor-icon-list-items elementor-inline-items">
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-text">Privacy Policy</span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-text">Terms of Service</span>
                      </a>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <a href="#">
                        <span className="elementor-icon-list-text">Cookies Settings</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-544b1dcb elementor-absolute e-transform nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-id="544b1dcb" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
              <img width="1600" height="1016" src="/images/opai-1-scaled-1.png" className="attachment-full size-full wp-image-47485" alt="" srcSet="/images/opai-1-scaled-1.png 1600w, /images/opai-1-scaled-1-300x191.png 300w, /images/opai-1-scaled-1-1024x650.png 1024w, /images/opai-1-scaled-1-768x488.png 768w, /images/opai-1-scaled-1-315x200.png 315w, /images/opai-1-scaled-1-1536x975.png 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />
                           </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
