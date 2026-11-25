import type { LessonContent } from '../../types';

export const MOD_04_LESSONS: Record<string, Partial<LessonContent>> = {
  'use-context': {
    overview: 'Complete guide to the useContext hook: Creating Context, Provider architecture, consuming values, performance optimization, splitting contexts, and avoiding unnecessary re-renders.',
    whyItExists: `In deeply nested React component trees, passing data through intermediate components that do not need it (Prop Drilling) makes refactoring painful and clutters component APIs.
The Context API provides a way to share data globally across an entire subtree:
1. Teleports data directly from a Provider to any consumer regardless of depth.
2. Perfect for low-frequency global data: Current authenticated user, theme (light/dark), language/locale, and design tokens.
3. Eliminates prop drilling without introducing external state management dependencies.`,
    howItWorks: `1. THE THREE STEPS OF CONTEXT:
- Step 1: Create Context:
  const ThemeContext = createContext<Theme>('light');
- Step 2: Provide Context:
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
- Step 3: Consume Context:
  const theme = useContext(ThemeContext);

2. CONTEXT RE-RENDERING MECHANISM & PERFORMANCE TRAP:
- When a Provider's 'value' prop changes (by reference, evaluated via Object.is), EVERY component that calls useContext(MyContext) MUST RE-RENDER!
- React.memo DOES NOT PREVENT a consumer from re-rendering when context updates!
- The Monolithic Context Anti-Pattern: Putting user profile + theme + cart items + shopping list into a single context causes the entire app to re-render when a single cart item changes!
- Solution: Context Splitting (split separate data domains into distinct Providers) or memoizing the value object with useMemo.`,
    codeExamples: [
      {
        id: 'ctx-ex-1',
        title: 'Production-Grade Type-Safe Context Pattern with Custom Hook',
        description: 'Creating an encapsulated AuthContext with custom useAuth hook and protective throw guards.',
        language: 'tsx',
        level: 'intermediate',
        code: `import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface User { id: string; name: string; role: 'admin' | 'user'; }

interface AuthContextValue {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 1. Create Context with null default
const AuthContext = createContext<AuthContextValue | null>(null);

// 2. Custom Provider Component with memoized value
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  // Memoize value so consumers do not re-render unless user reference changes
  const contextValue = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Ergonomic Consumer Hook with Provider assertion
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an <AuthProvider>');
  }
  return context;
}`,
        explanation: 'Wrapping useContext in a dedicated hook ensures consumers get clear runtime errors if they forget to wrap the tree in the Provider, and eliminates null checks in consumer components.'
      }
    ],
    realWorldUseCases: [
      'Managing global application theme (dark/light mode) and primary accent colors.',
      'Authentication session management and user permission checking.',
      'Internationalization (i18n) and active locale translation strings.'
    ],
    commonMistakes: [
      {
        title: 'Passing non-memoized object literals directly to Provider value',
        description: 'Writing <Context.Provider value={{ user, setUser }}> passes a brand-new object reference on every render of the Provider, forcing all consumers to re-render constantly!',
        wrongCode: `<AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>`,
        correctCode: `const value = useMemo(() => ({ user, setUser }), [user]);
<AuthContext.Provider value={value}>{children}</AuthContext.Provider>`,
        explanation: 'Always memoize the value object passed to Context.Provider to preserve referential stability.'
      }
    ],
    bestPractices: [
      'Split contexts by update frequency: separate static or rare data (Theme) from frequent data (Notifications).',
      'Always expose a custom hook (useTheme()) rather than exporting the raw Context object.',
      'Throw an explicit descriptive error if useContext returns null.'
    ],
    performanceNotes: [
      'Context is designed for low-frequency updates. For high-frequency state updates (e.g. streaming stock tickers, canvas coordinates), prefer Zustand or Redux Toolkit with selector subscriptions.',
      'React 19 introduces the use() hook as a modern alternative to useContext().'
    ],
    interviewQuestions: [
      {
        id: 'iq-ctx-1',
        question: 'How does Context handle re-renders, and why can it become a performance bottleneck in large React apps?',
        difficulty: 'advanced',
        answer: 'When a Context Provider receives a new value (evaluated by Object.is), React unconditionally marks all components consuming that context via useContext() as needing a re-render. Even if a consumer component is wrapped in React.memo, it will still re-render! In large apps, putting multiple fast-changing values into a single context causes massive cascading re-renders. To solve this, developers must: 1) Split contexts by domain and update rate, 2) Memoize the provider value with useMemo, or 3) Use external state managers with selector-based subscriptions (Zustand/Redux).',
        followUpQuestions: ['Does React.memo stop a component from re-rendering if its consumed Context changes?']
      }
    ],
    exercises: [
      {
        id: 'ex-ctx-1',
        title: 'Split Monolithic Context into Fast and Slow Channels',
        difficulty: 'intermediate',
        description: 'Refactor a monolithic UserSettingsContext that holds both the active theme and user typing status into two split contexts.',
        hints: ['Create ThemeContext for theme, and UserActivityContext for fast typing state'],
        solution: `// Separate fast-changing state from slow-changing theme
const ThemeContext = createContext<Theme>('dark');
const ActivityContext = createContext<boolean>(false);`
      }
    ],
    quizQuestions: [
      {
        id: 'q-ctx-1',
        question: 'Does wrapping a component in React.memo prevent it from re-rendering when a Context it consumes via useContext updates?',
        type: 'multiple-choice',
        options: [
          'Yes, React.memo blocks all updates',
          'No, Context value changes bypass React.memo and force the consumer to re-render',
          'Only in development mode',
          'Only if props also change'
        ],
        correctAnswer: 1,
        explanation: 'Context updates bypass React.memo. When the value of a consumed context changes, all consumers re-render regardless of memoization.'
      }
    ]
  },

  'use-ref': {
    overview: 'Complete guide to the useRef hook: Mutable instance variables that persist across renders without triggering re-renders, Direct DOM node manipulation, Storing timer IDs, and avoiding stale closures.',
    whyItExists: `React components need to track data across renders. However:
1. If you use useState, updating the value forces a component re-render.
2. If you use a regular variable (let count = 0), it gets reset to 0 on every render!
3. Developers need a direct bridge to native browser DOM nodes (focusing inputs, measuring scroll, canvas rendering).
useRef solves both needs: it provides a stable, mutable container whose .current property persists across the entire component lifecycle without triggering re-renders.`,
    howItWorks: `1. UNDER THE HOOD:
- Calling useRef(initialValue) returns a plain JavaScript object: { current: initialValue }.
- React guarantees that this exact object reference remains IDENTICAL on every render throughout the component's life.
- Mutating ref.current (ref.current = 42) is a synchronous mutation. It DOES NOT trigger a re-render!

2. THE TWO PRIMARY USE CASES:
- Use Case 1: Referencing Native DOM Nodes (<input ref={inputRef} />).
  React attaches the underlying real browser DOM node to inputRef.current when mounting, and sets it to null on unmount.
- Use Case 2: Storing Mutable Data Without Re-rendering (Timer handles, previous prop values, render counters, WebSocket connections).`,
    codeExamples: [
      {
        id: 'ref-ex-1',
        title: 'Direct DOM Access: Programmatic Input Focus',
        description: 'Accessing and focusing a native HTML input on button click using useRef.',
        language: 'tsx',
        level: 'basic',
        code: `import { useRef } from 'react';

export function SearchBox() {
  // 1. Initialize ref with null
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // 2. Access real browser DOM element via .current
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  return (
    <div className="flex gap-2">
      <input 
        ref={inputRef} // React attaches DOM node here
        type="text" 
        placeholder="Search documentation..." 
        className="p-2 border rounded-[var(--radius)]"
      />
      <button onClick={handleFocus} className="px-4 py-2 bg-blue-600 text-white rounded">
        Focus
      </button>
    </div>
  );
}`,
        explanation: 'useRef provides a direct, escape-hatch reference to the underlying browser DOM node without querying the document.'
      },
      {
        id: 'ref-ex-2',
        title: 'Tracking Previous Value Without Triggering Re-renders',
        description: 'Building a custom usePrevious hook that captures the previous state across render passes.',
        language: 'typescript',
        level: 'intermediate',
        code: `import { useRef, useEffect } from 'react';

// Custom hook to track previous prop or state value
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    // Runs AFTER the render commit phase finishes!
    ref.current = value;
  }, [value]);

  // Returns value captured from the PREVIOUS render!
  return ref.current;
}`,
        explanation: 'Because useEffect executes after the render and commit phase, ref.current returns the old value during the render phase and updates for the next cycle.'
      }
    ],
    realWorldUseCases: [
      'Managing interval and timeout handles in countdown timers and debounced inputs.',
      'Integrating third-party imperative libraries (Chart.js, D3, Video.js, Leaflet maps).',
      'Tracking whether a component is in its initial mount pass vs subsequent updates.'
    ],
    commonMistakes: [
      {
        title: 'Reading or writing ref.current during the render phase',
        description: 'Mutating or reading ref.current directly in the component body (outside of effects or event handlers) produces unpredictable bugs with Concurrent Mode and React Strict Mode.',
        wrongCode: `function BadComponent() {
  const countRef = useRef(0);
  countRef.current++; // WRONG: Side-effect during render phase!
  return <div>{countRef.current}</div>;
}`,
        correctCode: `function GoodComponent() {
  const countRef = useRef(0);
  useEffect(() => {
    countRef.current++; // Correct: Mutate inside effect or event handler
  });
  return <div>Rendered</div>;
}`,
        explanation: 'React render functions must remain pure. Read and write refs only inside useEffect or event callbacks.'
      }
    ],
    bestPractices: [
      'Do not overuse refs: if a value determines what appears on screen, use useState instead.',
      'Use forwardRef (or React 19 direct ref props) to expose DOM nodes to parent components.',
      'Always guard ref.current with optional chaining (ref.current?.focus()) to handle null states.'
    ],
    performanceNotes: [
      'Updating ref.current has zero rendering cost because it performs a direct object mutation without scheduling reconciler work.',
      'Refs do not allocate new objects on re-renders, maintaining stable memory overhead.'
    ],
    interviewQuestions: [
      {
        id: 'iq-ref-1',
        question: 'What is the difference between useState and useRef, and when should you choose each?',
        difficulty: 'intermediate',
        answer: 'useState and useRef both persist data across component re-renders. The fundamental difference: updating state (setState) notifies React to schedule a re-render so the UI updates to reflect the new data. Mutating a ref (ref.current = val) does NOT trigger a re-render. Choose useState when the data directly affects what is rendered on the screen. Choose useRef for values that do not affect the visual UI (timers, cached variables, previous values) or for direct browser DOM references.',
        followUpQuestions: ['Can you use useRef to store a WebSocket connection or an AbortController?']
      }
    ],
    exercises: [
      {
        id: 'ex-ref-1',
        title: 'Build an Accurate Stopwatch with useRef',
        difficulty: 'intermediate',
        description: 'Implement a Start/Stop/Reset stopwatch that stores its setInterval handle in a ref to avoid re-render bugs.',
        hints: ['Store intervalId in timerRef = useRef<number | null>(null)'],
        solution: `export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (timerRef.current !== null) return;
    timerRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return <div>{seconds}s <button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-ref-1',
        question: 'Does mutating ref.current cause a React component to re-render?',
        type: 'multiple-choice',
        options: [
          'Yes, immediately on the next frame',
          'Yes, if the value actually changed',
          'No, mutating ref.current never triggers a re-render',
          'Only if wrapped in React.memo'
        ],
        correctAnswer: 2,
        explanation: 'Mutating ref.current is a plain synchronous JavaScript property assignment; React is not notified and does not schedule a re-render.'
      }
    ]
  },

  'use-reducer': {
    overview: 'Complete guide to the useReducer hook: Managing complex state transitions, Reducer pattern, Action dispatching, State machines, and comparison with useState and Redux Toolkit.',
    whyItExists: `When local component state grows to include multiple sub-values, interdependent fields, or complex conditional transitions (e.g. multi-step forms, game logic, shopping carts), useState becomes difficult to maintain:
1. Multiple useState setters scatter state update logic across dozens of event handlers.
2. Interdependent state updates (e.g. setting loading=true AND error=null AND data=null) can cause race conditions and inconsistent states.
3. useReducer centralizes all state transition logic into a single pure function (the Reducer), separating "what happened" (Actions) from "how state updates" (Reducer).`,
    howItWorks: `1. THE REDUCER CONTRACT:
A Reducer is a pure JavaScript function: (state, action) => newState.
- Given the same state and action, it must always return the exact same new state.
- Must be free of side-effects (no API calls, no timers, no DOM mutations inside the reducer).

2. THE useReducer SIGNATURE:
const [state, dispatch] = useReducer(reducer, initialState, initLazy?);
- state: The current state object.
- dispatch: A stable function used to send actions ({ type: 'INCREMENT', payload: 5 }).
- dispatch is guaranteed by React to have a STABLE reference (never changes across renders).`,
    codeExamples: [
      {
        id: 'red-ex-1',
        title: 'Managing Complex Async API State with useReducer',
        description: 'Centralizing loading, data, and error states into an impossible-state-free Reducer state machine.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useReducer, useEffect } from 'react';

interface State<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error: string | null;
}

type Action<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: string };

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload };
    default:
      return state;
  }
}

export function UserList() {
  const [state, dispatch] = useReducer(fetchReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetch('/api/users')
      .then(res => res.json())
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, []);

  if (state.status === 'loading') return <div>Loading...</div>;
  if (state.status === 'error') return <div>Error: {state.error}</div>;
  return <ul>{state.data?.map((u: any) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        explanation: 'Centralizing transitions in a reducer prevents inconsistent states (such as loading: true AND error: "failed" at the same time).'
      }
    ],
    realWorldUseCases: [
      'Multi-step wizard checkout flows with validations and back/next actions.',
      'Complex interactive data tables with sorting, filtering, row selection, and pagination.',
      'Building custom local state stores that mirror Redux architecture without external packages.'
    ],
    commonMistakes: [
      {
        title: 'Executing side-effects inside the Reducer function',
        description: 'Making API calls, reading localStorage, or mutating external variables inside a reducer violates purity and causes multiple calls in React Strict Mode.',
        wrongCode: `function reducer(state, action) {
  if (action.type === 'SAVE') {
    fetch('/api/save', { body: state }); // DISASTER! Side-effect in pure reducer!
  }
  return state;
}`,
        correctCode: `// Correct: Execute side-effects in event handler or useEffect, dispatch result
const handleSave = async () => {
  await fetch('/api/save');
  dispatch({ type: 'SAVE_SUCCESS' });
};`,
        explanation: 'Reducers must remain pure functions that strictly calculate the next state.'
      }
    ],
    bestPractices: [
      'Use useReducer when state involves 3+ interdependent fields or complex transitions.',
      'Type actions with Discriminated Unions for complete TypeScript autocomplete and safety.',
      'Pass dispatch down through Context to deeply nested children without re-render penalties.'
    ],
    performanceNotes: [
      'The dispatch function returned by useReducer is reference-stable and will never change across re-renders.',
      'Passing dispatch via props avoids breaking React.memo on child components.'
    ],
    interviewQuestions: [
      {
        id: 'iq-red-1',
        question: 'When should you choose useReducer over useState in a React component?',
        difficulty: 'intermediate',
        answer: 'Choose useState for simple, independent state variables (like a boolean toggle or text input). Choose useReducer when: 1) You have complex state logic involving multiple sub-values, 2) The next state depends on the previous state in complex ways, 3) Multiple event handlers update the same state fields, 4) You want to decouple state transition logic from UI rendering for easy unit testing, or 5) You need to pass update triggers down deep component trees (passing dispatch has stable identity).',
        followUpQuestions: ['Why is the dispatch function from useReducer referentially stable?']
      }
    ],
    exercises: [
      {
        id: 'ex-red-1',
        title: 'Build a Shopping Cart with useReducer',
        difficulty: 'intermediate',
        description: 'Implement a cart reducer handling ADD_ITEM, REMOVE_ITEM, and UPDATE_QUANTITY with full immutability.',
        hints: ['Use action.type switch statement with typed payload'],
        solution: `type CartAction = 
  | { type: 'ADD'; item: { id: string; price: number } }
  | { type: 'REMOVE'; id: string };

function cartReducer(state: any[], action: CartAction) {
  switch (action.type) {
    case 'ADD': return [...state, action.item];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    default: return state;
  }
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-red-1',
        question: 'What type of function must a React Reducer function be?',
        type: 'multiple-choice',
        options: [
          'An asynchronous function',
          'A pure function with no side-effects',
          'A generator function',
          'A class constructor'
        ],
        correctAnswer: 1,
        explanation: 'A Reducer must be a pure function: given the same arguments (state, action), it must return the same output without modifying outside variables or running side effects.'
      }
    ]
  },

  'use-transition': {
    overview: 'Complete guide to Concurrent React and useTransition: Prioritizing urgent user inputs over non-urgent UI transitions, building non-blocking responsive interfaces, and isPending states.',
    whyItExists: `In standard React 17 and earlier, all state updates had equal, high priority.
If a user typed into an input while simultaneously filtering a 5,000-row table:
- The heavy table filter calculation blocked the main JavaScript thread.
- Keystrokes were delayed or dropped, producing frustrating input lag.
React 18 introduced Concurrent Rendering and useTransition to solve this:
1. Splits state updates into Urgent Updates (typing, clicking, tapping) vs Transition Updates (filtering, page transitions, chart rendering).
2. Keeps the UI responsive to user keystrokes even while heavy transitions are computing in the background.`,
    howItWorks: `1. HOW CONCURRENT RENDERING WORKS:
- Urgent Updates (Direct setState): Direct user interactions that require immediate feedback. Handled synchronously or with highest priority lane.
- Transition Updates (startTransition(() => setState(...))): Non-urgent updates that can be interrupted! If the user types a new letter while a transition is rendering, React discards the in-progress work and prioritizes the new keystroke.

2. THE useTransition HOOK:
const [isPending, startTransition] = useTransition();
- isPending: A boolean indicating whether the transition is currently computing in the background.
- startTransition: A function that marks any state update inside it as a low-priority, interruptible transition.`,
    codeExamples: [
      {
        id: 'tran-ex-1',
        title: 'Non-blocking Search Filter with useTransition',
        description: 'Keeping the search input silky smooth while rendering an expensive filtered dataset.',
        language: 'tsx',
        level: 'advanced',
        code: `import { useState, useTransition } from 'react';

export function NonBlockingFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. URGENT: Update input immediately so typing never lags!
    setSearchTerm(e.target.value);

    // 2. NON-URGENT: Mark heavy filter computation as a transition!
    startTransition(() => {
      setFilterQuery(e.target.value);
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Type quickly to filter 10,000 items..."
        className="w-full p-2 border"
      />

      {isPending && <p className="text-sm text-blue-500 animate-pulse">Rendering matches...</p>}

      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        <ExpensiveList query={filterQuery} />
      </div>
    </div>
  );
}

function ExpensiveList({ query }: { query: string }) {
  // Simulating heavy items list
  const items = Array.from({ length: 5000 }, (_, i) => \`Item \${i + 1} matching "\${query}"\`);
  return (
    <ul className="h-60 overflow-y-auto border p-2">
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );
}`,
        explanation: 'The input stays responsive to rapid typing because React interrupts the rendering of ExpensiveList to handle incoming keystrokes immediately.'
      }
    ],
    realWorldUseCases: [
      'High-frequency search filters and live data grid recalculations.',
      'Tab switching in complex dashboards where rendering the destination tab takes 100ms+.',
      'React Router page navigation with non-blocking page transitions.'
    ],
    commonMistakes: [
      {
        title: 'Wrapping the controlled input state setter in startTransition',
        description: 'Wrapping the state that controls the <input value={text}> inside startTransition delays the input display, defeating the entire purpose of useTransition!',
        wrongCode: `// Wrong: Delays input keystroke feedback!
const onChange = (e) => {
  startTransition(() => {
    setInputText(e.target.value);
  });
};`,
        correctCode: `// Correct: Keep input state urgent; mark secondary filtered state as transition
const onChange = (e) => {
  setInputText(e.target.value); // Urgent
  startTransition(() => {
    setFilteredResults(e.target.value); // Low priority
  });
};`,
        explanation: 'Never make controlled text input state a transition; inputs must update synchronously for smooth typing.'
      }
    ],
    bestPractices: [
      'Use useTransition when a state update causes slow rendering and you want to keep the UI interactive.',
      'Use the isPending boolean to provide visual feedback (like dimming the old content or showing a spinner).',
      'Prefer useDeferredValue when you do not own the setState call (e.g. receiving a fast prop from a parent).'
    ],
    performanceNotes: [
      'Transitions run concurrently off the main urgent lane, preventing frame drops on low-power mobile hardware.',
      'Transitions that are interrupted by new state updates are discarded without committing DOM mutations.'
    ],
    interviewQuestions: [
      {
        id: 'iq-tran-1',
        question: 'What problem does useTransition solve in React 18, and how does it differ from debouncing?',
        difficulty: 'advanced',
        answer: 'Debouncing delays executing an update by a fixed timer (e.g. 300ms) after user inactivity. If the user stops typing, the heavy render still blocks the main thread for its full duration. In contrast, useTransition does not delay the start of work: it starts computing immediately on a background priority lane. More importantly, transitions are INTERRUPTIBLE: if the user types another character while the transition is computing, React immediately aborts the in-progress background render and starts fresh with the latest character, keeping the main thread responsive.',
        followUpQuestions: ['What is the difference between useTransition and useDeferredValue?']
      }
    ],
    exercises: [
      {
        id: 'ex-tran-1',
        title: 'Build a Smooth Tab Switcher with useTransition',
        difficulty: 'intermediate',
        description: 'Create a tab component where switching between tabs uses startTransition and displays a subtle pending indicator.',
        hints: ['startTransition(() => setActiveTab(tabId))'],
        solution: `const [tab, setTab] = useState('home');
const [isPending, startTransition] = useTransition();

const selectTab = (nextTab: string) => {
  startTransition(() => setTab(nextTab));
};`
      }
    ],
    quizQuestions: [
      {
        id: 'q-tran-1',
        question: 'What happens in React 18 Concurrent Mode if a user types into an input while a transition is rendering in the background?',
        type: 'multiple-choice',
        options: [
          'The keystroke is ignored until the transition finishes',
          'React pauses or aborts the transition to immediately process the keystroke',
          'The browser crashes with a stack overflow',
          'React switches to synchronous blocking mode'
        ],
        correctAnswer: 1,
        explanation: 'Transitions are interruptible. When a high-priority interaction (like a keystroke) occurs, React yields and handles the urgent update first.'
      }
    ]
  },

  'modern-hooks': {
    overview: 'Mastery of Modern React 19 APIs & Hooks: The use() hook for reading Promises and Contexts, useOptimistic for instant UI feedback, and useActionState / useFormStatus for form actions.',
    whyItExists: `Historically in React:
1. Data fetching required heavy boilerplate: useEffect + useState + loading/error states.
2. Optimistic UI updates required manual rollback logic and complex state cloning.
3. Form submissions required manual onSubmit handlers and e.preventDefault().
React 19 revolutionizes modern web development by introducing first-class Form Actions, optimistic rendering, and the versatile use() API.`,
    howItWorks: `1. THE use() HOOK:
- Can read the value of a Promise or a Context directly in render!
- Unlike standard hooks, use() can be called conditionally (inside if-statements and loops)!
- When reading a Promise, use() integrates directly with <Suspense> and <ErrorBoundary>.

2. THE useOptimistic HOOK:
- Allows showing a speculative "optimistic" state immediately while an async server action is still executing in the background.
- Automatically reverts back to the true server state if the action fails!

3. THE useActionState HOOK:
const [state, formAction, isPending] = useActionState(asyncFn, initialVal);
- Manages form submission state, server errors, and pending indicators automatically.`,
    codeExamples: [
      {
        id: 'mod19-ex-1',
        title: 'Optimistic UI Updates with useOptimistic in React 19',
        description: 'Sending a message and displaying it instantly on screen before the server confirms delivery.',
        language: 'tsx',
        level: 'advanced',
        code: `import { useOptimistic, useState } from 'react';

interface Message { id: string; text: string; sending?: boolean; }

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello!' }
  ]);

  // useOptimistic returns optimistic state and an updater function
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newText: string) => [
      ...currentMessages,
      { id: crypto.randomUUID(), text: newText, sending: true }
    ]
  );

  async function sendMessageAction(formData: FormData) {
    const text = formData.get('message') as string;
    if (!text) return;

    // 1. Immediately display optimistic message!
    addOptimisticMessage(text);

    // 2. Perform real network request
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    const savedMessage = await response.json();

    // 3. Update real state with confirmed server data
    setMessages(prev => [...prev, savedMessage]);
  }

  return (
    <div className="p-4 space-y-4">
      <ul className="space-y-2">
        {optimisticMessages.map(m => (
          <li key={m.id} className={\`p-2 rounded \${m.sending ? 'opacity-50 italic' : 'bg-surface'}\`}>
            {m.text} {m.sending && ' (Sending...)'}
          </li>
        ))}
      </ul>

      <form action={sendMessageAction} className="flex gap-2">
        <input name="message" placeholder="Type message..." className="border p-2 flex-1" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}`,
        explanation: 'useOptimistic updates the UI with zero latency and automatically synchronizes with real state once the async action finishes.'
      }
    ],
    realWorldUseCases: [
      'Social media feeds: Instant "Like" buttons and bookmark toggles with optimistic feedback.',
      'E-commerce shopping carts: Instantly incrementing cart item badges.',
      'Server Actions in Next.js 15 and React 19.'
    ],
    commonMistakes: [
      {
        title: 'Passing an un-memoized promise to the use() hook in render',
        description: 'Creating a new promise (use(fetch(...))) inside the render body creates an infinite loop because a new promise instance is generated on every render pass!',
        explanation: 'Always cache or pass promises created outside the component or cached by a framework.'
      }
    ],
    bestPractices: [
      'Use useOptimistic for high-frequency user actions (likes, upvotes, message sends).',
      'Use useActionState with native HTML <form action={...}> for clean form handling.',
      'Combine use() with <Suspense> for declarative async data fetching.'
    ],
    performanceNotes: [
      'useOptimistic operates purely in client memory, producing instantaneous 0ms feedback for user actions.',
      'Form Actions eliminate client-side JavaScript bundle overhead when paired with React Server Components.'
    ],
    interviewQuestions: [
      {
        id: 'iq-mod19-1',
        question: 'What are the main new features introduced in React 19 hooks (use, useOptimistic, useActionState)?',
        difficulty: 'advanced',
        answer: 'React 19 introduces: 1) The use() API: allows reading promises and contexts conditionally inside render, suspending until resolution. 2) useOptimistic: allows rendering speculative state updates instantly while an async action executes, automatically syncing or reverting when complete. 3) useActionState & useFormStatus: standardizes form state management and server action handling without manual event listeners or e.preventDefault().',
        followUpQuestions: ['Can the use() hook be called inside an if-statement? Why?']
      }
    ],
    exercises: [
      {
        id: 'ex-mod19-1',
        title: 'Build an Optimistic Like Button with useOptimistic',
        difficulty: 'advanced',
        description: 'Implement an upvote button that immediately increments the vote count and reverts if the network fails.',
        hints: ['useOptimistic(likes, (current, change) => current + change)'],
        solution: `export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optLikes, addOpt] = useOptimistic(likes, (prev, change: number) => prev + change);

  const handleLike = async () => {
    addOpt(1);
    await fetch('/api/like', { method: 'POST' });
    setLikes(l => l + 1);
  };

  return <button onClick={handleLike}>Likes: {optLikes}</button>;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-mod19-1',
        question: 'Unlike standard React hooks, can the React 19 use() hook be called conditionally inside an if-statement?',
        type: 'multiple-choice',
        options: [
          'No, all hooks must obey Rules of Hooks strictly',
          'Yes, use() can be called inside conditional statements and loops',
          'Only in Next.js Server Components',
          'Only inside useEffect'
        ],
        correctAnswer: 1,
        explanation: 'The React 19 use() API is unique: unlike traditional hooks, it can be called conditionally inside if-statements and loops.'
      }
    ]
  }
};
