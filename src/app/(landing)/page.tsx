import {
  HeroSection,
  FeaturesSection,
  CTASection,
  FooterSection,
} from "@components/navigation/landing-sections";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
