"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { authService } from "@/services/auth.service";
import type { User } from "@supabase/supabase-js";
import Sidebar from '@/components/dashboard/Sidebar'
import ContentEditor from '@/components/dashboard/ContentEditor'
import AIPanel from '@/components/dashboard/AIPanel'
import DashboardHome from '@/components/dashboard/DashboardHome'
import SearchOverlay from '@/components/dashboard/SearchOverlay'
import DashboardSettings from '@/components/dashboard/DashboardSettings'
import DashboardTrash from '@/components/dashboard/DashboardTrash'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface DashboardContentProps {
  user: User;
  initialView?: "home" | "page" | "settings" | "trash";
}

export type PageItem = {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  isOpen?: boolean;
  icon?: string;
}


export default function DashboardContent({ user, initialView = "home" }: DashboardContentProps) {
  const [pages, setPages] = useState<PageItem[]>([
    { id: '1', title: 'Lecture 1', content: '', parentId: null, isOpen: true },
    { id: '2', title: 'Semantic Web', content: '', parentId: '1' },
    { id: '3', title: 'College Marital', content: '', parentId: null },
  ]);
  const [activePageId, setActivePageId] = useState<string>('1');
  const [activeView, setActiveView] = useState<"home" | "page" | "trash">(
    initialView === "settings" ? "home" : (initialView as "home" | "page" | "trash" || "home")
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(initialView === "settings");

  const duplicatePage = (id: string) => {
    const pageToDuplicate = pages.find(p => p.id === id);
    if (!pageToDuplicate) return;
    const newPage: PageItem = {
      ...pageToDuplicate,
      id: uuidv4(),
      title: `${pageToDuplicate.title} (Copy)`,
    };
    setPages(prev => [...prev, newPage]);
    setActivePageId(newPage.id);
  };

  const deletePage = (id: string) => {
    const getIdsToDelete = (pageId: string, currentPages: PageItem[]): string[] => {
      const children = currentPages.filter(p => p.parentId === pageId).map(p => p.id);
      return [pageId, ...children.flatMap(c => getIdsToDelete(c, currentPages))];
    };
    const idsToDelete = getIdsToDelete(id, pages);
    const newPages = pages.filter(p => !idsToDelete.includes(p.id));
    
    // Clean up references to deleted pages in the content of remaining pages
    const cleanedPages = newPages.map(p => {
      if (!p.content) return p;
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(p.content, 'text/html');
        let modified = false;
        
        idsToDelete.forEach(deletedId => {
          const nodes = doc.querySelectorAll(`div[data-page-id="${deletedId}"], div[pageid="${deletedId}"]`);
          if (nodes.length > 0) {
            nodes.forEach(node => node.remove());
            modified = true;
          }
        });
        
        if (modified) {
          return { ...p, content: doc.body.innerHTML };
        }
      } catch (err) {
        console.error("Error parsing content during page deletion:", err);
      }
      return p;
    });

    setPages(cleanedPages);
    if (idsToDelete.includes(activePageId)) {
      setActivePageId(cleanedPages[0]?.id || '');
    }
  };

  const addPage = (parentId: string | null, preventSwitch = false) => {
    const newPage: PageItem = {
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      parentId,
      isOpen: true,
    };
    
    if (parentId) {
      setPages(prev => {
        const updatedPages = prev.map(p => {
          if (p.id === parentId) {
            let updatedContent = p.content;
            if (!preventSwitch) {
              // Add from sidebar: append to content
              updatedContent = (p.content || '') + `<div data-type="page-link" data-page-id="${newPage.id}"></div><p></p>`;
            }
            return { ...p, isOpen: true, content: updatedContent };
          }
          return p;
        });
        return [...updatedPages, newPage];
      });
    } else {
      setPages(prev => [...prev, newPage]);
    }
    if (!preventSwitch) {
      setActivePageId(newPage.id);
      setActiveView("page");
      router.push("/dashboard");
    }
    return newPage.id;
  };

  const updatePage = (id: string, updates: Partial<PageItem>) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const activePage = pages.find(p => p.id === activePageId);
  const selectPage = (id: string) => {
    setActivePageId(id);
    setActiveView("page");
    router.push("/dashboard");
  };

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
<div className='h-screen w-full flex bg-black relative overflow-hidden'>
      <div className="absolute top-[-25%] left-[-30%] w-[70vw] max-w-[1300px] h-[600px] bg-primary/30 blur-[210px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-35%] right-[-45%] w-[70vw] max-w-[1300px] h-[600px] bg-primary/20 blur-[210px] rounded-full z-0 pointer-events-none"></div>
      <Sidebar 
        pages={pages}
        activePageId={activePageId}
        activeView={activeView}
        onSelectPage={selectPage}
        onSelectHome={() => {
          setActiveView("home");
          router.push("/dashboard");
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onAddPage={addPage}
        onTogglePage={(id) => updatePage(id, { isOpen: !pages.find(p => p.id === id)?.isOpen })}
        onDeletePage={deletePage}
      />
      {activeView === "home" && (
        <DashboardHome
          displayName={displayName}
          pages={pages}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectPage={selectPage}
        />
      )}
      {activeView === "page" && (
        <ContentEditor 
          activePage={activePage}
          allPages={pages}
          updatePage={updatePage}
          onSelectPage={selectPage}
          onDuplicatePage={duplicatePage}
          onDeletePage={deletePage}
          onAddPage={addPage}
        />
      )}
      {activeView === "trash" && (
        <DashboardTrash pages={pages} />
      )}
      {activeView === "page" && <AIPanel />}
      <SearchOverlay
        isOpen={isSearchOpen}
        pages={pages}
        onClose={() => setIsSearchOpen(false)}
        onSelectPage={selectPage}
      />
      <DashboardSettings
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          if (window.location.pathname.endsWith("/settings")) {
            router.push("/dashboard");
          }
        }}
        displayName={displayName}
        email={user.email}
      />
    </div>

  );
}
