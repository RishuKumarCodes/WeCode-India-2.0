import { LandingHero } from '@/components/landing/landing-hero';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingPhases } from '@/components/landing/landing-phases';
import { LandingCTA } from '@/components/landing/landing-cta';
import Roadmap from '@/components/landing/roadmap';
import Domains from '@/components/landing/domains';
import Testimonials from '@/components/landing/testimonials';

export default function Home() {
  return (
    <div className="flex flex-col">
      <LandingHero />
      <LandingFeatures />
      <Roadmap />
      <LandingPhases />
      <Domains />
      <Testimonials />
      <LandingCTA />
    </div>
  );
}