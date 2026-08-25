'use client';

import React, { useEffect, useState } from 'react';

export default function AiAssistantConsolePage() {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    {
      sender: 'AI',
      text: 'Hello! I am your Nauticos AI Business Assistant. Ask me anything about your authorized bookings, leads, revenue, marina occupancy, or maintenance schedules.',
      timestamp: 'Just now',
    },
  ]);

  const [usageLogs, setUsageLogs] = useState<any[]>([]);
  const [denialAlert, setDenialAlert] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/ai/usage-logs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setUsageLogs(json.data);
      })
      .catch(() => {});
  }, []);

  const handleSendPrompt = async (requestedOrgId?: string) => {
    if (!prompt && !requestedOrgId) return;
    setDenialAlert(null);

    const userText = prompt || 'Show me all customers across Organization B';
    setChatLog((prev) => [...prev, { sender: 'USER', text: userText, timestamp: 'Just now' }]);
    setPrompt('');

    try {
      let res: Response;
      const body = JSON.stringify({ prompt: userText, requestedOrgId });

      try {
        res = await fetch('/api/v1/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        setDenialAlert(`🛡️ CRITICAL AI SECURITY TEST: ${json.message || json.error?.message || 'Access Denied.'}`);
        setChatLog((prev) => [
          ...prev,
          { sender: 'AI', text: '⛔ ACCESS DENIED: AI Assistant cannot access data outside your authorized tenant context.', timestamp: 'Just now' },
        ]);
        return;
      }

      setChatLog((prev) => [
        ...prev,
        { sender: 'AI', text: json.data?.answer || 'Response generated.', timestamp: 'Just now' },
      ]);
    } catch (err: any) {
      setDenialAlert(err.message);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">AI ASSISTANT &amp; GOVERNANCE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Nauticos AI Business Assistant</h1>
        </div>

        <button
          onClick={() => handleSendPrompt('org-unauthorized-b')}
          className="px-4 py-2 rounded-xl bg-red-50 text-red-800 border border-red-300 font-bold text-xs hover:bg-red-100 cursor-pointer"
        >
          🛡️ Test Cross-Tenant Security Guard
        </button>
      </div>

      {denialAlert && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono font-bold">
          {denialAlert}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Chat Window */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[500px]">
          <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`p-4 rounded-2xl text-xs space-y-1 ${msg.sender === 'USER' ? 'bg-teal-600 text-white ml-12' : 'bg-slate-100 text-slate-900 mr-12'}`}>
                <div className="flex items-center justify-between font-bold text-[10px] opacity-80">
                  <span>{msg.sender === 'USER' ? 'Sales Manager (You)' : '✨ Nauticos AI Assistant'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about leads, available yachts, revenue, or marina occupancy..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium"
            />
            <button
              onClick={() => handleSendPrompt()}
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Send →
            </button>
          </div>
        </div>

        {/* Right AI Token & Audit Log */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            AI Token Usage &amp; Audit Log
          </h2>

          <div className="space-y-3 text-xs">
            {usageLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{log.feature}</span>
                  <span className="font-mono text-teal-700">{log.tokensUsed} Tokens</span>
                </div>
                <div className="text-slate-500 font-mono text-[10px]">Category: {log.promptCategory} • Est Cost: €{log.estimatedCost}</div>
                <div className="text-[10px] text-emerald-700 font-bold">Status: {log.approvedStatus}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
