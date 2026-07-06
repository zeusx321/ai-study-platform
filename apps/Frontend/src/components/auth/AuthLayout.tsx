"use client";

import { Toaster } from "sonner";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/auth/login";

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          },
        }}
      />

      <div className="flex min-h-svh w-full bg-background text-foreground">
        {/* ── Left Side (Branding) ─────────────────────────────────── */}
        <div className="hidden w-1/2 lg:flex flex-col justify-between p-12 border-r border-border/50">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80 w-fit"
              aria-label="Go to homepage"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dexa
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-6 max-w-md">
            <div className="w-fit rounded-full bg-muted/50 px-3 py-1 border border-border/50 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {isLogin ? "Welcome Back" : "Join Dexa"}
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight leading-[1.15]">
              {isLogin ? "Continue your" : "Start your"}{" "}
              <span className="text-primary block mt-2">
                learning journey
              </span>
            </h1>

            <div className="h-1 w-12 bg-primary rounded-full mt-2" />

            <p className="text-lg text-muted-foreground leading-relaxed">
              {isLogin
                ? "Sign in to access your personalized AI study materials, continue from where you left off, and master your subjects faster."
                : "Create an account to unlock AI-powered study tools, personalized flashcards, and comprehensive progress tracking."}
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dexa. All rights reserved.
          </div>
        </div>

        {/* ── Right Side (Auth Form) ───────────────────────────────── */}
        <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
          {/* Radial glow background effect */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <div className="h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] rounded-full bg-purple-600/10 lg:bg-purple-600/20 blur-[100px]" />
          </div>

          {/* Form Card Container */}
          <div className="relative z-10 w-full max-w-[440px]">
            {/* Mobile branding (visible only on small screens) */}
            <div className="mb-8 flex lg:hidden items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Dexa
              </span>
            </div>

            {/* The form card itself (no internal padding here if the forms provide it, or we add it) */}
            {/* The reference shows the form inputs inside a card area. */}
            <div className="rounded-2xl bg-card border border-border/40 p-8 shadow-2xl relative overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
