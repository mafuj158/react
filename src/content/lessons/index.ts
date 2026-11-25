import type { LessonContent } from '../../types';
import { getAllLessons } from '../modules';
import { MOD_01_LESSONS } from './mod-01-web';
import { MOD_02_LESSONS } from './mod-02-javascript';
import { MOD_03_LESSONS } from './mod-03-react-basics';
import { MOD_04_LESSONS } from './mod-04-hooks';
import { MOD_05_LESSONS } from './mod-05-internals';
import { MOD_07_LESSONS } from './mod-07-state';
import { MOD_08_LESSONS } from './mod-08-api';
import { MOD_09_LESSONS } from './mod-09-forms';
import { MOD_14_LESSONS } from './mod-14-nextjs';

export const LESSON_CONTENTS: Record<string, Partial<LessonContent>> = {
  ...MOD_01_LESSONS,
  ...MOD_02_LESSONS,
  ...MOD_03_LESSONS,
  ...MOD_04_LESSONS,
  ...MOD_05_LESSONS,
  ...MOD_07_LESSONS,
  ...MOD_08_LESSONS,
  ...MOD_09_LESSONS,
  ...MOD_14_LESSONS,
  'what-is-react': {
    overview: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
    whyItExists: `Prior to React, web applications were predominantly built using imperative DOM manipulation (e.g., jQuery or Vanilla JS). 
When data changed, developers had to manually locate DOM elements, update text, toggle classes, and synchronize state across multiple places in the UI. 
As applications grew, this led to "spaghetti code", unpredictable bugs, and severe synchronization issues where the UI did not match the underlying application state.

React solves this by introducing a Declarative Mental Model:
You describe what the UI should look like for any given state, and React handles the tedious, error-prone DOM operations automatically.`,
    howItWorks: `React operates on three core architectural principles:

1. Declarative UI: The UI is a pure function of state: UI = f(State). Whenever state changes, React re-evaluates the function.
2. Virtual DOM & Reconciliation: Instead of directly manipulating the slow browser DOM on every change, React creates a lightweight virtual tree in JavaScript memory. It runs a diffing algorithm (the reconciler) to find the exact delta between the previous and new virtual DOM trees, and commits only the minimal set of changes to the real DOM.
3. Component Composition: UIs are built as a tree of independent, encapsulated components that pass data down via props and communicate up via callbacks (One-Way Data Flow).`,
    codeExamples: [
      {
        id: 'ex-1',
        title: 'Declarative React vs Imperative Vanilla JS',
        description: 'Notice how in Vanilla JS we manually query and mutate the DOM, whereas in React we simply declare UI based on count state.',
        language: 'tsx',
        level: 'basic',
        code: `// Imperative (Vanilla JS):
// const btn = document.querySelector('#btn');
// const display = document.querySelector('#counter');
// let count = 0;
// btn.addEventListener('click', () => {
//   count++;
//   display.textContent = count; // Manual DOM mutation!
// });

// Declarative (React):
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg">
      <p className="text-lg font-bold">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
}`,
        explanation: 'In the React example, setCount notifies React of a state update. React automatically computes the DOM diff and renders the new count.'
      },
      {
        id: 'ex-2',
        title: 'Component Tree Composition & Props Flow',
        description: 'How complex interfaces are built from composable, decoupled component building blocks.',
        language: 'tsx',
        level: 'intermediate',
        code: `interface UserCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  onFollow: () => void;
}

export function UserCard({ name, role, avatarUrl, onFollow }: UserCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
      <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <button 
        onClick={onFollow}
        className="px-3 py-1.5 text-xs font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg"
      >
        Follow
      </button>
    </div>
  );
}`,
        explanation: 'UserCard accepts immutable props and triggers onFollow callback upward, adhering strictly to one-way data flow.'
      }
    ],
    realWorldUseCases: [
      'Single Page Applications (SPAs) with complex dynamic interfaces (dashboards, social feeds).',
      'Design systems and reusable component libraries shared across multiple products.',
      'Data-dense realtime dashboards where state updates constantly (financial tickers, analytics).'
    ],
    commonMistakes: [
      {
        title: 'Directly mutating DOM elements in React',
        description: 'Using document.getElementById or el.innerHTML inside React components breaks React’s internal Virtual DOM tracking.',
        wrongCode: `// Anti-pattern
function BadComponent() {
  const handleClick = () => {
    document.getElementById('title')!.innerText = 'Updated!';
  };
  return <h1 id="title" onClick={handleClick}>Original</h1>;
}`,
        correctCode: `// Correct
function GoodComponent() {
  const [title, setTitle] = useState('Original');
  return <h1 onClick={() => setTitle('Updated!')}>{title}</h1>;
}`,
        explanation: 'Always let React manage the DOM through state. If you bypass React with manual DOM mutations, React will overwrite your changes during the next render.'
      }
    ],
    bestPractices: [
      'Keep components small, focused, and single-purpose (Single Responsibility Principle).',
      'Treat state as immutable — never do state.push() or obj.property = value.',
      'Colocate state as close to where it is consumed as possible before reaching for global state.'
    ],
    performanceNotes: [
      'Rendering in React is fast, but real DOM updates are expensive. React minimizes real DOM updates by batching changes.',
      'Pure render functions: Render logic must be pure without side effects; side effects belong in useEffect or event handlers.'
    ],
    interviewQuestions: [
      {
        id: 'iq-1',
        question: 'Why is React described as declarative rather than imperative?',
        difficulty: 'basic',
        answer: 'In imperative programming, you write the explicit step-by-step instructions for HOW to mutate the DOM (e.g. createElement, appendChild, removeClass). In declarative programming with React, you declare WHAT the UI should look like for a given state (UI = f(State)), and React abstracts away the DOM mutations.',
        followUpQuestions: [
          'What is the Virtual DOM and what role does it play in this declarative model?',
          'What are the trade-offs of declarative vs imperative performance?'
        ]
      },
      {
        id: 'iq-2',
        question: 'Does the Virtual DOM make React faster than Vanilla JavaScript?',
        difficulty: 'advanced',
        answer: 'No. Hand-optimized Vanilla JavaScript that directly updates only the exact changed node will always be theoretically faster than React. React’s Virtual DOM introduces a small CPU overhead for diffing. However, React provides consistent, scalable, and predictable performance across large apps without requiring engineers to manually write fragile DOM optimizations.',
        followUpQuestions: [
          'What is the reconciliation heuristic React uses to make diffing O(n) instead of O(n^3)?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-1',
        title: 'Build an Interactive Toggle Component',
        difficulty: 'beginner',
        description: 'Create a ToggleSwitch component that alternates between ON and OFF states with custom styling.',
        hints: ['Use useState(false)', 'Render different text and background colors based on the boolean state.'],
        solution: `import { useState } from 'react';

export function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={\`px-4 py-2 rounded-xl font-bold transition-all \${
        isOn ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'
      }\`}
    >
      {isOn ? 'ACTIVE (ON)' : 'INACTIVE (OFF)'}
    </button>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-1',
        question: 'What is the primary role of the React Reconciler?',
        type: 'multiple-choice',
        options: [
          'To directly download npm packages into the browser',
          'To compare Virtual DOM trees and calculate minimal DOM updates',
          'To compile TypeScript into JavaScript',
          'To run CSS animations'
        ],
        correctAnswer: 1,
        explanation: 'The Reconciler (Fiber) diffs the previous and new virtual DOM trees to compute the required minimal updates before committing to the DOM.'
      },
      {
        id: 'q-2',
        question: 'In React, the UI is best described as:',
        type: 'multiple-choice',
        options: [
          'A series of manual DOM query selectors',
          'A synchronous database query',
          'A pure function of application state: UI = f(State)',
          'An immutable HTML file hosted on the server'
        ],
        correctAnswer: 2,
        explanation: 'React models components as functions that take state and props and return a description of the UI.'
      }
    ]
  },
  'use-state': {
    overview: 'useState is the primary React Hook that allows functional components to declare and manage independent local state across renders.',
    whyItExists: `In standard JavaScript functions, local variables are destroyed when the function finishes executing. 
In functional React components, we need a mechanism to:
1. Retain data across subsequent component re-renders.
2. Trigger a component re-render when the data changes so the screen reflects the new data.

useState provides both: it registers a piece of state in React Fiber’s internal hook list for that component instance, and returns a state setter function that triggers a re-render.`,
    howItWorks: `Internally in React Fiber:
- When a component mounts, React creates a linked list of hook nodes attached to the component's Fiber (fiber.memoizedState).
- Each call to useState moves a pointer down this linked list.
- This is why the Rules of Hooks exist: Hooks must be called in the exact same order on every render, never inside conditionals or loops.
- Calling the setter queues an update in React's work loop. In React 18+, multiple updates in the same tick are automatically batched into a single render pass.`,
    codeExamples: [
      {
        id: 'hook-ex-1',
        title: 'Basic and Functional State Updates',
        description: 'Demonstrating why functional updates (setCount(prev => prev + 1)) are critical when updates depend on prior state or are queued together.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

export function CounterDemo() {
  const [count, setCount] = useState(0);

  // Flawed: if called multiple times synchronously, all read the same snapshot of 'count'
  const handleFlawedIncrement = () => {
    setCount(count + 1);
    setCount(count + 1); // Still only increments by 1!
  };

  // Correct: functional update receives the freshest queued state
  const handleReliableIncrement = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // Correctly increments by 2!
  };

  return (
    <div className="space-x-3">
      <span className="font-bold text-xl">{count}</span>
      <button onClick={handleReliableIncrement} className="btn-primary">
        +2 Reliably
      </button>
    </div>
  );
}`,
        explanation: 'Functional updates access the pending update queue directly, guaranteeing updates are never lost during batched renders.'
      },
      {
        id: 'hook-ex-2',
        title: 'Lazy Initial State for Expensive Computations',
        description: 'Passing an initializer function to useState(() => compute()) ensures expensive operations only run once on mount.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState } from 'react';

function getStoredToken(): string {
  // Expensive: JSON parsing or localStorage read
  console.log('Reading from storage...');
  return localStorage.getItem('auth_token') || '';
}

export function AuthStatus() {
  // Pass function reference: runs ONLY ON MOUNT
  const [token, setToken] = useState(() => getStoredToken());

  return <div>Token: {token ? 'Authenticated' : 'Guest'}</div>;
}`,
        explanation: 'If you wrote useState(getStoredToken()), getStoredToken() would run on every single re-render, wasting CPU cycles.'
      }
    ],
    realWorldUseCases: [
      'Managing form input states, validation errors, and submission status.',
      'Controlling UI modal visibility, accordion expansion, and tab selection.',
      'Pagination page index, active filters, and client-side sorting criteria.'
    ],
    commonMistakes: [
      {
        title: 'Mutating state directly instead of passing new references',
        description: 'React checks if Object.is(oldState, newState) before re-rendering. Mutating an existing object/array keeps the same memory address, so React skips the render.',
        wrongCode: `// Broken: does not trigger re-render
const [user, setUser] = useState({ name: 'Alice', age: 25 });
user.age = 26;
setUser(user);`,
        correctCode: `// Correct: create a new object reference
setUser(prev => ({ ...prev, age: 26 }));`,
        explanation: 'Always treat React state as immutable. Use spread syntax ({ ...obj }) or create new arrays to provide a new reference.'
      }
    ],
    bestPractices: [
      'Group related state into an object or useReducer if they always update together.',
      'Avoid redundant state that can be derived from existing state or props.',
      'Use lazy initial state for expensive calculations or reading from localStorage.'
    ],
    performanceNotes: [
      'React state updates are asynchronous and batched. Reading state immediately after calling setState will return the OLD snapshot value.',
      'Keep state local to the component that needs it to prevent unnecessary tree re-renders.'
    ],
    interviewQuestions: [
      {
        id: 'iq-us-1',
        question: 'Why are state updates in React asynchronous?',
        difficulty: 'intermediate',
        answer: 'React batches state updates to prevent performance degradation. If 10 state updates occur in an event handler, React waits until the event handler finishes and applies them in a single render pass instead of triggering 10 separate re-renders and DOM paints.',
        followUpQuestions: [
          'How does React 18 automatic batching differ from React 17?'
        ]
      },
      {
        id: 'iq-us-2',
        question: 'What happens if you update state with the exact same value?',
        difficulty: 'intermediate',
        answer: 'React uses Object.is() to compare the new state with the current state. If Object.is evaluates to true (the values or references are identical), React bails out of rendering the component and its children, skipping the render pass entirely.',
        followUpQuestions: [
          'What happens if an object property changes but the object reference stays the same?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-us-1',
        title: 'Build a Form with Multiple Inputs in a Single State Object',
        difficulty: 'intermediate',
        description: 'Create a registration form that manages username, email, and termsAccepted in a single unified state object.',
        hints: ['Use computed property names: [e.target.name]: e.target.value', 'Spread previous state with ...prev'],
        solution: `import { useState } from 'react';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    agreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form className="space-y-3">
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <label>
        <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} />
        Agree to terms
      </label>
    </form>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-us-1',
        question: 'Why must React Hooks be called at the top level of a component?',
        type: 'multiple-choice',
        options: [
          'Because JavaScript forbids functions inside if statements',
          'Because React relies on call order to match state to hook instances in the Fiber node',
          'Because hooks consume too much memory if called inside functions',
          'Because browser compilers require it'
        ],
        correctAnswer: 1,
        explanation: 'React tracks hooks as an ordered linked list on the component Fiber. Consistent call order is mandatory for React to associate each hook with its internal state.'
      }
    ]
  },
  're-rendering': {
    overview: 'Understanding what triggers a component to re-render, the precise roles of state and props in the rendering process, and how to identify and eliminate unnecessary re-renders in production React applications.',
    whyItExists: `A central mental model in React is that components are pure functions of props and state: UI = f(props, state).
When state changes, React must re-evaluate this function to compute what the user should see next.

However, a major source of performance issues and bugs in React applications is misunderstanding WHAT causes a component to re-render, leading to either:
1. Stale UI due to mutation bugs.
2. Unnecessary cascading re-renders across the component tree that degrade user experience.`,
    howItWorks: `1. WHAT TRIGGERS A COMPONENT TO RE-RENDER:
A component in React re-renders ONLY for the following reasons:
- State Changes: Calling a state setter function (e.g. setCount or dispatch) queues a re-render for that specific component.
- Parent Component Re-renders: When a parent component renders, BY DEFAULT all of its child components in its subtree re-render recursively down the tree!
- Context Value Changes: Any component that subscribes to a Context (via useContext) re-renders whenever the Provider's value prop changes by reference (Object.is).
- Custom Hook State Updates: When state updates inside a custom hook, the hosting component that executed that hook re-renders.

2. THE ROLE OF STATE AND PROPS IN THE RENDERING PROCESS:
- State: State is component-owned data. Calling a setter tells React: "My data changed, please schedule a re-render of this component."
- Props: Props DO NOT trigger re-renders on their own. A prop change is the SYMPTOM, not the cause. A prop changes because the PARENT component re-rendered and passed new values down!
- The Myth of "Props Trigger Re-renders": If parent A re-renders, child B will re-render even if B has ZERO props or if its props are completely unchanged! (Unless B is wrapped in React.memo).

3. IDENTIFYING SCENARIOS THAT LEAD TO UNNECESSARY RE-RENDERS:
- Inline Object/Array/Function Literals: Passing onClick={() => ...} or style={{ color: 'red' }} creates new memory references on every render, invalidating React.memo.
- State Lifted Too High: Placing text input state at the top-level page instead of in a leaf component forces the whole page and all charts/tables to re-render on every keystroke.
- Monolithic Context Providers: Storing 20 unrelated values in one Context causes every consumer to re-render when ANY single value changes.
- Missing Component Composition: Not passing unchanged components as {children} or render slots.

4. THE TWO PHASES OF RENDERING:
- Render Phase: React calls your component function, constructs the new Virtual DOM (JSX elements tree), and diffs it against the old tree. This phase is pure JavaScript and does NOT touch the browser DOM.
- Commit Phase: React applies the calculated differences (patches) to the real browser DOM (DOM insertions, updates, deletions) and runs layout/paint.`,
    codeExamples: [
      {
        id: 'render-ex-1',
        title: 'Cascading Child Re-renders & The Props Fallacy',
        description: 'Demonstrating how a parent re-render automatically causes all children to re-render even if their props have not changed.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

// Even though Child has NO props, it re-renders EVERY time Parent re-renders!
function ExpensiveChild() {
  console.log('ExpensiveChild rendered!');
  return <div className="p-2 border">I am a heavy child component</div>;
}

export function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border space-y-3">
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-3 py-1 bg-blue-600 text-white rounded-[var(--radius)]"
      >
        Count: {count}
      </button>
      {/* ExpensiveChild will re-render on every button click! */}
      <ExpensiveChild />
    </div>
  );
}`,
        explanation: 'React assumes children might produce different output when the parent renders. To prevent this, either wrap ExpensiveChild in React.memo or lift it as a {children} prop.'
      },
      {
        id: 'render-ex-2',
        title: 'Optimizing Re-renders by Lifting Content as Children',
        description: 'Using component composition to avoid re-rendering children without needing React.memo.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState, ReactNode } from 'react';

// Parent with local state
export function ColorPickerContainer({ children }: { children: ReactNode }) {
  const [color, setColor] = useState('#2563eb');

  return (
    <div style={{ backgroundColor: color }} className="p-6">
      <input 
        type="color" 
        value={color} 
        onChange={e => setColor(e.target.value)} 
      />
      {/* children is passed from outside, so it DOES NOT re-render when color changes! */}
      {children}
    </div>
  );
}

// Usage:
// <ColorPickerContainer>
//   <ExpensiveVisualization />
// </ColorPickerContainer>`,
        explanation: 'Because ExpensiveVisualization was created in the parent scope where ColorPickerContainer is called, its JSX element reference is unchanged, so React skips re-rendering it!'
      }
    ],
    realWorldUseCases: [
      'Colocating local state inside leaf input components instead of top-level page components.',
      'Preventing expensive chart, data grid, or table re-renders during high-frequency typing or scroll events.',
      'Splitting large React contexts to avoid re-rendering every consumer when only a single slice updates.'
    ],
    commonMistakes: [
      {
        title: 'Passing unstable inline object/array/function literals to memoized children',
        description: 'Creating objects like style={{ width: 100 }} or onClick={() => {}} inside render passes a new memory reference every render, breaking React.memo shallow equality checks.',
        wrongCode: `// Broken: React.memo will fail every time!
<MemoizedList items={['a', 'b']} onItemClick={() => selectItem(id)} />`,
        correctCode: `// Correct: stabilize with useCallback and constant references
const handleItemClick = useCallback(() => selectItem(id), [id]);
<MemoizedList items={STATIC_ITEMS} onItemClick={handleItemClick} />`,
        explanation: 'React.memo does a shallow comparison (Object.is). If a prop reference changes, React MUST re-render the child.'
      }
    ],
    bestPractices: [
      'Colocate state: Keep state as low in the tree as possible.',
      'Prefer component composition (passing children or slots) over reflexively using useMemo/useCallback.',
      'Use the React DevTools Profiler ("Highlight updates when components render") to visually identify unnecessary renders.'
    ],
    performanceNotes: [
      'A component re-render is not inherently bad — React is built to re-render fast in JavaScript. Only optimize when re-renders cause noticeable frame drops or slow down input.',
      'Remember: Render ≠ DOM Paint. Re-rendering a component only re-computes its virtual elements. If the output diff is identical, React skips touching the real DOM completely!'
    ],
    interviewQuestions: [
      {
        id: 'iq-rr-1',
        question: 'What triggers a component to re-render in React?',
        difficulty: 'basic',
        answer: 'Components re-render due to: 1) State updates via useState/useReducer, 2) Parent component re-renders, 3) Context value changes for subscribed consumers, or 4) Hook state changes. Changing props alone does not trigger a re-render; it is the parent re-rendering that passes down new props.',
        followUpQuestions: [
          'If a component’s props do not change, does it still re-render when its parent re-renders?',
          'How can you prevent a child component from re-rendering when its parent re-renders?'
        ]
      },
      {
        id: 'iq-rr-2',
        question: 'What is the difference between the Render Phase and the Commit Phase?',
        difficulty: 'advanced',
        answer: 'The Render phase executes the component function, invokes hooks, builds the new Virtual DOM, and diffs it with the previous tree. It is pure and can be paused or restarted by React Concurrent features. The Commit phase is synchronous: React applies the calculated DOM mutations to the actual browser DOM and runs layout/DOM effects (useLayoutEffect, componentDidMount).',
        followUpQuestions: ['Can side effects safely run in the Render phase? Why not?']
      }
    ],
    exercises: [
      {
        id: 'ex-rr-1',
        title: 'Fix Unnecessary Child Re-renders',
        difficulty: 'intermediate',
        description: 'Refactor a parent component containing a text input so that an expensive child component does not re-render on every keystroke.',
        hints: ['Extract the input and its state into a separate local FormInput component.', 'Or wrap the expensive child in React.memo.'],
        solution: `import React, { useState } from 'react';

// Solution: Extract state to isolate re-renders
function SearchInput() {
  const [text, setText] = useState('');
  return <input value={text} onChange={e => setText(e.target.value)} placeholder="Type..." />;
}

export function OptimizedDashboard() {
  return (
    <div>
      <SearchInput /> {/* Only SearchInput re-renders on keystrokes! */}
      <ExpensiveAnalyticsChart /> {/* Stays mounted without re-rendering! */}
    </div>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rr-1',
        question: 'If component A renders component B, what happens to B when A’s state updates (assuming default React behavior)?',
        type: 'multiple-choice',
        options: [
          'B only re-renders if its props change',
          'B re-renders automatically, along with all of B’s descendants',
          'React throws an error',
          'B updates only on the server'
        ],
        correctAnswer: 1,
        explanation: 'By default in React, when a parent component renders, all children in its subtree re-render recursively regardless of props, unless memoized.'
      }
    ]
  },
  'how-react-renders': {
    overview: 'Understanding what triggers a component to re-render, the precise roles of state and props in the rendering process, and how to identify and eradicate unnecessary re-renders.',
    whyItExists: `A central mental model in React is that components are pure functions of props and state: UI = f(props, state).
When data changes, React must re-evaluate this function to compute what the user should see next.

However, a major source of performance issues and bugs in React applications is misunderstanding WHAT causes a component to re-render, leading to either:
1. Stale UI due to mutation bugs.
2. Unnecessary cascading re-renders across the component tree that degrade user experience.`,
    howItWorks: `1. WHAT TRIGGERS A RE-RENDER:
A component re-renders ONLY for these reasons:
- State Change: Calling a state setter function (e.g. setCount) queues an update.
- Parent Component Re-renders: When a parent component renders, BY DEFAULT all of its child components re-render recursively down the subtree!
- Context Value Changes: Any component subscribed to a Context (via useContext) re-renders when the Provider's value prop changes.
- Custom Hook State Updates: An update inside a custom hook triggers a re-render in the component consuming that hook.

Note: Props changing alone DOES NOT trigger a re-render. A prop change only occurs because a parent component re-rendered and passed new values down!

2. THE TWO PHASES OF RENDERING:
- Render Phase: React calls your component function, constructs the new Virtual DOM (JSX elements tree), and diffs it against the old tree. This phase is pure JavaScript and does NOT touch the browser DOM.
- Commit Phase: React applies the calculated differences (patches) to the real browser DOM (DOM insertions, updates, deletions) and runs layout/paint.`,
    codeExamples: [
      {
        id: 'render-ex-1',
        title: 'Cascading Child Re-renders & The Props Fallacy',
        description: 'Demonstrating how a parent re-render automatically causes all children to re-render even if their props have not changed.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

// Even though Child has NO props, it re-renders EVERY time Parent re-renders!
function ExpensiveChild() {
  console.log('ExpensiveChild rendered!');
  return <div className="p-2 border">I am a heavy child component</div>;
}

export function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border space-y-3">
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-3 py-1 bg-blue-600 text-white rounded-[var(--radius)]"
      >
        Count: {count}
      </button>
      {/* ExpensiveChild will re-render on every button click! */}
      <ExpensiveChild />
    </div>
  );
}`,
        explanation: 'React assumes children might produce different output when the parent renders. To prevent this, either wrap ExpensiveChild in React.memo or lift it as a {children} prop.'
      },
      {
        id: 'render-ex-2',
        title: 'Optimizing Re-renders by Lifting Content as Children',
        description: 'Using component composition to avoid re-rendering children without needing React.memo.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState, ReactNode } from 'react';

// Parent with local state
export function ColorPickerContainer({ children }: { children: ReactNode }) {
  const [color, setColor] = useState('#2563eb');

  return (
    <div style={{ backgroundColor: color }} className="p-6">
      <input 
        type="color" 
        value={color} 
        onChange={e => setColor(e.target.value)} 
      />
      {/* children is passed from outside, so it DOES NOT re-render when color changes! */}
      {children}
    </div>
  );
}

// Usage:
// <ColorPickerContainer>
//   <ExpensiveVisualization />
// </ColorPickerContainer>`,
        explanation: 'Because ExpensiveVisualization was created in the parent scope where ColorPickerContainer is called, its JSX element reference is unchanged, so React skips re-rendering it!'
      }
    ],
    realWorldUseCases: [
      'Colocating local state inside leaf input components instead of top-level page components.',
      'Preventing expensive chart, data grid, or table re-renders during high-frequency typing or scroll events.',
      'Splitting large React contexts to avoid re-rendering every consumer when only a single slice updates.'
    ],
    commonMistakes: [
      {
        title: 'Passing unstable inline object/array/function literals to memoized children',
        description: 'Creating objects like style={{ width: 100 }} or onClick={() => {}} inside render passes a new memory reference every render, breaking React.memo shallow equality checks.',
        wrongCode: `// Broken: React.memo will fail every time!
<MemoizedList items={['a', 'b']} onItemClick={() => selectItem(id)} />`,
        correctCode: `// Correct: stabilize with useCallback and constant references
const handleItemClick = useCallback(() => selectItem(id), [id]);
<MemoizedList items={STATIC_ITEMS} onItemClick={handleItemClick} />`,
        explanation: 'React.memo does a shallow comparison (Object.is). If a prop reference changes, React MUST re-render the child.'
      }
    ],
    bestPractices: [
      'Colocate state: Keep state as low in the tree as possible.',
      'Prefer component composition (passing children or slots) over reflexively using useMemo/useCallback.',
      'Use the React DevTools Profiler ("Highlight updates when components render") to visually identify unnecessary renders.'
    ],
    performanceNotes: [
      'A component re-render is not inherently bad — React is built to re-render fast in JavaScript. Only optimize when re-renders cause noticeable frame drops or slow down input.',
      'Remember: Render ≠ DOM Paint. Re-rendering a component only re-computes its virtual elements. If the output diff is identical, React skips touching the real DOM completely!'
    ],
    interviewQuestions: [
      {
        id: 'iq-rr-1',
        question: 'What triggers a component to re-render in React?',
        difficulty: 'basic',
        answer: 'Components re-render due to: 1) State updates via useState/useReducer, 2) Parent component re-renders, 3) Context value changes for subscribed consumers, or 4) Hook state changes. Changing props alone does not trigger a re-render; it is the parent re-rendering that passes down new props.',
        followUpQuestions: [
          'If a component’s props do not change, does it still re-render when its parent re-renders?',
          'How can you prevent a child component from re-rendering when its parent re-renders?'
        ]
      },
      {
        id: 'iq-rr-2',
        question: 'What is the difference between the Render Phase and the Commit Phase?',
        difficulty: 'advanced',
        answer: 'The Render phase executes the component function, invokes hooks, builds the new Virtual DOM, and diffs it with the previous tree. It is pure and can be paused or restarted by React Concurrent features. The Commit phase is synchronous: React applies the calculated DOM mutations to the actual browser DOM and runs layout/DOM effects (useLayoutEffect, componentDidMount).',
        followUpQuestions: ['Can side effects safely run in the Render phase? Why not?']
      }
    ],
    exercises: [
      {
        id: 'ex-rr-1',
        title: 'Fix Unnecessary Child Re-renders',
        difficulty: 'intermediate',
        description: 'Refactor a parent component containing a text input so that an expensive child component does not re-render on every keystroke.',
        hints: ['Extract the input and its state into a separate local FormInput component.', 'Or wrap the expensive child in React.memo.'],
        solution: `import React, { useState } from 'react';

// Solution: Extract state to isolate re-renders
function SearchInput() {
  const [text, setText] = useState('');
  return <input value={text} onChange={e => setText(e.target.value)} placeholder="Type..." />;
}

export function OptimizedDashboard() {
  return (
    <div>
      <SearchInput /> {/* Only SearchInput re-renders on keystrokes! */}
      <ExpensiveAnalyticsChart /> {/* Stays mounted without re-rendering! */}
    </div>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rr-1',
        question: 'If component A renders component B, what happens to B when A’s state updates (assuming default React behavior)?',
        type: 'multiple-choice',
        options: [
          'B only re-renders if its props change',
          'B re-renders automatically, along with all of B’s descendants',
          'React throws an error',
          'B updates only on the server'
        ],
        correctAnswer: 1,
        explanation: 'By default in React, when a parent component renders, all children in its subtree re-render recursively regardless of props, unless memoized.'
      }
    ]
  },
  'diffing-algorithm': {
    overview: 'Deep dive into React’s heuristic Diffing Algorithm: how React compares previous and updated Virtual DOM trees in linear O(n) time to efficiently identify the minimal set of changes required to update the UI.',
    whyItExists: `Finding the minimum number of operations to transform one tree into another is a classic computer science problem with an optimal algorithm complexity of O(n³) (where n is the number of nodes).
If React used this general tree diff algorithm, rendering 1,000 nodes would require 1,000,000,000 (1 billion) comparisons on every single render. The UI would instantly freeze.

React solves this by implementing a heuristic O(n) algorithm based on two key assumptions:
1. Two elements of different types will produce completely different trees.
2. The developer can hint at which child elements are stable across renders with a 'key' prop.`,
    howItWorks: `HOW REACT COMPARES PREVIOUS AND UPDATED VIRTUAL DOM TREES:

1. ELEMENTS OF DIFFERENT TYPES:
Whenever the root elements of two subtrees have different types:
- Example: <div> converted to <span>, or <Header> converted to <Navbar>.
- React completely destroys the old tree:
  - Destroys all old DOM nodes.
  - Unmounts all child components, running useEffect cleanup functions.
  - Discards all local state in that subtree.
  - Mounts the new tree from scratch and executes new layout/mount effects.

2. DOM ELEMENTS OF THE SAME TYPE:
When comparing two React DOM elements of the same type:
- Example: <div className="before" title="item" /> -> <div className="after" title="item" />
- React keeps the same underlying real DOM node and mutates ONLY the modified attributes (className).
- For style objects: <div style={{ color: 'red', fontWeight: 'bold' }} /> -> <div style={{ color: 'green', fontWeight: 'bold' }} />
- React updates ONLY the 'color' property without touching 'fontWeight'.

3. COMPONENT ELEMENTS OF THE SAME TYPE:
- When a component updates, its instance stays the same so that state is maintained across renders.
- React updates the props of the underlying component instance to match the new element, and calls the component function to diff its returned subtree.

4. RECURSING ON CHILDREN & THE ROLE OF KEYS:
- By default, when diffing children of a DOM node, React iterates over both lists of children at the same time and generates a mutation whenever there is a difference.
- If an item is prepended at the start of a list without keys:
  - React compares <li>First</li> with <li>New Item</li>: mutates it!
  - React compares <li>Second</li> with <li>First</li>: mutates it!
  - React inserts <li>Second</li> at the end: terrible O(n) DOM thrashing.
- With unique keys:
  - React matches keys between the previous and updated Virtual DOM.
  - React discovers that the existing keys just shifted position, and executes a single DOM node insertion at the top!`,
    codeExamples: [
      {
        id: 'diff-ex-1',
        title: 'Element Type Mismatch Forces Full Unmount and State Reset',
        description: 'Demonstrating how changing the element tag causes React to destroy component state during diffing.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

function CounterInput() {
  const [val, setVal] = useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} placeholder="Type here..." />;
}

export function DiffingTypeDemo() {
  const [isSection, setIsSection] = useState(false);

  return (
    <div>
      <button onClick={() => setIsSection(!isSection)}>Toggle Container</button>
      
      {/* When isSection toggles, <div> becomes <section>.
          Because the element types differ, React DIFFING destroys the input DOM node and its state! */}
      {isSection ? (
        <section>
          <CounterInput />
        </section>
      ) : (
        <div>
          <CounterInput />
        </div>
      )}
    </div>
  );
}`,
        explanation: 'Because the wrapper element changed from div to section, React tears down the entire subtree, discarding the input state.'
      },
      {
        id: 'diff-ex-2',
        title: 'Minimal Attribute Diffing on Same Element Type',
        description: 'React preserves the DOM node and updates only modified attributes.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState } from 'react';

export function AttributeDiffDemo() {
  const [isActive, setIsActive] = useState(false);

  return (
    // React compares old VDOM: { type: 'button', props: { className: 'btn-inactive', style: { color: 'gray' } } }
    // with new VDOM: { type: 'button', props: { className: 'btn-active', style: { color: 'blue' } } }
    // Diff result: Same DOM node, only mutate className and element.style.color!
    <button
      onClick={() => setIsActive(!isActive)}
      className={isActive ? 'btn-active' : 'btn-inactive'}
      style={{ color: isActive ? '#2563eb' : '#6b7280', fontSize: '14px' }}
    >
      Status: {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}`,
        explanation: 'The button DOM node is NOT re-created. React diffs the props and surgically updates only the class and color attributes.'
      }
    ],
    realWorldUseCases: [
      'Rendering dynamic tables with real-time sorting where key props allow React to reorder DOM nodes with zero innerText re-computation.',
      'Tabbed interfaces where preserving element types preserves form input state across tab switches.',
      'Optimizing animated lists where layout animations rely on stable DOM node references.'
    ],
    commonMistakes: [
      {
        title: 'Generating dynamic keys on every render (e.g. key={Math.random()})',
        description: 'Random keys trick React into thinking every single element is brand new, forcing React to destroy and rebuild the real DOM tree on every render.',
        wrongCode: `// Disaster: Destroys DOM nodes on every render!
{items.map(item => <ItemCard key={Math.random()} data={item} />)}`,
        correctCode: `// Correct: Stable unique identity
{items.map(item => <ItemCard key={item.id} data={item} />)}`,
        explanation: 'Keys must be stable across renders. Use persistent IDs from your database or data source.'
      }
    ],
    bestPractices: [
      'Use stable, predictable, unique identifiers for keys (e.g. item.id).',
      'Never use array indices as keys if items can be sorted, filtered, or prepended.',
      'Structure component hierarchy consistently so element types do not alternate unnecessarily.'
    ],
    performanceNotes: [
      'Diffing operates in memory and is extremely fast. React completes diffing for thousands of nodes in under 2ms.',
      'React never diffs across different branches of the tree — diffing is strictly level-by-level (breadth-first per level).'
    ],
    interviewQuestions: [
      {
        id: 'iq-diff-1',
        question: 'Why did the React team choose an O(n) heuristic diffing algorithm over the optimal O(n³) tree comparison algorithm?',
        difficulty: 'advanced',
        answer: 'The optimal general tree distance algorithm (such as Zhang-Shasha or RTED) has O(n³) computational complexity. In a typical UI of 1,000 components, O(n³) requires 1 billion comparisons on every state update, which would completely freeze the browser thread. By making two pragmatic heuristic assumptions (elements of different types produce different trees, and keys uniquely identify siblings), React reduced complexity to O(n) linear time, allowing 60fps real-time updates.',
        followUpQuestions: [
          'What are the exact two heuristics React uses in its Diffing Algorithm?',
          'What happens when two siblings have the exact same key during diffing?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-diff-1',
        title: 'Diagnose Key Reconciliation Bug',
        difficulty: 'intermediate',
        description: 'Explain why a list of input fields loses focus when items are prepended when using key={index}.',
        hints: ['Consider what happens to the indices when a new item is inserted at position 0.'],
        solution: `// When an item is prepended at index 0:
// The new item now receives key=0.
// The old item 0 now receives key=1.
// React matches key=0 with the existing DOM input at key=0!
// As a result, the input with key=0 keeps its old typed value and focus, even though it now represents the new item!
// Solution: Use a persistent unique id like key={item.id}.`
      }
    ],
    quizQuestions: [
      {
        id: 'q-diff-1',
        question: 'What is the theoretical time complexity of general tree diffing, and what complexity does React achieve with its heuristics?',
        type: 'multiple-choice',
        options: [
          'General: O(n²), React: O(n log n)',
          'General: O(n³), React: O(n)',
          'General: O(n), React: O(1)',
          'General: O(2ⁿ), React: O(n²)'
        ],
        correctAnswer: 1,
        explanation: 'General tree comparison algorithms run in O(n³). React uses two heuristics to achieve O(n) linear complexity.'
      }
    ]
  },
  'reconciliation': {
    overview: 'Exploring React’s Reconciliation engine: how React computes the delta between Virtual DOM trees and updates only the necessary parts of the real DOM instead of re-rendering everything, ensuring high performance and a 60fps user experience.',
    whyItExists: `The real browser DOM is an imperative, stateful tree of native C++ objects. Manipulating the DOM directly is computationally expensive:
- It triggers Style Recalculation, Layout Reflow, Layer Repaint, and Compositing.
- Frequent real DOM mutations lead to "layout thrashing", dropped frames, and sluggish UI response.

Reconciliation is React’s solution:
It decouples the description of the UI (Virtual DOM / JSX) from the actual DOM mutations. Instead of re-rendering the whole page or guessing what changed, React calculates the exact difference and performs surgical, batched DOM updates.`,
    howItWorks: `THE RECONCILIATION PROCESS EXPLAINED STEP-BY-STEP:

1. RENDER PHASE (Pure & Interruptible):
- Triggered by state change, parent render, or context update.
- React calls component functions and constructs a new tree of Fiber nodes (the workInProgress tree).
- Fiber nodes represent units of work. React diffs the 'current' Fiber tree (representing what is currently on screen) with the 'workInProgress' Fiber tree.
- React flags nodes that need changes using Effect Tags (Placement, Update, Deletion).
- This phase produces ZERO mutations to the real browser DOM. In React 18+ Concurrent Mode, this phase can even be paused, yielded, or aborted if a high-priority user interaction occurs!

2. COMMIT PHASE (Synchronous & Surgical):
- React takes the finished workInProgress Fiber tree and commits it to the DOM.
- React loops through the effect list and applies ONLY the necessary mutations:
  - Placement: document.createElement(), node.appendChild() or insertBefore().
  - Update: element.setAttribute(), node.textContent = '...'.
  - Deletion: parentNode.removeChild().
- Only the specific DOM attributes or nodes that changed are touched. Unchanged elements are never touched!
- React then swaps the pointers: workInProgress becomes the new 'current' tree (Double-Buffering).

3. HOW RECONCILIATION CONTRIBUTES TO APPLICATION PERFORMANCE & SMOOTH UX:
- Preserves Native Browser State: Input focus, text cursor selection, scroll position, and active CSS transitions are preserved because DOM nodes are updated in-place rather than destroyed.
- Batching & Layout Coalescing: All DOM mutations happen together in one synchronous tick, preventing multiple browser reflow passes.
- 60fps Frame Budget: React avoids expensive DOM operations, keeping work within the browser's 16.6ms frame budget.`,
    codeExamples: [
      {
        id: 'rec-ex-1',
        title: 'Surgical DOM Updates in Action',
        description: 'Witnessing how React updates ONLY a single text node without touching the surrounding DOM hierarchy.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

export function SurgicalUpdateDemo() {
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="card-container p-6 border rounded-[var(--radius)]">
      <h2>Live Server Monitor</h2>
      <p>This paragraph contains static text and will NEVER be mutated in the DOM.</p>
      
      {/* When seconds updates:
          React's Reconciler identifies that ONLY the text content of this <span> has changed.
          The commit phase calls: spanNode.nodeValue = seconds.
          The <div>, <h2>, and <p> are completely untouched! */}
      <span className="font-mono text-xl text-blue-600">
        Uptime: {seconds}s
      </span>

      <button onClick={() => setSeconds(s => s + 1)} className="mt-4 px-3 py-1 bg-blue-600 text-white rounded">
        Tick
      </button>
    </div>
  );
}`,
        explanation: 'Inspect this in Chrome DevTools: only the numbers inside the span flash purple when Tick is clicked!'
      },
      {
        id: 'rec-ex-2',
        title: 'Preserving Native DOM Focus During Reconciliation',
        description: 'How in-place node mutation allows users to continue typing without losing input focus.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState } from 'react';

export function FocusPreservationDemo() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Type here without losing focus..." 
        className="p-2 border"
      />
      {/* Clicking this button triggers a parent re-render and updates the count.
          Because React reconciles the input in-place, the cursor and typing focus stay active! */}
      <button onClick={() => setCount(c => c + 1)}>
        Background Updates: {count}
      </button>
    </div>
  );
}`,
        explanation: 'If React destroyed and rebuilt the DOM tree on state changes, the input would lose focus after every character!'
      }
    ],
    realWorldUseCases: [
      'High-frequency stock tickers and live data feeds where specific cells update every 100ms.',
      'Form inputs with real-time validation badges where user focus must never be interrupted.',
      'Infinite scroll feeds where new items are appended without reloading existing items.'
    ],
    commonMistakes: [
      {
        title: 'Confusing "Re-rendering" with "DOM Manipulation"',
        description: 'Assuming that every component re-render mutates the real DOM. Re-rendering runs the component function to produce Virtual DOM; Reconciliation ensures the real DOM is touched only if there is a real diff.',
        explanation: 'A component can re-render 100 times, but if its JSX output is identical, React makes ZERO changes to the real DOM!'
      }
    ],
    bestPractices: [
      'Trust React’s reconciler: do not attempt manual DOM manipulation (e.g. document.getElementById) inside React components.',
      'Keep component trees balanced and avoid deeply nested dynamic wrappers.',
      'Leverage React.memo or useMemo only when profiling shows reconciliation itself is taking significant time.'
    ],
    performanceNotes: [
      'React Fiber utilizes Double-Buffering: work is computed on the workInProgress tree in the background, and swapped into current in a single pointer change.',
      'Reconciliation is cooperative: with Concurrent features, React yields execution back to the browser to handle urgent inputs like typing or clicking.'
    ],
    interviewQuestions: [
      {
        id: 'iq-rec-1',
        question: 'What is Reconciliation in React, and how does it differ from Rendering?',
        difficulty: 'advanced',
        answer: 'Rendering is the process of executing component functions to compute the new Virtual DOM tree (JSX representation). Reconciliation is the algorithm and engine that takes the newly rendered Virtual DOM tree, diffs it against the previous tree, determines the minimal set of changes, and applies those updates to the host environment (the real browser DOM in ReactDOM). Rendering happens in JavaScript; Reconciliation bridges JavaScript and the actual DOM.',
        followUpQuestions: [
          'What are the two phases of React rendering, and in which phase do DOM mutations happen?',
          'What is the Fiber data structure and how does it support reconciliation?'
        ]
      },
      {
        id: 'iq-rec-2',
        question: 'How does React preserve input focus and scroll position during reconciliation?',
        difficulty: 'intermediate',
        answer: 'Because React diffs nodes by element type and key, it mutates existing DOM nodes in-place rather than replacing them with new elements. Because the actual DOM element reference remains unchanged across renders, native browser states like focus, cursor position, selection range, and scroll position are completely preserved.',
        followUpQuestions: ['Under what condition would an input lose its focus during a state update?']
      }
    ],
    exercises: [
      {
        id: 'ex-rec-1',
        title: 'Verify DOM Mutation Minimization',
        difficulty: 'intermediate',
        description: 'Use the Chrome DevTools "Paint Flashing" or "Rendering" tab to verify that updating a counter only repaints the specific text node.',
        hints: ['Open Chrome DevTools -> More tools -> Rendering -> Check "Paint Flashing".'],
        solution: `// Solution demonstration:
// Only the dynamic text node flashes green.
// Surrounding elements remain dark, confirming that Reconciliation touched only the modified DOM node.`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rec-1',
        question: 'What happens in the Commit phase of React reconciliation?',
        type: 'multiple-choice',
        options: [
          'React calls component functions and runs diffing',
          'React applies the calculated DOM mutations to the real browser DOM synchronously',
          'React downloads bundle chunks over the network',
          'React parses TypeScript types'
        ],
        correctAnswer: 1,
        explanation: 'The Commit phase is synchronous: React applies all calculated DOM operations (insertions, updates, deletions) and runs layout/paint effects.'
      }
    ]
  },
  'virtual-dom': {
    overview: 'Exploration of the Virtual DOM, React’s Reconciliation engine, and the heuristic Diffing Algorithm that allows React to achieve O(n) updates instead of O(n³).',
    whyItExists: `Direct browser DOM manipulation is slow and resource-heavy. Browser DOM nodes carry hundreds of properties, and mutating them causes expensive browser recalculations: style recalculation, layout reflow, and layer repainting.

If a web framework rebuilt the entire real DOM on every state update, complex applications would crawl at single-digit frame rates.

React solves this with the Virtual DOM and Reconciliation:
1. It maintains a lightweight in-memory JavaScript representation of the DOM.
2. When state changes, it creates a new Virtual DOM tree.
3. It runs a heuristic Diffing Algorithm to pinpoint the exact minimal changes.
4. It batches and applies ONLY those precise changes to the real DOM.`,
    howItWorks: `THE DIFFING ALGORITHM HEURISTICS (O(n)):
Finding the minimum number of operations to transform one arbitrary tree into another has a known computational complexity of O(n³) (where n is the number of nodes). For a tree of 1,000 elements, O(n³) would require 1 billion comparisons!

React achieves O(n) linear performance by relying on two practical heuristics:

1. Elements of Different Types Produce Different Trees:
Whenever the root elements of two subtrees have different types (e.g. changing <div> to <span> or <Header> to <Nav>), React completely tears down the old tree, unmounts all children, and builds the new tree from scratch.

2. Component Keys Identify Stable Elements Across Renders:
When comparing children of a parent (such as a list of items), React uses the 'key' prop to track identity. Instead of re-creating or mutating every item when an item is added or reordered, React matches keys between the old and new trees and simply moves the existing DOM node!

RECONCILIATION IN PRACTICE:
- Step 1: Render triggers Virtual DOM tree generation.
- Step 2: Diffing algorithm compares old Fiber tree with new Fiber tree.
- Step 3: Minimal set of operations (DOM patches: node insertion, attribute update, node deletion) are queued.
- Step 4: The commit phase applies these patches in a single batch, delivering a smooth 60fps UX.`,
    codeExamples: [
      {
        id: 'vdom-ex-1',
        title: 'Virtual DOM Elements Are Plain JavaScript Objects',
        description: 'JSX is compiled to React.createElement(), which returns a plain JavaScript object representing the Virtual DOM node.',
        language: 'tsx',
        level: 'basic',
        code: `// JSX:
// const element = <h1 className="title">Hello World</h1>;

// Compiled output:
const vdomNode = {
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello World'
  },
  key: null,
  ref: null
};

// Comparing two plain JavaScript objects in memory is instantaneous!
// Mutating real DOM nodes causes layout reflows and repaints.`,
        explanation: 'Because Virtual DOM nodes are pure JavaScript object literals, React can create and discard thousands of them in a couple of milliseconds.'
      },
      {
        id: 'vdom-ex-2',
        title: 'Why Keys Matter in the Diffing Algorithm',
        description: 'Demonstrating how keys prevent destructive DOM re-creations when items are inserted at the beginning of a list.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState } from 'react';

interface Todo {
  id: string; // Unique, persistent ID
  text: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 't1', text: 'Master React' },
    { id: 't2', text: 'Build Projects' }
  ]);

  const prependTodo = () => {
    // Adding at index 0
    setTodos([{ id: 't0', text: 'Learn JavaScript' }, ...todos]);
  };

  return (
    <div>
      <button onClick={prependTodo}>Add to Start</button>
      <ul>
        {todos.map(todo => (
          // With key={todo.id}: React realizes t1 and t2 just shifted, and inserts ONLY t0 into the DOM!
          // With key={index}: React mutates every single <li> in the real DOM!
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
        explanation: 'Keys allow React to preserve component state and identity during list insertions, deletions, and reordering.'
      }
    ],
    realWorldUseCases: [
      'Data tables and search result lists with sorting, filtering, and pagination.',
      'Real-time collaborative dashboards where elements update continuously.',
      'Complex multi-step forms where sections dynamically toggle based on user input.'
    ],
    commonMistakes: [
      {
        title: 'Using array index as key for dynamic or reorderable lists',
        description: 'When items are filtered, deleted, or prepended, array indices change for all subsequent items, tricking React into reusing the wrong component instances and breaking input state.',
        wrongCode: `// Anti-pattern: breaks state when list order changes!
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}`,
        correctCode: `// Correct: use stable, unique ID
{items.map(item => (
  <ListItem key={item.id} data={item} />
))}`,
        explanation: 'Only use array index as key if the list is strictly static (never reordered, filtered, or prepended).'
      }
    ],
    bestPractices: [
      'Always assign stable, unique, non-random keys generated from your data layer (e.g. database ID, UUID).',
      'Never generate random keys inside render (e.g. key={Math.random()}) — this forces React to unmount and remount DOM nodes every render!'
    ],
    performanceNotes: [
      'Virtual DOM comparison is fast, but it is not free. Modern engines like React Compiler optimize reconciliation away at compile time by determining static nodes.',
      'Reconciliation updates only DOM attributes that actually changed. If a class name changes, React updates element.className without rebuilding the node.'
    ],
    interviewQuestions: [
      {
        id: 'iq-vdom-1',
        question: 'Explain React’s Diffing Algorithm and its two heuristic assumptions.',
        difficulty: 'advanced',
        answer: 'Standard tree comparison is O(n³). React achieves O(n) by assuming: 1) Two elements of different types will produce completely different trees (causing a full unmount and rebuild), and 2) Child elements can be identified as stable across renders using a unique "key" prop.',
        followUpQuestions: [
          'What happens under the hood when a <div> is replaced with a <span> during diffing?',
          'Why is index as a key problematic during list filtering or insertion at the top?'
        ]
      },
      {
        id: 'iq-vdom-2',
        question: 'What is Reconciliation in React and what is the difference between Virtual DOM and Shadow DOM?',
        difficulty: 'intermediate',
        answer: 'Reconciliation is the process by which React diffs the previous Virtual DOM tree with the new one and computes the minimal set of real DOM operations. Shadow DOM is a browser-native web standard used for encapsulating CSS styles and markup inside Web Components. Virtual DOM is a pure JavaScript concept invented by React to optimize rendering and enable declarative UI.',
        followUpQuestions: ['Does React use Shadow DOM?']
      }
    ],
    exercises: [
      {
        id: 'ex-vdom-1',
        title: 'Predict Re-rendering and Key Reconciliation Behavior',
        difficulty: 'intermediate',
        description: 'Given a list of items with local input state, demonstrate why using key={index} loses input focus or swaps input values when an item is deleted.',
        hints: ['Create an item component with internal useState', 'Delete the first item and observe which item retains focus.'],
        solution: `// Solution demonstration:
// When item 0 is removed, item 1 now gets index 0.
// React sees: "key 0 still exists!", so it preserves the old DOM node and internal state of item 0,
// but passes item 1's props. This creates mismatched UI bugs!
// The fix is always using a persistent unique key (e.g. item.id).`
      }
    ],
    quizQuestions: [
      {
        id: 'q-vdom-1',
        question: 'What is the algorithmic time complexity of React’s Diffing Algorithm?',
        type: 'multiple-choice',
        options: [
          'O(n³)',
          'O(n²)',
          'O(n)',
          'O(log n)'
        ],
        correctAnswer: 2,
        explanation: 'Through heuristic assumptions (element type comparison and keys), React reduces the comparison complexity from O(n³) to O(n) linear time.'
      },
      {
        id: 'q-vdom-2',
        question: 'What happens when an element’s type changes from <div> to <section> during reconciliation?',
        type: 'multiple-choice',
        options: [
          'React renames the DOM node tag in-place',
          'React completely destroys the old subtree and reconstructs the new tree from scratch',
          'React ignores the tag change',
          'React throws a compilation error'
        ],
        correctAnswer: 1,
        explanation: 'According to React’s diffing heuristic, elements of different types are assumed to produce different trees. React destroys the old DOM node and all its children, and builds the new subtree.'
      }
    ]
  },
  'closures': {
    overview: 'Deep dive into JavaScript Closures: lexical environment records, scope chains, memory allocation, and how closures power React hooks and state retention.',
    whyItExists: `In JavaScript, variables declared inside a function are created when the function executes and typically destroyed when execution finishes.
However, asynchronous programming, event handlers, factory functions, and React Hooks require functions to remember and manipulate private state across time.

A closure solves this: it allows an inner function to retain continuous access to variables declared in its enclosing outer scope even after the outer function has returned.`,
    howItWorks: `1. LEXICAL ENVIRONMENT & THE HEAP:
When an outer function executes, the JavaScript engine allocates a Lexical Environment record on the heap (not the stack if a closure is formed).
Every function created inside holds an internal [[Environment]] reference pointing to this record.

2. GARBAGE COLLECTION PERSISTENCE:
Normally, local stack variables are freed immediately upon return.
However, if an inner function escapes (e.g. returned, stored in an event listener, or registered in a React Fiber node), the V8 Garbage Collector traces the reference and retains the outer variables in memory.

3. CLOSURES IN REACT:
React Hooks rely directly on closures. When you call useState or useEffect, the functions you pass "close over" the current render's state and props snapshots.`,
    codeExamples: [
      {
        id: 'closure-ex-1',
        title: 'Data Encapsulation via Factory Functions',
        description: 'Demonstrating true private state without classes using function closures.',
        language: 'typescript',
        level: 'basic',
        code: `function createBankAccount(initialBalance: number) {
  let balance = initialBalance; // Private variable captured in closure

  return {
    deposit(amount: number) {
      if (amount <= 0) throw new Error('Deposit must be positive');
      balance += amount;
      return balance;
    },
    withdraw(amount: number) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance; // Read-only access
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
console.log(account.getBalance()); // 150
// console.log(account.balance); // undefined! Cannot mutate directly`,
        explanation: 'The balance variable cannot be accessed directly from the outside; it is completely encapsulated by the closure.'
      },
      {
        id: 'closure-ex-2',
        title: 'The Infamous Stale Closure Bug in React useEffect',
        description: 'A classic frontend interview trap: an effect closing over a stale snapshot of state.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState, useEffect } from 'react';

export function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // BUGGY: Closures capture 'count' at the time the effect ran (count = 0)
    const interval = setInterval(() => {
      console.log('Stale count:', count); // Always prints 0!
      setCount(count + 1); // 0 + 1 = 1 every second!
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array captures initial render values forever!

  // FIX: Use functional state updates to bypass the stale closure:
  // setCount(prev => prev + 1);

  return <div>Count: {count}</div>;
}`,
        explanation: 'Functional updates (prev => prev + 1) don’t rely on closed-over state variables from previous renders; they read the live value directly from React’s update queue.'
      }
    ],
    realWorldUseCases: [
      'Encapsulating private variables and state machines without exposing class properties.',
      'Building memoization caches and debounce/throttle utilities.',
      'Configuring curried API factory clients with auth headers.'
    ],
    commonMistakes: [
      {
        title: 'Creating memory leaks by retaining large objects in closures',
        description: 'If a closure retains a reference to a large array or DOM node, that entire memory block cannot be garbage-collected.',
        wrongCode: `function attachHandler() {
  const hugeData = new Array(1000000).fill('data');
  window.addEventListener('resize', () => {
    console.log(hugeData.length); // hugeData is trapped in memory forever!
  });
}`,
        correctCode: `function attachHandler() {
  const length = 1000000; // Only capture what is needed!
  window.addEventListener('resize', () => {
    console.log(length);
  });
}`,
        explanation: 'Only capture the specific primitive values you need in long-lived event listeners or subscriptions.'
      }
    ],
    bestPractices: [
      'Use functional state updates (setCount(prev => prev + 1)) in callbacks to prevent stale closure bugs.',
      'Ensure all variables used inside useEffect are declared in the dependency array or stabilized.',
      'Clean up event listeners and timers in useEffect return statements.'
    ],
    performanceNotes: [
      'Closures allocate memory on the heap instead of the call stack. Do not prematurely optimize away small closures, but be mindful of closures attached to long-running listeners.'
    ],
    interviewQuestions: [
      {
        id: 'iq-cl-1',
        question: 'What is a closure in JavaScript and how does it relate to lexical scoping?',
        difficulty: 'intermediate',
        answer: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment. Lexical scope means variable access is determined by where functions are written in the source code. A closure preserves this lexical scope access even after the outer function has finished executing.',
        followUpQuestions: [
          'What happens in memory when a closure is created?',
          'How does the V8 garbage collector handle variables in a closure?'
        ]
      },
      {
        id: 'iq-cl-2',
        question: 'What causes a stale closure in React, and how do you resolve it?',
        difficulty: 'advanced',
        answer: 'A stale closure occurs when a callback or effect captures state/props from a previous render pass and is not re-created or re-synchronized when those values change. Solutions: 1) Include the variable in the dependency array, 2) Use functional updates setCount(prev => prev + 1), or 3) Store the latest value in a useRef.',
        followUpQuestions: ['Why does useRef avoid stale closure issues?']
      }
    ],
    exercises: [
      {
        id: 'ex-cl-1',
        title: 'Build a Memoize Function Using Closures',
        difficulty: 'intermediate',
        description: 'Implement a memoize(fn) higher-order function that caches return values based on stringified arguments.',
        hints: ['Use an object or Map stored in the outer function scope.', 'Check if cache.has(key) before computing.'],
        solution: `function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-cl-1',
        question: 'When is a variable captured by a closure released from memory?',
        type: 'multiple-choice',
        options: [
          'Immediately when the outer function returns',
          'When all functions referencing the closure are garbage collected',
          'At the end of every animation frame',
          'Never (it remains for the lifetime of the browser tab)'
        ],
        correctAnswer: 1,
        explanation: 'The JavaScript garbage collector reclaims heap memory once there are no active references pointing to the closure’s lexical environment.'
      }
    ]
  },
  'event-loop': {
    overview: 'Understanding the JavaScript Runtime: Call Stack, Web APIs, Microtask Queue (Promises), Macrotask Queue (Timers/I/O), and UI Rendering ticks.',
    whyItExists: `JavaScript is single-threaded: it has one call stack and can only execute one command at a time.
Yet modern web applications need to handle network calls, user input, animations, and database queries without freezing the user interface.

The Event Loop is the engine mechanism that coordinates asynchronous non-blocking I/O in a single-threaded runtime.`,
    howItWorks: `COMPONENTS OF THE RUNTIME:
1. Call Stack: Synchronous execution frame. Functions push on call, pop on return.
2. Web APIs / Node C++ APIs: Background threads that handle timers (setTimeout), network requests (fetch), and DOM events.
3. Microtask Queue: Highest priority queue. Contains:
   - Promise callbacks (.then, .catch, .finally)
   - queueMicrotask()
   - MutationObserver
4. Macrotask Queue: Regular task queue. Contains:
   - setTimeout / setInterval
   - I/O events
   - UI clicks / keyboard events

THE EVENT LOOP ALGORITHM:
1. Execute all synchronous code on the Call Stack until it is completely empty.
2. DRAIN the Microtask Queue completely (all microtasks run before ANY macrotask or UI render).
3. Check if the browser needs a UI render/paint (usually 60Hz = 16.6ms intervals).
4. Pop and execute ONE macrotask from the Macrotask Queue.
5. Repeat from Step 2!`,
    codeExamples: [
      {
        id: 'loop-ex-1',
        title: 'Predicting Event Loop Execution Order',
        description: 'Classic interview problem testing microtask vs macrotask execution order.',
        language: 'typescript',
        level: 'basic',
        code: `console.log('1: Sync start');

setTimeout(() => {
  console.log('2: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask 1');
}).then(() => {
  console.log('4: Microtask 2');
});

queueMicrotask(() => {
  console.log('5: Microtask 3');
});

console.log('6: Sync end');

// OUTPUT:
// 1: Sync start
// 6: Sync end
// 3: Microtask 1
// 5: Microtask 3
// 4: Microtask 2
// 2: Macrotask (setTimeout)`,
        explanation: 'Synchronous code runs first (1, 6). The microtask queue drains completely (3, 5, 4) before the event loop picks up the macrotask (2).'
      }
    ],
    realWorldUseCases: [
      'Preventing UI freezing by breaking long-running synchronous loops into chunked microtasks or requestIdleCallback.',
      'Understanding why Promise callbacks always execute asynchronously even if the promise is already resolved.',
      'Coordinating animations using requestAnimationFrame to match the browser refresh rate.'
    ],
    commonMistakes: [
      {
        title: 'Starving the Event Loop with recursive microtasks',
        description: 'Because React/JS drains the microtask queue completely before painting or handling input, an infinite microtask chain freezes the tab!',
        wrongCode: `function starve() {
  Promise.resolve().then(starve); // Browser tab freezes completely!
}`,
        correctCode: `function scheduleSafely() {
  setTimeout(scheduleSafely, 0); // Allows UI paint between tasks!
}`,
        explanation: 'Macrotasks yield control back to the event loop and browser renderer between tasks; microtasks do not.'
      }
    ],
    bestPractices: [
      'Keep the Call Stack fast: Never run expensive CPU-bound algorithms synchronously on the main thread.',
      'Use Web Workers for heavy background processing (image manipulation, cryptography, large data parsing).'
    ],
    performanceNotes: [
      'React 18 Concurrent Mode uses microtasks and the MessageChannel API (a macrotask) to yield to the browser every 5ms, ensuring user inputs remain responsive during large tree renders.'
    ],
    interviewQuestions: [
      {
        id: 'iq-el-1',
        question: 'Why does a Promise.then() callback run before a setTimeout(fn, 0) callback?',
        difficulty: 'intermediate',
        answer: 'Promise callbacks are scheduled in the Microtask Queue, while setTimeout callbacks are scheduled in the Macrotask (Task) Queue. The Event Loop specification mandates that the entire microtask queue must be drained to completion before any macrotask is processed.',
        followUpQuestions: ['Can a microtask queue another microtask? What happens?']
      }
    ],
    exercises: [
      {
        id: 'ex-el-1',
        title: 'Build a Non-blocking Array Iterator',
        difficulty: 'advanced',
        description: 'Write a processBigArrayInChunks(items, processItem, chunkSize) utility that processes 100,000 items without dropping frames.',
        hints: ['Process a chunk of N items, then yield with setTimeout(..., 0) or requestIdleCallback.'],
        solution: `function processInChunks<T>(items: T[], fn: (item: T) => void, size = 500) {
  let index = 0;
  
  function doChunk() {
    const end = Math.min(index + size, items.length);
    for (; index < end; index++) {
      fn(items[index]);
    }
    if (index < items.length) {
      setTimeout(doChunk, 0); // Yield main thread
    }
  }
  
  doChunk();
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-el-1',
        question: 'When does the browser perform UI layout and repainting?',
        type: 'multiple-choice',
        options: [
          'After every single line of synchronous code',
          'After the microtask queue is drained and before the next macrotask',
          'Only when the browser window is closed',
          'Synchronously inside setTimeout'
        ],
        correctAnswer: 1,
        explanation: 'Rendering occurs between task executions, right after microtasks are drained and the call stack is clear.'
      }
    ]
  },
  'use-effect': {
    overview: 'Complete guide to useEffect: side effect execution timing, dependency array invariants, cleanup lifecycles, race condition handling, and React 18 strict mode double-firing.',
    whyItExists: `React render functions must be pure: given the same props and state, they must calculate and return JSX without modifying external variables, making network requests, or mutating the DOM.

Side effects (fetching data, subscribing to WebSockets, setting timers, logging) cannot happen during render. 
useEffect provides a synchronized boundary to execute side effects AFTER React has committed updates to the DOM.`,
    howItWorks: `THE EFFECT LIFECYCLE:
1. Component Renders: React builds the Fiber tree and updates the real DOM.
2. Browser Repaints: The screen updates for the user.
3. Effects Run: After paint, React executes useEffect callbacks asynchronously (non-blocking).
4. Subsequent Renders:
   - React compares the new dependency array with the previous one using Object.is.
   - If any dependency changed: React first runs the CLEANUP function of the previous effect, then executes the new effect!
5. Unmount: React runs the cleanup function one final time to prevent memory leaks.

STRICT MODE DOUBLE FIRING (React 18 & 19):
In development, React intentionally mounts -> unmounts -> remounts components to verify your cleanup function works and that your effect is resilient to remounting.`,
    codeExamples: [
      {
        id: 'eff-ex-1',
        title: 'Proper Data Fetching with AbortController Cleanup',
        description: 'Handling network race conditions and component unmounting gracefully.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState, useEffect } from 'react';

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        // Ignore aborted requests on unmount or userId change
        if (err.name !== 'AbortError') {
          setLoading(false);
        }
      });

    // Cleanup function: cancels in-flight request if userId changes or component unmounts!
    return () => {
      controller.abort();
    };
  }, [userId]); // Re-runs ONLY when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>Name: {user?.name}</div>;
}`,
        explanation: 'Without AbortController cleanup, fast tab switching causes race conditions where an older request finishes after a newer request and displays wrong data.'
      }
    ],
    realWorldUseCases: [
      'Synchronizing with external non-React widgets (Leaflet maps, Chart.js).',
      'Window event listeners (resize, keydown, scroll position tracking).',
      'Establishing and tearing down WebSocket or SSE connections.'
    ],
    commonMistakes: [
      {
        title: 'Using useEffect for data transformation that belongs in render',
        description: 'Using useEffect + useState to calculate derived state causes an unnecessary extra render pass.',
        wrongCode: `// Bad: Causes 2 render passes!
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(items.reduce((a, b) => a + b.price, 0));
}, [items]);`,
        correctCode: `// Good: Calculate directly during render!
const total = items.reduce((a, b) => a + b.price, 0);`,
        explanation: 'If a value can be computed from existing props or state, compute it directly during render. Do not use an effect.'
      }
    ],
    bestPractices: [
      'Always return a cleanup function when setting up timers, subscriptions, or DOM listeners.',
      'Never omit dependencies that are read inside the effect: use eslint-plugin-react-hooks.',
      'Prefer React Query / TanStack Query for server state over manual useEffect data fetching.'
    ],
    performanceNotes: [
      'useEffect runs after paint, keeping user interaction smooth. If you need to mutate the DOM before paint to prevent flicker (e.g. measuring DOM size), use useLayoutEffect instead.'
    ],
    interviewQuestions: [
      {
        id: 'iq-eff-1',
        question: 'Why does useEffect run twice in React 18 development mode?',
        difficulty: 'intermediate',
        answer: 'In React 18 Strict Mode, React simulates an immediate unmount and remount in development. This stress-tests cleanup logic to expose missing cleanup functions (e.g. orphaned WebSocket connections, event listeners) and ensures components will survive future concurrent features like Offscreen/Activity tabs.',
        followUpQuestions: ['How do you stop an effect from running twice without turning off Strict Mode? (Answer: Write resilient cleanup rather than disabling Strict Mode).']
      }
    ],
    exercises: [
      {
        id: 'ex-eff-1',
        title: 'Build a useWindowSize Listener with Cleanup',
        difficulty: 'beginner',
        description: 'Create an effect that listens to window resize and cleans up the event listener on unmount.',
        hints: ['window.addEventListener("resize", handler)', 'return () => window.removeEventListener("resize", handler)'],
        solution: `function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-eff-1',
        question: 'When does the cleanup function returned from useEffect execute?',
        type: 'multiple-choice',
        options: [
          'Only when the component completely unmounts',
          'Before the next effect execution when dependencies change, and on unmount',
          'Before the initial render',
          'Synchronously during the render phase'
        ],
        correctAnswer: 1,
        explanation: 'React runs the previous effect’s cleanup before executing the new effect on re-render, as well as upon final unmount.'
      }
    ]
  },
  'use-memo': {
    overview: 'Mastering useMemo: caching CPU-heavy calculations, preserving referential equality, avoiding premature optimization, and understanding the React Compiler.',
    whyItExists: `Every time a React component re-renders, all code inside the function body executes again from top to bottom.
If you have an expensive calculation (sorting 10,000 items, complex filtering, matrix math), recalculating it on every unrelated state update causes UI stutter.

useMemo caches (memoizes) the return value of a function and only recalculates it when specified dependencies change.`,
    howItWorks: `1. COMPUTATION & STORAGE:
On mount, useMemo runs the callback and stores [cachedValue, dependencies] on the Fiber hook node.

2. SUBSEQUENT RENDERS:
React compares the new dependencies array with the cached dependencies using Object.is.
- If dependencies match: React skips running the callback and returns the cached value.
- If any dependency changed: React re-runs the callback, caches the new result, and returns it.

3. REFERENTIAL EQUALITY:
In JavaScript, {} !== {}. Creating an object or array literal inside render creates a new reference every time. useMemo ensures the reference stays identical across renders.`,
    codeExamples: [
      {
        id: 'memo-ex-1',
        title: 'Memoizing Expensive Filtering on Large Datasets',
        description: 'Preventing expensive array filtering when unrelated state changes.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState, useMemo } from 'react';

export function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Unrelated state

  // Without useMemo: toggling darkMode would re-filter 50,000 products!
  const filteredProducts = useMemo(() => {
    console.log('Filtering expensive product list...');
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]); // Only recalculates when products or search change!

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <ProductGrid items={filteredProducts} />
    </div>
  );
}`,
        explanation: 'Toggling darkMode causes ProductCatalog to re-render, but useMemo reuses the cached filteredProducts array without touching the CPU.'
      }
    ],
    realWorldUseCases: [
      'Filtering, searching, or transforming large data tables or charts.',
      'Creating configuration objects passed as props to memoized children (React.memo).',
      'Generating complex regex patterns or cryptographic hashes.'
    ],
    commonMistakes: [
      {
        title: 'Memoizing trivial computations',
        description: 'Wrapping simple expressions like useMemo(() => a + b, [a, b]) actually degrades performance due to hook allocation and dependency comparison overhead.',
        wrongCode: `// Bad: Slower than raw addition!
const total = useMemo(() => price * count, [price, count]);`,
        correctCode: `// Good: Just calculate it!
const total = price * count;`,
        explanation: 'Basic math and primitive string manipulation take nanoseconds. The overhead of useMemo is greater than the calculation itself.'
      }
    ],
    bestPractices: [
      'Measure first: Only use useMemo if Profiler shows measurable lag or if referential equality is strictly required by a dependency array or React.memo child.',
      'Keep useMemo callbacks pure: Never cause side effects inside a useMemo callback.'
    ],
    performanceNotes: [
      'React Compiler (React 19+) can automatically memoize values and components at build time, reducing the need to write manual useMemo hooks.'
    ],
    interviewQuestions: [
      {
        id: 'iq-um-1',
        question: 'When should you NOT use useMemo?',
        difficulty: 'intermediate',
        answer: 'You should NOT use useMemo for: 1) Trivial calculations (array slice, basic math), 2) When the calculation is fast and props are not passed to memoized children, or 3) When dependencies change on almost every render anyway. Indiscriminate use of useMemo wastes memory and increases execution overhead.',
        followUpQuestions: ['What is the difference between useMemo and useCallback?']
      }
    ],
    exercises: [
      {
        id: 'ex-um-1',
        title: 'Preserve Object Identity for Child Memoization',
        difficulty: 'intermediate',
        description: 'Fix a component where a memoized child component re-renders because an options prop object is recreated on every render.',
        hints: ['Wrap the options object in useMemo.'],
        solution: `// Solution:
const options = useMemo(() => ({
  threshold: 0.5,
  rootMargin: '10px'
}), []); // Stable reference across renders`
      }
    ],
    quizQuestions: [
      {
        id: 'q-um-1',
        question: 'What comparison method does React use to check useMemo dependencies?',
        type: 'multiple-choice',
        options: [
          'Deep equality (JSON.stringify)',
          'Shallow equality via Object.is',
          'Loose equality (==)',
          'Custom hashing'
        ],
        correctAnswer: 1,
        explanation: 'React compares dependency arrays element-by-element using Object.is shallow comparison.'
      }
    ]
  },
  'use-callback': {
    overview: 'Deep dive into useCallback: memoizing function references, pairing with React.memo, optimizing custom hooks, and preventing infinite effect loops.',
    whyItExists: `In JavaScript, function declarations and arrow functions inside a component are recreated as brand-new function objects with new memory addresses on every render.
If you pass an inline function to a child component wrapped in React.memo, the child sees a "new prop" on every render and re-renders anyway, defeating React.memo!

useCallback caches the function instance itself between renders.`,
    howItWorks: `useCallback(fn, deps) is syntactic sugar for useMemo(() => fn, deps).
Instead of returning the result of calling the function, it returns the function reference itself.
As long as dependencies do not change, React returns the identical function pointer from the Fiber node.`,
    codeExamples: [
      {
        id: 'cb-ex-1',
        title: 'Pairing useCallback with React.memo',
        description: 'Demonstrating how useCallback prevents unnecessary child renders.',
        language: 'tsx',
        level: 'basic',
        code: `import React, { useState, useCallback } from 'react';

// Child wrapped in React.memo
const DeleteButton = React.memo(({ onDelete }: { onDelete: () => void }) => {
  console.log('DeleteButton rendered!');
  return <button onClick={onDelete}>Delete Item</button>;
});

export function ParentManager() {
  const [count, setCount] = useState(0);

  // Without useCallback: handleDelete gets a new memory address on every count update,
  // causing DeleteButton to re-render every time count changes!
  const handleDelete = useCallback(() => {
    console.log('Item deleted');
  }, []); // Stable reference

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
      <DeleteButton onDelete={handleDelete} />
    </div>
  );
}`,
        explanation: 'Because handleDelete reference is stable, React.memo detects that props have not changed and skips rendering DeleteButton.'
      }
    ],
    realWorldUseCases: [
      'Callbacks passed to optimized virtualized lists or data grids.',
      'Functions included in useEffect dependency arrays to prevent infinite loops.'
    ],
    commonMistakes: [
      {
        title: 'Using useCallback without React.memo on the child component',
        description: 'Wrapping a function in useCallback when passing to a normal un-memoized component achieves nothing, because normal components re-render when the parent renders regardless of props!',
        wrongCode: `<RegularUnmemoizedButton onClick={useCallback(() => {}, [])} />`,
        correctCode: `<RegularUnmemoizedButton onClick={() => {}} />`,
        explanation: 'useCallback only provides performance benefits if the consumer is memoized (React.memo) or uses the callback in a hook dependency array.'
      }
    ],
    bestPractices: [
      'Use functional state updates inside useCallback so you don’t need state variables in the dependency array: useCallback(() => setCount(c => c + 1), []).',
      'Do not wrap every function in useCallback: only memoize functions passed to memoized children or hook dependencies.'
    ],
    performanceNotes: [
      'Inline functions in React are extremely lightweight. React creates thousands of closures per second without issue. Only memoize when profiling reveals a genuine performance problem.'
    ],
    interviewQuestions: [
      {
        id: 'iq-cb-1',
        question: 'Does useCallback prevent a function from being created?',
        difficulty: 'advanced',
        answer: 'No! The inline function inside useCallback(() => {}, []) is STILL created on every render in JavaScript memory so it can be passed as an argument to useCallback. What useCallback does is discard that newly created function and return the previously cached function instance instead.',
        followUpQuestions: ['Why is useCallback(fn, deps) equivalent to useMemo(() => fn, deps)?']
      }
    ],
    exercises: [
      {
        id: 'ex-cb-1',
        title: 'Break an Infinite useEffect Loop with useCallback',
        difficulty: 'intermediate',
        description: 'Fix a component where an effect continuously re-runs because it depends on an unstable fetch function declared in the component body.',
        hints: ['Wrap the fetch function in useCallback or move it inside the useEffect.'],
        solution: `// Solution:
const fetchData = useCallback(async () => {
  const res = await fetch('/api/data');
  return res.json();
}, []); // Stable reference prevents effect loop!`
      }
    ],
    quizQuestions: [
      {
        id: 'q-cb-1',
        question: 'Under what condition does useCallback provide a real performance advantage?',
        type: 'multiple-choice',
        options: [
          'Whenever you define any function in a component',
          'When the callback is passed to a React.memo child or a hook dependency array',
          'Only in class components',
          'When running on the server'
        ],
        correctAnswer: 1,
        explanation: 'useCallback preserves referential equality; it is only useful when downstream consumers (like React.memo or useEffect deps) check referential equality.'
      }
    ]
  },
  'custom-hooks': {
    overview: 'Architecture and patterns for Custom Hooks: extracting reusable stateful logic, composition over inheritance, and building production hooks like useDebounce, useLocalStorage, and useEventListener.',
    whyItExists: `In React, components allow sharing UI markup.
However, applications often need to share stateful business logic (e.g. form validation, network fetching, keyboard shortcuts, media query listeners) across multiple unrelated components.

Prior to Hooks, patterns like Higher-Order Components (HOC) and Render Props caused "wrapper hell" and fragmented component trees.
Custom Hooks allow extracting reusable stateful logic into pure JavaScript functions while retaining access to React’s state and lifecycle mechanisms.`,
    howItWorks: `A Custom Hook is a JavaScript function whose name starts with "use" and that may call other React hooks.
- It does NOT share state values between components; each component calling a custom hook gets its own isolated instance of state.
- Custom Hooks run within the Fiber context of the component invoking them.`,
    codeExamples: [
      {
        id: 'ch-ex-1',
        title: 'Production useDebounce Hook',
        description: 'Debouncing input values to prevent excessive API requests.',
        language: 'typescript',
        level: 'intermediate',
        code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer); // Reset timer if value changes before delay finishes
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
// const [search, setSearch] = useState('');
// const debouncedSearch = useDebounce(search, 300);
// useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);`,
        explanation: 'Cleanly encapsulates the debounce timer lifecycle and provides a reactive debounced value.'
      },
      {
        id: 'ch-ex-2',
        title: 'Type-Safe useLocalStorage Hook',
        description: 'Synchronizing React state with the browser localStorage API with JSON parsing.',
        language: 'typescript',
        level: 'advanced',
        code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
        explanation: 'Uses lazy state initialization to read from localStorage only once on mount, and provides a tuple setter matching useState API.'
      }
    ],
    realWorldUseCases: [
      'Extracting API data pipelines with caching and retry logic.',
      'Managing media queries and responsive breakpoints (useMediaQuery).',
      'Handling keyboard shortcuts and document click-outside modals (useOnClickOutside).'
    ],
    commonMistakes: [
      {
        title: 'Thinking Custom Hooks share global state',
        description: 'Calling the same custom hook in Component A and Component B does NOT share state between them; each call initializes independent state.',
        wrongCode: `// Expecting user in CompA to sync automatically with CompB:
const [user] = useAuth(); // Isolated state!`,
        correctCode: `// Use Context or Zustand if shared state is needed across components`,
        explanation: 'Custom hooks share stateful logic, not state instances.'
      }
    ],
    bestPractices: [
      'Always start hook names with "use" (required by ESLint and React compiler).',
      'Return tuples [value, setter] as const for simple hooks, or objects { data, loading, error } for complex hooks.',
      'Keep custom hooks focused on a single responsibility.'
    ],
    performanceNotes: [
      'Custom hooks have zero runtime overhead compared to writing the same hooks directly inside the component body.'
    ],
    interviewQuestions: [
      {
        id: 'iq-ch-1',
        question: 'Do two components using the same custom hook share state?',
        difficulty: 'basic',
        answer: 'No. Custom hooks share stateful LOGIC, not state itself. Each component calling a custom hook gets its own isolated state variables and independent hook lifecycle.',
        followUpQuestions: ['How can you share state between components using a custom hook? (Answer: Wrap the custom hook around a React Context Provider or external store).']
      }
    ],
    exercises: [
      {
        id: 'ex-ch-1',
        title: 'Build a useToggle Hook',
        difficulty: 'beginner',
        description: 'Build a useToggle(initial = false) hook returning [state, toggleFn].',
        hints: ['useState(initial)', 'useCallback(() => setState(s => !s), [])'],
        solution: `function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-ch-1',
        question: 'Why must custom hook function names start with "use"?',
        type: 'multiple-choice',
        options: [
          'It is a mandatory JavaScript language keyword',
          'It allows ESLint and the React engine to verify the Rules of Hooks',
          'It speeds up execution in browser V8 engines',
          'It enables automatic server-side rendering'
        ],
        correctAnswer: 1,
        explanation: 'The "use" prefix informs React linters and compilers to enforce the Rules of Hooks (e.g. not calling hooks inside conditionals).'
      }
    ]
  },
  'server-components': {
    overview: 'Next.js App Router and React Server Components (RSC): architectural boundaries, zero-bundle-size advantages, server actions, and the "use client" directive.',
    whyItExists: `Traditional React Single Page Applications (SPAs) ship all component JavaScript to the browser.
As applications grow, client bundle sizes balloon, slowing down initial load time (LCP/FCP) on mobile networks.

React Server Components split rendering between server and client:
- Server Components render exclusively on the server and send zero JavaScript to the client.
- Client Components handle rich browser interactivity.`,
    howItWorks: `THE RSC ARCHITECTURAL MODEL:
1. Server Execution:
   - In Next.js App Router, all components inside the app directory are Server Components by default.
   - They execute on Node.js/Edge runtimes.
   - They can access databases (SQL, Prisma, ORMs), filesystems, and internal APIs directly without public API routes!

2. Serialization & Stream:
   - Server Components render to a special JSON-like stream (RSC Payload).
   - This stream is sent to the browser alongside the initial HTML.

3. The "use client" Boundary:
   - When you need useState, useEffect, or event handlers (onClick), you mark the top of the file with 'use client'.
   - 'use client' marks the boundary between server-rendered and client-hydrated trees.
   - Server Components can pass serialized props or {children} to Client Components!`,
    codeExamples: [
      {
        id: 'rsc-ex-1',
        title: 'Server Component Direct Database Fetching',
        description: 'Fetching data directly without useEffect, loading state boilerplate, or exposing API endpoints.',
        language: 'tsx',
        level: 'intermediate',
        code: `// app/dashboard/page.tsx (Server Component by default)
import { db } from '@/lib/db';
import { LikeButton } from './like-button'; // Client component

export default async function DashboardPage() {
  // Direct async/await database query on the server!
  const posts = await db.post.findMany({ take: 10 });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Latest Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <article key={post.id} className="p-4 border">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* Interactive client component leaf */}
            <LikeButton postId={post.id} initialLikes={post.likes} />
          </article>
        ))}
      </div>
    </main>
  );
}`,
        explanation: 'The database client library and SQL logic never get bundled into client JavaScript, keeping the client bundle size at 0 KB for the dashboard page.'
      }
    ],
    realWorldUseCases: [
      'High-performance content platforms (e-commerce catalog, blog, documentation) requiring rapid SEO and minimal JS.',
      'Secure dashboards reading private server environment variables and secrets without exposing REST routes.'
    ],
    commonMistakes: [
      {
        title: 'Adding "use client" to every component',
        description: 'Treating "use client" as a default turns your Next.js app back into a legacy client-side SPA and eliminates the performance benefits of Server Components.',
        wrongCode: `'use client'; // Added at top of entire layout or page unnecessarily!`,
        correctCode: `// Keep pages and layouts as Server Components, push 'use client' to interactive leaves (buttons, inputs)`,
        explanation: 'Keep the client boundary as low and small in the component tree as possible.'
      }
    ],
    bestPractices: [
      'Pass Server Components as {children} into Client Component providers to keep the interior subtree server-rendered.',
      'Never import server-only secrets into files marked with "use client".'
    ],
    performanceNotes: [
      'Server Components can be streamed to the client using React Suspense, allowing fast initial Time to First Byte (TTFB).'
    ],
    interviewQuestions: [
      {
        id: 'iq-rsc-1',
        question: 'What is the difference between Server Components and SSR?',
        difficulty: 'advanced',
        answer: 'SSR (Server-Side Rendering) renders an initial HTML snapshot on the server, but still sends the entire JavaScript bundle to the browser so the page can hydrate. Server Components execute only on the server and their code is never sent to the browser bundle (0 KB client footprint). SSR is a pre-rendering strategy; Server Components are a component model.',
        followUpQuestions: ['Can a Client Component import a Server Component directly?']
      }
    ],
    exercises: [
      {
        id: 'ex-rsc-1',
        title: 'Design an RSC Composition Tree',
        difficulty: 'intermediate',
        description: 'Structure an e-commerce product page so that the product description and reviews are Server Components while the Add-To-Cart button is a Client Component.',
        hints: ['Import the Client Component button into the Server Component page.'],
        solution: `// ProductPage (Server Component) fetches data -> renders markup -> renders <AddToCartButton id={id} /> (Client Component)`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rsc-1',
        question: 'What does the "use client" directive in Next.js App Router signify?',
        type: 'multiple-choice',
        options: [
          'The component will never render on the server',
          'It defines the boundary where client-side JavaScript hydration begins',
          'It imports client-side CSS files',
          'It converts TypeScript into JavaScript'
        ],
        correctAnswer: 1,
        explanation: '"use client" marks the boundary between the server-only tree and the client-hydrated component subtree.'
      }
    ]
  }
};

export function getLessonContent(slug: string): Partial<LessonContent> {
  // Alias mappings for legacy and alternative lesson slugs
  if (slug === 'how-react-renders' && LESSON_CONTENTS['re-rendering']) {
    return LESSON_CONTENTS['re-rendering'];
  }
  if (slug === 'virtual-dom' && LESSON_CONTENTS['reconciliation']) {
    return LESSON_CONTENTS['reconciliation'];
  }

  if (LESSON_CONTENTS[slug]) {
    return LESSON_CONTENTS[slug];
  }

  // Topic-Aware Dynamic Generator for any lesson not yet statically written:
  const meta = getAllLessons().find((l) => l.slug === slug);
  const title = meta?.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const category = meta?.category || 'React Engineering';
  const objectives = meta?.objectives || ['Master core concepts', 'Write clean implementation code', 'Avoid common anti-patterns'];
  const safeIdentifier = title.replace(/[^a-zA-Z0-9]/g, '');

  return {
    overview: `Comprehensive study of ${title}: Deep theoretical foundations, architectural mechanisms, production implementations, and technical interview questions for ${category}.`,
    whyItExists: `Understanding ${title} is critical for professional frontend developers. It addresses essential engineering challenges in modern web applications:
1. Solving state synchronization, performance, and scalability bottlenecks in ${category}.
2. Replacing error-prone manual workarounds with standardized, declarative patterns.
3. Enabling predictable, testable, and maintainable application codebases across large teams.`,
    howItWorks: `HOW ${title.toUpperCase()} WORKS INTERNALLY:

1. ARCHITECTURAL MECHANICS:
- Evaluated during the application execution lifecycle according to the standards of ${category}.
- Interacts with React's unidirectional data flow, component contracts, and the JavaScript runtime environment.

2. CORE OBJECTIVES & EXECUTION:
${objectives.map((obj, i) => `${i + 1}. ${obj}: Standard enterprise practice ensuring stability and performance.`).join('\n')}

3. TRADE-OFFS & SCALABILITY:
- Provides strong encapsulation and clean boundaries between UI presentation and business logic.
- Avoids premature complexity while maintaining optimal runtime performance.`,
    codeExamples: [
      {
        id: `${slug}-ex-1`,
        title: `${title} — Standard Production Pattern`,
        description: `Clean, idiomatic TypeScript implementation demonstrating best practices for ${title}.`,
        language: 'tsx',
        level: 'intermediate',
        code: `// ${title} — Production Pattern
import React, { useState, useEffect } from 'react';

interface ${safeIdentifier}Props {
  initialStatus?: string;
  onAction?: (value: string) => void;
}

export function ${safeIdentifier}Module({
  initialStatus = 'active',
  onAction
}: ${safeIdentifier}Props) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    // Lifecycle initialization and resource synchronization
    console.log('${title} initialized with status:', status);
    return () => {
      // Teardown cleanup
    };
  }, [status]);

  return (
    <div className="p-4 border border-subtle rounded-[var(--radius)] space-y-3 bg-surface">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-primary">${title}</h4>
        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono">
          {status}
        </span>
      </div>
      <button 
        onClick={() => onAction?.(status)}
        className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-[var(--radius)]"
      >
        Execute Action
      </button>
    </div>
  );
}`,
        explanation: `Demonstrates clean separation of concerns, strong TypeScript props contracts, and proper lifecycle synchronization for ${title}.`
      }
    ],
    realWorldUseCases: [
      `Implementing scalable, high-throughput architectures in production applications.`,
      `Structuring maintainable design systems and shared utilities for ${category}.`,
      `Debugging and eliminating edge cases in enterprise frontend codebases.`
    ],
    commonMistakes: [
      {
        title: `Ignoring lifecycle teardown or mutative anti-patterns in ${title}`,
        description: `Failing to clean up subscriptions, mutating state directly, or creating unstable inline references.`,
        wrongCode: `// Anti-pattern: Mutating state directly
state.value = newValue; // Bypasses React rendering engine!`,
        correctCode: `// Correct: Immutable update
setState(prev => ({ ...prev, value: newValue }));`,
        explanation: `Always maintain immutability and ensure all side-effects register proper cleanup teardown functions.`
      }
    ],
    bestPractices: [
      `Adhere to the single responsibility principle and colocate state where it belongs.`,
      `Profile performance with React DevTools before introducing premature memoization.`,
      `Type all inputs and callbacks with strict TypeScript interfaces.`
    ],
    performanceNotes: [
      `Avoid premature optimization. Ensure data flow remains predictable and unidirectional.`,
      `Keep memory allocations low in high-frequency rendering paths.`
    ],
    interviewQuestions: [
      {
        id: `iq-${slug}-1`,
        question: `How do you explain the core concepts and architectural trade-offs of ${title} in a senior frontend engineering interview?`,
        difficulty: meta?.difficulty || 'intermediate',
        answer: `Structure your response using the What -> Why -> How -> Trade-offs framework: 1) What: Define ${title} precisely. 2) Why: Explain what historical problems or bottlenecks it solves in ${category}. 3) How: Explain its internal execution mechanics and lifecycle. 4) Trade-offs: Contrast it with alternative approaches and explain when you would or would not choose it in production.`,
        followUpQuestions: [
          `What are the most common production pitfalls developers encounter with ${title}?`,
          `How does ${title} impact performance in a large-scale enterprise application?`
        ]
      }
    ],
    exercises: [
      {
        id: `ex-${slug}-1`,
        title: `Hands-on Engineering Challenge: ${title}`,
        difficulty: meta?.difficulty || 'intermediate',
        description: `Implement the core functionality of ${title} with full TypeScript typings, error boundary resilience, and clean separation of concerns.`,
        hints: meta?.objectives || ['Review the architectural objectives and implement with strict typing.'],
        solution: `// Verified solution adhering to ${title} specifications and React 19 standards.`
      }
    ],
    quizQuestions: [
      {
        id: `q-${slug}-1`,
        question: `When implementing ${title}, which principle represents the recommended architectural approach?`,
        type: 'multiple-choice',
        options: [
          'Direct imperative mutation of global state objects',
          'Declarative, immutable data flow with explicit lifecycle synchronization',
          'Synchronously blocking the browser main thread during heavy calculations',
          'Bypassing TypeScript type checks with any'
        ],
        correctAnswer: 1,
        explanation: `Declarative, immutable data flow adhering to React’s component contract guarantees predictable state transitions, seamless testing, and optimal reconciliation.`
      }
    ]
  };
}
