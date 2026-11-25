import { useApp } from '../../providers';
import { ALL_MODULES } from '../../content/modules';
import { CheckCircle2, Flame, BookOpen, Trophy } from 'lucide-react';

export function ProgressPage() {
  const { progress } = useApp();

  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Engineering Mastery Progress
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-secondary">
          Real-time metrics tracking your progression across foundational and advanced React systems.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: 'Completed Lessons', val: `${completedCount} / ${totalLessons}`, color: 'text-success' },
          { icon: Flame, label: 'Consecutive Streak', val: `${progress.streak || 0} Days`, color: 'text-warning' },
          { icon: Trophy, label: 'Mock Sessions', val: `${progress.interviewSessions.length}`, color: 'text-purple' },
          { icon: BookOpen, label: 'Total Modules', val: `${ALL_MODULES.length}`, color: 'text-accent-primary' },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="p-4 rounded-[var(--radius)] border border-subtle bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-secondary">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <div className="text-xl font-bold tracking-tight text-primary">
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress Bar Card */}
      <div className="w-full p-6 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm text-primary">
            Global Course Completion
          </span>
          <span className="font-mono text-sm font-bold text-accent-primary">{overallPercent}%</span>
        </div>
        <div className="h-2.5 w-full rounded-[var(--radius)] overflow-hidden bg-card-subtle border border-subtle">
          <div
            className="h-full bg-accent-primary rounded-[var(--radius)] transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <div className="text-xs font-mono text-muted">
          {completedCount} lessons completed out of {totalLessons} curriculum topics
        </div>
      </div>

      {/* Module Breakdown Grid (Full Width) */}
      <div className="w-full space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          Individual Module Progression
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {ALL_MODULES.map((module, idx) => {
            const completed = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            const percent = module.lessons.length > 0 ? Math.round((completed / module.lessons.length) * 100) : 0;

            return (
              <div key={module.id} className="p-4 rounded-[var(--radius)] border border-subtle bg-card space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="font-mono text-xs text-muted w-4 font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-xs truncate text-primary">
                      {module.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted flex-shrink-0">
                    {completed}/{module.lessons.length}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-[var(--radius)] overflow-hidden bg-card-subtle border border-subtle">
                  <div
                    className="h-full bg-accent-primary rounded-[var(--radius)] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ProgressPage;
