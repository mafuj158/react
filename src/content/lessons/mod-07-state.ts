import type { LessonContent } from '../../types';

export const MOD_07_LESSONS: Record<string, Partial<LessonContent>> = {
  'state-fundamentals': {
    overview: 'Architectural guide to state classification: Local Component State vs Shared State vs Global Application State vs Server Cache State. The State Colocation principle and choosing the right state tool.',
    whyItExists: `A primary cause of slow and unmaintainable React applications is placing all state into a single global store (such as Redux or Context).
When state is placed too high:
1. Components re-render unnecessarily because global stores notify too broadly.
2. Code becomes tangled with boilerplate actions and reducers for simple UI toggles.
3. Clean architecture dictates: Colocate state as close as possible to the components that need it.`,
    howItWorks: `THE 4 TIERS OF STATE IN MODERN FRONTEND:

1. Local Component State (useState / useReducer):
- Data only one component cares about (e.g. isModalOpen, inputValue).
- Kept strictly inside the leaf component.

2. Shared / Lifted State:
- Data 2-3 sibling components share.
- Lifted to their immediate common parent, passed down via props.

3. Global Client State (Zustand / Redux Toolkit / Context):
- Data many disconnected components across the app read and write (e.g. authenticated user, dark/light theme, shopping cart items, notification badges).

4. Server Cache State (TanStack Query / RTK Query / SWR):
- Data that originates on the server (e.g. database records, lists of products).
- Must handle caching, background refetching, pagination, and invalidation.
- Rule: NEVER store server response data in Redux or useState manually if you can use TanStack Query!`,
    codeExamples: [
      {
        id: 'st-ex-1',
        title: 'State Colocation Principle in Action',
        description: 'Demonstrating how moving an input state into an isolated leaf component saves the entire parent page from re-rendering.',
        language: 'tsx',
        level: 'basic',
        code: `// SLOW: Search state at page level causes heavy table and chart to re-render on EVERY keystroke!
export function BadDashboard() {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyAnalyticsChart /> {/* Re-renders 50 times when typing! */}
      <HeavyDataTable />       {/* Re-renders 50 times when typing! */}
    </div>
  );
}

// FAST: Colocated SearchInput isolates state to itself!
function IsolatedSearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [text, setText] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(text); }}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export function OptimizedDashboard() {
  const [activeQuery, setActiveQuery] = useState('');
  return (
    <div>
      <IsolatedSearchBar onSearch={setActiveQuery} />
      <HeavyAnalyticsChart query={activeQuery} />
      <HeavyDataTable query={activeQuery} />
    </div>
  );
}`,
        explanation: 'Colocating high-frequency typing state into the isolated SearchBar ensures parent and sibling components only re-render when the user actually submits a search.'
      }
    ],
    realWorldUseCases: [
      'Refactoring monolithic Redux applications to colocate UI toggles locally.',
      'Separating TanStack Query server data from Zustand client state.',
      'Choosing between Context, Redux Toolkit, and Zustand for new project architectures.'
    ],
    commonMistakes: [
      {
        title: 'Putting server API data into a client Redux or Context store',
        description: 'Syncing backend API data into Redux requires hundreds of lines of loading/error flags and manual cache timers. Use TanStack Query or RTK Query instead.',
        explanation: 'Server state has distinct caching, background revalidation, and invalidation requirements that generic client stores handle poorly.'
      }
    ],
    bestPractices: [
      'Colocate state: Keep state as local as possible, lift only when required.',
      'Use TanStack Query for server data and Zustand for global client state.',
      'Derive values during render (e.g. const total = items.reduce(...)) instead of storing them in separate state.'
    ],
    performanceNotes: [
      'Local state updates only evaluate the single component subtree, keeping rendering lightning-fast.',
      'Deriving state on the fly eliminates synchronization bugs and avoids redundant re-renders.'
    ],
    interviewQuestions: [
      {
        id: 'iq-st-1',
        question: 'What is the principle of State Colocation in React, and what problem does it solve?',
        difficulty: 'intermediate',
        answer: 'State Colocation is the practice of keeping state as close as possible to the component that actually uses it, rather than placing everything into a top-level global store. It solves two major issues: 1) Performance: prevents global re-renders across the entire component tree when only a small leaf component needs the update (e.g. typing in an input), and 2) Maintainability: makes components self-contained, easier to delete, refactor, and test without breaking distant parts of the app.',
        followUpQuestions: ['What is the difference between client state and server state?']
      }
    ],
    exercises: [
      {
        id: 'ex-st-1',
        title: 'Colocate Expanded Row State in a Data Table',
        difficulty: 'intermediate',
        description: 'Refactor a table where row expand/collapse state is managed by the parent table into an isolated TableRow component.',
        hints: ['Move [isExpanded, setIsExpanded] = useState(false) into <TableRow />'],
        solution: `function TableRow({ item }: { item: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <tr>
      <td>{item.name}</td>
      <td><button onClick={() => setIsExpanded(!isExpanded)}>Toggle</button></td>
      {isExpanded && <div>{item.details}</div>}
    </tr>
  );
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-st-1',
        question: 'Which tool is best suited for managing server data with caching, background refetching, and pagination in modern React?',
        type: 'multiple-choice',
        options: [
          'Native useState and useEffect',
          'TanStack Query (React Query) or RTK Query',
          'Redux Toolkit with createSlice only',
          'Global window variables'
        ],
        correctAnswer: 1,
        explanation: 'TanStack Query and RTK Query are dedicated server-state management libraries providing built-in caching, revalidation, and deduplication.'
      }
    ]
  },

  'redux-toolkit': {
    overview: 'Complete guide to modern Redux Toolkit (RTK): configureStore, createSlice, Immer under the hood for immutable updates, typed useSelector and useDispatch hooks, and Redux DevTools time-travel debugging.',
    whyItExists: `Legacy Redux (pre-2019) required massive boilerplate: separate action creators, action types, switch statements, and manual immutable spread operations.
Redux Toolkit (RTK) is the official, opinionated standard that modernizes Redux:
1. Eliminates boilerplate: createSlice automatically generates action creators and action types from your reducer functions.
2. Built-in Immer: Lets you write "mutative" syntax (state.count++) while safely producing immutable updates under the hood.
3. Built-in TypeScript support and automated Redux DevTools integration.`,
    howItWorks: `1. THE THREE CORE CONCEPTS OF RTK:
- configureStore: Sets up the Redux store with thunk middleware and Redux DevTools automatically configured.
- createSlice: Combines initial state, reducers, and generated actions into a single cohesive slice.
- Typed Hooks: useAppSelector and useAppDispatch for type-safe state reading and action dispatching.

2. HOW IMMER WORKS IN RTK:
Inside createSlice reducers, RTK wraps your state in an Immer 'draft' proxy:
increment: (state) => { state.count += 1; }
You can write direct mutation syntax because Immer tracks all property modifications and creates a brand-new immutable copy automatically!`,
    codeExamples: [
      {
        id: 'rtk-ex-1',
        title: 'Complete Redux Toolkit Slice, Store, and Typed Hooks',
        description: 'Production setup of an e-commerce shopping cart slice with typed actions and selectors.',
        language: 'typescript',
        level: 'intermediate',
        code: `import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface CartItem { id: string; title: string; price: number; quantity: number; }
interface CartState { items: CartItem[]; isOpen: boolean; }

const initialState: CartState = { items: [], isOpen: false };

// 1. Create Slice with Immer mutation syntax
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: string; title: string; price: number }>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1; // Immer makes this 100% immutable!
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { addItem, removeItem, toggleCart } = cartSlice.actions;

// 2. Configure Store
export const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 3. Typed Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`,
        explanation: 'createSlice removes all legacy action type string constants and allows writing clean, intuitive reducer logic using Immer.'
      }
    ],
    realWorldUseCases: [
      'Complex enterprise web applications with large teams and multi-domain client state.',
      'E-commerce shopping carts, active user sessions, and checkout pipelines.',
      'Time-travel debugging and state audit logging with Redux DevTools extension.'
    ],
    commonMistakes: [
      {
        title: 'Using both Immer mutation and returning a new object in the same reducer',
        description: 'In Immer, you either mutate the draft (state.x = 1) OR return a new object (return { ...state, x: 1 }). Doing both in the same reducer function causes an error.',
        wrongCode: `addItem: (state, action) => {
  state.items.push(action.payload);
  return state; // ERROR in Immer: Mutated draft and returned value!
}`,
        correctCode: `addItem: (state, action) => {
  state.items.push(action.payload); // Just mutate draft, do not return!
}`,
        explanation: 'In RTK reducers, either mutate state in-place or return a new object, never both.'
      }
    ],
    bestPractices: [
      'Always use createSlice and configureStore from @reduxjs/toolkit.',
      'Export typed useAppDispatch and useAppSelector hooks to get full TypeScript autocomplete.',
      'Keep state normalized (by ID) for complex relational entities.'
    ],
    performanceNotes: [
      'useSelector only triggers a re-render if the returned value changes by reference (===). Select only the specific fields your component needs.',
      'Use createSelector (from Reselect, built into RTK) to memoize derived state calculations.'
    ],
    interviewQuestions: [
      {
        id: 'iq-rtk-1',
        question: 'How does Redux Toolkit simplify legacy Redux, and how does Immer enable direct state mutation in reducers?',
        difficulty: 'intermediate',
        answer: 'Redux Toolkit simplifies legacy Redux by: 1) Combining actions and reducers into createSlice, eliminating separate action type files and switch statements, 2) Providing configureStore with good defaults (thunk middleware, DevTools), and 3) Integrating Immer out of the box. In Immer, your reducer receives a Proxy draft of the state. You can write direct mutative code (state.items.push(item)). Immer records every modification and computes a brand-new immutable copy to return to Redux, ensuring zero direct mutation while keeping code concise.',
        followUpQuestions: [
          'What is the difference between useSelector and useContext regarding re-renders?',
          'What is createSelector and why is it used?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-rtk-1',
        title: 'Create an Auth Slice with Redux Toolkit',
        difficulty: 'intermediate',
        description: 'Write an authSlice with login, logout, and updateProfile actions using createSlice and TypeScript.',
        hints: ['createSlice({ name: "auth", initialState, reducers: { ... } })'],
        solution: `const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null as any, isAuthenticated: false },
  reducers: {
    login: (state, action) => { state.user = action.payload; state.isAuthenticated = true; },
    logout: (state) => { state.user = null; state.isAuthenticated = false; }
  }
});`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rtk-1',
        question: 'Which underlying library does Redux Toolkit use to enable writing mutative code (like state.count++) inside reducers?',
        type: 'multiple-choice',
        options: [
          'Lodash',
          'Immer',
          'Immutable.js',
          'RxJS'
        ],
        correctAnswer: 1,
        explanation: 'Redux Toolkit uses Immer internally, which intercepts mutations via JavaScript Proxies and creates a new immutable state copy automatically.'
      }
    ]
  },

  'zustand': {
    overview: 'Complete guide to Zustand: Lightweight, unopinionated state management without Context providers, Selector subscriptions, Persist middleware, and comparing Zustand with Redux and Context API.',
    whyItExists: `While Redux Toolkit is powerful, it still requires store configuration, slice boilerplate, and Provider wrapping.
Context API causes unnecessary re-renders across all consumers when any value updates.
Zustand (German for "state") is a minimalist alternative that has taken the React world by storm:
1. Zero Boilerplate: Define a store with create() in 10 lines of code.
2. No Provider Required: Access store anywhere (inside components, custom hooks, or outside React in vanilla JS).
3. Fine-Grained Selector Subscriptions: Components re-render ONLY when their selected slice changes.`,
    howItWorks: `1. HOW ZUSTAND WORKS:
- Stores are plain JavaScript closures holding state and action functions.
- Uses an event emitter pub/sub model to notify subscribed components when a state slice changes.
- Uses Object.is to compare the return value of your selector function.

2. CREATING A STORE:
import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));

3. CONSUMING WITH SELECTORS (No Provider needed!):
const count = useStore((state) => state.count); // Only re-renders when count changes!`,
    codeExamples: [
      {
        id: 'zus-ex-1',
        title: 'Production Zustand Store with LocalStorage Persistence',
        description: 'Building an authenticated user store with persistent storage and selector subscriptions.',
        language: 'typescript',
        level: 'intermediate',
        code: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User { id: string; name: string; role: string; }

interface UserState {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
}

// Store with persist middleware (automatically syncs with localStorage!)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      theme: 'dark',
      setUser: (user) => set({ user }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'app-user-storage', // Key in localStorage
    }
  )
);

// CONSUMPTION IN COMPONENTS:
// Component A only selects theme -> Will NOT re-render when user updates!
export function ThemeToggleButton() {
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);

  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}`,
        explanation: 'Zustand selector subscriptions allow components to subscribe exclusively to the exact slice of state they care about.'
      }
    ],
    realWorldUseCases: [
      'Managing global UI state (modals, slide-out panels, notifications) with zero provider nesting.',
      'Persisting user settings and shopping cart state across browser sessions.',
      'Calling store actions from outside React components (e.g. inside Axios interceptors or WebSocket handlers).'
    ],
    commonMistakes: [
      {
        title: 'Selecting the entire store object without a selector',
        description: 'Writing const state = useStore() causes the component to re-render whenever ANY property in the store changes, forfeiting selector optimization!',
        wrongCode: `const { count } = useStore(); // Re-renders on ANY store update!`,
        correctCode: `const count = useStore((state) => state.count); // Only re-renders when count changes!`,
        explanation: 'Always pass a selector function to pick the specific slice of state needed by the component.'
      }
    ],
    bestPractices: [
      'Always use selector functions: useStore(state => state.property).',
      'Use the persist middleware for data that needs to survive page refreshes.',
      'Colocate actions inside the store object alongside state fields.'
    ],
    performanceNotes: [
      'Zustand uses useSyncExternalStore internally in React 18, preventing tearing in Concurrent Mode.',
      'Has virtually zero bundle size (< 1.5 KB minified and gzipped).'
    ],
    interviewQuestions: [
      {
        id: 'iq-zus-1',
        question: 'Why has Zustand become so popular compared to Redux and the Context API?',
        difficulty: 'intermediate',
        answer: 'Zustand combines the best of both worlds: 1) Simplicity: Unlike Redux, it requires no slice boilerplate, no action creators, and no Provider wrapping. 2) Performance: Unlike Context API (which forces all consumers to re-render when any part of context updates), Zustand uses selector subscriptions (useStore(s => s.item)), so components only re-render when their selected slice changes. 3) Universality: It can be accessed outside of React components (e.g. in Axios interceptors or utility functions). 4) Ultra-lightweight footprint (< 1.5 KB).',
        followUpQuestions: ['Can you read or write Zustand state outside of a React component? How?']
      }
    ],
    exercises: [
      {
        id: 'ex-zus-1',
        title: 'Build a Notification Toast Store with Auto-Dismiss in Zustand',
        difficulty: 'intermediate',
        description: 'Create a toast store with addToast(msg, duration) and removeToast(id) that automatically removes toasts after a timeout.',
        hints: ['Use setTimeout inside addToast action to call removeToast'],
        solution: `export const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (message, duration = 3000) => {
    const id = crypto.randomUUID();
    set(state => ({ toasts: [...state.toasts, { id, message }] }));
    setTimeout(() => get().removeToast(id), duration);
  },
  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
}));`
      }
    ],
    quizQuestions: [
      {
        id: 'q-zus-1',
        question: 'Do components using Zustand need to be wrapped in a <Provider> in the React component tree?',
        type: 'multiple-choice',
        options: [
          'Yes, a <StoreProvider> is required at the root',
          'No, Zustand stores work without any Context Provider',
          'Only when using TypeScript',
          'Only in Next.js App Router'
        ],
        correctAnswer: 1,
        explanation: 'Zustand stores are standalone closures that do not require any Context Provider in the React component tree.'
      }
    ]
  }
};
