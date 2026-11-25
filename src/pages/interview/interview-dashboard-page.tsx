import { Link } from 'react-router-dom';
import { Trophy, Code2, Target, BrainCircuit, ArrowRight, Terminal } from 'lucide-react';
import { useApp } from '../../providers';

const CATEGORIES = [
  { id: 'javascript', label: 'JavaScript Core & Async', path: '/interview/javascript', count: '18 Questions', color: 'text-warning', desc: 'ES6+, closures, event loop microtasks, async/await, prototypes' },
  { id: 'react', label: 'React Internals & Architecture', path: '/interview/react', count: '24 Questions', color: 'text-accent-primary', desc: 'Hooks, Fiber scheduler, reconciliation, batching, performance' },
  { id: 'nextjs', label: 'Next.js & Server Components', path: '/interview/nextjs', count: '15 Questions', color: 'text-primary', desc: 'App Router, Server Actions, streaming, caching, revalidation' },
  { id: 'typescript', label: 'TypeScript Advanced Patterns', path: '/interview/typescript', count: '12 Questions', color: 'text-accent-primary', desc: 'Generics, conditional types, component prop typing, utility types' },
  { id: 'frontend', label: 'Web Engineering & Performance', path: '/interview/frontend', count: '14 Questions', color: 'text-success', desc: 'Core Web Vitals, security, CORS, DOM performance, accessibility' },
];

export function InterviewDashboardPage() {
  const { progress } = useApp();

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-subtle">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Frontend Developer Interview Preparation
          </h1>
          <p className="text-sm mt-1 text-secondary">
            Targeted preparation for React.js and Next.js roles (1–3 years professional frontend experience).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/interview/mock"
            className="px-4 py-2 rounded-[var(--radius)] bg-accent-primary hover:opacity-90 text-white font-medium text-xs flex items-center gap-2 transition-opacity"
          >
            <BrainCircuit size={14} />
            <span>Start Mock Interview</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Mock Sessions Completed', value: progress.interviewSessions.length, icon: Trophy, color: 'text-purple' },
          { label: 'Coding Challenges Mastered', value: Object.values(progress.codingChallengeProgress).filter(c => c.status === 'completed').length, icon: Code2, color: 'text-accent-primary' },
          { label: 'Readiness Benchmark', value: progress.interviewSessions.length > 0 ? `${Math.round(progress.interviewSessions.reduce((a, s) => a + s.score, 0) / progress.interviewSessions.length)}%` : 'Active', icon: Target, color: 'text-success' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-[var(--radius)] border border-subtle bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-secondary">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <div className="text-2xl font-bold tracking-tight text-primary">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Question Banks: Full Width Grid */}
      <div className="w-full space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          Curated Question Banks by Discipline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex flex-col justify-between transition-all hover:border-default hover:bg-card-subtle group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold tracking-wide uppercase ${cat.color}`}>
                    {cat.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius)] border border-subtle text-muted">
                    {cat.count}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-primary group-hover:text-accent-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs line-clamp-2 leading-relaxed text-secondary">
                  {cat.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-accent-primary font-medium mt-4 pt-3 border-t border-subtle">
                <span>Open Question Bank</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Practical Practice Labs */}
      <div className="w-full space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          Interactive Technical Testing Labs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/interview/coding"
            className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex items-start gap-4 transition-all hover:border-default hover:bg-card-subtle"
          >
            <div className="w-10 h-10 rounded-[var(--radius)] bg-accent-subtle text-accent-primary border border-primary/20 flex items-center justify-center flex-shrink-0 font-mono">
              <Code2 size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-primary">
                Coding Challenges & Polyfills
              </h3>
              <p className="text-xs mt-1 leading-relaxed text-secondary">
                Hands-on problems: debouncing, custom useFetch hook, flattened array polyfill, and React component state optimizations.
              </p>
            </div>
          </Link>

          <Link
            to="/interview/mock"
            className="p-5 rounded-[var(--radius)] border border-subtle bg-card flex items-start gap-4 transition-all hover:border-default hover:bg-card-subtle"
          >
            <div className="w-10 h-10 rounded-[var(--radius)] bg-purple/10 text-purple border border-purple/20 flex items-center justify-center flex-shrink-0 font-mono">
              <Terminal size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-primary">
                Simulated Mock Interview
              </h3>
              <p className="text-xs mt-1 leading-relaxed text-secondary">
                Timed prompt simulation with keyword validation, senior answer evaluation, and scoring feedback.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default InterviewDashboardPage;
