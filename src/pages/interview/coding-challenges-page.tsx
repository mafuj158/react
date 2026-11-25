import { useState } from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../../components/code-block/code-block';

interface Challenge {
  id: string;
  title: string;
  category: 'javascript' | 'react';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  requirements: string[];
  starterCode: string;
  solution: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'js-debounce',
    title: 'Implement debounce() function with cancel',
    category: 'javascript',
    difficulty: 'medium',
    description: 'Implement a debounce function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.',
    requirements: [
      'Preserve the `this` context and arguments passed to the debounced function.',
      'Reset the timer if invoked again before the wait period finishes.',
      'Expose a `.cancel()` method to clear pending timers on unmount.'
    ],
    starterCode: `function debounce(func, wait) {
  // Your implementation here
}`,
    solution: `function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function debounced(this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}`,
    explanation: 'Uses a closure to capture the timer handle. Each call clears any pending timer. Attaching .cancel() provides a clean teardown hook for React useEffect lifecycles.',
    timeComplexity: 'O(1) execution per call',
    spaceComplexity: 'O(1) closure allocation'
  },
  {
    id: 'react-fetch',
    title: 'Custom useFetch hook with AbortController',
    category: 'react',
    difficulty: 'medium',
    description: 'Build an enterprise useFetch hook that handles loading states, error catching, and aborts in-flight network requests on unmount or URL changes to avoid race conditions.',
    requirements: [
      'Return `{ data, loading, error, refetch }`.',
      'Clean up using AbortController.abort() on unmount.',
      'Ignore AbortError to prevent erroneous error states.'
    ],
    starterCode: `function useFetch(url) {
  // Your React hook implementation
}`,
    solution: `import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json() as Promise<T>;
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err });
        }
      });

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cancel = fetchData();
    return cancel;
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}`,
    explanation: 'Demonstrates proper AbortController cleanup in useEffect, handling race conditions, and preserving functional state updates.',
    timeComplexity: 'O(1) React lifecycle coordination',
    spaceComplexity: 'O(1) state memory'
  },
  {
    id: 'js-flatten',
    title: 'Multi-dimensional Array Flatten Polyfill',
    category: 'javascript',
    difficulty: 'easy',
    description: 'Write a flatten function that recursively unpacks nested arrays up to a given depth parameter without using the built-in Array.prototype.flat.',
    requirements: [
      'Accepts an array and an optional depth number (defaulting to 1).',
      'Does not mutate the original input array.',
      'Handles deeply nested irregular array structures.'
    ],
    starterCode: `function flatten(arr, depth = 1) {
  // Your code here
}`,
    solution: `function flatten<T>(arr: any[], depth: number = 1): any[] {
  if (depth <= 0) return arr.slice();
  
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}`,
    explanation: 'Uses Array.prototype.reduce with recursion. The depth counter decrements on each recursive branch until reaching base case 0.',
    timeComplexity: 'O(N) where N is total items across all dimensions',
    spaceComplexity: 'O(N) call stack and accumulator space'
  },
  {
    id: 'js-promise-all',
    title: 'Implement Promise.all() Polyfill',
    category: 'javascript',
    difficulty: 'medium',
    description: 'Implement Promise.all() from scratch, handling iterable resolution and fail-fast rejection behavior.',
    requirements: [
      'Takes an array of promises or values and returns a single Promise.',
      'Resolves with an array of resolved values in exact input order.',
      'Rejects immediately upon the first promise rejection (fail-fast).'
    ],
    starterCode: `function myPromiseAll(promises) {
  // Your implementation here
}`,
    solution: `function myPromiseAll<T>(promises: Array<T | Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    const n = promises.length;
    if (n === 0) return resolve([]);

    const results = new Array<T>(n);
    let resolvedCount = 0;

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then(val => {
          results[idx] = val;
          resolvedCount++;
          if (resolvedCount === n) {
            resolve(results);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}`,
    explanation: 'Wraps each input in Promise.resolve() to handle non-promise values. Uses a resolvedCount counter to verify completion without race bugs.',
    timeComplexity: 'O(N) where N is the number of promises',
    spaceComplexity: 'O(N) results array storage'
  },
  {
    id: 'react-todo',
    title: 'Optimistic Todo App with Filter Tabs',
    category: 'react',
    difficulty: 'easy',
    description: 'Build a production-quality Todo application featuring adding, toggling, deleting, and filtering by all/active/completed.',
    requirements: [
      'Support adding new todos with trimmed validation.',
      'Toggle completed status and delete items.',
      'Filter view: All, Active, Completed.',
      'Persist state in localStorage.'
    ],
    starterCode: `export function TodoApp() {
  // Your implementation
}`,
    solution: `import React, { useState, useMemo } from 'react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'completed') return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <div className="p-4 space-y-4 border rounded-[var(--radius)]">
      <form onSubmit={addTodo} className="flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="New task..." 
          className="flex-1 px-3 py-1.5 border rounded-[var(--radius)]"
        />
        <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-[var(--radius)]">
          Add
        </button>
      </form>
      <div className="flex gap-2 border-b pb-2">
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            className={\`px-3 py-1 text-xs capitalize rounded-[var(--radius)] \${filter === f ? 'bg-blue-600 text-white' : 'bg-subtle'}\`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {filteredTodos.map(t => (
          <li key={t.id} className="flex items-center justify-between p-2 border rounded-[var(--radius)]">
            <span 
              onClick={() => toggleTodo(t.id)} 
              className={\`cursor-pointer \${t.done ? 'line-through text-gray-400' : ''}\`}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)} className="text-red-500 text-xs">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: 'Implements declarative state management, useMemo for filtered lists, and immutable array operations for predictable re-renders.',
    timeComplexity: 'O(N) filtering operations',
    spaceComplexity: 'O(N) memory'
  },
  {
    id: 'react-tabs',
    title: 'Compound Component Tabs Pattern',
    category: 'react',
    difficulty: 'hard',
    description: 'Build an accessible compound component Tabs system using React Context for implicit state sharing.',
    requirements: [
      'Components: <Tabs>, <TabList>, <Tab>, and <TabPanel>.',
      'Share active tab index implicitly via React Context.',
      'Support keyboard navigation and clean semantic markup.'
    ],
    starterCode: `export function TabsDemo() {
  // Your compound tabs implementation
}`,
    solution: `import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full space-y-3">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return <div className="flex border-b border-subtle gap-2">{children}</div>;
}

export function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within <Tabs>');
  const isActive = context.activeTab === id;

  return (
    <button
      onClick={() => context.setActiveTab(id)}
      className={\`px-4 py-2 text-sm font-medium border-b-2 transition-colors rounded-[var(--radius)] \${
        isActive ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-secondary hover:text-primary'
      }\`}
    >
      {children}
    </button>
  );
}

export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within <Tabs>');
  if (context.activeTab !== id) return null;
  return <div className="p-4 border rounded-[var(--radius)] bg-surface">{children}</div>;
}`,
    explanation: 'Demonstrates the Compound Component pattern: state is managed centrally by Tabs and shared down via Context, giving users flexible layout control without prop drilling.',
    timeComplexity: 'O(1) active tab lookups',
    spaceComplexity: 'O(1) context reference'
  }
];

export function CodingChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <Link to="/interview" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent-primary mb-2">
            <ArrowLeft size={13} /> Return to Interview Hub
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Frontend Coding Challenges
          </h1>
          <p className="text-xs sm:text-sm mt-1 text-secondary">
            Practical algorithmic, utility, and custom hook challenges asked in top frontend interviews.
          </p>
        </div>
      </div>

      {/* Split IDE Layout (Full Width) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Challenge Picker List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-muted font-semibold px-1">
            Available Problems ({CHALLENGES.length})
          </div>
          {CHALLENGES.map((ch) => {
            const isSelected = ch.id === activeChallenge.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChallenge(ch);
                  setShowSolution(false);
                }}
                className={`w-full p-4 rounded-[var(--radius)] border text-left transition-all ${
                  isSelected
                    ? 'bg-accent-subtle border-primary text-primary shadow-xs'
                    : 'bg-card border-subtle text-secondary hover:border-default hover:bg-card-subtle'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent-primary font-bold">
                    {ch.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius)] border capitalize ${
                    ch.difficulty === 'easy'
                      ? 'text-success bg-success/10 border-success/20'
                      : 'text-warning bg-warning/10 border-warning/20'
                  }`}>
                    {ch.difficulty}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate text-primary">
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Problem Detail, Specs & Solution (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-[var(--radius)] border border-subtle bg-card space-y-5">
          <div className="border-b border-subtle pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase text-accent-primary font-semibold">{activeChallenge.category}</span>
              <span className="text-muted">·</span>
              <span className="text-xs font-mono capitalize text-muted">{activeChallenge.difficulty}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary">
              {activeChallenge.title}
            </h2>
            <p className="text-xs sm:text-sm mt-2 leading-relaxed text-secondary">
              {activeChallenge.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2">
              Implementation Requirements
            </h3>
            <ul className="space-y-1.5 text-xs">
              {activeChallenge.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-accent-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Starter Code */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2">
              Starter Code
            </h3>
            <CodeBlock code={activeChallenge.starterCode} language="typescript" title="index.ts" />
          </div>

          {/* Complexity Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-muted">
            <span className="px-2.5 py-1 rounded-[var(--radius)] border border-subtle bg-card-subtle">
              Time: {activeChallenge.timeComplexity}
            </span>
            <span className="px-2.5 py-1 rounded-[var(--radius)] border border-subtle bg-card-subtle">
              Space: {activeChallenge.spaceComplexity}
            </span>
          </div>

          {/* Reveal Button */}
          <div className="pt-2">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 rounded-[var(--radius)] bg-accent-primary hover:opacity-90 text-white font-medium text-xs transition-opacity"
            >
              {showSolution ? 'Hide Solution' : 'Reveal Reference Solution & Analysis'}
            </button>
          </div>

          {/* Solution & Explanation */}
          {showSolution && (
            <div className="space-y-4 pt-4 border-t border-subtle">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-success mb-2">
                  Production Reference Solution
                </h3>
                <CodeBlock code={activeChallenge.solution} language="typescript" title="solution.ts" />
              </div>

              <div className="p-4 rounded-[var(--radius)] border border-subtle bg-card-subtle text-xs leading-relaxed text-secondary">
                <span className="font-bold text-accent-primary font-mono block mb-1">Architecture Analysis:</span>
                {activeChallenge.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CodingChallengesPage;
