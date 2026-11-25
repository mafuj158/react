import { Moon, Sun, Trash2, Cpu, Database, Palette } from 'lucide-react';
import { useApp } from '../../providers';
import { APP_NAME, APP_VERSION } from '../../constants';

export function SettingsPage() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  const handleClearData = () => {
    if (window.confirm('This will wipe all local storage: completed lessons, bookmarks, and quiz scores. Proceed?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Platform Preferences & Storage
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-secondary">
          Manage theme appearance, persistence storage, and developer environment info.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Theme Settings */}
        <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-primary">
              <Palette size={14} />
              <span>Appearance</span>
            </div>
            <h3 className="font-semibold text-sm text-primary">
              Theme Palette Mode
            </h3>
            <p className="text-xs text-secondary">
              Active interface: {isDark ? 'Obsidian / Dark Mode' : 'Clean Slate / Light Mode'} (Centralized in CSS variables)
            </p>
          </div>
          <div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius)] border border-subtle bg-card-subtle text-primary hover:border-default text-xs font-medium transition-colors"
            >
              {isDark ? <Sun size={14} className="text-warning" /> : <Moon size={14} className="text-primary" />}
              <span>Toggle to {isDark ? 'Light' : 'Dark'} Mode</span>
            </button>
          </div>
        </div>

        {/* LocalStorage Data Reset */}
        <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-danger">
              <Database size={14} />
              <span>Data Engine</span>
            </div>
            <h3 className="font-semibold text-sm text-primary">
              Flush Browser Storage
            </h3>
            <p className="text-xs text-secondary">
              Resets all progress indicators, notes, bookmarks, and quiz results in LocalStorage.
            </p>
          </div>
          <div>
            <button
              onClick={handleClearData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius)] bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 text-xs font-semibold transition-colors"
            >
              <Trash2 size={13} />
              <span>Reset Local Storage Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Environment Specification (Full Width) */}
      <div className="w-full p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted">
          <Cpu size={14} />
          <span>Theme & Token Design System</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-1">
          <div className="p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle">
            <span className="text-muted block text-[10px]">APPLICATION</span>
            <span className="font-semibold text-primary">{APP_NAME} v{APP_VERSION}</span>
          </div>
          <div className="p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle">
            <span className="text-muted block text-[10px]">TYPOGRAPHY</span>
            <span className="font-semibold text-primary">Plus Jakarta Sans</span>
          </div>
          <div className="p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle">
            <span className="text-muted block text-[10px]">MONOSPACE</span>
            <span className="font-semibold text-primary">JetBrains Mono</span>
          </div>
          <div className="p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle">
            <span className="text-muted block text-[10px]">THEME SYSTEM</span>
            <span className="font-semibold text-primary">CSS Variables in :root</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
