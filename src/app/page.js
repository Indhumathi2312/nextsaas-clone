import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackgroundWrapper from '@/components/sections/BackgroundWrapper';
import HeroSection from '@/components/sections/HeroSection';
import BrandsSection from '@/components/sections/BrandsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingSection from '@/components/sections/PricingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import TeamSection from '@/components/sections/TeamSection';
import BlogSection from '@/components/sections/BlogSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative w-full overflow-x-hidden">
        <BackgroundWrapper />
        <HeroSection />
        <BrandsSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ToolsSection />
        <AboutSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <CertificationsSection />
        <TeamSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
