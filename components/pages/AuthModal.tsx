"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Login</Button>

      {open && (
        <div className="fixed h-[100vh] w-[100vw] inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* modal panel */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full z-10">
            <h2 className="text-xl font-semibold mb-8">Sign in to We Code India</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={() => signIn("google")}>
                Sign in with Google
              </Button>
              <Button onClick={() => signIn("github")}>
                Sign in with GitHub
              </Button>
            </div>
            <button
              className="absolute top-6 right-6 text-lg opacity-70 hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
