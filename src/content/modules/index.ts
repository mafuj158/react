import type { Module } from '../../types';

export const ALL_MODULES: Module[] = [
  {
    id: 'mod-01',
    title: 'Web Development Prerequisites',
    slug: 'web-prerequisites',
    description: 'Foundation concepts: how the web works, HTML, CSS essentials every React developer must know.',
    icon: 'Globe',
    color: 'from-blue-500 to-blue-700',
    order: 1,
    lessons: [
      { id: 'web-01', title: 'How the Web Works', slug: 'how-the-web-works', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'Web Fundamentals', difficulty: 'beginner', duration: 20, prerequisites: [], objectives: ['Understand client-server model', 'Learn how HTTP works', 'Understand DNS resolution', 'Know the browser rendering process'], order: 1 },
      { id: 'web-02', title: 'Browser Architecture & Rendering', slug: 'browser-architecture', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'Web Fundamentals', difficulty: 'intermediate', duration: 25, prerequisites: ['web-01'], objectives: ['Understand browser components', 'Learn DOM and CSSOM', 'Understand critical rendering path', 'Know JavaScript execution in browsers'], order: 2 },
      { id: 'web-03', title: 'Event Bubbling, Capturing & Delegation', slug: 'event-propagation', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'Web Fundamentals', difficulty: 'intermediate', duration: 20, prerequisites: ['web-01'], objectives: ['Understand event propagation phases', 'Learn event bubbling', 'Learn event capturing', 'Implement event delegation'], order: 3 },
      { id: 'web-04', title: 'Semantic HTML & Accessibility', slug: 'semantic-html', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'HTML', difficulty: 'beginner', duration: 20, prerequisites: [], objectives: ['Write semantic HTML', 'Understand accessibility', 'Use ARIA attributes', 'Build accessible forms'], order: 4 },
      { id: 'web-05', title: 'CSS Fundamentals & Box Model', slug: 'css-fundamentals', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'CSS', difficulty: 'beginner', duration: 25, prerequisites: [], objectives: ['Understand box model', 'Learn positioning', 'Master CSS specificity', 'Understand cascade'], order: 5 },
      { id: 'web-06', title: 'Flexbox & Grid Layout', slug: 'flexbox-grid', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'CSS', difficulty: 'intermediate', duration: 30, prerequisites: ['web-05'], objectives: ['Master Flexbox', 'Master CSS Grid', 'Build responsive layouts', 'Choose between Flex and Grid'], order: 6 },
      { id: 'web-07', title: 'Responsive Design & Media Queries', slug: 'responsive-design', moduleId: 'mod-01', moduleSlug: 'web-prerequisites', category: 'CSS', difficulty: 'intermediate', duration: 20, prerequisites: ['web-06'], objectives: ['Implement responsive design', 'Use media queries effectively', 'Mobile-first approach', 'CSS performance'], order: 7 },
    ],
  },
  {
    id: 'mod-02',
    title: 'JavaScript Fundamentals',
    slug: 'javascript',
    description: 'Complete JavaScript from basics to advanced: scope, closures, async programming, and ES6+ features.',
    icon: 'Braces',
    color: 'from-yellow-500 to-orange-600',
    order: 2,
    lessons: [
      { id: 'js-01', title: 'Variables: var, let, and const', slug: 'variables', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Core JavaScript', difficulty: 'beginner', duration: 20, prerequisites: [], objectives: ['Understand var, let, const differences', 'Know when to use each', 'Understand block scope vs function scope', 'Understand hoisting with variables'], order: 1 },
      { id: 'js-02', title: 'Data Types & Type Coercion', slug: 'data-types', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Core JavaScript', difficulty: 'beginner', duration: 20, prerequisites: ['js-01'], objectives: ['Know all JS data types', 'Understand primitive vs reference types', 'Understand type coercion', 'Use typeof and instanceof'], order: 2 },
      { id: 'js-03', title: 'Functions & Arrow Functions', slug: 'functions', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Core JavaScript', difficulty: 'beginner', duration: 25, prerequisites: ['js-01'], objectives: ['Understand function declarations vs expressions', 'Master arrow functions', 'Default parameters', 'Rest parameters'], order: 3 },
      { id: 'js-04', title: 'Destructuring & Spread/Rest', slug: 'destructuring', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Core JavaScript', difficulty: 'intermediate', duration: 25, prerequisites: ['js-01', 'js-02'], objectives: ['Master array destructuring', 'Master object destructuring', 'Use spread operator', 'Use rest parameters'], order: 4 },
      { id: 'js-05', title: 'Scope & Lexical Scope', slug: 'scope', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'intermediate', duration: 25, prerequisites: ['js-01', 'js-03'], objectives: ['Understand global, function, block scope', 'Know lexical scope', 'Understand scope chain', 'Debug scope issues'], order: 5 },
      { id: 'js-06', title: 'Closures', slug: 'closures', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'intermediate', duration: 30, prerequisites: ['js-05'], objectives: ['Understand what closures are', 'Know why closures exist', 'Build practical closure examples', 'Use closures for encapsulation'], order: 6 },
      { id: 'js-07', title: 'Hoisting & Temporal Dead Zone', slug: 'hoisting', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'intermediate', duration: 20, prerequisites: ['js-01', 'js-05'], objectives: ['Understand hoisting mechanism', 'Know TDZ for let/const', 'Understand function hoisting', 'Avoid hoisting bugs'], order: 7 },
      { id: 'js-08', title: 'this Keyword & Binding', slug: 'this-keyword', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'advanced', duration: 35, prerequisites: ['js-05', 'js-06'], objectives: ['Understand this in different contexts', 'Know implicit vs explicit binding', 'Master call, apply, bind', 'Handle this in arrow functions'], order: 8 },
      { id: 'js-09', title: 'Prototypes & Prototypal Inheritance', slug: 'prototypes', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'advanced', duration: 35, prerequisites: ['js-08'], objectives: ['Understand prototype chain', 'Know prototypal inheritance', 'Compare with class-based inheritance', 'Build inheritance patterns'], order: 9 },
      { id: 'js-10', title: 'Classes & Object-Oriented JavaScript', slug: 'classes', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Intermediate JavaScript', difficulty: 'intermediate', duration: 30, prerequisites: ['js-09'], objectives: ['Use ES6 classes', 'Implement inheritance with classes', 'Understand encapsulation', 'Know class vs prototype difference'], order: 10 },
      { id: 'js-11', title: 'Event Loop & Asynchronous JavaScript', slug: 'event-loop', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'advanced', duration: 40, prerequisites: ['js-05'], objectives: ['Understand call stack', 'Know microtask vs macrotask queue', 'Understand how async works', 'Predict execution order'], order: 11 },
      { id: 'js-12', title: 'Promises & Promise Chaining', slug: 'promises', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'advanced', duration: 35, prerequisites: ['js-11'], objectives: ['Create and use Promises', 'Chain promises correctly', 'Handle errors in promises', 'Use Promise combinators'], order: 12 },
      { id: 'js-13', title: 'Async/Await', slug: 'async-await', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'advanced', duration: 30, prerequisites: ['js-12'], objectives: ['Write async/await code', 'Handle errors with try/catch', 'Convert promises to async/await', 'Use async/await with Promise combinators'], order: 13 },
      { id: 'js-14', title: 'Array Methods: map, filter, reduce', slug: 'array-methods', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'JavaScript Practical', difficulty: 'intermediate', duration: 30, prerequisites: ['js-03'], objectives: ['Master map, filter, reduce', 'Chain array methods', 'Transform data functionally', 'Know time complexity'], order: 14 },
      { id: 'js-15', title: 'Debouncing & Throttling', slug: 'debounce-throttle', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'advanced', duration: 30, prerequisites: ['js-11', 'js-06'], objectives: ['Understand debouncing', 'Understand throttling', 'Implement both from scratch', 'Know real-world use cases'], order: 15 },
      { id: 'js-16', title: 'Modules & Dynamic Imports', slug: 'modules', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'intermediate', duration: 20, prerequisites: ['js-05'], objectives: ['Use ES modules', 'Import and export correctly', 'Use dynamic imports', 'Understand module bundling'], order: 16 },
      { id: 'js-17', title: 'Memoization & Functional Programming', slug: 'memoization', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'Advanced JavaScript', difficulty: 'advanced', duration: 25, prerequisites: ['js-06', 'js-14'], objectives: ['Implement memoization', 'Understand pure functions', 'Know currying', 'Apply functional programming principles'], order: 17 },
      { id: 'js-18', title: 'Error Handling Patterns', slug: 'error-handling', moduleId: 'mod-02', moduleSlug: 'javascript', category: 'JavaScript Practical', difficulty: 'intermediate', duration: 20, prerequisites: ['js-13'], objectives: ['Use try/catch/finally', 'Create custom errors', 'Handle async errors', 'Error handling best practices'], order: 18 },
    ],
  },
  {
    id: 'mod-03',
    title: 'React Fundamentals',
    slug: 'react-fundamentals',
    description: 'Build your React foundation: components, JSX, props, state, and the React mental model.',
    icon: 'Atom',
    color: 'from-cyan-500 to-blue-600',
    order: 3,
    lessons: [
      { id: 'rf-01', title: 'What is React & Why React?', slug: 'what-is-react', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 20, prerequisites: [], objectives: ['Understand what React is', 'Know why React exists', 'React vs Vanilla JavaScript', 'Understand declarative programming'], order: 1 },
      { id: 'rf-02', title: 'Setting Up React with Vite', slug: 'react-setup', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 15, prerequisites: ['rf-01'], objectives: ['Set up React project', 'Understand project structure', 'Configure TypeScript', 'Start development server'], order: 2 },
      { id: 'rf-03', title: 'JSX — JavaScript XML', slug: 'jsx', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 25, prerequisites: ['rf-01'], objectives: ['Write JSX correctly', 'Understand JSX compilation', 'Know JSX rules and limitations', 'Use expressions in JSX'], order: 3 },
      { id: 'rf-04', title: 'Components & Component Composition', slug: 'components', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 25, prerequisites: ['rf-03'], objectives: ['Create functional components', 'Compose components', 'Understand component hierarchy', 'Build reusable components'], order: 4 },
      { id: 'rf-05', title: 'Props & One-Way Data Flow', slug: 'props', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 25, prerequisites: ['rf-04'], objectives: ['Pass props correctly', 'Type props with TypeScript', 'Use children prop', 'Understand prop immutability'], order: 5 },
      { id: 'rf-06', title: 'State & useState Hook', slug: 'state', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 30, prerequisites: ['rf-05'], objectives: ['Manage local state', 'Understand re-rendering on state change', 'Update state correctly', 'State vs props difference'], order: 6 },
      { id: 'rf-07', title: 'Conditional Rendering', slug: 'conditional-rendering', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 20, prerequisites: ['rf-05', 'rf-06'], objectives: ['Render conditionally with &&', 'Use ternary in JSX', 'Early return patterns', 'Avoid common pitfalls'], order: 7 },
      { id: 'rf-08', title: 'Rendering Lists & Keys', slug: 'lists-and-keys', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 20, prerequisites: ['rf-04', 'rf-05'], objectives: ['Render lists with map', 'Understand key prop', 'Why keys matter for reconciliation', 'Avoid index as key pitfalls'], order: 8 },
      { id: 'rf-09', title: 'Event Handling in React', slug: 'event-handling', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'beginner', duration: 20, prerequisites: ['rf-04', 'rf-06'], objectives: ['Handle DOM events in React', 'Understand synthetic events', 'Pass event handlers as props', 'Handle form events'], order: 9 },
      { id: 'rf-10', title: 'Forms: Controlled & Uncontrolled', slug: 'forms', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'intermediate', duration: 30, prerequisites: ['rf-06', 'rf-09'], objectives: ['Build controlled forms', 'Build uncontrolled forms', 'Understand trade-offs', 'Handle form submission'], order: 10 },
      { id: 'rf-11', title: 'Lifting State Up', slug: 'lifting-state', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'intermediate', duration: 25, prerequisites: ['rf-05', 'rf-06'], objectives: ['Share state between siblings', 'Identify where to place state', 'Understand state colocation', 'Avoid prop drilling basics'], order: 11 },
      { id: 'rf-12', title: 'Thinking in React', slug: 'thinking-in-react', moduleId: 'mod-03', moduleSlug: 'react-fundamentals', category: 'React Fundamentals', difficulty: 'intermediate', duration: 30, prerequisites: ['rf-01', 'rf-04', 'rf-05', 'rf-06'], objectives: ['Break UI into components', 'Identify where state lives', 'Build data flow correctly', 'Apply React mental model'], order: 12 },
    ],
  },
  {
    id: 'mod-04',
    title: 'React Hooks — Complete Guide',
    slug: 'hooks',
    description: 'Every React hook explained deeply: behavior, internals, performance implications, and interview questions.',
    icon: 'Hook',
    color: 'from-purple-500 to-violet-700',
    order: 4,
    lessons: [
      { id: 'hook-01', title: 'useState — State Management Hook', slug: 'use-state', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Fundamental Hooks', difficulty: 'beginner', duration: 35, prerequisites: ['rf-06'], objectives: ['Use useState correctly', 'Understand state updates are async', 'Use functional updates', 'Know state initialization patterns'], order: 1 },
      { id: 'hook-02', title: 'useEffect — Side Effect Hook', slug: 'use-effect', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Fundamental Hooks', difficulty: 'intermediate', duration: 45, prerequisites: ['hook-01'], objectives: ['Understand when effects run', 'Master dependency array', 'Write cleanup functions', 'Avoid common effect mistakes'], order: 2 },
      { id: 'hook-03', title: 'useContext — Context Consumer Hook', slug: 'use-context', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Fundamental Hooks', difficulty: 'intermediate', duration: 35, prerequisites: ['hook-01', 'rf-11'], objectives: ['Create and consume context', 'Avoid prop drilling', 'Understand context re-renders', 'Build context with TypeScript'], order: 3 },
      { id: 'hook-04', title: 'useRef — Reference Hook', slug: 'use-ref', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Fundamental Hooks', difficulty: 'intermediate', duration: 30, prerequisites: ['hook-01'], objectives: ['Access DOM elements', 'Store mutable values', 'Understand useRef vs useState', 'Common useRef patterns'], order: 4 },
      { id: 'hook-05', title: 'useReducer — Complex State Hook', slug: 'use-reducer', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Fundamental Hooks', difficulty: 'intermediate', duration: 40, prerequisites: ['hook-01'], objectives: ['Manage complex state', 'Write reducers correctly', 'Compare useState vs useReducer', 'Use with useContext for global state'], order: 5 },
      { id: 'hook-06', title: 'useMemo — Memoization Hook', slug: 'use-memo', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Performance Hooks', difficulty: 'advanced', duration: 40, prerequisites: ['hook-01', 'hook-02'], objectives: ['Memoize expensive calculations', 'Understand when useMemo helps', 'Know when NOT to use useMemo', 'Measure actual performance impact'], order: 6 },
      { id: 'hook-07', title: 'useCallback — Callback Memoization Hook', slug: 'use-callback', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Performance Hooks', difficulty: 'advanced', duration: 35, prerequisites: ['hook-06'], objectives: ['Memoize callbacks', 'Understand referential equality', 'Use with React.memo', 'Know when useCallback is unnecessary'], order: 7 },
      { id: 'hook-08', title: 'useTransition & useDeferredValue', slug: 'use-transition', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Performance Hooks', difficulty: 'advanced', duration: 35, prerequisites: ['hook-01', 'hook-06'], objectives: ['Implement concurrent features', 'Mark state updates as transitions', 'Use useDeferredValue', 'Build non-blocking UIs'], order: 8 },
      { id: 'hook-09', title: 'useLayoutEffect & useInsertionEffect', slug: 'use-layout-effect', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Advanced Hooks', difficulty: 'advanced', duration: 30, prerequisites: ['hook-02'], objectives: ['Understand useLayoutEffect timing', 'Compare with useEffect', 'Know when to use useLayoutEffect', 'Understand useInsertionEffect'], order: 9 },
      { id: 'hook-10', title: 'useImperativeHandle & forwardRef', slug: 'use-imperative-handle', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Advanced Hooks', difficulty: 'advanced', duration: 30, prerequisites: ['hook-04'], objectives: ['Expose imperative APIs', 'Use forwardRef correctly', 'Build reusable input components', 'Know when imperative is appropriate'], order: 10 },
      { id: 'hook-11', title: 'useId, useSyncExternalStore', slug: 'use-id', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Advanced Hooks', difficulty: 'advanced', duration: 25, prerequisites: ['hook-01'], objectives: ['Generate unique IDs', 'Subscribe to external stores', 'Build custom store integrations', 'Server-safe IDs'], order: 11 },
      { id: 'hook-12', title: 'Modern Hooks: use, useOptimistic, useActionState', slug: 'modern-hooks', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Modern React APIs', difficulty: 'advanced', duration: 40, prerequisites: ['hook-01', 'hook-02', 'hook-05'], objectives: ['Use React 19 hooks', 'Implement optimistic updates', 'Handle form actions', 'Understand use() hook for Promises'], order: 12 },
      { id: 'hook-13', title: 'Custom Hooks — Building Your Own', slug: 'custom-hooks', moduleId: 'mod-04', moduleSlug: 'hooks', category: 'Custom Hooks', difficulty: 'advanced', duration: 45, prerequisites: ['hook-01', 'hook-02', 'hook-04'], objectives: ['Extract reusable logic', 'Build useFetch hook', 'Build useLocalStorage hook', 'Build useDebounce hook', 'Architecture custom hooks'], order: 13 },
    ],
  },
  {
    id: 'mod-05',
    title: 'React Internals & Rendering',
    slug: 'react-internals',
    description: 'Deep dive: Virtual DOM, Fiber architecture, reconciliation, rendering lifecycle, and concurrent mode.',
    icon: 'Cpu',
    color: 'from-orange-500 to-red-600',
    order: 5,
    lessons: [
      { id: 'ri-01', title: 'Re-rendering in React', slug: 're-rendering', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 35, prerequisites: ['rf-04', 'rf-06'], objectives: ['Understand what triggers a component to re-render', 'The role of state and props in the rendering process', 'Identifying scenarios that lead to unnecessary re-renders', 'Render phase vs Commit phase'], order: 1 },
      { id: 'ri-02', title: 'The Diffing Algorithm', slug: 'diffing-algorithm', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 35, prerequisites: ['ri-01'], objectives: ['How React compares previous and updated Virtual DOM', 'O(n) heuristics vs O(n³) tree comparison', 'Differentiating elements by type and key', 'Identifying minimal set of changes required to update UI'], order: 2 },
      { id: 'ri-03', title: 'Reconciliation in React', slug: 'reconciliation', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 35, prerequisites: ['ri-02'], objectives: ['Exploring React reconciliation process', 'Updating only necessary parts of DOM instead of re-rendering everything', 'Contribution to performance and smoother UX', 'Fiber current and workInProgress trees'], order: 3 },
      { id: 'ri-04', title: 'React Fiber Architecture', slug: 'fiber-architecture', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 40, prerequisites: ['ri-03'], objectives: ['Understand Fiber data structure', 'Know work loop', 'Understand priority and scheduling', 'Know how Fiber enables Concurrent Mode'], order: 4 },
      { id: 'ri-05', title: 'State Batching & Update Queue', slug: 'state-batching', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 30, prerequisites: ['ri-01', 'hook-01'], objectives: ['Understand automatic batching in React 18+', 'Know how state updates are queued', 'Understand update priority', 'Debug batching issues'], order: 5 },
      { id: 'ri-06', title: 'Effect Lifecycle & Cleanup', slug: 'effect-lifecycle', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 30, prerequisites: ['hook-02', 'ri-01'], objectives: ['Understand effect scheduling', 'Know cleanup timing', 'Understand Strict Mode double-firing', 'Debug effect issues'], order: 6 },
      { id: 'ri-07', title: 'Concurrent Rendering & Transitions', slug: 'concurrent-rendering', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 35, prerequisites: ['ri-04', 'hook-08'], objectives: ['Understand concurrent mode', 'Know how transitions work', 'Understand interruptible rendering', 'Build smooth UIs with Transitions'], order: 7 },
      { id: 'ri-08', title: 'Suspense & Error Boundaries', slug: 'suspense-error-boundaries', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 35, prerequisites: ['ri-01', 'ri-07'], objectives: ['Use Suspense for async loading', 'Build Error Boundaries', 'Combine Suspense + Error Boundaries', 'Understand Suspense with concurrent mode'], order: 8 },
      { id: 'ri-09', title: 'React Compiler & Automatic Optimization', slug: 'react-compiler', moduleId: 'mod-05', moduleSlug: 'react-internals', category: 'React Internals', difficulty: 'advanced', duration: 30, prerequisites: ['ri-01', 'hook-06', 'hook-07'], objectives: ['Understand React Compiler goals', 'Know what React Compiler does automatically', 'Understand implications for useMemo/useCallback', 'Configure React Compiler'], order: 9 },
    ],
  },
  {
    id: 'mod-06',
    title: 'Advanced React Patterns',
    slug: 'advanced-react',
    description: 'Professional patterns: HOC, Render Props, Compound Components, Portals, and architectural patterns.',
    icon: 'Layers',
    color: 'from-indigo-500 to-purple-700',
    order: 6,
    lessons: [
      { id: 'ar-01', title: 'Higher-Order Components (HOC)', slug: 'higher-order-components', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced Patterns', difficulty: 'advanced', duration: 35, prerequisites: ['rf-04', 'rf-05', 'hook-01'], objectives: ['Understand HOC pattern', 'Build practical HOCs', 'Know HOC limitations', 'Compare HOC vs Custom Hooks'], order: 1 },
      { id: 'ar-02', title: 'Render Props Pattern', slug: 'render-props', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced Patterns', difficulty: 'advanced', duration: 30, prerequisites: ['rf-05', 'rf-04'], objectives: ['Implement Render Props pattern', 'Share behavior between components', 'Know when to use vs Custom Hooks', 'Real-world render prop examples'], order: 2 },
      { id: 'ar-03', title: 'Compound Components Pattern', slug: 'compound-components', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced Patterns', difficulty: 'advanced', duration: 35, prerequisites: ['hook-03', 'rf-04', 'rf-05'], objectives: ['Build compound component APIs', 'Use Context with compound components', 'Build Select/Dropdown with compound components', 'Understand implicit state sharing'], order: 3 },
      { id: 'ar-04', title: 'Provider Pattern & Context Architecture', slug: 'provider-pattern', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced Patterns', difficulty: 'advanced', duration: 30, prerequisites: ['hook-03', 'hook-05'], objectives: ['Design scalable Context architecture', 'Optimize Context performance', 'Split contexts effectively', 'Build type-safe providers'], order: 4 },
      { id: 'ar-05', title: 'Portals & Rendering Outside DOM Hierarchy', slug: 'portals', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced React', difficulty: 'advanced', duration: 25, prerequisites: ['rf-04', 'hook-04'], objectives: ['Use ReactDOM.createPortal', 'Build modals with portals', 'Understand event bubbling with portals', 'Portal accessibility'], order: 5 },
      { id: 'ar-06', title: 'Lazy Loading & Code Splitting', slug: 'lazy-loading', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced React', difficulty: 'advanced', duration: 30, prerequisites: ['rf-01', 'ri-07'], objectives: ['Use React.lazy and Suspense', 'Route-based code splitting', 'Component-level lazy loading', 'Optimize bundle size'], order: 6 },
      { id: 'ar-07', title: 'Custom Hooks Architecture', slug: 'custom-hooks-architecture', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Advanced React', difficulty: 'advanced', duration: 40, prerequisites: ['hook-13', 'hook-02', 'hook-04'], objectives: ['Design custom hook architecture', 'Build useFetch, useDebounce, useLocalStorage', 'Build useEventListener hook', 'Test custom hooks'], order: 7 },
      { id: 'ar-08', title: 'React Server Components Fundamentals', slug: 'server-components', moduleId: 'mod-06', moduleSlug: 'advanced-react', category: 'Modern React', difficulty: 'advanced', duration: 40, prerequisites: ['rf-04', 'rf-05', 'ri-01'], objectives: ['Understand Server vs Client Components', 'Know when to use each', 'Understand rendering model', 'Server Components with Next.js'], order: 8 },
    ],
  },
  {
    id: 'mod-07',
    title: 'State Management',
    slug: 'state-management',
    description: 'From local state to global state: Context API, Redux Toolkit, Zustand, and architectural decisions.',
    icon: 'Database',
    color: 'from-green-500 to-teal-600',
    order: 7,
    lessons: [
      { id: 'sm-01', title: 'State Management Fundamentals', slug: 'state-fundamentals', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'intermediate', duration: 25, prerequisites: ['hook-01', 'hook-05'], objectives: ['Understand local vs shared vs global state', 'Know when to use each', 'State colocation principle', 'Choose right state management solution'], order: 1 },
      { id: 'sm-02', title: 'Context API for Global State', slug: 'context-api', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'intermediate', duration: 35, prerequisites: ['hook-03', 'hook-05', 'sm-01'], objectives: ['Build global state with Context', 'Optimize Context performance', 'Combine Context + useReducer', 'Know Context limitations'], order: 2 },
      { id: 'sm-03', title: 'Redux Toolkit Fundamentals', slug: 'redux-toolkit', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'advanced', duration: 45, prerequisites: ['hook-05', 'sm-01'], objectives: ['Set up Redux Toolkit', 'Create slices', 'Use useSelector and useDispatch', 'Compare with Context API'], order: 3 },
      { id: 'sm-04', title: 'Redux Thunks & Async State', slug: 'redux-thunks', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'advanced', duration: 40, prerequisites: ['sm-03'], objectives: ['Create async thunks', 'Handle loading/error states', 'Dispatch thunks from components', 'Handle async errors in Redux'], order: 4 },
      { id: 'sm-05', title: 'RTK Query — Server State with Redux', slug: 'rtk-query', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'advanced', duration: 45, prerequisites: ['sm-03', 'sm-04'], objectives: ['Set up RTK Query', 'Create API slices', 'Cache and invalidate queries', 'Handle mutations'], order: 5 },
      { id: 'sm-06', title: 'Zustand — Lightweight State Management', slug: 'zustand', moduleId: 'mod-07', moduleSlug: 'state-management', category: 'State Management', difficulty: 'intermediate', duration: 35, prerequisites: ['sm-01'], objectives: ['Set up Zustand store', 'Create slices with Zustand', 'Subscribe to store slices', 'Compare Zustand vs Redux vs Context'], order: 6 },
    ],
  },
  {
    id: 'mod-08',
    title: 'API Integration & Data Fetching',
    slug: 'api-integration',
    description: 'REST APIs, Axios, error handling, TanStack Query, caching, optimistic updates, and data patterns.',
    icon: 'Network',
    color: 'from-teal-500 to-cyan-600',
    order: 8,
    lessons: [
      { id: 'api-01', title: 'REST API Fundamentals', slug: 'rest-fundamentals', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'beginner', duration: 25, prerequisites: [], objectives: ['Understand HTTP methods', 'Know HTTP status codes', 'Understand request/response lifecycle', 'REST conventions'], order: 1 },
      { id: 'api-02', title: 'Fetch API & Axios', slug: 'fetch-and-axios', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'intermediate', duration: 30, prerequisites: ['api-01', 'js-13'], objectives: ['Use Fetch API', 'Set up Axios', 'Create Axios instances', 'Use request/response interceptors'], order: 2 },
      { id: 'api-03', title: 'API Error Handling & Loading States', slug: 'api-error-handling', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'intermediate', duration: 30, prerequisites: ['api-02', 'hook-01', 'hook-02'], objectives: ['Handle API errors gracefully', 'Show loading states', 'Retry failed requests', 'Display error messages correctly'], order: 3 },
      { id: 'api-04', title: 'TanStack Query (React Query)', slug: 'tanstack-query', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'advanced', duration: 50, prerequisites: ['api-02', 'hook-01', 'hook-02'], objectives: ['Set up TanStack Query', 'Use useQuery', 'Use useMutation', 'Implement caching and invalidation'], order: 4 },
      { id: 'api-05', title: 'Optimistic Updates & Background Refetching', slug: 'optimistic-updates', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'advanced', duration: 35, prerequisites: ['api-04'], objectives: ['Implement optimistic updates', 'Handle rollback on error', 'Configure background refetching', 'Build responsive UIs'], order: 5 },
      { id: 'api-06', title: 'Pagination, Infinite Scroll & Filtering', slug: 'pagination-infinite-scroll', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'advanced', duration: 40, prerequisites: ['api-04', 'hook-04'], objectives: ['Implement pagination', 'Build infinite scroll', 'Add search and filtering', 'Use debounce for search'], order: 6 },
      { id: 'api-07', title: 'Authentication: JWT & Secure Tokens', slug: 'authentication', moduleId: 'mod-08', moduleSlug: 'api-integration', category: 'API Integration', difficulty: 'advanced', duration: 40, prerequisites: ['api-02', 'api-03'], objectives: ['Implement JWT auth', 'Store tokens securely', 'Add auth headers to requests', 'Handle token refresh'], order: 7 },
    ],
  },
  {
    id: 'mod-09',
    title: 'React Performance Optimization',
    slug: 'optimization',
    description: 'Identify, measure, and fix React performance problems. From memoization to bundle optimization.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    order: 9,
    lessons: [
      { id: 'opt-01', title: 'Understanding React Performance', slug: 'react-performance-overview', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'intermediate', duration: 25, prerequisites: ['ri-01', 'ri-02'], objectives: ['Identify performance bottlenecks', 'Use React DevTools Profiler', 'Understand rendering costs', 'Measure before optimizing'], order: 1 },
      { id: 'opt-02', title: 'React.memo — Component Memoization', slug: 'react-memo', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 35, prerequisites: ['opt-01', 'hook-07'], objectives: ['Use React.memo correctly', 'Understand shallow comparison', 'Know when React.memo helps', 'Know when React.memo hurts'], order: 2 },
      { id: 'opt-03', title: 'useMemo & useCallback Deep Dive', slug: 'memo-callback-deep-dive', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 40, prerequisites: ['hook-06', 'hook-07', 'opt-01'], objectives: ['Understand referential equality', 'Measure impact of useMemo/useCallback', 'Identify when to memoize', 'Avoid premature optimization'], order: 3 },
      { id: 'opt-04', title: 'List Virtualization & Windowing', slug: 'virtualization', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 30, prerequisites: ['opt-01', 'rf-08'], objectives: ['Understand virtualization concept', 'Implement windowing for large lists', 'Use react-window or similar', 'Measure performance improvement'], order: 4 },
      { id: 'opt-05', title: 'Code Splitting & Lazy Loading', slug: 'code-splitting', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 30, prerequisites: ['ar-06', 'opt-01'], objectives: ['Split code at route level', 'Split code at component level', 'Analyze bundle size', 'Optimize initial load time'], order: 5 },
      { id: 'opt-06', title: 'Optimizing Context Providers', slug: 'optimizing-context', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 30, prerequisites: ['hook-03', 'opt-02', 'opt-01'], objectives: ['Prevent unnecessary context re-renders', 'Split context by update frequency', 'Memoize context values', 'Measure context performance'], order: 6 },
      { id: 'opt-07', title: 'Memory Leaks & Cleanup', slug: 'memory-leaks', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'advanced', duration: 30, prerequisites: ['hook-02', 'ri-05'], objectives: ['Identify memory leaks in React', 'Write proper cleanup functions', 'Avoid stale closures', 'Debug memory issues'], order: 7 },
      { id: 'opt-08', title: 'Core Web Vitals & Lighthouse', slug: 'core-web-vitals', moduleId: 'mod-09', moduleSlug: 'optimization', category: 'Performance', difficulty: 'intermediate', duration: 25, prerequisites: ['opt-01'], objectives: ['Understand LCP, FID, CLS, INP', 'Use Lighthouse auditing', 'Improve Web Vitals scores', 'Measure user-perceived performance'], order: 8 },
    ],
  },
  {
    id: 'mod-10',
    title: 'TypeScript with React',
    slug: 'typescript',
    description: 'Complete TypeScript for React: type-safe components, hooks, generics, and advanced TS patterns.',
    icon: 'FileCode',
    color: 'from-blue-600 to-indigo-700',
    order: 10,
    lessons: [
      { id: 'ts-01', title: 'TypeScript Fundamentals for React Devs', slug: 'typescript-basics', moduleId: 'mod-10', moduleSlug: 'typescript', category: 'TypeScript', difficulty: 'intermediate', duration: 35, prerequisites: ['rf-01'], objectives: ['Type annotations and inference', 'Interfaces vs types', 'Union and intersection types', 'Basic generics'], order: 1 },
      { id: 'ts-02', title: 'Typing React Components & Props', slug: 'typing-components', moduleId: 'mod-10', moduleSlug: 'typescript', category: 'TypeScript', difficulty: 'intermediate', duration: 30, prerequisites: ['ts-01', 'rf-04', 'rf-05'], objectives: ['Type component props', 'Type children prop', 'Type event handlers', 'Generic components'], order: 2 },
      { id: 'ts-03', title: 'Typing React Hooks', slug: 'typing-hooks', moduleId: 'mod-10', moduleSlug: 'typescript', category: 'TypeScript', difficulty: 'advanced', duration: 35, prerequisites: ['ts-01', 'hook-01', 'hook-02', 'hook-05'], objectives: ['Type useState', 'Type useReducer', 'Type useRef', 'Type custom hooks'], order: 3 },
      { id: 'ts-04', title: 'Generics & Utility Types', slug: 'generics', moduleId: 'mod-10', moduleSlug: 'typescript', category: 'TypeScript', difficulty: 'advanced', duration: 40, prerequisites: ['ts-01'], objectives: ['Write generic functions', 'Generic React components', 'Use Partial, Required, Pick, Omit', 'Type API responses'], order: 4 },
      { id: 'ts-05', title: 'Advanced TypeScript Patterns', slug: 'advanced-typescript', moduleId: 'mod-10', moduleSlug: 'typescript', category: 'TypeScript', difficulty: 'advanced', duration: 40, prerequisites: ['ts-04'], objectives: ['Type narrowing', 'Discriminated unions', 'Template literal types', 'Conditional types'], order: 5 },
    ],
  },
  {
    id: 'mod-11',
    title: 'Routing & Navigation',
    slug: 'routing',
    description: 'React Router v7: routes, navigation, nested routes, protected routes, and URL parameters.',
    icon: 'Route',
    color: 'from-rose-500 to-pink-700',
    order: 11,
    lessons: [
      { id: 'rt-01', title: 'React Router v7 Fundamentals', slug: 'react-router-basics', moduleId: 'mod-11', moduleSlug: 'routing', category: 'Routing', difficulty: 'intermediate', duration: 30, prerequisites: ['rf-04', 'rf-05'], objectives: ['Set up React Router', 'Create basic routes', 'Use Link and NavLink', 'Navigate programmatically'], order: 1 },
      { id: 'rt-02', title: 'URL Parameters & Search Params', slug: 'url-params', moduleId: 'mod-11', moduleSlug: 'routing', category: 'Routing', difficulty: 'intermediate', duration: 25, prerequisites: ['rt-01'], objectives: ['Use useParams', 'Use useSearchParams', 'Build dynamic routes', 'Handle query parameters'], order: 2 },
      { id: 'rt-03', title: 'Nested Routes & Layout Routes', slug: 'nested-routes', moduleId: 'mod-11', moduleSlug: 'routing', category: 'Routing', difficulty: 'intermediate', duration: 30, prerequisites: ['rt-01'], objectives: ['Build nested route structure', 'Use Outlet', 'Build shared layout routes', 'Understand route hierarchy'], order: 3 },
      { id: 'rt-04', title: 'Protected Routes & Auth Guards', slug: 'protected-routes', moduleId: 'mod-11', moduleSlug: 'routing', category: 'Routing', difficulty: 'advanced', duration: 30, prerequisites: ['rt-01', 'api-07'], objectives: ['Build protected routes', 'Redirect unauthenticated users', 'Role-based access control', 'Persist auth state'], order: 4 },
    ],
  },
  {
    id: 'mod-12',
    title: 'Forms & Validation',
    slug: 'forms',
    description: 'React Hook Form, Zod validation, dynamic forms, file uploads, and multi-step forms.',
    icon: 'ClipboardList',
    color: 'from-violet-500 to-purple-700',
    order: 12,
    lessons: [
      { id: 'form-01', title: 'React Hook Form Fundamentals', slug: 'react-hook-form', moduleId: 'mod-12', moduleSlug: 'forms', category: 'Forms', difficulty: 'intermediate', duration: 40, prerequisites: ['rf-10', 'hook-01', 'hook-04'], objectives: ['Set up React Hook Form', 'Register inputs', 'Handle submission', 'Compare with controlled forms'], order: 1 },
      { id: 'form-02', title: 'Zod Schema Validation', slug: 'zod-validation', moduleId: 'mod-12', moduleSlug: 'forms', category: 'Forms', difficulty: 'intermediate', duration: 35, prerequisites: ['form-01', 'ts-01'], objectives: ['Write Zod schemas', 'Integrate with React Hook Form', 'Display validation errors', 'Validate complex objects'], order: 2 },
      { id: 'form-03', title: 'Dynamic Forms & Multi-Step Forms', slug: 'dynamic-forms', moduleId: 'mod-12', moduleSlug: 'forms', category: 'Forms', difficulty: 'advanced', duration: 40, prerequisites: ['form-01', 'form-02'], objectives: ['Build dynamic field arrays', 'Build multi-step forms', 'Persist form state across steps', 'Validate at each step'], order: 3 },
    ],
  },
  {
    id: 'mod-13',
    title: 'Testing & Debugging',
    slug: 'testing',
    description: 'React Testing Library, Vitest, component testing, custom hook testing, and debugging techniques.',
    icon: 'TestTube',
    color: 'from-emerald-500 to-green-700',
    order: 13,
    lessons: [
      { id: 'test-01', title: 'React Testing Library Fundamentals', slug: 'testing-library-basics', moduleId: 'mod-13', moduleSlug: 'testing', category: 'Testing', difficulty: 'intermediate', duration: 40, prerequisites: ['rf-04', 'rf-05', 'rf-06'], objectives: ['Understand testing philosophy', 'Write component tests', 'Query DOM elements', 'Fire events in tests'], order: 1 },
      { id: 'test-02', title: 'Testing Hooks & User Interactions', slug: 'testing-hooks', moduleId: 'mod-13', moduleSlug: 'testing', category: 'Testing', difficulty: 'advanced', duration: 40, prerequisites: ['test-01', 'hook-13'], objectives: ['Test custom hooks', 'Test async behavior', 'Mock API calls', 'Test complex user flows'], order: 2 },
      { id: 'test-03', title: 'Debugging React Applications', slug: 'debugging', moduleId: 'mod-13', moduleSlug: 'testing', category: 'Debugging', difficulty: 'intermediate', duration: 30, prerequisites: ['rf-04', 'hook-01', 'hook-02'], objectives: ['Use React DevTools', 'Debug re-renders', 'Debug state issues', 'Debug effect problems'], order: 3 },
    ],
  },
  {
    id: 'mod-14',
    title: 'Project Architecture',
    slug: 'architecture',
    description: 'Scalable React project structure, feature-based architecture, clean code, and production practices.',
    icon: 'Building2',
    color: 'from-slate-500 to-slate-700',
    order: 14,
    lessons: [
      { id: 'arch-01', title: 'Scalable Folder Structure', slug: 'folder-structure', moduleId: 'mod-14', moduleSlug: 'architecture', category: 'Architecture', difficulty: 'intermediate', duration: 25, prerequisites: ['rf-04'], objectives: ['Organize project by feature', 'Understand file naming conventions', 'Use barrel exports', 'Avoid architectural anti-patterns'], order: 1 },
      { id: 'arch-02', title: 'Component Architecture & Reusability', slug: 'component-architecture', moduleId: 'mod-14', moduleSlug: 'architecture', category: 'Architecture', difficulty: 'advanced', duration: 35, prerequisites: ['rf-04', 'rf-05', 'ar-01', 'ar-02', 'ar-03'], objectives: ['Design reusable components', 'Build component APIs', 'Separate UI from logic', 'Build component libraries'], order: 2 },
      { id: 'arch-03', title: 'Service Layer & API Organization', slug: 'service-layer', moduleId: 'mod-14', moduleSlug: 'architecture', category: 'Architecture', difficulty: 'advanced', duration: 30, prerequisites: ['api-02', 'ts-01'], objectives: ['Organize API calls', 'Build service abstractions', 'Handle API versioning', 'Mock services for testing'], order: 3 },
    ],
  },
  {
    id: 'mod-15',
    title: 'Next.js & React Frameworks',
    slug: 'nextjs',
    description: 'Next.js App Router, Server Components, SSR/SSG/ISR, Server Actions, and production deployment.',
    icon: 'Triangle',
    color: 'from-gray-700 to-gray-900',
    order: 15,
    lessons: [
      { id: 'next-01', title: 'Why Next.js? React vs Next.js', slug: 'why-nextjs', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'intermediate', duration: 25, prerequisites: ['rf-01', 'ri-01'], objectives: ['Understand Next.js benefits', 'SSR vs CSR comparison', 'When to choose Next.js', 'App Router vs Pages Router'], order: 1 },
      { id: 'next-02', title: 'Next.js App Router Architecture', slug: 'app-router', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'intermediate', duration: 35, prerequisites: ['next-01', 'rt-01'], objectives: ['Understand file-based routing', 'Create pages and layouts', 'Use loading and error UI', 'Understand route groups'], order: 2 },
      { id: 'next-03', title: 'Server vs Client Components', slug: 'server-client-components', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'advanced', duration: 40, prerequisites: ['next-02', 'ar-08'], objectives: ['Understand Server Component model', 'Know when to add "use client"', 'Compose Server and Client Components', 'Understand data flow boundaries'], order: 3 },
      { id: 'next-04', title: 'Data Fetching: SSR, SSG, ISR', slug: 'data-fetching-strategies', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'advanced', duration: 40, prerequisites: ['next-03'], objectives: ['Implement SSR with fetch', 'Generate static pages', 'Use ISR for dynamic content', 'Choose correct strategy'], order: 4 },
      { id: 'next-05', title: 'Server Actions & Form Handling', slug: 'server-actions', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'advanced', duration: 35, prerequisites: ['next-03', 'form-01'], objectives: ['Create Server Actions', 'Handle form submissions server-side', 'Use useActionState', 'Revalidate data after mutations'], order: 5 },
      { id: 'next-06', title: 'Caching, Revalidation & Performance', slug: 'nextjs-caching', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'advanced', duration: 35, prerequisites: ['next-04'], objectives: ['Understand Next.js caching layers', 'Revalidate on demand', 'Optimize with Next.js Image', 'Monitor performance'], order: 6 },
      { id: 'next-07', title: 'Middleware, Authentication & Security', slug: 'nextjs-middleware', moduleId: 'mod-15', moduleSlug: 'nextjs', category: 'Next.js', difficulty: 'advanced', duration: 35, prerequisites: ['next-02', 'api-07'], objectives: ['Write Middleware', 'Implement authentication', 'Protect routes server-side', 'Handle CORS and security headers'], order: 7 },
    ],
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return ALL_MODULES.find((m) => m.slug === slug);
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string) {
  const module = getModuleBySlug(moduleSlug);
  return module?.lessons.find((l) => l.slug === lessonSlug);
}

export function getAllLessons() {
  return ALL_MODULES.flatMap((m) => m.lessons);
}

export function getLessonById(id: string) {
  return getAllLessons().find((l) => l.id === id);
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string) {
  const module = getModuleBySlug(moduleSlug);
  if (!module) return { prev: null, next: null };
  const idx = module.lessons.findIndex((l) => l.slug === lessonSlug);

  let prev = idx > 0 ? module.lessons[idx - 1] : null;
  let next = idx < module.lessons.length - 1 ? module.lessons[idx + 1] : null;

  if (!prev && module.order > 1) {
    const prevModule = ALL_MODULES.find((m) => m.order === module.order - 1);
    if (prevModule) prev = prevModule.lessons[prevModule.lessons.length - 1];
  }

  if (!next) {
    const nextModule = ALL_MODULES.find((m) => m.order === module.order + 1);
    if (nextModule) next = nextModule.lessons[0];
  }

  return { prev, next };
}
