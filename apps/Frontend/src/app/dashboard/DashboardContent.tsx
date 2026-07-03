"use client";

import { useRouter } from "next/navigation";
import { Sparkles, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { authService } from "@/services/auth.service";
import type { User } from "@supabase/supabase-js";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      toast.success(result.message);
      router.push("/auth/login");
    } else {
      toast.error(result.message);
    }
  };

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "User";

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

      <div className="min-h-svh bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border/50 px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dexa
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {displayName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl p-6">
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-2xl">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your AI-powered learning dashboard is ready. Start exploring your
              study materials.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
