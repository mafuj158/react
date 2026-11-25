import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useApp } from '../../providers';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'tsx', title, showLineNumbers = true }: CodeBlockProps) {
  const { theme } = useApp();
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-[4px] overflow-hidden border font-mono text-xs shadow-xs ${
      isDark ? 'border-zinc-800 bg-[#0d0d11]' : 'border-zinc-300 bg-[#1e1e24]'
    }`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-zinc-400" />
          <span className="text-zinc-300 font-medium tracking-tight">
            {title || language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] font-sans font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
          }}
          lineNumberStyle={{
            color: '#52525b',
            minWidth: '2.5em',
            paddingRight: '1em',
            userSelect: 'none',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
export default CodeBlock;
