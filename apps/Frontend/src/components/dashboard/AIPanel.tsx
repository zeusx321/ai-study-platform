import React from 'react';
import { Sparkles, Send } from 'lucide-react';

const AIPanel = () => {
  return (
    <aside className="w-[380px] h-[calc(100vh-40px)] ml-0 border border-[#666565]/50 rounded-lg bg-background/20 flex flex-col m-[20px] relative shrink-0">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#666565]/80">
        <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
        <h2 className="text-lg font-medium text-white tracking-wide">AI Assistant</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        
        {/* Welcome Message */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
          </div>
          <div>
            <p className="text-[#d1d5db] font-light leading-relaxed text-[15px]">
              Hi! I'm your AI study assistant. I can help you summarize this lecture, answer questions, or generate a quiz. How can I help you today?
            </p>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
            <button className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#9ca3af] hover:text-white hover:border-white/30 transition-colors">
                Summarize Notes
            </button>
            <button className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#9ca3af] hover:text-white hover:border-white/30 transition-colors">
                Explain Concepts
            </button>
            <button className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#9ca3af] hover:text-white hover:border-white/30 transition-colors">
                Generate Quiz
            </button>
        </div>

      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#666565]/80">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask AI anything..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white placeholder-[#9ca3af] outline-none focus:border-[#8b5cf6]/50 transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#8b5cf6] rounded-md text-white hover:bg-[#7c3aed] transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      
    </aside>
  );
};

export default AIPanel;
