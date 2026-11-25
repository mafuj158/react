import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight,
  Clock, BookOpen, AlertTriangle, Lightbulb, HelpCircle,
  Code2, Check, StickyNote, ChevronDown, ChevronUp
} from 'lucide-react';
import { useApp } from '../../providers';
import { getLessonBySlug, getModuleBySlug, getAdjacentLessons } from '../../content/modules';
import { getLessonContent } from '../../content/lessons';
import { CodeBlock } from '../../components/code-block/code-block';
import { Badge } from '../../components/ui/badge';

export function LessonPage() {
  const { moduleSlug, lessonSlug } = useParams<{ moduleSlug: string; lessonSlug: string }>();
  const {
    isCompleted,
    completeLesson,
    isBookmarked,
    toggleBookmark,
    progress,
    saveNote
  } = useApp();

  const lesson = getLessonBySlug(moduleSlug || '', lessonSlug || '');
  const moduleInfo = getModuleBySlug(moduleSlug || '');
  const { prev, next } = getAdjacentLessons(moduleSlug || '', lessonSlug || '');
  const content = getLessonContent(lessonSlug || '');

  // Notes state
  const [noteText, setNoteText] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Expanded interview questions
  const [expandedIq, setExpandedIq] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (lesson) {
      setNoteText(progress.notes[lesson.id] || '');
      setQuizAnswers({});
      setSubmittedQuiz(false);
      window.scrollTo(0, 0);
    }
  }, [lesson, progress.notes]);

  if (!lesson || !moduleInfo) {
    return (
      <div className="w-full py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Lesson Not Found
        </h2>
        <p className="text-secondary text-sm">
          The requested lesson does not exist in this module.
        </p>
        <Link
          to="/curriculum"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-accent-primary text-white font-medium text-xs"
        >
          <BookOpen size={14} /> Return to Curriculum
        </Link>
      </div>
    );
  }

  const completed = isCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.id);

  const handleSaveNote = () => {
    saveNote(lesson.id, noteText);
    alert('Note saved successfully!');
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  return (
    <div className="w-full space-y-8 pb-16 font-sans">
      {/* Top Header & Actions Bar (Full Width) */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          <Link to="/curriculum" className="hover:text-accent-primary transition-colors">Curriculum</Link>
          <span>/</span>
          <span className="text-secondary truncate max-w-xs">{moduleInfo.title}</span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-[var(--radius)] border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showNotes
                ? 'bg-accent-primary text-white border-primary'
                : 'bg-card border-subtle text-secondary hover:text-primary hover:bg-card-subtle'
            }`}
          >
            <StickyNote size={14} />
            <span>Notes</span>
          </button>

          <button
            onClick={() => toggleBookmark(lesson.id)}
            className={`px-3 py-1.5 rounded-[var(--radius)] border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              bookmarked
                ? 'bg-warning/10 text-warning border-warning/30'
                : 'bg-card border-subtle text-secondary hover:text-primary hover:bg-card-subtle'
            }`}
          >
            {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={() => completeLesson(lesson.id)}
            className={`px-3.5 py-1.5 rounded-[var(--radius)] text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              completed
                ? 'bg-success text-white'
                : 'bg-accent-primary hover:opacity-90 text-white'
            }`}
          >
            <CheckCircle2 size={14} />
            <span>{completed ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Slide-down Notes Drawer */}
      {showNotes && (
        <div className="w-full p-4 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-warning">
              Personal Study Notes
            </span>
            <span className="text-[11px] font-mono text-muted">Auto-saved to localStorage</span>
          </div>
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Record architecture insights, interview talking points, or questions..."
            className="w-full p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle text-primary text-xs font-mono outline-none focus:border-default"
          />
          <button
            onClick={handleSaveNote}
            className="px-3 py-1.5 rounded-[var(--radius)] bg-accent-primary text-white text-xs font-medium hover:opacity-90"
          >
            Save Notes
          </button>
        </div>
      )}

      {/* 1. Lesson Title & Overview */}
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={lesson.difficulty} variant={lesson.difficulty} />
          <span className="text-xs font-mono text-muted flex items-center gap-1">
            <Clock size={11} /> {lesson.duration} min read
          </span>
          <span className="text-muted">·</span>
          <span className="text-xs font-mono text-secondary">{lesson.category}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base leading-relaxed text-secondary">
          {content.overview}
        </p>

        {/* Objectives Box */}
        {lesson.objectives.length > 0 && (
          <div className="p-4 rounded-[var(--radius)] border border-subtle bg-card">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-accent-primary">
              Learning Objectives
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 size={13} className="text-accent-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. Conceptual Deep Dive: Why It Exists & How It Works */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-2.5">
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold flex items-center gap-2 text-warning">
            <Lightbulb size={16} />
            Why This Concept Exists
          </h2>
          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-secondary">
            {content.whyItExists}
          </div>
        </section>

        <section className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-2.5">
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold flex items-center gap-2 text-accent-primary">
            <Code2 size={16} />
            Internal Mechanics & Lifecycle
          </h2>
          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-secondary">
            {content.howItWorks}
          </div>
        </section>
      </div>

      {/* 3. Production Code Implementations (Full Width) */}
      {content.codeExamples && content.codeExamples.length > 0 && (
        <section className="w-full space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Technical Code Implementations
          </h2>
          <div className="space-y-6">
            {content.codeExamples.map((ex) => (
              <div key={ex.id} className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-primary">
                    {ex.title}
                  </h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-[var(--radius)] border border-primary/20 text-accent-primary bg-accent-subtle">
                    {ex.level}
                  </span>
                </div>
                <p className="text-xs text-muted">{ex.description}</p>
                <CodeBlock code={ex.code} language={ex.language} title={ex.title} />
                <div className="p-3 rounded-[var(--radius)] border border-subtle bg-card-subtle text-xs font-mono text-secondary">
                  <span className="font-bold text-accent-primary">Analysis: </span>
                  {ex.explanation}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Common Anti-Patterns & Fixes */}
      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <section className="w-full space-y-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-primary">
            <AlertTriangle size={18} className="text-danger" />
            Common Anti-Patterns & Engineering Solutions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {content.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="p-5 rounded-[var(--radius)] border border-danger/30 bg-danger/5 space-y-3">
                <h3 className="font-bold text-sm text-danger">{mistake.title}</h3>
                <p className="text-xs text-secondary">
                  {mistake.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mistake.wrongCode && (
                    <div>
                      <span className="text-[11px] font-mono font-bold text-danger mb-1 block">❌ Anti-pattern:</span>
                      <pre className="p-3 rounded-[var(--radius)] text-xs font-mono bg-card border border-danger/30 text-danger overflow-x-auto">
                        {mistake.wrongCode}
                      </pre>
                    </div>
                  )}
                  {mistake.correctCode && (
                    <div>
                      <span className="text-[11px] font-mono font-bold text-success mb-1 block">✅ Production Fix:</span>
                      <pre className="p-3 rounded-[var(--radius)] text-xs font-mono bg-card border border-success/30 text-success overflow-x-auto">
                        {mistake.correctCode}
                      </pre>
                    </div>
                  )}
                </div>

                <p className="text-xs italic text-muted">{mistake.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Production Best Practices & Performance Row */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.bestPractices && content.bestPractices.length > 0 && (
          <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
            <h3 className="font-mono text-xs font-bold text-success uppercase tracking-wider">
              Architecture Best Practices
            </h3>
            <ul className="space-y-2 text-xs">
              {content.bestPractices.map((bp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="text-secondary">{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.performanceNotes && content.performanceNotes.length > 0 && (
          <div className="p-5 rounded-[var(--radius)] border border-subtle bg-card space-y-3">
            <h3 className="font-mono text-xs font-bold text-warning uppercase tracking-wider">
              Performance Considerations
            </h3>
            <ul className="space-y-2 text-xs">
              {content.performanceNotes.map((pn, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Lightbulb size={14} className="text-warning flex-shrink-0 mt-0.5" />
                  <span className="text-secondary">{pn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 6. Interview Preparation Questions */}
      {content.interviewQuestions && content.interviewQuestions.length > 0 && (
        <section className="w-full space-y-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-primary">
            <HelpCircle size={18} className="text-purple" />
            Technical Interview Preparation
          </h2>
          <div className="space-y-2.5">
            {content.interviewQuestions.map((iq) => {
              const isExpanded = !!expandedIq[iq.id];
              return (
                <div key={iq.id} className="w-full rounded-[var(--radius)] border border-subtle bg-card overflow-hidden">
                  <button
                    onClick={() => setExpandedIq((p) => ({ ...p, [iq.id]: !isExpanded }))}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-xs sm:text-sm hover:bg-card-subtle transition-colors"
                  >
                    <span className="text-primary">{iq.question}</span>
                    <span className="text-xs font-mono text-purple flex items-center gap-1 flex-shrink-0">
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {isExpanded ? 'Hide' : 'Reveal'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t border-subtle space-y-3 text-xs leading-relaxed bg-card-subtle text-secondary">
                      <p>{iq.answer}</p>
                      {iq.followUpQuestions && iq.followUpQuestions.length > 0 && (
                        <div className="pt-2 border-t border-subtle">
                          <span className="font-bold text-purple block mb-1">Follow-up inquiries:</span>
                          <ul className="list-disc pl-4 space-y-1">
                            {iq.followUpQuestions.map((fq, fi) => (
                              <li key={fi}>{fq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Knowledge Check Quiz */}
      {content.quizQuestions && content.quizQuestions.length > 0 && (
        <section className="w-full p-6 rounded-[var(--radius)] border border-subtle bg-card space-y-5">
          <h2 className="text-lg font-bold tracking-tight text-primary">
            Knowledge Check Quiz
          </h2>

          <div className="space-y-5">
            {content.quizQuestions.map((q, qIndex) => {
              const selected = quizAnswers[q.id];
              const isCorrect = selected === q.correctAnswer;

              return (
                <div key={q.id} className="space-y-2.5">
                  <p className="font-semibold text-xs sm:text-sm text-primary">
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options?.map((opt, optIndex) => {
                      const isOptionSelected = selected === optIndex;
                      let optionClasses = 'bg-card border-subtle text-secondary hover:border-default';

                      if (isOptionSelected) {
                        optionClasses = 'bg-accent-subtle border-primary text-accent-primary';
                      }

                      if (submittedQuiz) {
                        if (optIndex === q.correctAnswer) {
                          optionClasses = 'bg-success/20 border-success text-success';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'bg-danger/20 border-danger text-danger';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-[var(--radius)] border text-xs font-medium transition-all ${optionClasses}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <p className="text-xs text-muted font-mono italic">
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            {!submittedQuiz ? (
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(quizAnswers).length === 0}
                className="px-4 py-2 rounded-[var(--radius)] bg-accent-primary text-white font-semibold text-xs hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmittedQuiz(false);
                  setQuizAnswers({});
                }}
                className="px-4 py-2 rounded-[var(--radius)] border border-subtle bg-card text-secondary hover:text-primary text-xs font-medium"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </section>
      )}

      {/* 8. Prev / Next Navigation Footer */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-subtle">
        {prev ? (
          <Link
            to={`/learn/${prev.moduleSlug}/${prev.slug}`}
            className="flex items-center gap-2 text-xs font-semibold text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <div>
              <span className="text-[10px] text-muted block uppercase font-mono">Previous</span>
              <span>{prev.title}</span>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            to={`/learn/${next.moduleSlug}/${next.slug}`}
            className="flex items-center gap-2 text-xs font-semibold text-accent-primary hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <span className="text-[10px] text-muted block uppercase font-mono">Next</span>
              <span>{next.title}</span>
            </div>
            <ArrowRight size={14} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
export default LessonPage;
