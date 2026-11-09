'use client';

import React from 'react';
import { faqData } from '@/data/faqData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState(0);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <div className="elementor-element elementor-element-6f33cc6 e-flex e-con-boxed nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-parent" data-e-type="container" data-element_type="container" data-id="6f33cc6">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-2845308 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="2845308">
          <div className="elementor-element elementor-element-e096104 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="e096104">
            <div className="gsap-animation elementor-element elementor-element-9c45f7b e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.1" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="9c45f7b" data-offset="60" data-rotation="0">
              <div className="elementor-element elementor-element-24aae4c nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="24aae4c" data-widget_type="image.default">
                <img alt="" className="attachment-full size-full wp-image-47415" decoding="async" height="32" loading="lazy" src="/images/Star-9-2.png" width="31" />
                               </div>
              <div className="elementor-element elementor-element-19755f5 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="19755f5" data-widget_type="nextsaas-heading.default">
                <div className="elementor-widget-container">
                  <div className="nextsaas_heading_wrap nextsaas-element">
                    <p className="font-medium mb-4 nextsaas_heading">FAQ’s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gsap-animation elementor-element elementor-element-a8be779 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.2" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="a8be779" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
              <div className="elementor-widget-container">
                <div className="nextsaas_heading_wrap nextsaas-element">
                  <h2 className="font-medium mb-4 nextsaas_heading">Frequently asked questions</h2>
                </div>
              </div>
            </div>
            <div className="gsap-animation elementor-element elementor-element-28221fb nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.3" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="28221fb" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
              <div className="elementor-widget-container">
                <div className="nextsaas_heading_wrap nextsaas-element">
                  <p className="font-medium mb-4 nextsaas_heading">Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.</p>
                </div>
              </div>
            </div>
            <div className="gsap-animation elementor-element elementor-element-74eba7f nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-delay="0.4" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="74eba7f" data-offset="60" data-rotation="0" data-widget_type="image.default">
              <img alt="" className="attachment-full size-full wp-image-47416" decoding="async" height="984" loading="lazy" sizes="(max-width: 1174px) 100vw, 1174px" src="/images/faq-img-02.png" srcSet="/images/faq-img-02.png 1174w, /images/faq-img-02-300x251.png 300w, /images/faq-img-02-1024x858.png 1024w, /images/faq-img-02-768x644.png 768w, /images/faq-img-02-239x200.png 239w" width="1174" />
                           </div>
          </div>
          <div className="gsap-animation elementor-element elementor-element-1b1f725 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.3" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="1b1f725" data-offset="60" data-rotation="0">
            <div className="elementor-element elementor-element-df5c058 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_accordion" data-e-type="widget" data-element_type="widget" data-id="df5c058" data-widget_type="nextsaas_accordion.default">
              <div className="elementor-widget-container">
                <div className="nextsaas_accordion_wrapper" data-layout="layout-1">
                  {/* faq items */}
                  <div className="accordion w-full mx-auto flex flex-col">
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item active-accordion">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">What is the capital of France?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">How does photosynthesis work?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">What are the benefits of regular exercise?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">Who wrote 'Pride and Prejudice'?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">What is the importance of the water cycle?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">What are the main causes of climate change?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">What is the process of cellular respiration?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
                        </div>
                      </div>
                    </div>
                    <div className="dark:bg-background-7 bg-white rounded-[20px] px-6 sm:px-8 accordion-item">
                      <button className="accordion-action flex items-center cursor-pointer justify-between sm:pt-8 pt-5 sm:pb-8 pb-5 w-full">
                        <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">How do vaccines work to protect against diseases?</span>
                        {/* Accordion Icon */}
                        <span className="sm:ml-auto ml-2.5 block accordion-arrow text-secondary">
                          <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5">
                            </path>
                          </svg>
                        </span>
                      </button>
                      <div className="accordion-content">
                        <div className="sm:pt-6 pt-5 sm:pb-8 pb-5">
                          <p>When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.</p>
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
    </div>
  );
}
