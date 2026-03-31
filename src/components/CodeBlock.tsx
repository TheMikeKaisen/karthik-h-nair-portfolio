"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ value }: { value: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value?.code) return;
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-lg shadow-black/50">
      {/* 1. Integrated Header with Filename & Copy Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 backdrop-blur-md">
        <span className="text-xs font-jetbrains text-emerald-400 font-semibold uppercase tracking-widest">
          {value.filename || value.language || 'Terminal'}
        </span>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[10px] font-jetbrains uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      
      {/* 2. Syntax Highlighter with vscDarkPlus */}
      <SyntaxHighlighter
        language={value.language || 'text'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.9rem' }}
        wrapLongLines={true}
        showLineNumbers={true}
        lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#4b5563', textAlign: 'right' }}
      >
        {value.code || ''}
      </SyntaxHighlighter>
    </div>
  );
}
