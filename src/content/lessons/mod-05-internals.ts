import type { LessonContent } from '../../types';

export const MOD_05_LESSONS: Record<string, Partial<LessonContent>> = {
  'fiber-architecture': {
    overview: 'Deep dive into React Fiber Architecture: Why the stack reconciler was rewritten, Fiber node data structure (child, sibling, return), Work Loop, priority lanes, and how Fiber enables Concurrent React.',
    whyItExists: `Before React 16, React used the "Stack Reconciler". It traversed the component tree recursively using the JavaScript call stack:
1. Once rendering started, it could not be paused or interrupted until the entire tree was processed.
2. In large component trees with thousands of nodes, a render pass took 50-200ms, completely freezing the browser main thread and dropping frames.
3. User interactions (typing, clicking, animations) were blocked, producing severe input lag.
React Fiber was a ground-up rewrite that converted tree recursion into an interruptible virtual stack frame of linked lists.`,
    howItWorks: `1. WHAT IS A FIBER NODE:
A Fiber is a plain JavaScript object that represents a "unit of work":
- tag: Identifies component type (FunctionComponent, HostComponent/DOM node, ContextProvider).
- key & type: Identity and component function.
- stateNode: Reference to the real DOM element or class instance.
- child: Pointer to first direct child fiber.
- sibling: Pointer to next sibling fiber.
- return: Pointer to parent fiber (return address when work completes).
- memoizedState: Linked list of hooks on this component!
- flags (EffectTag): Bitmask of work needed on DOM (Placement, Update, Deletion).
- alternate: Pointer to its corresponding node in the other tree (Current vs WorkInProgress).

2. THE FIBER WORK LOOP:
React Fiber converts recursive call stacks into an iterative while-loop:
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
If shouldYield() returns true (e.g. 5ms has passed and the browser needs to handle a click or render a frame), React pauses execution, saves the workInProgress pointer, and yields the main thread back to the browser!

3. DOUBLE BUFFERING:
React maintains two Fiber trees:
- current tree: Represents what is currently visible on the screen.
- workInProgress tree: Built in memory in the background during the render phase.
When work finishes, React swaps a single root pointer: workInProgress becomes the new current tree!`,
    codeExamples: [
      {
        id: 'fib-ex-1',
        title: 'Anatomy of a Fiber Node in JavaScript Memory',
        description: 'Conceptual inspection of how a Fiber node connects to its child, sibling, and parent in a singly-linked list.',
        language: 'typescript',
        level: 'advanced',
        code: `// Conceptual Fiber node structure in React source code
interface FiberNode {
  tag: number;               // 0 = FunctionComponent, 5 = HostComponent (div, span)
  key: string | null;        // Key prop
  type: any;                 // Component function or 'div' string
  stateNode: any;            // Real DOM node (e.g. HTMLDivElement)

  // Singly Linked List Tree Traversal Pointers:
  child: FiberNode | null;   // First child
  sibling: FiberNode | null; // Next sibling
  return: FiberNode | null;  // Parent container

  // Linked list of hooks on this component:
  memoizedState: any;        // Head of Hook linked list (useState, useEffect)

  // Flags for DOM mutations:
  flags: number;             // Placement (2), Update (4), Deletion (8)

  // Double Buffering:
  alternate: FiberNode | null; // Pointer to current or workInProgress counterpart
}`,
        explanation: 'The child/sibling/return pointers convert tree traversal into a singly linked list that can be paused and resumed without losing stack context.'
      }
    ],
    realWorldUseCases: [
      'Enabling smooth 60fps animations and non-blocking input handling in massive enterprise web apps.',
      'Allowing React 18 Concurrent Features (Transitions, Suspense, streaming SSR).',
      'Debugging performance bottlenecks using React DevTools Profiler flamegraphs.'
    ],
    commonMistakes: [
      {
        title: 'Thinking Fiber is a separate framework from React',
        description: 'Fiber is not a separate library; it is the internal engine and reconciliation algorithm of React itself (introduced in React 16 and upgraded in React 18/19).',
        explanation: 'Fiber operates entirely under the hood. Developers write normal React code, while Fiber schedules the execution behind the scenes.'
      }
    ],
    bestPractices: [
      'Take advantage of Fiber scheduling by wrapping non-urgent updates in startTransition.',
      'Keep component functions pure to prevent bugs if Fiber pauses or re-runs a render phase.',
      'Avoid blocking the main thread with heavy synchronous calculations; offload them to Web Workers.'
    ],
    performanceNotes: [
      'Fiber cooperative multitasking breaks long tasks into 5ms slices, avoiding browser frame drops.',
      'Double buffering avoids partial UI rendering on the screen.'
    ],
    interviewQuestions: [
      {
        id: 'iq-fib-1',
        question: 'What is React Fiber, why was it created, and how does its data structure enable Concurrent Mode?',
        difficulty: 'advanced',
        answer: 'React Fiber is the complete rewrite of React’s core reconciliation engine. It replaced the legacy recursive Stack Reconciler which blocked the main thread until deep trees finished. Fiber models every component as a node in a singly linked list with child, sibling, and return pointers. This converts recursion into an iterative while-loop. Because React controls the loop, it can pause execution (cooperative multitasking) to let the browser process user input or paint frames, and resume later. It also implements Double Buffering (current vs workInProgress trees) so unfinished renders never leak to the real DOM.',
        followUpQuestions: [
          'What are the child, sibling, and return pointers in a Fiber node?',
          'What is the difference between the Render phase and the Commit phase in Fiber?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-fib-1',
        title: 'Trace Fiber Tree Traversal Order',
        difficulty: 'advanced',
        description: 'Given a JSX tree <App><Nav /><Main><Section /></Main></App>, write out the exact Fiber pointer traversal order.',
        hints: ['Go down child first, then sibling, then return to parent.'],
        solution: `// Traversal order:
// 1. App.child -> Nav
// 2. Nav has no child, so Nav.sibling -> Main
// 3. Main.child -> Section
// 4. Section has no child, no sibling -> Section.return (Main)
// 5. Main has no sibling -> Main.return (App)`
      }
    ],
    quizQuestions: [
      {
        id: 'q-fib-1',
        question: 'Which data structure does React Fiber use to represent component trees in memory?',
        type: 'multiple-choice',
        options: [
          'Binary Search Tree',
          'Singly linked list with child, sibling, and return pointers',
          'Two-dimensional hash map',
          'Circular array buffer'
        ],
        correctAnswer: 1,
        explanation: 'Fiber nodes form a singly linked list tree with child, sibling, and return pointers, allowing iterative traversal that can be paused and resumed.'
      }
    ]
  },

  'state-batching': {
    overview: 'Deep dive into State Batching and the Update Queue: What changed in React 18 Automatic Batching, how state updates are queued, flushSync, and avoiding multiple re-renders.',
    whyItExists: `Every state update in React schedules a re-render.
If a function sets 3 state variables:
setCount(c => c + 1);
setUser('Alice');
setIsLoading(false);
Without batching, React would re-render the entire component 3 times, causing unnecessary CPU work and visual flickering.
State Batching groups multiple state updates into a single re-render pass for maximum performance.`,
    howItWorks: `1. REACT 17 VS REACT 18 BATCHING:
- React 17 & Earlier (Partial Batching):
  React only batched updates inside React Synthetic Event Handlers (e.g. onClick).
  Updates inside setTimeout, native event listeners, or Promises (.then) were NOT batched! Calling 3 setters inside a fetch() callback caused 3 separate re-renders!
- React 18+ (Automatic Batching):
  ALL state updates are automatically batched everywhere by default — inside promises, setTimeout, fetch callbacks, and native event handlers!

2. OPTING OUT WITH flushSync:
If you need to force React to flush a state update immediately to the real DOM (e.g. scrolling to a newly added chat message):
import { flushSync } from 'react-dom';
flushSync(() => {
  setMessages(prev => [...prev, newMsg]);
});
// The DOM is guaranteed to be updated synchronously on the very next line!
listRef.current.scrollTop = listRef.current.scrollHeight;`,
    codeExamples: [
      {
        id: 'bat-ex-1',
        title: 'Automatic Batching Inside Async Callbacks (React 18+)',
        description: 'Demonstrating how multiple state setters inside a fetch callback produce only 1 re-render pass.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState } from 'react';

export function BatchingDemo() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  console.log('Component rendered! Render count:', Math.random());

  const handleAsyncClick = () => {
    // Simulating an asynchronous network call
    setTimeout(() => {
      // In React 17: Caused 2 separate re-renders!
      // In React 18: AUTOMATICALLY BATCHED into 1 single re-render!
      setCount(c => c + 1);
      setFlag(f => !f);
    }, 100);
  };

  return (
    <div>
      <p>Count: {count}, Flag: {String(flag)}</p>
      <button onClick={handleAsyncClick}>Trigger Async Batch</button>
    </div>
  );
}`,
        explanation: 'Automatic Batching ensures that asynchronous callbacks group all state setter calls into a single render and paint pass.'
      }
    ],
    realWorldUseCases: [
      'Fetching data from an API and updating data, loading state, and pagination in a single render.',
      'Resetting multiple form fields in one unified step.',
      'Using flushSync for exact scroll position restoration in chat feeds.'
    ],
    commonMistakes: [
      {
        title: 'Overusing flushSync',
        description: 'Wrapping state updates in flushSync bypasses batching and hurts rendering performance. Use it only when strictly required for immediate DOM measurement.',
        explanation: 'flushSync forces synchronous layout recalculation and DOM paint; use it sparingly.'
      }
    ],
    bestPractices: [
      'Rely on React 18+ Automatic Batching by default.',
      'Use functional state updates (setCount(c => c + 1)) to ensure sequential updates reference the correct values.',
      'Reserve flushSync strictly for DOM measurements like scroll heights.'
    ],
    performanceNotes: [
      'Automatic batching reduces CPU usage and garbage collection by cutting redundant render passes by 50-70%.',
      'Batching prevents intermediate "torn" states from flashing on screen.'
    ],
    interviewQuestions: [
      {
        id: 'iq-bat-1',
        question: 'What is Automatic Batching in React 18 and how does it differ from React 17?',
        difficulty: 'intermediate',
        answer: 'Batching is when React groups multiple state setter calls into a single re-render for better performance. In React 17 and earlier, batching was limited strictly to React event handlers (like onClick). Updates inside setTimeout, promises, fetch callbacks, and native event handlers were not batched, causing multiple separate renders. In React 18, Automatic Batching was introduced: all state updates are batched together regardless of where they occur (promises, timers, native events). Developers can opt out using flushSync() when synchronous DOM updates are required.',
        followUpQuestions: ['When should you use flushSync?']
      }
    ],
    exercises: [
      {
        id: 'ex-bat-1',
        title: 'Force Immediate DOM Update with flushSync',
        difficulty: 'intermediate',
        description: 'Implement a chat scroll helper that appends a message with flushSync and immediately scrolls the container to the bottom.',
        hints: ['flushSync(() => setMessages(...)) then scroll'],
        solution: `import { flushSync } from 'react-dom';

function sendMessage(text: string) {
  flushSync(() => {
    setMessages(prev => [...prev, text]);
  });
  // DOM is guaranteed updated!
  scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-bat-1',
        question: 'In React 18, how many times will a component re-render if 3 state setters are called inside a setTimeout callback?',
        type: 'multiple-choice',
        options: [
          '3 times',
          '2 times',
          '1 time (automatically batched)',
          'It will not re-render at all'
        ],
        correctAnswer: 2,
        explanation: 'In React 18, Automatic Batching groups all state updates everywhere (including inside setTimeout and promises) into a single re-render.'
      }
    ]
  },

  'react-compiler': {
    overview: 'Deep dive into the React Compiler (React Forget): How it automatically memoizes values and component subtrees at build time, eliminating manual useMemo, useCallback, and React.memo.',
    whyItExists: `For over a decade, React developers have spent countless engineering hours manually optimizing performance:
1. Wrapping functions in useCallback to prevent child re-renders.
2. Wrapping calculations in useMemo to prevent redundant loops.
3. Wrapping components in React.memo and debugging broken reference equality.
This created significant cognitive overhead and cluttered codebases with dependency array bugs.
The React Compiler (developed by the React core team) solves this permanently by analyzing JavaScript semantics at build time and inserting memoization automatically.`,
    howItWorks: `1. HOW THE REACT COMPILER WORKS:
- The React Compiler is a build-time compiler (integrated via Babel or Vite).
- It analyzes your component code, control flow, and data dependencies according to the Rules of React.
- It identifies which values are reactive and automatically wraps components, JSX elements, and expensive computations in fine-grained memoization caches!

2. WHAT THIS MEANS FOR DEVELOPERS:
- You write natural, idiomatic JavaScript without manually adding useMemo or useCallback.
- If a component re-renders, the compiler ensures that only the specific parts of the JSX that changed are re-evaluated.
- Components behave as if they were wrapped in React.memo automatically!`,
    codeExamples: [
      {
        id: 'comp-ex-1',
        title: 'Before & After: React Compiler Automatic Optimization',
        description: 'See how the React Compiler eliminates manual useCallback and useMemo boilerplate.',
        language: 'tsx',
        level: 'advanced',
        code: `// BEFORE REACT COMPILER (Manual Boilerplate):
import { useState, useCallback, useMemo } from 'react';

export function LegacyComponent({ items, filterText }: { items: string[]; filterText: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Manual memoization overhead
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filterText));
  }, [items, filterText]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return <ItemList items={filteredItems} onSelect={handleSelect} />;
}

// WITH REACT COMPILER (Pure, Idiomatic React!):
// You write standard JavaScript. The compiler optimizes everything automatically!
export function ModernComponent({ items, filterText }: { items: string[]; filterText: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // No useMemo needed! The compiler memoizes filteredItems automatically.
  const filteredItems = items.filter(item => item.includes(filterText));

  // No useCallback needed! The compiler preserves function stability automatically.
  const handleSelect = (id: string) => setSelectedId(id);

  return <ItemList items={filteredItems} onSelect={handleSelect} />;
}`,
        explanation: 'The React Compiler analyzes the data flow and inserts caching primitives directly into compiled output, eliminating human error.'
      }
    ],
    realWorldUseCases: [
      'Large-scale enterprise design systems and form libraries where manual memoization is tedious and error-prone.',
      'Next.js 15+ and Vite React projects adopting the React Compiler plugin.',
      'Refactoring legacy codebases to remove unnecessary useMemo/useCallback clutter.'
    ],
    commonMistakes: [
      {
        title: 'Violating the Rules of React (Breaking Compiler Assumptions)',
        description: 'Mutating existing props, mutating state in-place, or reading mutable globals during render causes the React Compiler to bail out and skip optimization.',
        explanation: 'The React Compiler strictly enforces the Rules of React: components must be pure and props/state must be treated as immutable.'
      }
    ],
    bestPractices: [
      'Write clean, idiomatic React without premature manual memoization when using the compiler.',
      'Use ESLint plugin eslint-plugin-react-compiler to catch code that breaks compiler rules.',
      'Ensure all component functions are pure.'
    ],
    performanceNotes: [
      'The compiler achieves fine-grained memoization down to individual JSX nodes, often outperforming human-written manual memoization.',
      'Build times increase slightly during production build while client runtime performance gains 20-40% in render efficiency.'
    ],
    interviewQuestions: [
      {
        id: 'iq-comp-1',
        question: 'What is the React Compiler and what problem does it solve?',
        difficulty: 'advanced',
        answer: 'The React Compiler (formerly codenamed React Forget) is a build-time optimizing compiler developed by Meta. It automatically analyzes React components according to the Rules of React and inserts fine-grained memoization for values, functions, and JSX elements. This solves the major problem of manual performance optimization: developers no longer need to manually write useMemo, useCallback, or React.memo, eliminating dependency array bugs, cognitive overhead, and unnecessary component re-renders.',
        followUpQuestions: ['What happens if a component violates the Rules of React under the compiler?']
      }
    ],
    exercises: [
      {
        id: 'ex-comp-1',
        title: 'Identify Code That Bails Out the React Compiler',
        difficulty: 'advanced',
        description: 'Review 3 code snippets and identify which one mutates props and causes the compiler to disable optimization.',
        hints: ['Look for props.items.push() or in-place mutations.'],
        solution: `// Snippet that bails out:
function Bad({ items }) {
  items.push('new'); // MUTATING PROPS IN-PLACE! Compiler bails out.
  return <div>{items.length}</div>;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-comp-1',
        question: 'What manual React hooks and wrappers does the React Compiler render largely unnecessary?',
        type: 'multiple-choice',
        options: [
          'useState and useEffect',
          'useMemo, useCallback, and React.memo',
          'useContext and useReducer',
          'useRef and forwardRef'
        ],
        correctAnswer: 1,
        explanation: 'The React Compiler automatically memoizes values and functions, eliminating the need for manual useMemo, useCallback, and React.memo.'
      }
    ]
  }
};
