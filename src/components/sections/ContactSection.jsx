'use client';

import React from 'react';
import { contactData } from '@/data/contactData';

export default function ContactSection() {
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="elementor-element elementor-element-7a453e28 e-flex e-con-boxed nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-parent" data-e-type="container" data-element_type="container" data-id="7a453e28" id="contact">
      <div className="e-con-inner">
        <div className="gsap-animation elementor-element elementor-element-38f48390 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.1" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="38f48390" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
          <div className="elementor-widget-container">
            <div className="nextsaas_heading_wrap nextsaas-element">
              <h2 className="font-medium mb-4 nextsaas_heading">Let’s talk, we’re here to help</h2>
            </div>
          </div>
        </div>
        <div className="gsap-animation elementor-element elementor-element-5743e2a nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.2" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="5743e2a" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
          <div className="elementor-widget-container">
            <div className="nextsaas_heading_wrap nextsaas-element">
              <p className="font-medium mb-4 nextsaas_heading">Got any questions or how OptimAI can help your business thrive? We're here for you.</p>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-64a68d9e e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="64a68d9e">
          <div className="elementor-element elementor-element-5672741 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="5672741">
            <div className="gsap-animation elementor-element elementor-element-19cfa1f2 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.1" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="19cfa1f2" data-offset="60" data-rotation="0">
              <div className="elementor-element elementor-element-6ad694ce nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="6ad694ce" data-widget_type="image.default">
                <img alt="" className="attachment-full size-full wp-image-47391" decoding="async" height="16" loading="lazy" src="/images/Star-8-1.svg" width="16" />
                               </div>
              <div className="elementor-element elementor-element-748b5011 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="748b5011" data-widget_type="nextsaas-heading.default">
                <div className="elementor-widget-container">
                  <div className="nextsaas_heading_wrap nextsaas-element">
                    <p className="font-medium mb-4 nextsaas_heading">Contact Us</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gsap-animation elementor-element elementor-element-486d856b elementor-widget__width-initial nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-delay="0.2" data-direction="down" data-duration="0.6" data-e-type="widget" data-element_type="widget" data-gsap-animate="true" data-id="486d856b" data-offset="60" data-rotation="0" data-widget_type="nextsaas-heading.default">
              <div className="elementor-widget-container">
                <div className="nextsaas_heading_wrap nextsaas-element">
                  <h2 className="font-medium mb-4 nextsaas_heading">Reach out — We’ll get back within 24 hours</h2>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-5a1052fd e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="5a1052fd">
              <div className="gsap-animation elementor-element elementor-element-19382450 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.3" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="19382450" data-offset="60" data-rotation="0">
                <div className="elementor-element elementor-element-67f42f9c nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="67f42f9c" data-widget_type="image.default">
                  <img alt="" className="attachment-full size-full wp-image-47392" decoding="async" height="36" loading="lazy" src="/images/Email-Icon-1.svg" width="36" />
                                   </div>
                <div className="elementor-element elementor-element-6d888609 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="6d888609">
                  <div className="elementor-element elementor-element-3e9d8ad4 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="3e9d8ad4" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">Email</p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-7ab9aa33 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="7ab9aa33" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">support@optimai.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gsap-animation elementor-element elementor-element-1aeb1c5d e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.4" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="1aeb1c5d" data-offset="60" data-rotation="0">
                <div className="elementor-element elementor-element-74f776c0 nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="74f776c0" data-widget_type="image.default">
                  <img alt="" className="attachment-full size-full wp-image-47393" decoding="async" height="36" loading="lazy" src="/images/Phone-Icon-1.svg" width="36" />
                                   </div>
                <div className="elementor-element elementor-element-dbd3ce6 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="dbd3ce6">
                  <div className="elementor-element elementor-element-552446c8 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="552446c8" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">Phone</p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-1a4412d1 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="1a4412d1" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">support@optimai.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gsap-animation elementor-element elementor-element-509675d4 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.5" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="509675d4" data-offset="60" data-rotation="0">
                <div className="elementor-element elementor-element-502d84c0 nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="502d84c0" data-widget_type="image.default">
                  <img alt="" className="attachment-full size-full wp-image-47394" decoding="async" height="36" loading="lazy" src="/images/Address-Icon-1.svg" width="36" />
                                   </div>
                <div className="elementor-element elementor-element-5758fb41 e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-e-type="container" data-element_type="container" data-id="5758fb41">
                  <div className="elementor-element elementor-element-3f7eafd2 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="3f7eafd2" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">Address</p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-e8fb5d3 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas-heading" data-e-type="widget" data-element_type="widget" data-id="e8fb5d3" data-widget_type="nextsaas-heading.default">
                    <div className="elementor-widget-container">
                      <div className="nextsaas_heading_wrap nextsaas-element">
                        <p className="font-medium mb-4 nextsaas_heading">123 Innovation Street, TechCity, CA 94043</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gsap-animation elementor-element elementor-element-1bfcfffc e-con-full e-flex nextsaas-filter-effect-no nextsaas-custom-background-no nextsaas-custom-border-glow-animation-no nextsaas-custom-glowing-card-no nextsaas-sticky-no e-con e-child" data-delay="0.3" data-direction="down" data-duration="0.6" data-e-type="container" data-element_type="container" data-gsap-animate="true" data-id="1bfcfffc" data-offset="60" data-rotation="0">
            <div className="elementor-element elementor-element-71206f4 nextsaas-filter-effect-no elementor-widget elementor-widget-nextsaas_contact_form" data-e-type="widget" data-element_type="widget" data-id="71206f4" data-widget_type="nextsaas_contact_form.default">
              <div className="elementor-widget-container">
                <div className="nextsaas-contact-form nextsaas-contact-form-7 nextsaas-contact-form-71206f4">
                  <div className="wpcf7 no-js" data-wpcf7-id="12799" dir="ltr" id="wpcf7-f12799-p10-o1" lang="en-US">
                    <div className="screen-reader-response">
                      <p aria-atomic="true" aria-live="polite" role="status">
                      </p>
                                             <ul>
                      </ul>
                    </div>
                    <form action="/ai-marketing-agency-one-page/#wpcf7-f12799-p10-o1" aria-label="Contact form" className="wpcf7-form init" data-status="init" method="post" novalidate="novalidate">
                      <fieldset className="hidden-fields-container">
                        <input name="_wpcf7" type="hidden" value="12799" />
                        <input name="_wpcf7_version" type="hidden" value="6.1.5" />
                        <input name="_wpcf7_locale" type="hidden" value="en_US" />
                        <input name="_wpcf7_unit_tag" type="hidden" value="wpcf7-f12799-p10-o1" />
                        <input name="_wpcf7_container_post" type="hidden" value="10" />
                        <input name="_wpcf7_posted_data_hash" type="hidden" value="" />
                      </fieldset>
                      <label>
                         Name
                            <input aria-invalid="false" aria-required="true" autoComplete="name" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" maxlength="400" name="your-name" placeholder="Enter your Name" size="40" type="text" value="" />
                                               </label>
                      <label>
                         Email
                            <input aria-invalid="false" aria-required="true" autoComplete="email" className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" maxlength="400" name="your-email" placeholder="Enter your email" size="40" type="email" value="" />
                                               </label>
                      <label>
                         Your message
                            <textarea aria-invalid="false" className="wpcf7-form-control wpcf7-textarea" cols="40" maxlength="2000" name="your-message" placeholder="Type your message" rows="10">
                        </textarea>
                                               </label>
                      <span className="wpcf7-form-control wpcf7-acceptance optional">
                        <span className="wpcf7-list-item">
                          <label>
                            <input aria-invalid="false" name="acceptance-907" type="checkbox" value="1" />
                            <span className="wpcf7-list-item-label">I accept the Terms</span>
                          </label>
                        </span>
                      </span>
                      <input className="wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Submit Request" />
                      <div aria-hidden="true" className="wpcf7-response-output">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-27542477 elementor-absolute e-transform nextsaas-filter-effect-no elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="27542477" data-widget_type="image.default">
          <img alt="" className="attachment-full size-full wp-image-47632" decoding="async" height="1041" loading="lazy" sizes="(max-width: 2560px) 100vw, 2560px" src="/images/Gradient-bottom-scaled.png" srcSet="/images/Gradient-bottom-scaled.png 2560w, /images/Gradient-bottom-300x122.png 300w, /images/Gradient-bottom-1024x417.png 1024w, /images/Gradient-bottom-768x312.png 768w, /images/Gradient-bottom-340x138.png 340w, /images/Gradient-bottom-1536x625.png 1536w, /images/Gradient-bottom-2048x833.png 2048w" width="2560" />
                   </div>
      </div>
    </div>
  );
}
