import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { ALL_MODULES, getAllLessons } from '../../content/modules';
import type { LessonMeta } from '../../types';

export function SearchPage() {
  const [query, setQuery] = useState('');

  const allLessons = useMemo(() => getAllLessons(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allLessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.moduleSlug.toLowerCase().includes(q) ||
        l.objectives.some((o) => o.toLowerCase().includes(q))
    );
  }, [query, allLessons]);

  const getModule = (moduleSlug: string) => ALL_MODULES.find((m) => m.slug === moduleSlug);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Curriculum Search Index
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-secondary">
          Instant search across {allLessons.length} lessons, React hooks, rendering mechanisms, and interview prep.
        </p>
      </div>

      {/* Full-width Search Input */}
      <div className="w-full relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, hook name (e.g. useState, useMemo), architectural pattern, or question..."
          autoFocus
          className="w-full pl-11 pr-4 py-3.5 rounded-[var(--radius)] border border-subtle bg-card text-primary placeholder:text-muted text-sm outline-none transition-all focus:border-default"
        />
      </div>

      {/* Results View */}
      {query && (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
            <span>Query: "{query}"</span>
          </div>

          {results.length === 0 ? (
            <div className="w-full py-16 text-center rounded-[var(--radius)] border border-subtle bg-card">
              <Search size={36} className="text-muted mx-auto mb-2" />
              <p className="text-xs text-secondary">No matching curriculum topics found.</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {results.map((lesson: LessonMeta) => {
                const moduleInfo = getModule(lesson.moduleSlug);
                return (
                  <Link
                    key={lesson.id}
                    to={`/learn/${lesson.moduleSlug}/${lesson.slug}`}
                    className="p-4 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between transition-all hover:border-default hover:bg-card-subtle"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1">
                        <span className="truncate pr-2">{moduleInfo?.title}</span>
                        <span className="capitalize">{lesson.difficulty}</span>
                      </div>
                      <h3 className="font-semibold text-sm text-primary">
                        {lesson.title}
                      </h3>
                      <p className="text-xs mt-1 line-clamp-1 text-secondary">
                        {lesson.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-subtle text-xs">
                      <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
                        <Clock size={11} /> {lesson.duration}m
                      </span>
                      <span className="inline-flex items-center gap-1 text-accent-primary font-medium">
                        <span>Read</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Module Overview when query is empty */}
      {!query && (
        <div className="w-full space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-muted">
            Quick Browse by Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_MODULES.map((m) => (
              <Link
                key={m.id}
                to={`/learn/${m.slug}/${m.lessons[0]?.slug}`}
                className="p-3.5 rounded-[var(--radius)] border border-subtle bg-card flex items-center justify-between transition-colors hover:border-default hover:bg-card-subtle"
              >
                <div>
                  <h3 className="font-semibold text-xs text-primary">
                    {m.title}
                  </h3>
                  <span className="text-[11px] font-mono text-muted">
                    {m.lessons.length} topics
                  </span>
                </div>
                <ArrowRight size={14} className="text-muted" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchPage;
