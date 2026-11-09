'use client';

import React from 'react';
import { pricingData } from '@/data/pricingData';

export default function PricingSection() {
  const [isYearly, setIsYearly] = React.useState(false);
  return (
    <div className="elementor-element elementor-element-71cc939 e-flex e-con-boxed nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-parent" data-e-type="container" data-element_type="container" data-id="71cc939" id="pricing">
      <div className="e-con-inner">
        <div className="gsap-animation elementor-element elementor-element-1f888a3b nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.1" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="1f888a3b" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
          <div className="elementor-widget-container">
            <div className="nextsaas_heading_wrap nextsaas-element">
              <h2 className="font-medium mb-4 nextsaas_heading">What’s included in every plan</h2>
            </div>
          </div>
        </div>
        <div className="gsap-animation elementor-element elementor-element-3d71ab7d nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.2" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="3d71ab7d" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
          <div className="elementor-widget-container">
            <div className="nextsaas_heading_wrap nextsaas-element">
              <p className="font-medium mb-4 nextsaas_heading">Core Benefits for Every Plan</p>
            </div>
          </div>
        </div>
        <div className="gsap-animation elementor-element elementor-element-4c7582eb e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.3" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="4c7582eb" data-offset="60" data-rotation="0">
          <div className="elementor-element elementor-element-156cb408 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="156cb408">
            <div className="elementor-element elementor-element-4819113a nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_pricing_table" data-e-type="widget" data-element_type="widget" data-id="4819113a" data-widget_type="nextsaas_pricing_table.default">
              <div className="elementor-widget-container">
                <div className="nextsaas_pricing_table_wrapper">
                  <div className="nextsaas_pricing_table_layout_2 w-full space-y-18" id="nextsaas-pt-toggle-4819113a">
                    {/* Pricing cards: column 1 blank, cards start from column 2 */}
                    <div className="grid w-full grid-cols-1 gap-4 md:gap-0 md:grid-cols-3">
                      <div aria-hidden="true" className="hidden min-h-0 md:block">
                      </div>
                      <div className="bg-background-6 pricing-card w-full space-y-[29px] rounded-lg md:rounded-none md:rounded-l-lg px-8 pt-8 pb-6">
                        <p className="nextsaas-pricing-plan-title font-inter-tight text-tagline-2 text-background-7 font-normal">Basic</p>
                        <div className="space-y-3">
                          <div aria-live="polite" className="monthly">
                            <h3 className="nextsaas-pricing-plan-price font-instrument-serif text-is-heading-2 text-white/90">$19</h3>
                            <p className="nextsaas-pricing-plan-desc font-inter-tight text-tagline-2 w-full max-w-[180px] font-normal text-white/60">One time payment plus local taxes</p>
                          </div>
                          <div aria-live="polite" className="yearly hidden">
                            <h3 className="nextsaas-pricing-plan-price font-instrument-serif text-is-heading-2 text-white/90">$119</h3>
                            <p className="nextsaas-pricing-plan-desc font-inter-tight text-tagline-2 w-full max-w-[180px] font-normal text-white/60">One time payment plus local taxes</p>
                          </div>
                        </div>
                        <a className="nextsaas-button group bg-background-7 hover:border-stroke-3 relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-transparent px-6 py-[13px] transition-all duration-300 ease-in-out" href="#">
                          <div className="h-full max-h-5 overflow-hidden">
                            <span className="font-ibm-plex-mono text-background-13/90 text-tagline-2 block -translate-y-0.5 font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">Get Started</span>
                            <span className="font-ibm-plex-mono text-tagline-2 block font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">Get Started</span>
                          </div>
                          <div className="relative mt-[1.5px] flex size-6 items-center justify-center overflow-hidden">
                            {/* circle */}
                            <span className="button-v8-circle bg-background-6 absolute size-[22px] translate-x-0 rounded-full transition-all duration-400 ease-in-out">
                              {/* inner arrow */}
                              <span className="button-v8-arrow stroke-background-10 absolute size-[16px] translate-x-[2.5px] translate-y-0.5 scale-95 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-6">
                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                  </path>
                                </svg>
                              </span>
                            </span>
                            {/* outer arrow */}
                            <span className="button-v8-arrow stroke-background-10 absolute size-[16px] -translate-x-6 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-0">
                              <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                              </svg>
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className="bg-background-6 pricing-card w-full space-y-[29px] rounded-lg md:rounded-none md:rounded-r-lg px-8 pt-8 pb-6">
                        <p className="nextsaas-pricing-plan-title font-inter-tight text-tagline-2 text-background-7 font-normal">Enterprise</p>
                        <div className="space-y-3">
                          <div aria-live="polite" className="monthly">
                            <h3 className="nextsaas-pricing-plan-price font-instrument-serif text-is-heading-2 text-white/90">$49</h3>
                            <p className="nextsaas-pricing-plan-desc font-inter-tight text-tagline-2 w-full max-w-[180px] font-normal text-white/60">One time payment plus local taxes</p>
                          </div>
                          <div aria-live="polite" className="yearly hidden">
                            <h3 className="nextsaas-pricing-plan-price font-instrument-serif text-is-heading-2 text-white/90">$499</h3>
                            <p className="nextsaas-pricing-plan-desc font-inter-tight text-tagline-2 w-full max-w-[180px] font-normal text-white/60">One time payment plus local taxes</p>
                          </div>
                        </div>
                        <a className="nextsaas-button group bg-background-7 hover:border-stroke-3 relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-transparent px-6 py-[13px] transition-all duration-300 ease-in-out" href="#">
                          <div className="h-full max-h-5 overflow-hidden">
                            <span className="font-ibm-plex-mono text-background-13/90 text-tagline-2 block -translate-y-0.5 font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">Get Started</span>
                            <span className="font-ibm-plex-mono text-tagline-2 block font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">Get Started</span>
                          </div>
                          <div className="relative mt-[1.5px] flex size-6 items-center justify-center overflow-hidden">
                            {/* circle */}
                            <span className="button-v8-circle bg-background-6 absolute size-[22px] translate-x-0 rounded-full transition-all duration-400 ease-in-out">
                              {/* inner arrow */}
                              <span className="button-v8-arrow stroke-background-10 absolute size-[16px] translate-x-[2.5px] translate-y-0.5 scale-95 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-6">
                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                  </path>
                                </svg>
                              </span>
                            </span>
                            {/* outer arrow */}
                            <span className="button-v8-arrow stroke-background-10 absolute size-[16px] -translate-x-6 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-0">
                              <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                              </svg>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                    {/* Feature comparison: 3 columns with border separators */}
                    <div aria-labelledby="layout-2-features-heading" className="w-full">
                      <h3 className="sr-only" id="layout-2-features-heading">Feature comparison table</h3>
                      <div className="w-full border-b border-stroke-1/11 nextsaas-l2-border py-5">
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Smart Discount Suggestions</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: 10" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">10</span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Enterprise: 25" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">25</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">AI-Driven Revenue Forecasting</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Competitive Price Tracking</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Customer Behavior Analysis</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Intelligent Pricing Strategies</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-b border-stroke-1/11 nextsaas-l2-border py-5">
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Rule-based Automation</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: 5 Rules" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">5 Rules</span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Enterprise: Unlimited Rules" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Unlimited Rules</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Custom Pricing Rules</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Bulk Price Updates</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Scheduled Adjustments</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Fail-safe Price Limits</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-b border-stroke-1/11 nextsaas-l2-border py-5">
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Performance Analyticsv</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: Basic Reports" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Basic Reports</span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Enterprise: Advanced Reports" className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Advanced Reports</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Revenue Impact Tracking</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Competitor Price Monitoring</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Historical Price Reports</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 w-full items-stretch">
                          <div className="col-span-4 border-r border-stroke-1/11 nextsaas-l2-border pr-4 md:pr-6 py-4 flex items-center">
                            <span className="nextsaas-pricing-feature-name font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">Exportable Data Insights</span>
                          </div>
                          <div aria-label="Basic plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center border-r border-stroke-1/11 nextsaas-l2-border">
                            <span aria-label="Basic: " className="nextsaas-pricing-feature-value font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/90">
                            </span>
                          </div>
                          <div aria-label="Enterprise plan feature" className="col-span-4 px-4 md:px-6 py-4 flex items-center justify-center text-center">
                            <span aria-label="Included" className="nextsaas-feature-icon inline-flex items-center justify-center text-white">
                              <i aria-hidden="true" className="h-3 w-[17px] shrink-0 ph ph-check">
                              </i>
                                                           </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-766da1d0 elementor-absolute e-transform nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="766da1d0" data-widget_type="image.default">
          <img alt="" className="attachment-full size-full wp-image-47637" decoding="async" height="1764" loading="lazy" sizes="(max-width: 2560px) 100vw, 2560px" src="/images/Gradient-ai-mark-top-scaled.png" srcSet="/images/Gradient-ai-mark-top-scaled.png 2560w, /images/Gradient-ai-mark-top-300x207.png 300w, /images/Gradient-ai-mark-top-1024x706.png 1024w, /images/Gradient-ai-mark-top-768x529.png 768w, /images/Gradient-ai-mark-top-290x200.png 290w, /images/Gradient-ai-mark-top-1536x1058.png 1536w, /images/Gradient-ai-mark-top-2048x1411.png 2048w" width="2560" />
                   </div>
      </div>
    </div>
  );
}
