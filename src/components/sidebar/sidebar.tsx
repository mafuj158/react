import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Code2, Trophy, Bookmark,
  StickyNote, Settings, ChevronDown, ChevronRight, X,
  Terminal, Search
} from 'lucide-react';
import { useApp } from '../../providers';
import { ALL_MODULES } from '../../content/modules';

const PRIMARY_NAV = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Curriculum', path: '/curriculum', icon: BookOpen },
  { label: 'Interview Prep', path: '/interview', icon: Trophy },
  { label: 'Coding Practice', path: '/interview/coding', icon: Code2 },
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  { label: 'Notes', path: '/notes', icon: StickyNote },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, progress } = useApp();
  const location = useLocation();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['mod-03', 'mod-04']));

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const isLessonCompleted = (lessonId: string) => progress.completedLessons.includes(lessonId);
  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = progress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r border-subtle bg-card text-secondary transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '280px' }}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-subtle">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-sm text-primary">
            <div className="w-7 h-7 rounded-[var(--radius)] bg-primary text-white flex items-center justify-center font-mono text-xs">
              <Terminal size={14} />
            </div>
            <span>ReactMastery</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-[var(--radius)] hover:bg-card-subtle text-muted hover:text-primary lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
          {/* Main Workspace Navigation */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider px-2 mb-1.5 font-medium text-muted">
              Platform
            </div>
            <nav className="space-y-0.5">
              {PRIMARY_NAV.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[var(--radius)] text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-card-subtle text-primary border-l-2 border-primary'
                        : 'text-secondary hover:text-primary hover:bg-card-subtle'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-accent-primary' : 'opacity-70'} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Modules Tree */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider font-medium text-muted">
                Modules ({ALL_MODULES.length})
              </span>
              <span className="text-[10px] font-mono text-muted">
                {totalCompleted}/{totalLessons}
              </span>
            </div>

            <div className="space-y-1">
              {ALL_MODULES.map((module, idx) => {
                const isExpanded = expandedModules.has(module.id);
                const completedInModule = module.lessons.filter((l) => isLessonCompleted(l.id)).length;
                const isModuleActive = location.pathname.includes(`/learn/${module.slug}`);

                return (
                  <div key={module.id} className="text-xs">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-[var(--radius)] transition-colors text-left ${
                        isModuleActive
                          ? 'bg-card-subtle text-primary'
                          : 'text-secondary hover:bg-card-subtle hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-[10px] text-muted w-4">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="truncate font-medium">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                        <span className="text-[10px] font-mono text-muted">
                          {completedInModule}/{module.lessons.length}
                        </span>
                        {isExpanded ? (
                          <ChevronDown size={12} className="text-muted" />
                        ) : (
                          <ChevronRight size={12} className="text-muted" />
                        )}
                      </div>
                    </button>

                    {/* Lesson Sub-tree */}
                    {isExpanded && (
                      <div className="mt-0.5 ml-4 pl-2.5 border-l border-subtle space-y-0.5">
                        {module.lessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);
                          const lessonPath = `/learn/${module.slug}/${lesson.slug}`;
                          const isLessonActive = location.pathname === lessonPath;

                          return (
                            <NavLink
                              key={lesson.id}
                              to={lessonPath}
                              className={`flex items-center justify-between px-2 py-1 rounded-[var(--radius)] text-[11px] transition-colors ${
                                isLessonActive
                                  ? 'bg-accent-subtle text-accent-primary font-medium'
                                  : 'text-secondary hover:text-primary hover:bg-card-subtle'
                              }`}
                            >
                              <span className="truncate pr-1">{lesson.title}</span>
                              {completed && (
                                <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer - Progress Status */}
        <div className="p-3.5 border-t border-subtle bg-card-subtle/50">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-mono text-[11px] text-muted">Total Completion</span>
            <span className="font-mono font-bold text-xs text-accent-primary">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-[var(--radius)] bg-card overflow-hidden border border-subtle">
            <div
              className="h-full bg-accent-primary rounded-[var(--radius)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
export default Sidebar;
