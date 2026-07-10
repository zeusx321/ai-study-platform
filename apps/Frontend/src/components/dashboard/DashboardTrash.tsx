"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import type { PageItem } from "@/app/dashboard/DashboardContent";

type DashboardTrashProps = {
  pages: PageItem[];
};

const DashboardTrash = ({ pages }: DashboardTrashProps) => {
  const deletedItems = (pages.length ? pages : [{ id: "empty", title: "Semantic Web", content: "", parentId: null }]).map((page, index) => ({
    id: `${page.id}-deleted-${index}`,
    title: page.title || "Untitled",
    description: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem",
  }));

  return (
    <main className="flex-1 h-[calc(100vh-40px)] overflow-y-auto text-white my-[20px] border border-[#666565]/50 rounded-lg px-[45px] py-[35px] mx-[20px] relative">
      <div className="absolute top-[25px] left-[45px] right-[45px] flex items-center justify-between z-10">
        <span className="text-[14px] text-[#9ca3af] font-light">../ trash</span>
        <span className="text-[#9ca3af]">...</span>
      </div>

      <section className="mx-auto mt-20 w-full max-w-[900px]">
        <h4 className="mb-5 text-[32px] font-semibold">Trash</h4>
        <div className="flex flex-col">
          {deletedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-white/10 py-4">
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-[18px] font-semibold text-white">{item.title}</h4>
                <h4 className="mt-1 truncate text-[14px] text-[#9ca3af]">{item.description}</h4>
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-[#d1d5db] transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`Open actions for ${item.title}`}
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardTrash;
