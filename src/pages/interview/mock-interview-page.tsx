import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MockQuestion {
  id: string;
  question: string;
  category: string;
  points: number;
  expectedKeywords: string[];
  sampleAnswer: string;
}

const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 'm-1',
    question: 'How does React batch state updates, and what changed in React 18 automatic batching?',
    category: 'React Internals',
    points: 10,
    expectedKeywords: ['render phase', 'microtask', 'automatic batching', 'promises', 'setTimeout'],
    sampleAnswer: 'In React 17 and earlier, React only batched updates inside React event handlers. In React 18, Automatic Batching groups state updates everywhere by default — inside promises, setTimeout, native event handlers, and fetch callbacks. This drastically cuts down on unnecessary re-renders.'
  },
  {
    id: 'm-2',
    question: 'What are the primary differences between client-side rendering (CSR) and server-side rendering (SSR)?',
    category: 'Next.js & Architecture',
    points: 10,
    expectedKeywords: ['bundle size', 'hydration', 'SEO', 'initial load', 'TTFB'],
    sampleAnswer: 'CSR loads an empty HTML shell and downloads a JavaScript bundle which builds the DOM in the browser. SSR renders the complete HTML markup on the server on each request and sends ready HTML to the client for immediate display, followed by hydration for interactivity.'
  },
  {
    id: 'm-3',
    question: 'Explain referential equality in JavaScript and why it causes unwanted re-renders in React.',
    category: 'React Performance',
    points: 10,
    expectedKeywords: ['memory address', 'primitive vs object', 'React.memo', 'useCallback', 'useMemo'],
    sampleAnswer: 'Objects and functions are compared by memory reference, not by value. Every time a component renders, inline objects/functions get recreated with a brand-new memory reference. Even if their contents are identical, child components wrapped in React.memo see new props and re-render.'
  },
  {
    id: 'm-4',
    question: 'What triggers a component to re-render in React, and does changing a prop directly cause a re-render?',
    category: 'React Core',
    points: 10,
    expectedKeywords: ['state update', 'parent re-render', 'context value', 'prop change fallacy', 'React.memo'],
    sampleAnswer: 'Components re-render due to: 1) local state changes via useState/useReducer, 2) parent component re-rendering, 3) context value changes, or 4) custom hook updates. Props DO NOT trigger re-renders on their own; changing props is merely the effect of a parent re-rendering and passing down new values. Even if a child receives no props, it still re-renders by default when its parent renders unless memoized.'
  },
  {
    id: 'm-5',
    question: 'How does React’s Diffing Algorithm achieve O(n) linear performance instead of the theoretical O(n³) tree comparison?',
    category: 'React Internals',
    points: 10,
    expectedKeywords: ['heuristics', 'element type', 'key prop', 'O(n) vs O(n³)', 'unmount and rebuild'],
    sampleAnswer: 'General tree diffing algorithms require O(n³) time, which would freeze the browser with 1,000 nodes. React achieves O(n) linear complexity by relying on two heuristics: 1) Elements of different types produce completely different trees (React tears down the old tree and mounts a new one), and 2) Elements can be tracked across renders with a unique "key" prop, allowing React to match existing nodes and minimize mutations.'
  },
  {
    id: 'm-6',
    question: 'What is Reconciliation in React and what happens during the Render Phase versus the Commit Phase?',
    category: 'React Internals',
    points: 10,
    expectedKeywords: ['Virtual DOM', 'Render phase pure', 'Commit phase synchronous', 'Fiber', 'DOM mutations'],
    sampleAnswer: 'Reconciliation is the process of diffing the new Virtual DOM tree against the previous one and determining minimal host updates. In the Render Phase, React runs component functions and builds a work-in-progress Fiber tree (pure JavaScript, interruptible in Concurrent React). In the Commit Phase, React synchronously applies the calculated changes (insertions, attribute updates, deletions) to the real browser DOM in a single batch.'
  },
  {
    id: 'm-7',
    question: 'What is a stale closure in React and how do you encounter or resolve it inside useEffect or useCallback?',
    category: 'JavaScript & React',
    points: 10,
    expectedKeywords: ['lexical scope', 'closure capture', 'dependency array', 'functional update', 'useRef'],
    sampleAnswer: 'A stale closure occurs when a callback captures variables from an earlier render and continues referencing those outdated values over time. This happens in useEffect or setInterval callbacks when dependency arrays are omitted or incomplete. Solutions include adding the variable to the dependency array, using functional state updates like setCount(c => c + 1), or storing the latest value in a mutable useRef.'
  },
  {
    id: 'm-8',
    question: 'When should you choose Zustand or Redux Toolkit over the native React Context API?',
    category: 'Architecture',
    points: 10,
    expectedKeywords: ['re-render optimization', 'selector subscription', 'action middleware', 'boilerplate', 'high-frequency state'],
    sampleAnswer: 'React Context is designed for low-frequency updates (themes, user auth, locales) because every consumer re-renders whenever any part of the context value changes. For complex, high-frequency state (e.g. dashboards, editors, e-commerce carts), external stores like Zustand or Redux Toolkit offer fine-grained selector subscriptions (only components selecting the specific changed property re-render), DevTools time-travel debugging, and middleware.'
  },
  {
    id: 'm-9',
    question: 'What are React Server Components (RSC) and how do they differ from traditional Server-Side Rendering (SSR)?',
    category: 'Next.js & Architecture',
    points: 10,
    expectedKeywords: ['zero client bundle', 'RSC wire format', 'hydration', 'database direct access', 'use client boundary'],
    sampleAnswer: 'Traditional SSR renders components to HTML on the server, but still ships the full JavaScript code of every component to the client for hydration. React Server Components execute exclusively on the server and never ship their JavaScript to the client bundle (zero client bundle size). They stream to the browser in a special JSON-like RSC wire format and interleave seamlessly with interactive Client Components marked with "use client".'
  },
  {
    id: 'm-10',
    question: 'What are Core Web Vitals (LCP, CLS, INP) and how do they impact React frontend performance?',
    category: 'Performance',
    points: 10,
    expectedKeywords: ['Largest Contentful Paint', 'Cumulative Layout Shift', 'Interaction to Next Paint', 'main thread blocking', 'hydration lag'],
    sampleAnswer: 'LCP (Largest Contentful Paint) measures perceptual loading speed (target < 2.5s). CLS (Cumulative Layout Shift) measures visual stability and layout jumping (target < 0.1). INP (Interaction to Next Paint) measures page responsiveness to user inputs like clicks and keys (target < 200ms). In React apps, optimizing bundle size, deferring non-critical scripts, virtualizing lists, and avoiding long render tasks directly improves INP and LCP.'
  }
];

export function MockInterviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [userNotes, setUserNotes] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [completed]);

  const currentQ = MOCK_QUESTIONS[currentIndex];

  const handleNext = (awardedPoints: number) => {
    setScore((s) => s + awardedPoints);
    setShowAnswer(false);
    setUserNotes('');
    setTimeLeft(120);
    if (currentIndex + 1 < MOCK_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setTimeLeft(120);
    setUserNotes('');
    setShowAnswer(false);
    setCompleted(false);
    setScore(0);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <Link to="/interview" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent-primary mb-2">
            <ArrowLeft size={13} /> Return to Interview Hub
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Timed Mock Interview Simulator
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-secondary">
            Simulate a live engineering interview session with timed verbal reasoning and evaluation.
          </p>
        </div>

        {!completed && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius)] border border-purple/30 bg-purple/10 text-purple font-mono font-bold text-xs self-start sm:self-center">
            <Clock size={14} />
            <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
        )}
      </div>

      {completed ? (
        <div className="w-full p-8 rounded-[var(--radius)] border border-subtle bg-card text-center space-y-4">
          <CheckCircle2 size={40} className="text-success mx-auto" />
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Mock Interview Completed
          </h2>
          <p className="text-sm text-secondary">
            Your final self-evaluated score: <span className="font-bold text-success font-mono">{score}</span> / {MOCK_QUESTIONS.length * 10} points ({Math.round((score / (MOCK_QUESTIONS.length * 10)) * 100)}%)
          </p>
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-accent-primary hover:opacity-90 text-white font-medium text-xs transition-opacity"
          >
            <RotateCcw size={14} />
            Restart New Session
          </button>
        </div>
      ) : (
        <div className="w-full p-6 rounded-[var(--radius)] border border-subtle bg-card space-y-5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple uppercase font-semibold">{currentQ.category}</span>
            <span className="text-muted">
              Question {currentIndex + 1} of {MOCK_QUESTIONS.length}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold leading-snug text-primary">
            {currentQ.question}
          </h2>

          <div>
            <label className="block text-xs font-mono font-semibold mb-2 text-secondary">
              Candidate Notes / Bullet Points:
            </label>
            <textarea
              rows={4}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Structure your answer: What -> Why -> How -> Internal Mechanism -> Trade-offs..."
              className="w-full p-3.5 rounded-[var(--radius)] border border-subtle bg-card-subtle text-primary text-xs font-mono outline-none focus:border-default"
            />
          </div>

          <div>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-3.5 py-1.5 rounded-[var(--radius)] border border-subtle bg-card hover:bg-card-subtle text-secondary hover:text-primary text-xs font-medium transition-colors"
            >
              {showAnswer ? 'Hide Benchmark Answer' : 'Reveal Ideal Answer & Keywords'}
            </button>
          </div>

          {showAnswer && (
            <div className="p-5 rounded-[var(--radius)] border border-purple/30 bg-purple/5 space-y-3.5">
              <div>
                <span className="text-[11px] font-mono font-bold text-purple uppercase tracking-wider block mb-1.5">
                  Expected Technical Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentQ.expectedKeywords.map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded-[var(--radius)] text-[11px] font-mono bg-purple/10 text-purple border border-purple/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-purple uppercase tracking-wider block mb-1">
                  Senior Engineering Answer
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-secondary">
                  {currentQ.sampleAnswer}
                </p>
              </div>

              <div className="pt-3 border-t border-purple/20">
                <span className="text-xs font-semibold block mb-2 text-secondary">
                  Self Evaluation:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleNext(10)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] bg-success/20 text-success border border-success/30 text-xs font-semibold hover:bg-success/30 transition-colors"
                  >
                    <CheckCircle2 size={13} /> Strong (10 pts)
                  </button>
                  <button
                    onClick={() => handleNext(5)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] bg-warning/20 text-warning border border-warning/30 text-xs font-semibold hover:bg-warning/30 transition-colors"
                  >
                    Partial (5 pts)
                  </button>
                  <button
                    onClick={() => handleNext(0)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] bg-danger/20 text-danger border border-danger/30 text-xs font-semibold hover:bg-danger/30 transition-colors"
                  >
                    <XCircle size={13} /> Missed (0 pts)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default MockInterviewPage;
