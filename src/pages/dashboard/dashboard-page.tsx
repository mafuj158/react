import { Link } from 'react-router-dom';
import {
  Trophy, Code2, Clock, Flame,
  Target, ArrowRight, CheckCircle2, Bookmark,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../providers';
import { ALL_MODULES, getLessonById } from '../../content/modules';

export function DashboardPage() {
  const { progress } = useApp();

  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const recentlyVisited = progress.lastVisited
    .slice(0, 5)
    .map((id) => getLessonById(id))
    .filter(Boolean);

  const bookmarkedLessons = progress.bookmarks
    .slice(0, 5)
    .map((id) => getLessonById(id))
    .filter(Boolean);

  const nextLesson = (() => {
    for (const module of ALL_MODULES) {
      for (const lesson of module.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { lesson, module };
        }
      }
    }
    return null;
  })();

  return (
    <div className="w-full space-y-6">
      {/* Hero Developer Overview */}
      <div className="w-full rounded-[var(--radius)] border border-subtle p-6 sm:p-8 bg-card relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono font-medium bg-accent-subtle text-accent-primary border border-primary/20">
              <Sparkles size={12} />
              <span>Full-Stack Mastery Track · React 19 & Next.js</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              Senior React Engineering Laboratory
            </h1>
            <p className="text-sm leading-relaxed text-secondary">
              Master fundamental JavaScript, React Fiber architecture, reconciliation, custom hooks, and engineering interview systems.
            </p>
          </div>

          {/* Quick Action / Resume Card */}
          {nextLesson ? (
            <div className="p-4 rounded-[var(--radius)] border border-subtle bg-card-subtle flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent-primary block font-semibold">Up Next</span>
                <span className="text-sm font-semibold block truncate max-w-xs text-primary">
                  {nextLesson.lesson.title}
                </span>
                <span className="text-xs text-muted">{nextLesson.module.title}</span>
              </div>
              <Link
                to={`/learn/${nextLesson.module.slug}/${nextLesson.lesson.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius)] bg-accent-primary hover:opacity-90 text-white font-medium text-xs transition-opacity whitespace-nowrap"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="p-4 rounded-[var(--radius)] border border-success/30 bg-success/10 text-success text-xs font-medium font-mono">
              🎉 All available curriculum modules completed!
            </div>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Progress',
            val: `${overallPercent}%`,
            detail: `${completedCount} of ${totalLessons} lessons`,
            icon: CheckCircle2,
            iconColor: 'text-success'
          },
          {
            label: 'Active Streak',
            val: `${progress.streak || 0} Days`,
            detail: 'Consistent daily practice',
            icon: Flame,
            iconColor: 'text-warning'
          },
          {
            label: 'Mock Interviews',
            val: `${progress.interviewSessions.length}`,
            detail: 'Technical sessions taken',
            icon: Trophy,
            iconColor: 'text-purple'
          },
          {
            label: 'Saved Bookmarks',
            val: `${progress.bookmarks.length}`,
            detail: 'Quick revision cards',
            icon: Bookmark,
            iconColor: 'text-accent-primary'
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-4 rounded-[var(--radius)] border border-subtle bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-secondary">{item.label}</span>
                <Icon size={16} className={item.iconColor} />
              </div>
              <div className="text-xl font-bold tracking-tight mb-0.5 text-primary">
                {item.val}
              </div>
              <div className="text-[11px] font-mono text-muted">{item.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Main Workspace Split (Full Width) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Modules List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-primary">
              Curriculum Roadmap
            </h2>
            <Link to="/curriculum" className="text-xs text-accent-primary hover:underline font-medium">
              View all modules →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ALL_MODULES.map((module, idx) => {
              const completedInModule = module.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              const modulePercent = module.lessons.length > 0
                ? Math.round((completedInModule / module.lessons.length) * 100)
                : 0;

              const firstIncomplete = module.lessons.find((l) => !progress.completedLessons.includes(l.id));
              const targetLesson = firstIncomplete || module.lessons[0];

              return (
                <Link
                  key={module.id}
                  to={`/learn/${module.slug}/${targetLesson.slug}`}
                  className="p-4 rounded-[var(--radius)] border border-subtle bg-card transition-all hover:border-default hover:bg-card-hover group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-[var(--radius)] flex items-center justify-center font-mono text-xs font-bold bg-card-subtle text-secondary border border-subtle">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs sm:text-sm text-primary group-hover:text-accent-primary transition-colors line-clamp-1">
                          {module.title}
                        </h3>
                        <p className="text-[11px] font-mono mt-0.5 text-muted">
                          {completedInModule} / {module.lessons.length} lessons
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius)] border border-subtle text-muted">
                      {modulePercent}%
                    </span>
                  </div>

                  <div className="h-1 w-full rounded-[var(--radius)] overflow-hidden bg-card-subtle">
                    <div
                      className="h-full bg-accent-primary rounded-[var(--radius)] transition-all duration-300"
                      style={{ width: `${modulePercent}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Quick Links, Recent Activity & Bookmarks */}
        <div className="space-y-5">
          {/* Practice Hub Shortcuts */}
          <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-muted">
              Interview Hub
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/interview"
                className="flex items-center justify-between p-2.5 rounded-[var(--radius)] border border-subtle hover:border-default hover:bg-card-subtle text-secondary hover:text-primary text-xs font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trophy size={15} className="text-purple" />
                  <span>Technical Questions Bank</span>
                </div>
                <ArrowRight size={13} className="text-muted" />
              </Link>

              <Link
                to="/interview/coding"
                className="flex items-center justify-between p-2.5 rounded-[var(--radius)] border border-subtle hover:border-default hover:bg-card-subtle text-secondary hover:text-primary text-xs font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Code2 size={15} className="text-accent-primary" />
                  <span>Coding Challenges</span>
                </div>
                <ArrowRight size={13} className="text-muted" />
              </Link>

              <Link
                to="/interview/mock"
                className="flex items-center justify-between p-2.5 rounded-[var(--radius)] border border-subtle hover:border-default hover:bg-card-subtle text-secondary hover:text-primary text-xs font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Target size={15} className="text-warning" />
                  <span>Timed Mock Interview</span>
                </div>
                <ArrowRight size={13} className="text-muted" />
              </Link>
            </div>
          </div>

          {/* Bookmarks */}
          {bookmarkedLessons.length > 0 && (
            <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-muted">
                  Saved Bookmarks
                </h3>
                <Link to="/bookmarks" className="text-[11px] text-accent-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-1.5">
                {bookmarkedLessons.map((l) => (
                  <Link
                    key={l!.id}
                    to={`/learn/${l!.moduleSlug}/${l!.slug}`}
                    className="block p-2 rounded-[var(--radius)] text-xs truncate transition-colors text-secondary hover:text-primary hover:bg-card-subtle"
                  >
                    • {l!.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent History */}
          {recentlyVisited.length > 0 && (
            <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-muted">
                Recent Activity
              </h3>
              <div className="space-y-1.5">
                {recentlyVisited.map((l) => (
                  <Link
                    key={l!.id}
                    to={`/learn/${l!.moduleSlug}/${l!.slug}`}
                    className="flex items-center gap-2 p-2 rounded-[var(--radius)] text-xs truncate transition-colors text-muted hover:text-secondary hover:bg-card-subtle"
                  >
                    <Clock size={12} className="flex-shrink-0 text-muted" />
                    <span className="truncate">{l!.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
