import React from 'react';
import { Sparkles, Send, Pencil, Plus } from 'lucide-react';

const AIPanel = () => {
  return (
    <aside className="w-[380px] h-[calc(100vh-40px)] ml-0 border border-zinc-800/50 rounded-2xl bg-zinc-950 flex flex-col m-[20px] relative shrink-0 overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-[15px] font-semibold text-zinc-400 tracking-wide">
          Learner AI
        </h2>
      </div>

      {/* ── Scrollable Body ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col scrollbar-hide">

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Summarize Card */}
          <button
            onClick={() => {}}
            className="group relative flex flex-col items-start gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/80 p-4 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div>
              <p className="text-sm font-medium text-zinc-200">Summarize</p>
              <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
                You can summarize what you want
              </p>
            </div>
            <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-800/80 text-zinc-400 transition-colors group-hover:border-zinc-600 group-hover:text-zinc-300">
              <Pencil className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* Quiz Maker Card */}
          <button
            onClick={() => {}}
            className="group relative flex flex-col items-start gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/80 p-4 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div>
              <p className="text-sm font-medium text-zinc-200">Quiz Maker</p>
              <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
                You can summarize what you want
              </p>
            </div>
            <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-800/80 text-zinc-400 transition-colors group-hover:border-zinc-600 group-hover:text-zinc-300">
              <Pencil className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>

        {/* ── Hero Text ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-zinc-200">
            Tell Us What<br />You Need.
          </h1>

          {/* Suggestion Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-transparent px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-500 hover:text-zinc-200"
            >
              Summarize
              <Plus className="h-3 w-3" />
            </button>
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-transparent px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-500 hover:text-zinc-200"
            >
              Generate
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-transparent px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-500 hover:text-zinc-200"
            >
              Ask
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Chat Input Bar ─────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-900/80 px-2 py-1.5 transition-colors focus-within:border-zinc-700">
          {/* Plus button */}
          <button
            onClick={() => {}}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* Text input */}
          <input
            type="text"
            placeholder="tell us..."
            className="min-w-0 flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
          />

          {/* Send button */}
          <button
            onClick={() => {}}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};

export default AIPanel;
