import { Link } from 'react-router-dom';
import { StickyNote, ArrowRight } from 'lucide-react';
import { useApp } from '../../providers';
import { getLessonById } from '../../content/modules';

export function NotesPage() {
  const { progress } = useApp();

  const notes = Object.entries(progress.notes)
    .filter(([, note]) => note.trim().length > 0)
    .map(([id, note]) => ({ lesson: getLessonById(id), note }))
    .filter(({ lesson }) => !!lesson);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          Personal Study Notes
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-secondary">
          {notes.length} saved {notes.length === 1 ? 'note' : 'notes'} across your curriculum study sessions.
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="w-full py-16 text-center rounded-[var(--radius)] border border-subtle bg-card space-y-3">
          <StickyNote size={36} className="text-muted mx-auto" />
          <h3 className="text-base font-semibold text-primary">
            No Study Notes Recorded
          </h3>
          <p className="text-xs text-secondary">
            Use the "Notes" drawer on any lesson page to jot down architecture diagrams, interview ideas, and observations.
          </p>
          <div className="pt-2">
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius)] bg-accent-primary text-white font-medium text-xs hover:opacity-90"
            >
              Start Learning
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {notes.map(({ lesson, note }) => (
            <div key={lesson!.id} className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>{lesson!.category}</span>
                  <span className="capitalize">{lesson!.difficulty}</span>
                </div>
                <h3 className="font-semibold text-sm text-primary">
                  {lesson!.title}
                </h3>
                <p className="text-xs leading-relaxed font-mono whitespace-pre-wrap p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle text-secondary">
                  {note}
                </p>
              </div>

              <div className="pt-2 border-t border-subtle">
                <Link
                  to={`/learn/${lesson!.moduleSlug}/${lesson!.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-accent-primary hover:opacity-80 font-medium"
                >
                  <span>Open Lesson</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default NotesPage;
