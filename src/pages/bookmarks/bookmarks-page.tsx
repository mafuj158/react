import { Link } from 'react-router-dom';
import { Bookmark, Clock, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../providers';
import { getLessonById, getModuleBySlug } from '../../content/modules';

export function BookmarksPage() {
  const { progress, toggleBookmark } = useApp();

  const bookmarks = progress.bookmarks
    .map((id) => getLessonById(id))
    .filter(Boolean);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Saved Bookmarks
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-secondary">
          {bookmarks.length} bookmarked {bookmarks.length === 1 ? 'topic' : 'topics'} for focused revision.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="w-full py-16 text-center rounded-[var(--radius)] border border-subtle bg-card space-y-3">
          <Bookmark size={36} className="text-muted mx-auto" />
          <h3 className="text-base font-semibold text-primary">
            No Bookmarks Stored
          </h3>
          <p className="text-xs text-secondary">
            Click the "Bookmark" icon on any lesson to save it here for fast reference.
          </p>
          <div className="pt-2">
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius)] bg-accent-primary text-white font-medium text-xs hover:opacity-90"
            >
              Browse Curriculum
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {bookmarks.map((lesson) => {
            if (!lesson) return null;
            const moduleInfo = getModuleBySlug(lesson.moduleSlug);

            return (
              <div
                key={lesson.id}
                className="p-4 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between transition-all hover:border-default"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                    <span className="truncate pr-2">{moduleInfo?.title}</span>
                    <span className="capitalize">{lesson.difficulty}</span>
                  </div>
                  <Link
                    to={`/learn/${lesson.moduleSlug}/${lesson.slug}`}
                    className="font-semibold text-sm hover:text-accent-primary block truncate transition-colors text-primary"
                  >
                    {lesson.title}
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-subtle text-xs">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
                    <Clock size={11} /> {lesson.duration}m
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="p-1 rounded-[var(--radius)] text-muted hover:text-danger transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 size={13} />
                    </button>
                    <Link
                      to={`/learn/${lesson.moduleSlug}/${lesson.slug}`}
                      className="inline-flex items-center gap-1 text-accent-primary hover:opacity-80 font-medium"
                    >
                      <span>Open</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default BookmarksPage;
