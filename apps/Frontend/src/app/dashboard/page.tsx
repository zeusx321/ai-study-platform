"use client";

import Sidebar from '@/components/dashboard/Sidebar'
import ContentEditor from '@/components/dashboard/ContentEditor'
import AIPanel from '@/components/dashboard/AIPanel'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type PageItem = {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  isOpen?: boolean;
  icon?: string;
}

const Page = () => {
  const [pages, setPages] = useState<PageItem[]>([
    { id: '1', title: 'Lecture 1', content: '', parentId: null, isOpen: true },
    { id: '2', title: 'Semantic Web', content: '', parentId: '1' },
    { id: '3', title: 'College Marital', content: '', parentId: null },
  ]);
  const [activePageId, setActivePageId] = useState<string>('1');

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
    }
    return newPage.id;
  };

  const updatePage = (id: string, updates: Partial<PageItem>) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const activePage = pages.find(p => p.id === activePageId);

  return (
    <div className='h-screen w-full flex bg-black relative overflow-hidden'>
      <div className="absolute top-[-25%] left-[-30%] w-[70vw] max-w-[1300px] h-[600px] bg-primary/30 blur-[210px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-35%] right-[-45%] w-[70vw] max-w-[1300px] h-[600px] bg-primary/20 blur-[210px] rounded-full z-0 pointer-events-none"></div>
      <Sidebar 
        pages={pages}
        activePageId={activePageId}
        onSelectPage={setActivePageId}
        onAddPage={addPage}
        onTogglePage={(id) => updatePage(id, { isOpen: !pages.find(p => p.id === id)?.isOpen })}
        onDeletePage={deletePage}
      />
      <ContentEditor 
        activePage={activePage}
        allPages={pages}
        updatePage={updatePage}
        onSelectPage={setActivePageId}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
        onAddPage={addPage}
      />
      <AIPanel />
    </div>
  )
}

export default Page