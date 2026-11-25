import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  category: 'javascript' | 'react' | 'nextjs' | 'typescript' | 'frontend';
}

const CATEGORY_LABELS: Record<string, string> = {
  javascript: 'JavaScript Core & Async',
  react: 'React Internals & Architecture',
  nextjs: 'Next.js & Server Components',
  typescript: 'TypeScript Advanced Patterns',
  frontend: 'Frontend Engineering & Web Performance',
};

const SAMPLE_QUESTIONS: Record<string, Array<{
  q: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  answer: string;
}>> = {
  javascript: [
    {
      q: 'What is a closure in JavaScript? How does the JS engine retain closed-over variables in memory?',
      difficulty: 'intermediate',
      answer: `A closure is a function bundled together with references to its surrounding lexical state (the lexical environment).

Internal Mechanism:
When a function is defined, it receives an internal [[Environment]] reference to the current Lexical Environment record. When the parent execution context is popped off the Call Stack, if an inner function still holds a reference to that lexical environment record, the JavaScript Garbage Collector (mark-and-sweep) cannot reclaim those variables from heap memory.

Practical Production Example:
function createRequestLimiter(maxRequests: number) {
  let callCount = 0; // Stored in the heap via closure
  
  return function execute(url: string) {
    if (callCount >= maxRequests) {
      throw new Error('Rate limit exceeded');
    }
    callCount++;
    return fetch(url);
  };
}

const limitedFetch = createRequestLimiter(5);

Interview Follow-ups:
- "How do closures lead to memory leaks in SPAs?"
- "How does the React useEffect hook suffer from stale closure bugs?"`,
    },
    {
      q: 'Explain the Event Loop call stack, microtask queue, and macrotask queue sequence.',
      difficulty: 'advanced',
      answer: `JavaScript is single-threaded. Concurrency is orchestrated by the browser/Node event loop:

Priority Hierarchy:
1. Call Stack: Synchronous execution until completion.
2. Microtask Queue (Highest Priority Async): Drained COMPLETELY after synchronous execution finishes and before rendering or macrotasks. Includes:
   - Promise callbacks (.then, .catch, .finally)
   - queueMicrotask()
   - MutationObserver
3. Render Phase: Browser calculates style, layout, and paint.
4. Macrotask Queue (One per loop tick): Task queue executing one task, then returning to microtasks. Includes:
   - setTimeout / setInterval
   - UI user events (clicks, scrolls)
   - I/O events

Output Prediction:
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');

Execution Order: A -> D -> C -> B (C is in microtask queue; B is a macrotask).`,
    },
    {
      q: 'What is the Temporal Dead Zone (TDZ) and how does it relate to hoisting?',
      difficulty: 'basic',
      answer: `Both var, let, and const declarations are technically hoisted to the top of their enclosing scope during the compilation phase.

The Difference:
- 'var' is hoisted and initialized immediately with undefined.
- 'let' and 'const' are hoisted, but remain UNINITIALIZED.
The period from entering the block scope until the declaration statement is evaluated is called the Temporal Dead Zone (TDZ). Any attempt to read or write the variable in this zone throws a ReferenceError.

Example:
{
  // TDZ for myVar begins
  // console.log(myVar); // ReferenceError: Cannot access 'myVar' before initialization
  let myVar = 100; // TDZ ends
}`,
    },
    {
      q: 'Implement a debounce function from scratch. When is debouncing preferred over throttling?',
      difficulty: 'intermediate',
      answer: `Debounce delays function execution until after a designated cooldown period of inactivity:

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

When to use Debounce:
- Search input autocomplete (wait for user to stop typing)
- Window resize recalculation
- Auto-saving draft inputs

When to use Throttle:
- Infinite scrolling pagination
- High-frequency canvas drawing or mouse movement
- Rate-limiting high-frequency WebSocket notifications`,
    },
  ],
  react: [
    {
      q: 'How does React 18+ Fiber Reconciliation work? Why was the stack reconciler deprecated?',
      difficulty: 'advanced',
      answer: `React Fiber is a complete rewrite of the reconciliation algorithm:

Why the legacy Stack Reconciler was replaced:
The legacy reconciler operated recursively and synchronously on the call stack. Once rendering began for a deep tree, the main thread was completely blocked until the entire tree finished, causing dropped frames and sluggish user input.

Fiber Architecture:
- Each component instance is represented as a 'Fiber Node' (a unit of work).
- Fibers form a linked list (child, sibling, return).
- Work is split into two phases:
  1. Render Phase (Async & Interruptible): React walks the fiber tree, compares diffs, and marks effect tags. Urgent user input (priority lanes) can abort or pause low-priority background renders.
  2. Commit Phase (Sync & Fast): Mutates the actual DOM and triggers layout effects. Once started, this cannot be interrupted.`,
    },
    {
      q: 'What is the precise difference between useMemo and useCallback? When do they harm performance?',
      difficulty: 'advanced',
      answer: `useMemo caches a computed value:
const cachedValue = useMemo(() => compute(a, b), [a, b]);

useCallback caches a function instance:
const cachedFn = useCallback(() => handleClick(a), [a]);

When memoization harms performance:
1. Trivial computations: Memory overhead of storing closures and comparing dependency arrays on every render costs more CPU cycles than recalculating simple values.
2. Forgotten React.memo: Passing a useCallback function to a child component that is NOT wrapped in React.memo is useless, because the child will re-render anyway when the parent renders.`,
    },
    {
      q: 'What is Automatic Batching in React 18 and how does it prevent unnecessary re-renders?',
      difficulty: 'intermediate',
      answer: `Batching is when React groups multiple state updates into a single re-render pass for better performance.

React 17 Behavior:
Updates inside React synthetic event handlers were batched, but updates inside setTimeout, promises, or native event handlers were NOT batched (causing multiple separate re-renders).

React 18 Automatic Batching:
All state updates are automatically batched regardless of where they originate:
fetch('/api').then(() => {
  setIsLoading(false);
  setData(json);
  setError(null);
  // In React 18: Only 1 single re-render for all 3 state updates!
});`,
    },
    {
      q: 'What triggers a component to re-render in React? What role do state and props play, and how do you prevent unnecessary renders?',
      difficulty: 'basic',
      answer: `What Triggers a Re-render:
1. State Updates: Calling a setter function (e.g. setCount) queues a re-render.
2. Parent Component Re-renders: When a parent renders, all of its children re-render by default down the subtree!
3. Context Value Changes: Any component consuming a context via useContext re-renders when the Provider value reference changes.
4. Custom Hook State Updates: An update inside a custom hook triggers a re-render in the component using it.

The Role of State and Props:
- State is internal to the component. State updates schedule a re-render.
- Props DO NOT trigger re-renders on their own. A prop change is the consequence of the parent re-rendering. Even if child component has NO props or identical props, it re-renders by default when the parent re-renders!

Scenarios Leading to Unnecessary Re-renders:
- Inline Object/Array/Function Literals: Creating { color: 'red' } or () => {} inside render breaks React.memo shallow equality.
- State Lifted Too High: Keeping search input state in the top-level page instead of in an isolated leaf component forces the whole page to re-render on every keystroke.
- Solution: State colocation, passing static elements as {children}, or wrapping heavy pure components in React.memo with useCallback.`,
    },
    {
      q: 'How does React’s Diffing Algorithm work? How does it compare the previous and updated Virtual DOM in O(n) linear time?',
      difficulty: 'advanced',
      answer: `The Diffing Algorithm:
General tree distance algorithms have an optimal computational complexity of O(n³). React achieves O(n) linear time by making two heuristic assumptions:

1. Two Elements of Different Types Produce Different Trees:
When root elements have different types (e.g. <div> to <span>, or <Header> to <Nav>):
React completely tears down the old tree, destroys DOM nodes, unmounts all children, resets state, and builds the new tree from scratch.

2. Elements of the Same Type Update Only Modified Attributes:
When comparing <div className="before" title="stuff" /> and <div className="after" title="stuff" />:
React keeps the same real DOM node and mutates ONLY the modified attributes (className).

3. Component Keys Uniquely Identify Siblings Across Renders:
When comparing children of a parent (lists), React uses the 'key' prop to match elements between renders.
Instead of re-creating or mutating every item when an item is added or reordered, React matches keys and simply re-orders or inserts the existing DOM nodes!`,
    },
    {
      q: 'What is Reconciliation in React and how does it update only the necessary parts of the DOM instead of re-rendering everything?',
      difficulty: 'advanced',
      answer: `Reconciliation is React's engine that computes the delta between the previous and updated Virtual DOM trees and applies only the necessary mutations to the real browser DOM.

The Process:
1. Render Phase (JavaScript, Pure):
React calls component functions, constructs the new Virtual DOM / Fiber tree (workInProgress), and diffs it with the current tree. React marks effect tags (Placement, Update, Deletion) on nodes that changed. The browser DOM is completely untouched.

2. Commit Phase (DOM Mutation, Synchronous):
React iterates through the calculated list of changes and executes surgical DOM operations:
- It only modifies specific textContent or attributes.
- Unchanged DOM nodes are completely untouched.
- Native browser state (input focus, selection range, scroll position) is preserved.

Performance & User Experience:
By avoiding full-page re-renders and batching real DOM operations into a single tick, React prevents layout thrashing, avoids dropped frames, and delivers a smooth 60fps experience.`,
    },
  ],
  typescript: [
    {
      q: 'What is the difference between type vs interface in modern TypeScript for React?',
      difficulty: 'intermediate',
      answer: `Interface:
- Supports declaration merging (used extensively by DOM and library authors).
- Uses 'extends' for inheritance.
- Best for component props contracts and public library APIs.

Type Alias:
- Supports union types (type Status = 'idle' | 'loading' | 'success').
- Supports tuples, mapped types, and conditional types.
- Uses intersection '&' instead of extends.

Convention: Use interface for object and component props shapes, use type for unions, primitives, and utility transformations.`,
    },
  ],
  nextjs: [
    {
      q: 'How do React Server Components (RSC) differ from Server-Side Rendering (SSR)?',
      difficulty: 'advanced',
      answer: `SSR (Server-Side Rendering):
- Renders an HTML snapshot on the server on request.
- The ENTIRE JavaScript bundle for that page is still sent to the client to hydrate the DOM.

RSC (React Server Components):
- Components execute exclusively on the server.
- Their JavaScript code is NEVER sent to the client bundle (0 KB client bundle size).
- Can access backend files, databases, and private secrets directly without public REST endpoints.
- Return a serialized stream of UI instructions (RSC payload) rather than raw HTML.`,
    },
  ],
  frontend: [
    {
      q: 'Explain CORS and how browsers enforce it. Why can it not be bypassed purely on the frontend?',
      difficulty: 'intermediate',
      answer: `CORS (Cross-Origin Resource Sharing) is a browser-enforced security mechanism preventing malicious scripts from reading sensitive data from another domain (origin = scheme + host + port).

The browser automatically attaches the 'Origin' header. For non-simple requests (PUT, DELETE, custom headers), the browser sends an HTTP OPTIONS preflight request.
The destination server must respond with matching 'Access-Control-Allow-Origin' headers.

Why frontend cannot bypass it:
CORS is enforced BY the user's browser, not by the frontend JavaScript runtime. Solutions require:
1. Backend CORS headers configuration.
2. Reverse proxy / Vite dev server proxy.
3. Next.js API route / BFF handler.`,
    },
  ],
};

export function InterviewQuestionsPage({ category }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0);

  const questions = SAMPLE_QUESTIONS[category] || [];
  const label = CATEGORY_LABELS[category] || category;

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <Link to="/interview" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent-primary mb-2">
            <ArrowLeft size={13} /> Return to Interview Hub
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            {label}
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-secondary">
            {questions.length} real interview questions with technical explanations and senior follow-up queries.
          </p>
        </div>
      </div>

      {/* Questions List (Full Width) */}
      <div className="w-full space-y-3">
        {questions.map((item, i) => {
          const isExpanded = expanded === i;
          return (
            <div
              key={i}
              className="w-full rounded-[var(--radius)] border border-subtle bg-card overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 transition-colors hover:bg-card-subtle"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-[var(--radius)] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 bg-card-subtle text-secondary border border-subtle">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius)] border capitalize font-semibold ${
                        item.difficulty === 'basic'
                          ? 'text-success bg-success/10 border-success/20'
                          : item.difficulty === 'intermediate'
                          ? 'text-warning bg-warning/10 border-warning/20'
                          : 'text-danger bg-danger/10 border-danger/20'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="font-semibold text-xs sm:text-sm leading-snug text-primary">
                      {item.q}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-muted">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 border-t border-subtle space-y-3 text-xs leading-relaxed font-mono bg-card-subtle text-secondary">
                  <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default InterviewQuestionsPage;
