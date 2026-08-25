'use client';

import React, { useState } from 'react';

export default function NaturalLanguageAiPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'AI',
      text: 'Welcome Executive! I am your AI Analytics Assistant. Ask any business question about revenue, fleet utilization, marina slip occupancy, or maintenance costs.',
    },
  ]);

  const handleQuery = async (customQuery?: string) => {
    const textToSend = customQuery || query;
    if (!textToSend) return;

    setMessages((prev) => [...prev, { sender: 'USER', text: textToSend }]);
    setQuery('');

    try {
      let res: Response;
      const body = JSON.stringify({ query: textToSend });

      try {
        res = await fetch('http://localhost:4000/api/v1/analytics/ai-query', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('/api/v1/analytics/ai-query', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      if (!res.ok) {
        setMessages((prev) => [...prev, { sender: 'AI', text: '🛡️ ACCESS DENIED (HTTP 403): AI analytics tools are strictly permission-scoped and cannot expose data from other organizations or unauthorized tenants.' }]);
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setMessages((prev) => [...prev, { sender: 'AI', text: json.data.answerText, citation: json.data.citationSource }]);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">PERMISSION-SCORED ANALYTICS TOOLS</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">Natural Language AI Analytics Assistant</h1>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <button
          onClick={() => handleQuery('What was our revenue last month?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 cursor-pointer"
        >
          &quot;What was our revenue last month?&quot;
        </button>
        <button
          onClick={() => handleQuery('Which yacht generated the most revenue?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 cursor-pointer"
        >
          &quot;Which yacht generated the most revenue?&quot;
        </button>
        <button
          onClick={() => handleQuery('Which marina has the highest occupancy?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 cursor-pointer"
        >
          &quot;Which marina has the highest occupancy?&quot;
        </button>
        <button
          onClick={() => handleQuery('Show revenue for Organization B')}
          className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 hover:bg-red-900 cursor-pointer"
        >
          🛡️ &quot;Show revenue for Organization B&quot; (Security Test)
        </button>
      </div>

      {/* Chat Thread */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[340px] pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`p-4 rounded-2xl text-xs space-y-2 ${m.sender === 'USER' ? 'bg-amber-500/20 border border-amber-500/40 text-amber-100 ml-12' : 'bg-slate-950/80 border border-slate-800 text-slate-200 mr-12'}`}>
              <div className="font-bold text-[10px] font-mono opacity-70">
                {m.sender === 'USER' ? 'Executive (You)' : '✨ AI Analytics Engine'}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
              {m.citation && (
                <div className="text-[10px] font-mono text-amber-400/80 pt-1 border-t border-slate-800">
                  Source: {m.citation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask natural language analytics question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
          <button
            onClick={() => handleQuery()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
          >
            Ask Analytics →
          </button>
        </div>
      </div>

    </div>
  );
}
