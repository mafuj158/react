import type { LessonContent } from '../../types';

export const MOD_03_LESSONS: Record<string, Partial<LessonContent>> = {
  'react-setup': {
    overview: 'Modern React tooling: Setting up React with Vite, Hot Module Replacement (HMR), ES modules in development, Rolldown / Rollup bundlers, and production build optimization.',
    whyItExists: `For years, Create React App (CRA) was the standard for setting up React projects. However, CRA relied on Webpack, which required bundling the entire application upfront before starting the local dev server. As projects grew, dev server startup took 30 to 60 seconds, and hot reloading lagged significantly.
Vite revolutionized the React ecosystem:
1. It leverages native browser ES Modules (ESM) during development, starting the dev server instantaneously (< 300ms) regardless of project size.
2. It compiles TypeScript and JSX via esbuild (written in Go), which is 10-100x faster than traditional JS-based compilers.
3. Provides lightning-fast Hot Module Replacement (HMR) that updates modified components without wiping out local React state.`,
    howItWorks: `1. HOW VITE WORKS IN DEVELOPMENT:
- Traditional Bundlers: Crawl all imports -> Bundle everything into a huge bundle -> Start dev server.
- Vite: Starts the HTTP server immediately! When the browser requests /src/main.tsx, Vite transforms only that file and its imported modules on-demand over HTTP.

2. ESBUILD VS ROLLUP/ROLLDOWN:
- In Dev: esbuild pre-bundles dependencies (node_modules) and transpiles TS/JSX in milliseconds.
- In Production: Rolldown / Rollup generates highly optimized, tree-shaken static production chunks.

3. MODERN REACT 19 PROJECT STRUCTURE:
- index.html: The entry point in root directory (not in public/). Contains <div id="root"> and <script type="module" src="/src/main.tsx">.
- vite.config.ts: Configures plugins (@vitejs/plugin-react, Tailwind v4, path aliases).
- src/main.tsx: Calls createRoot(document.getElementById('root')!).render(<App />).`,
    codeExamples: [
      {
        id: 'vite-ex-1',
        title: 'Modern Vite Configuration with Path Aliases and React 19',
        description: 'Configuring vite.config.ts with clean @/ path aliases and optimized chunk splitting.',
        language: 'typescript',
        level: 'basic',
        code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
});`,
        explanation: 'Path aliases allow replacing brittle relative imports (../../../components) with clean absolute paths (@/components).'
      }
    ],
    realWorldUseCases: [
      'Bootstrapping high-performance Single Page Applications (SPAs) with sub-second feedback loops.',
      'Configuring proxy middlewares in vite.config.ts to avoid CORS issues during local API development.',
      'Building production artifacts with gzip and brotli compression.'
    ],
    commonMistakes: [
      {
        title: 'Putting index.html in the public/ folder',
        description: 'In Create React App, index.html lived in public/. In Vite, index.html is the root entry point and MUST reside in the project root directory.',
        wrongCode: `public/index.html <!-- Wrong for Vite! -->`,
        correctCode: `./index.html <!-- Correct for Vite! -->`,
        explanation: 'Vite treats index.html as source code and part of the module graph.'
      }
    ],
    bestPractices: [
      'Use Vite instead of deprecated Create React App (CRA) for all new client-side React projects.',
      'Configure TypeScript strict mode ("strict": true) in tsconfig.json.',
      'Set up path aliases in both vite.config.ts and tsconfig.app.json.'
    ],
    performanceNotes: [
      'Vite pre-bundles npm packages into single HTTP cacheable files, converting CommonJS to ESM and caching them with Cache-Control: max-age=31536000,immutable.',
      'Source-level transforms take under 50ms using esbuild native binaries.'
    ],
    interviewQuestions: [
      {
        id: 'iq-vite-1',
        question: 'Why is Vite drastically faster than Webpack-based tools like Create React App in development?',
        difficulty: 'intermediate',
        answer: 'Webpack bundles the entire application dependency graph into a bundle before the dev server can start. As an application grows to hundreds of modules, startup and HMR become painfully slow. Vite decouples dev server startup from bundling by serving source code over native browser ES Modules (ESM). It only transpiles the specific files the browser requests on-demand, and uses esbuild (written in Go) for pre-bundling dependencies 10-100x faster than JS bundlers.',
        followUpQuestions: ['How does Vite handle Hot Module Replacement (HMR)?']
      }
    ],
    exercises: [
      {
        id: 'ex-vite-1',
        title: 'Configure a Vite React Project from Scratch',
        difficulty: 'basic',
        description: 'Verify package.json scripts and tsconfig path aliases for a production Vite React build.',
        hints: ['Add @/* path in tsconfig.app.json compilerOptions.paths'],
        solution: `// tsconfig.app.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-vite-1',
        question: 'Which tool does Vite use in development to transpile TypeScript and JSX at ultra-fast speeds?',
        type: 'multiple-choice',
        options: [
          'Babel',
          'Webpack',
          'esbuild',
          'Gulp'
        ],
        correctAnswer: 2,
        explanation: 'Vite uses esbuild, an ultra-fast bundler written in Go, to transpile TypeScript and JSX during development.'
      }
    ]
  },

  'jsx': {
    overview: 'Deep dive into JSX (JavaScript XML): Why JSX exists, how Babel and the modern React JSX runtime compile JSX into React.createElement / jsx(), JSX syntax rules, expressions, and security (XSS prevention).',
    whyItExists: `In traditional web development, HTML markup, JavaScript logic, and CSS styling were artificially separated into different files, even though they were tightly coupled.
React introduced JSX to embrace the reality that rendering logic is inherently coupled with UI markup:
1. JSX allows writing HTML-like syntax directly inside JavaScript with full programmatic power (loops, conditionals, functions).
2. It compiles directly to plain JavaScript function calls and Virtual DOM objects.
3. Automatically escapes values to prevent Cross-Site Scripting (XSS) attacks.`,
    howItWorks: `1. HOW JSX COMPILES UNDER THE HOOD:
- The JSX:
  <button className="primary" onClick={handleClick}>Submit</button>
- In Legacy React (Babel transform):
  React.createElement('button', { className: 'primary', onClick: handleClick }, 'Submit')
- In Modern React 17+ (Automatic JSX Runtime):
  import { jsx as _jsx } from 'react/jsx-runtime';
  _jsx('button', { className: 'primary', onClick: handleClick, children: 'Submit' });
Notice: You no longer need to import React from 'react' just to use JSX!

2. CORE JSX RULES:
- Return a Single Root Element: Components must return a single root tag (or a Fragment <>...</>) because JavaScript functions can only return one value.
- Close All Tags: Self-closing tags must end with a slash (<img />, <input />, <br />).
- camelCase Attributes: Because JSX compiles to JavaScript objects, attributes use camelCase (className instead of class, htmlFor instead of for, tabIndex instead of tabindex).

3. EMBEDDING EXPRESSIONS:
- Any valid JavaScript expression can be embedded inside curly braces {}:
  <h1>Hello {user.name}</h1>
  <p>Status: {isOnline ? 'Active' : 'Offline'}</p>
- Statements (like if-else or for-loops) cannot be placed inside {}; use ternaries or .map() instead.`,
    codeExamples: [
      {
        id: 'jsx-ex-1',
        title: 'JSX Compilation Under the Hood',
        description: 'Comparing JSX syntax with its compiled JavaScript object representation.',
        language: 'tsx',
        level: 'basic',
        code: `// What you write in JSX:
export function GreetingCard({ name, unreadCount }: { name: string; unreadCount: number }) {
  return (
    <div className="card">
      <h2>Welcome, {name}!</h2>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
}

// What the compiler generates (Plain JavaScript Object):
// {
//   type: 'div',
//   props: {
//     className: 'card',
//     children: [
//       { type: 'h2', props: { children: ['Welcome, ', name, '!'] } },
//       unreadCount > 0 ? { type: 'span', props: { className: 'badge', children: unreadCount } } : false
//     ]
//   }
// }`,
        explanation: 'JSX is syntactic sugar. Every JSX tag is converted into a function call that produces a lightweight JavaScript Virtual DOM object.'
      },
      {
        id: 'jsx-ex-2',
        title: 'Built-in XSS Protection in JSX',
        description: 'Demonstrating how React escapes malicious strings by default, and why dangerouslySetInnerHTML should be avoided.',
        language: 'tsx',
        level: 'intermediate',
        code: `export function SafeDisplay() {
  // Malicious user input from an untrusted source:
  const untrustedInput = '<img src=x onerror="alert(\\'Hacked!\\')" />';

  return (
    <div>
      {/* 100% SAFE: React automatically escapes HTML entities!
          Renders literally as text: &lt;img src=x onerror=...&gt; */}
      <p>{untrustedInput}</p>

      {/* DANGEROUS: Bypasses React XSS sanitation! */}
      {/* <div dangerouslySetInnerHTML={{ __html: untrustedInput }} /> */}
    </div>
  );
}`,
        explanation: 'React converts all strings embedded in curly braces into text nodes, rendering HTML tags as safe literal characters.'
      }
    ],
    realWorldUseCases: [
      'Building declarative UI templates that react immediately to state updates.',
      'Sanitizing user-generated comments and forum posts against script injection.',
      'Conditionally rendering icons, badges, and layout variants using JS expressions.'
    ],
    commonMistakes: [
      {
        title: 'Rendering 0 (Zero) with Logical AND (&&)',
        description: 'In JavaScript, 0 is falsy, but when used in JSX: {count && <List />}, React renders the number 0 onto the screen!',
        wrongCode: `// If count === 0, this literally displays "0" on the screen!
<div>{items.length && <ItemList items={items} />}</div>`,
        correctCode: `// Correct: Coerce to boolean or use ternary
<div>{items.length > 0 && <ItemList items={items} />}</div>
// Or:
<div>{Boolean(items.length) && <ItemList items={items} />}</div>`,
        explanation: 'In JavaScript, 0 && <Component /> evaluates to 0, which React renders as a valid text node. Always use count > 0.'
      }
    ],
    bestPractices: [
      'Use React Fragments (<>...</>) instead of extra <div> wrappers to keep DOM trees clean.',
      'Always use className instead of class, and htmlFor instead of for.',
      'Never render raw HTML with dangerouslySetInnerHTML unless sanitized via DOMPurify.'
    ],
    performanceNotes: [
      'JSX transformation happens at build time; there is zero runtime penalty for using JSX syntax.',
      'React Fragments do not create DOM nodes, keeping the browser DOM light and performant.'
    ],
    interviewQuestions: [
      {
        id: 'iq-jsx-1',
        question: 'Can browsers read JSX directly? How does JSX become real DOM elements?',
        difficulty: 'basic',
        answer: 'No, browsers only understand standard JavaScript. JSX must be transpiled by a compiler (such as Babel, esbuild, or SWC) into JavaScript function calls (_jsx or React.createElement). When these functions execute at runtime, they return plain JavaScript objects representing Virtual DOM nodes. React’s reconciler then diffs these Virtual DOM objects and translates them into native browser DOM mutations (document.createElement, appendChild).',
        followUpQuestions: [
          'Why must a component return a single root JSX element?',
          'Why does React use className instead of class in JSX?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-jsx-1',
        title: 'Fix Falsy Zero Bug in Conditional Rendering',
        difficulty: 'basic',
        description: 'Refactor an alert component that incorrectly displays "0" when the messages array is empty.',
        hints: ['Replace array.length && ... with array.length > 0 && ...'],
        solution: `export function NotificationBanner({ messages }: { messages: string[] }) {
  return (
    <div>
      {/* Fixed: Avoids rendering '0' */}
      {messages.length > 0 && (
        <div className="alert">You have {messages.length} new messages!</div>
      )}
    </div>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-jsx-1',
        question: 'What is rendered on screen when evaluating: {0 && <span>Hello</span>} in JSX?',
        type: 'multiple-choice',
        options: [
          'Nothing (empty)',
          '<span>Hello</span>',
          'The text "0"',
          'An Uncaught TypeError'
        ],
        correctAnswer: 2,
        explanation: 'In JavaScript, 0 && <Component /> evaluates to 0. Unlike false, null, and undefined, numbers (including 0) are rendered into the DOM by React.'
      }
    ]
  },

  'components': {
    overview: 'Complete guide to React Components: Functional Components, Component Composition vs Inheritance, Container/Presentational patterns, Children prop, and Component Reusability.',
    whyItExists: `Monolithic web applications cram thousands of lines of HTML and logic into single massive templates, making code impossible to test, reuse, or maintain.
React components introduce encapsulation:
1. Components let you split the UI into independent, reusable, isolated pieces.
2. Components think in terms of composition rather than class inheritance (Composition over Inheritance).
3. Changes to one component do not affect the rest of the application.`,
    howItWorks: `1. WHAT IS A REACT COMPONENT:
A modern React component is a pure JavaScript function that:
- Accepts a single 'props' object argument.
- Returns React elements (JSX).
- Must start with a Capital Letter (e.g. UserCard, not userCard). React uses capitalization to distinguish native HTML tags (<button>) from custom components (<Button>).

2. COMPONENT COMPOSITION PATTERNS:
- Props Children (<Card>{children}</Card>): Passes nested JSX into a component, decoupling parent layout from child content.
- Slots / Multiple Children: Passing JSX elements as named props (e.g. <Layout sidebar={<Nav />} content={<Feed />} />).
- Specialization: Building generic components (<Button />) and specializing them (<DeleteButton />).`,
    codeExamples: [
      {
        id: 'comp-ex-1',
        title: 'Component Composition with Children & Slots Pattern',
        description: 'Building a flexible Card component that accepts headers, footers, and arbitrary children.',
        language: 'tsx',
        level: 'basic',
        code: `import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  actionSlot?: ReactNode; // Named slot for buttons or badges
  children: ReactNode;    // Default children slot
  footerSlot?: ReactNode;
}

export function ReusableCard({ title, actionSlot, children, footerSlot }: CardProps) {
  return (
    <div className="p-5 border rounded-[var(--radius)] bg-surface space-y-4">
      {/* Header Slot */}
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        {actionSlot && <div>{actionSlot}</div>}
      </div>

      {/* Main Body */}
      <div className="text-secondary">{children}</div>

      {/* Footer Slot */}
      {footerSlot && <div className="border-t pt-2">{footerSlot}</div>}
    </div>
  );
}`,
        explanation: 'Using children and named ReactNode slots avoids rigid, prop-heavy components and allows consumers to inject any markup.'
      }
    ],
    realWorldUseCases: [
      'Building cohesive design system components (Modals, Dropdowns, Drawers, Cards).',
      'Creating layout shells (DashboardLayout, AuthLayout, MarketingLayout).',
      'Isolating complex stateful business logic into dedicated container components.'
    ],
    commonMistakes: [
      {
        title: 'Defining a component inside another component function',
        description: 'Declaring function ChildComponent() inside the body of ParentComponent() re-creates the component definition on every render, causing React to destroy and remount the child DOM on every render!',
        wrongCode: `export function Parent() {
  // DISASTER: Re-declared every single render! All state and focus will be lost!
  function InnerChild() {
    return <input />;
  }
  return <div><InnerChild /></div>;
}`,
        correctCode: `// Correct: Declare components at the top module level!
function InnerChild() {
  return <input />;
}

export function Parent() {
  return <div><InnerChild /></div>;
}`,
        explanation: 'Never nest component function declarations inside other components. React diffing treats re-declared functions as new types, causing full unmounts.'
      }
    ],
    bestPractices: [
      'Favor Component Composition over deep class inheritance.',
      'Keep components focused on a single responsibility (Single Responsibility Principle).',
      'Declare components at the root module level, never inside another component render function.'
    ],
    performanceNotes: [
      'Functional components are lightweight function calls with minimal memory overhead compared to legacy ES6 class components.',
      'Passing unchanged JSX elements as children skips child re-renders because element references remain stable.'
    ],
    interviewQuestions: [
      {
        id: 'iq-comp-1',
        question: 'Why does React require custom component names to start with a Capital Letter?',
        difficulty: 'basic',
        answer: 'JSX compilers use capitalization to differentiate between native HTML elements and custom React components. If an element starts with a lowercase letter (e.g. <div />), the compiler passes it as a string to the JSX runtime (_jsx("div")). If it starts with a capital letter (e.g. <UserCard />), the compiler passes the identifier itself as a function reference (_jsx(UserCard)).',
        followUpQuestions: ['What is the difference between props.children and regular props?']
      }
    ],
    exercises: [
      {
        id: 'ex-comp-1',
        title: 'Refactor Rigid Modal into Composable Slots',
        difficulty: 'intermediate',
        description: 'Convert a modal that takes 10 rigid string props into an extensible composable Modal component with header, body, and footer slots.',
        hints: ['Use ReactNode slots for flexible layout composition'],
        solution: `export function ComposableModal({
  isOpen,
  onClose,
  header,
  children,
  footer
}: {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <header>{header}</header>
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-comp-1',
        question: 'What happens if you define a component function inside the render body of another component?',
        type: 'multiple-choice',
        options: [
          'It improves rendering performance through closure caching',
          'React remounts the child component and destroys all of its state on every parent render',
          'React throws a compile-time SyntaxError',
          'The child component becomes globally available'
        ],
        correctAnswer: 1,
        explanation: 'Because a new function reference is generated on every parent render, React diffing treats it as an element type change, destroying and remounting the entire subtree.'
      }
    ]
  },

  'props': {
    overview: 'Mastery of React Props: Immutability of props, One-Way Data Flow (unidirectional data flow), default props, typing props with TypeScript, prop drilling, and callback communication.',
    whyItExists: `Two-way data binding (used in legacy frameworks like AngularJS 1.x) allowed child components to silently mutate parent data, leading to unpredictable cascading updates and impossible-to-debug loops.
React introduced One-Way Data Flow (Unidirectional Data Flow):
1. Data flows strictly downwards from Parent to Child via Props.
2. Children communicate upwards by invoking Callback Functions passed down as props.
3. Props are strictly Read-Only (immutable). A component must never mutate its own props.`,
    howItWorks: `1. PROPS ARE READ-ONLY (Pure Function Contract):
React components must act like pure functions with respect to their props:
props.user = newUser; // ILLEGAL! Throws error in strict mode.

2. UNIDIRECTIONAL DATA FLOW:
- Parent holds state (e.g. const [text, setText] = useState('')).
- Parent passes data down: <Child value={text} onChange={setText} />.
- Child receives value as read-only prop and calls onChange(newVal) to request an update.
- Parent updates state, triggering a re-render where new props flow down.

3. PROP DRILLING & MITIGATION:
Passing props through 5-10 intermediate components that don't need the data themselves is called "Prop Drilling".
Mitigations:
- Component Composition (lifting children up so parents pass elements directly).
- React Context API.
- Global State Stores (Zustand, Redux Toolkit).`,
    codeExamples: [
      {
        id: 'props-ex-1',
        title: 'Child-to-Parent Communication via Callback Props',
        description: 'Demonstrating one-way data flow: child triggers actions through parent callback functions.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

// Child component receives data and a callback
function RatingPicker({ value, onSelect }: { value: number; onSelect: (rating: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onSelect(star)} // Upward communication!
          className={\`p-2 \${value >= star ? 'text-yellow-500' : 'text-gray-400'}\`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// Parent manages state and flows it down
export function FeedbackForm() {
  const [rating, setRating] = useState(3);

  return (
    <div className="p-4 border">
      <h4>Customer Feedback</h4>
      <p>Current Score: {rating}/5</p>
      {/* Downward data flow (value) + Upward communication (onSelect) */}
      <RatingPicker value={rating} onSelect={setRating} />
    </div>
  );
}`,
        explanation: 'The child component is pure and stateless: it displays what it is given and notifies the parent of user intent via callbacks.'
      }
    ],
    realWorldUseCases: [
      'Building reusable form inputs and controls with value / onChange signatures.',
      'Passing configuration flags (size="lg", variant="outline") to design system tokens.',
      'Coordinating multi-step wizard step navigation.'
    ],
    commonMistakes: [
      {
        title: 'Attempting to mutate props inside a child component',
        description: 'Directly modifying props (props.items.push(newItem)) mutates the parent state by reference without triggering React change detection!',
        wrongCode: `function BadChild(props) {
  props.title = 'New Title'; // ERROR: Props are read-only!
}`,
        correctCode: `function GoodChild({ title, onTitleChange }) {
  // Call callback so parent updates state cleanly
  return <button onClick={() => onTitleChange('New Title')}>Change</button>;
}`,
        explanation: 'Always notify the owner of the state via callback rather than mutating props.'
      }
    ],
    bestPractices: [
      'Type all component props using TypeScript interfaces.',
      'Keep props minimal: avoid passing entire large objects if a component only needs 2 fields.',
      'Use Component Composition (<Parent>{children}</Parent>) to eliminate intermediate prop drilling.'
    ],
    performanceNotes: [
      'Passing new inline object or function references in props breaks React.memo shallow equality.',
      'Stabilize callback props with useCallback when passed to heavily memoized children.'
    ],
    interviewQuestions: [
      {
        id: 'iq-props-1',
        question: 'What is One-Way Data Flow in React and why is it preferred over Two-Way Data Binding?',
        difficulty: 'intermediate',
        answer: 'One-Way Data Flow means data has a single source of truth and moves strictly in one direction: from parent components down to child components via props. Children cannot alter parent data directly; they must invoke callback functions to request state updates from the parent. This makes state mutations predictable, eliminates cascading update loops, simplifies debugging (you can trace bugs straight up the component tree), and makes components pure and testable.',
        followUpQuestions: ['What is prop drilling and what are 3 ways to solve it?']
      }
    ],
    exercises: [
      {
        id: 'ex-props-1',
        title: 'Eliminate Prop Drilling via Component Composition',
        difficulty: 'intermediate',
        description: 'Refactor a 3-tier component tree where props are passed through Page -> Sidebar -> UserBadge using {children}.',
        hints: ['Instantiate <UserBadge /> directly in Page and pass it down as children to <Sidebar />'],
        solution: `// In Page:
export function Page() {
  const user = { name: 'Dan' };
  return (
    <Layout>
      <Sidebar>
        <UserBadge user={user} />
      </Sidebar>
      <MainContent />
    </Layout>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-props-1',
        question: 'Are React component props mutable or immutable?',
        type: 'multiple-choice',
        options: [
          'Mutable: child components can alter their own props freely',
          'Strictly Immutable: components must treat props as read-only values',
          'Mutable only inside useEffect',
          'Mutable if declared with let'
        ],
        correctAnswer: 1,
        explanation: 'React components must be pure functions with respect to their props: props are strictly read-only and immutable.'
      }
    ]
  }
};
