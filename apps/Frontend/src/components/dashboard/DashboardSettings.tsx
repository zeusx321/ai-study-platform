"use client";

import React from "react";
import { Moon, Sun, User, SlidersHorizontal, Shield, Palette, X } from "lucide-react";

type DashboardSettingsProps = {
  displayName: string;
  email?: string;
};

const accentColors = ["#8b5cf6", "#0ea5e9", "#84cc16", "#f59e0b", "#ec4899"];

const DashboardSettings = ({ displayName, email }: DashboardSettingsProps) => {
  return (
    <main className="flex-1 h-[calc(100vh-40px)] overflow-y-auto text-white my-[20px] border border-[#666565]/50 rounded-lg px-[45px] py-[35px] mx-[20px] relative">
      <div className="absolute top-[25px] left-[45px] right-[45px] flex items-center justify-between z-10">
        <span className="text-[14px] text-[#9ca3af] font-light">../ settings</span>
        <span className="text-[#9ca3af]">...</span>
      </div>

      <div className="flex min-h-full items-center justify-center py-16">
        <section className="grid w-full max-w-[760px] grid-cols-[220px_1fr] rounded-2xl border border-[#8b5cf6]/70 bg-[#111116]/90 p-6 shadow-[0_0_45px_rgba(139,92,246,0.18)]">
          <div className="border-r border-white/10 pr-4">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-[22px] font-semibold">Settings</h1>
              <X className="h-5 w-5 text-[#9ca3af]" />
            </div>
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Appearance", icon: Palette },
              { label: "Preferences", icon: SlidersHorizontal },
              { label: "Account", icon: Shield },
            ].map((item) => (
              <button
                type="button"
                key={item.label}
                className={`mb-3 flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-[14px] transition-colors ${
                  item.active
                    ? "border-[#8b5cf6]/80 bg-[#8b5cf6]/10 text-white"
                    : "border-transparent text-[#d1d5db] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="pl-7">
            <h2 className="mb-4 text-[16px] font-semibold">Profile</h2>
            <label className="mb-4 block">
              <span className="mb-2 block text-[14px] text-white">Name</span>
              <input
                readOnly
                value={displayName}
                className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none"
              />
            </label>
            <label className="mb-5 block">
              <span className="mb-2 block text-[14px] text-white">Email</span>
              <input
                readOnly
                value={email || "developer@example.com"}
                className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none"
              />
            </label>

            <div className="mb-5 h-px w-28 bg-white/10" />

            <h2 className="mb-4 text-[16px] font-semibold">Appearance</h2>
            <div className="mb-4 grid grid-cols-[120px_1fr] items-center gap-4">
              <span className="text-[14px] text-white">Theme</span>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-[#8b5cf6]/80 bg-[#8b5cf6]/10 py-3 text-[14px]">
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
                <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.03] py-3 text-[14px] text-[#d1d5db]">
                  <Sun className="h-4 w-4" />
                  Light
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <span className="text-[14px] text-white">Accent Color</span>
              <div className="flex gap-4">
                {accentColors.map((color, index) => (
                  <button
                    type="button"
                    key={color}
                    className={`h-7 w-7 rounded-full border-2 ${index === 0 ? "border-white" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Accent color ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button type="button" className="rounded-md border border-white/10 px-8 py-3 text-[14px] text-[#d1d5db] hover:text-white">
                Cancel
              </button>
              <button type="button" className="rounded-md bg-gradient-to-r from-[#6d28d9] to-[#d946ef] px-8 py-3 text-[14px] font-semibold text-white">
                Save Changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardSettings;
