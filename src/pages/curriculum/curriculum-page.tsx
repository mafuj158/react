import { Link } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../providers';
import { ALL_MODULES } from '../../content/modules';

export function CurriculumPage() {
  const { progress } = useApp();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-subtle">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Comprehensive React & Next.js Curriculum
          </h1>
          <p className="text-sm mt-1 text-secondary">
            15 structured modules covering JavaScript engines, React Fiber, state architecture, and enterprise patterns.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        {ALL_MODULES.map((module, index) => {
          const completed = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
          const percent = module.lessons.length > 0 ? Math.round((completed / module.lessons.length) * 100) : 0;

          return (
            <div
              key={module.id}
              className="w-full rounded-[var(--radius)] border border-subtle bg-card overflow-hidden"
            >
              {/* Module Header Bar */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-subtle bg-card-subtle">
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-[var(--radius)] flex items-center justify-center font-mono text-xs font-bold bg-card text-accent-primary border border-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base text-primary">
                      {module.title}
                    </h2>
                    <p className="text-xs mt-0.5 line-clamp-1 text-secondary">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium block text-primary">
                      {completed} / {module.lessons.length} Completed
                    </span>
                    <span className="text-[11px] font-mono text-muted">{percent}%</span>
                  </div>
                  <div className="w-28 h-2 rounded-[var(--radius)] overflow-hidden bg-card border border-subtle">
                    <div
                      className="h-full bg-accent-primary rounded-[var(--radius)] transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lessons Grid: Full width responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 md:gap-px bg-border-subtle">
                {module.lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const difficultyColor = lesson.difficulty === 'beginner'
                    ? 'text-success bg-success/10 border-success/20'
                    : lesson.difficulty === 'intermediate'
                    ? 'text-warning bg-warning/10 border-warning/20'
                    : 'text-danger bg-danger/10 border-danger/20';

                  return (
                    <Link
                      key={lesson.id}
                      to={`/learn/${module.slug}/${lesson.slug}`}
                      className="flex items-center justify-between p-3.5 transition-colors bg-card hover:bg-card-subtle group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className={`w-5 h-5 rounded-[var(--radius)] border flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-success border-success text-white'
                            : 'border-subtle'
                        }`}>
                          {isCompleted && <CheckCircle2 size={12} className="stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <span className={`text-xs font-medium block truncate ${
                            isCompleted ? 'text-muted line-through' : 'text-primary'
                          }`}>
                            {lesson.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted font-mono">
                            <span className="flex items-center gap-1">
                              <Clock size={10} /> {lesson.duration}m
                            </span>
                            <span>·</span>
                            <span>{lesson.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[var(--radius)] border capitalize ${difficultyColor}`}>
                          {lesson.difficulty}
                        </span>
                        <ChevronRight size={14} className="text-muted group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CurriculumPage;
