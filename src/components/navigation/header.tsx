import { Menu, Sun, Moon, Search, Bookmark, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../providers';

export function Header() {
  const { toggleTheme, theme, setSidebarOpen, sidebarOpen, progress } = useApp();
  const navigate = useNavigate();

  const completedCount = progress.completedLessons.length;
  const isDark = theme === 'dark';

  return (
    <header className="h-14 w-full flex items-center justify-between px-4 sm:px-6 border-b border-subtle bg-canvas/90 text-primary sticky top-0 z-30 backdrop-blur-md">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-[var(--radius)] hover:bg-card-subtle text-secondary hover:text-primary transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <Link to="/" className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-primary">
          <div className="w-7 h-7 rounded-[var(--radius)] bg-primary text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            <Terminal size={14} />
          </div>
          <span>ReactMastery</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[var(--radius)] bg-accent-subtle text-accent-primary border border-primary/20 font-medium">
            v2.0
          </span>
        </Link>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-[var(--radius)] border border-subtle bg-card text-muted hover:border-default hover:text-secondary text-xs transition-colors"
        >
          <Search size={14} className="text-muted" />
          <span className="flex-1 text-left">Search curriculum, hooks, architecture...</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-[var(--radius)] border border-subtle bg-card-subtle text-muted">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {completedCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono font-medium border border-success/30 bg-success/10 text-success">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>{completedCount} Done</span>
          </div>
        )}

        <button
          onClick={() => navigate('/bookmarks')}
          className="p-2 rounded-[var(--radius)] hover:bg-card-subtle text-secondary hover:text-primary transition-colors"
          title="Bookmarks"
        >
          <Bookmark size={16} />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-[var(--radius)] hover:bg-card-subtle text-secondary hover:text-primary transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={16} className="text-warning" /> : <Moon size={16} className="text-primary" />}
        </button>
      </div>
    </header>
  );
}
export default Header;
