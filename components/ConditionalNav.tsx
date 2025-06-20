// app/components/ConditionalNav.tsx
"use client";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ConditionalNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide NavBar/Footer on exactly /dsa/topics/[id], e.g. /dsa/topics/123
  // If you also want to hide on nested under that (e.g. /dsa/topics/123/edit), use startsWith.
  const isTopicDetailExact = /^\/dsa\/topics\/[^\/]+$/.test(pathname);
  // or to hide on all deeper nested under topics: 
  // const hideOnAllTopicPaths = pathname.startsWith("/dsa/topics/");

  const hideGlobal = isTopicDetailExact;
  // If you have deeper nested pages under topics and also want to hide there, use:
  // const hideGlobal = pathname.startsWith("/dsa/topics/");

  return (
    <>
      {!hideGlobal && <NavBar />}
      {children}
      {!hideGlobal && <Footer />}
    </>
  );
}
