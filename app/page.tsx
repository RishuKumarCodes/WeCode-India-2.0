"use client";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingPhases } from "@/components/landing/landing-phases";
import { LandingCTA } from "@/components/landing/landing-cta";
import Roadmap from "@/components/landing/roadmap";
import Domains from "@/components/landing/domains";
import Testimonials from "@/components/landing/testimonials";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <LandingHero />
      {/* {session ? (
        <div className="text-center my-4">
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="text-center my-4">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 px-4 py-2 text-white rounded mr-2"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="bg-gray-800 px-4 py-2 text-white rounded"
          >
            Sign in with GitHub
          </button>
        </div>
      )} */}
      <LandingFeatures />
      <Roadmap />
      <LandingPhases />
      <Domains />
      <Testimonials />
      <LandingCTA />
    </div>
  );
}
