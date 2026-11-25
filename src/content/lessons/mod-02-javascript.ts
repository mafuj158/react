import type { LessonContent } from '../../types';

export const MOD_02_LESSONS: Record<string, Partial<LessonContent>> = {
  'variables': {
    overview: 'Complete guide to JavaScript variable declarations: var, let, and const. Explains lexical scope, function scope, variable hoisting, the Temporal Dead Zone (TDZ), and memory mutability.',
    whyItExists: `In legacy JavaScript (ES5 and earlier), 'var' was the only way to declare variables. However, 'var' suffered from severe design flaws:
1. It is function-scoped instead of block-scoped, causing variable leakage outside of if-blocks and for-loops.
2. It can be re-declared without error, causing silent variable overwriting and subtle bugs.
3. It is hoisted and initialized with 'undefined', hiding reference errors during early execution.
ES6 introduced 'let' and 'const' to solve these issues by providing block scoping and the Temporal Dead Zone.`,
    howItWorks: `THE THREE DECLARATIONS COMPARED:

1. var:
- Scope: Function-scoped (or globally scoped). It ignores curly braces { } like if-statements and for-loops!
- Hoisting: Hoisted to the top of the function and INITIALIZED with 'undefined'.
- Re-declaration: Allowed within the same scope.
- Global Object: In browsers, global var declarations attach to window.

2. let:
- Scope: Strictly block-scoped (confined to nearest { }).
- Hoisting: Hoisted to top of block, but remains UNINITIALIZED in the Temporal Dead Zone (TDZ).
- Re-declaration: Disallowed in the same scope (throws SyntaxError).
- Re-assignment: Allowed (let x = 1; x = 2).

3. const:
- Scope: Strictly block-scoped.
- Hoisting: Hoisted into the TDZ (uninitialized).
- Re-declaration: Disallowed.
- Re-assignment: Disallowed (must be initialized at declaration).
- Mutability Note: const prevents re-binding the variable identifier. It DOES NOT make objects or arrays immutable! (e.g. const arr = []; arr.push(1); is completely valid).`,
    codeExamples: [
      {
        id: 'var-ex-1',
        title: 'Block Scope vs Function Scope in Asynchronous Loops',
        description: 'The classic interview problem: why var in setTimeout prints 3 three times, while let prints 0, 1, 2.',
        language: 'javascript',
        level: 'basic',
        code: `// THE CLASSIC VAR PROBLEM:
// 'var i' has a single function-scoped binding shared by all iterations!
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var i:', i); // Prints 3, 3, 3!
  }, 100);
}

// THE MODERN LET SOLUTION:
// 'let j' creates a brand-new lexical binding for EVERY iteration of the loop!
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let j:', j); // Prints 0, 1, 2!
  }, 100);
}`,
        explanation: 'In the for-loop with let, each iteration receives its own distinct lexical scope, capturing the snapshot value of j in the closure.'
      },
      {
        id: 'var-ex-2',
        title: 'Temporal Dead Zone (TDZ) in Action',
        description: 'Witnessing how accessing a let or const variable before its declaration statement throws a ReferenceError.',
        language: 'javascript',
        level: 'intermediate',
        code: `function testTDZ() {
  // TDZ for myConst starts here!
  // console.log(myConst); // Uncaught ReferenceError: Cannot access 'myConst' before initialization

  const value = 42;
  console.log('Value safely accessed:', value); // 42

  // Object mutability with const
  const user = { name: 'Alice' };
  user.name = 'Bob'; // Completely legal! The object was mutated, not re-assigned.
  // user = { name: 'Charlie' }; // TypeError: Assignment to constant variable.
}`,
        explanation: 'const protects the variable binding reference, not the interior property values of objects and arrays.'
      }
    ],
    realWorldUseCases: [
      'Declaring immutable React component state references and handler callbacks with const.',
      'Using let for loop counters, accumulators, and toggle variables.',
      'Preventing global namespace pollution in web applications.'
    ],
    commonMistakes: [
      {
        title: 'Assuming const makes objects deeply immutable',
        description: 'Mutating properties on a const object (e.g. const state = { count: 0 }; state.count = 1) is allowed by JavaScript, but breaks React state immutability contracts!',
        wrongCode: `const [user, setUser] = useState({ name: 'Dan' });
// Anti-pattern: Mutating const object in-place!
user.name = 'Sophie';
setUser(user); // React will SKIP re-render because object reference didn't change!`,
        correctCode: `// Correct: Create a new object reference using spread syntax
setUser({ ...user, name: 'Sophie' });`,
        explanation: 'To freeze objects at runtime in JavaScript, use Object.freeze(obj).'
      }
    ],
    bestPractices: [
      'Default to const for all variables to enforce intent and prevent accidental re-assignments.',
      'Only use let when you explicitly know the value will be reassigned (e.g. loop index, accumulator).',
      'Never use var in modern JavaScript or React codebases.'
    ],
    performanceNotes: [
      'Modern V8 JIT compilers optimize const variables aggressively because the engine can safely assume the memory pointer will never change.',
      'Block-scoped variables allow earlier garbage collection of temporary variables once execution exits the block.'
    ],
    interviewQuestions: [
      {
        id: 'iq-var-1',
        question: 'What is the Temporal Dead Zone (TDZ) and why does it exist in JavaScript?',
        difficulty: 'intermediate',
        answer: 'The Temporal Dead Zone (TDZ) is the period between entering a block scope and the actual line where a let or const variable is declared. While let and const are technically hoisted to the top of their block, they remain uninitialized. Accessing them in the TDZ throws a ReferenceError. The TDZ exists to catch programming errors early (preventing access to variables before they are defined) and to make const semantics technically sound.',
        followUpQuestions: [
          'What happens if you use typeof on an uninitialized let variable in the TDZ?',
          'Why does var log undefined instead of throwing a ReferenceError?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-var-1',
        title: 'Fix Stale Closure Loop using Let or IIFE',
        difficulty: 'basic',
        description: 'Given a loop using var with event listeners, refactor it using let and explain why it fixes the bug.',
        hints: ['Replace var with let in the for statement.'],
        solution: `// Before:
// for (var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', () => alert(i)); // Always alerts buttons.length!
// }
// After:
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => alert(i)); // Alerts 0, 1, 2...
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-var-1',
        question: 'What error is thrown when accessing a let variable before its declaration statement in code?',
        type: 'multiple-choice',
        options: [
          'TypeError',
          'SyntaxError',
          'ReferenceError',
          'Returns undefined without error'
        ],
        correctAnswer: 2,
        explanation: 'Accessing a let or const variable while it is in the Temporal Dead Zone throws a ReferenceError: Cannot access variable before initialization.'
      }
    ]
  },

  'data-types': {
    overview: 'Deep dive into JavaScript data types: Primitives vs Reference Types, Memory Heap vs Call Stack allocation, Implicit and Explicit Type Coercion, and accurate type checking.',
    whyItExists: `JavaScript is a dynamically and weakly typed language. Values carry types, but variables do not.
This creates tricky runtime behaviors:
1. Primitives are copied by value, while Objects/Arrays are copied by reference. Modifying an object unexpectedly mutates it in other places.
2. Implicit type coercion (+ vs -, == vs ===, truthy vs falsy) leads to notorious bugs like '5' + 3 = '53' and '5' - 3 = 2.
3. typeof null returning 'object' is a historic 30-year-old bug in JavaScript that trips up beginners and senior developers alike.`,
    howItWorks: `1. THE 7 PRIMITIVE TYPES (Stored on the Stack):
- string, number, bigint, boolean, undefined, symbol, null.
- Primitives are IMMUTABLE. When you manipulate a string, a brand-new string is returned.
- Compared by VALUE: 5 === 5 is true; 'hello' === 'hello' is true.

2. REFERENCE TYPES (Objects stored in Heap, Pointer on Stack):
- Object, Array, Function, Date, RegExp, Map, Set.
- Objects are MUTABLE.
- Compared by REFERENCE (memory address):
  {} === {} is false!
  [] === [] is false!
  Two distinct objects in heap memory are never equal, even with identical keys and values.

3. TYPE COERCION RULES:
- The '+' operator triggers string concatenation if EITHER operand is a string ('3' + 2 = '32').
- Mathematical operators (-, *, /, %) coerce operands to numbers ('6' / '2' = 3, '5' - 1 = 4).
- Truthy & Falsy:
  Falsy values: false, 0, -0, 0n, '', null, undefined, NaN.
  EVERYTHING else is truthy, including empty objects ({}) and empty arrays ([])!`,
    codeExamples: [
      {
        id: 'dt-ex-1',
        title: 'Primitive Copy by Value vs Object Copy by Reference',
        description: 'Demonstrating how mutating a copied object affects the original, while primitives remain isolated.',
        language: 'javascript',
        level: 'basic',
        code: `// PRIMITIVES: Copied by Value
let a = 10;
let b = a; // Copied value 10
b = 20;
console.log(a); // Still 10! Isolated.

// REFERENCE TYPES: Copied by Reference (Memory Address)
const user1 = { name: 'Alice', age: 25 };
const user2 = user1; // Both variables point to the EXACT SAME object in heap memory!

user2.age = 30; // Mutates the shared heap object!
console.log(user1.age); // 30! user1 was mutated via user2.

// FIX: Shallow clone via spread or structuredClone
const user3 = { ...user1 };
user3.age = 35;
console.log(user1.age); // Still 30! user1 is protected.`,
        explanation: 'Reference types store memory pointers on the stack. When assigned to a new variable, only the memory address is copied.'
      },
      {
        id: 'dt-ex-2',
        title: 'Bulletproof Type Checking in JavaScript',
        description: 'Why typeof fails on null and arrays, and how to use Object.prototype.toString.call for 100% accurate type detection.',
        language: 'javascript',
        level: 'intermediate',
        code: `// Why typeof is unreliable:
console.log(typeof null);      // 'object' (Historic JS bug!)
console.log(typeof []);        // 'object'
console.log(typeof new Date());// 'object'

// Reliable Type Checking Functions:
function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function getExactType(val) {
  // Returns '[object String]', '[object Array]', '[object Null]', '[object Date]', etc.
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

console.log(getExactType(null));       // 'null'
console.log(getExactType([]));         // 'array'
console.log(getExactType(new Date())); // 'date'
console.log(getExactType(/abc/));      // 'regexp'`,
        explanation: 'Object.prototype.toString.call() accesses the internal [[Class]] tag of any value, bypassing typeof limitations.'
      }
    ],
    realWorldUseCases: [
      'Preventing unintentional state mutation in React reducers and Zustand stores.',
      'Deep cloning complex nested configuration objects using structuredClone().',
      'Validating API payload types before rendering UI widgets.'
    ],
    commonMistakes: [
      {
        title: 'Using == (loose equality) instead of === (strict equality)',
        description: 'Loose equality (==) performs unpredictable type coercion, leading to absurd results: [] == false is true, and "" == 0 is true!',
        wrongCode: `if (inputValue == false) { ... } // True for "", 0, and []!`,
        correctCode: `if (inputValue === false) { ... } // Strictly checks type and value`,
        explanation: 'Always use strict equality (===) to ensure both type and value match without implicit coercion.'
      }
    ],
    bestPractices: [
      'Always use === and !== instead of == and !=.',
      'Use Array.isArray(val) instead of typeof val === "object".',
      'Use structuredClone() for deep copies of complex nested objects.'
    ],
    performanceNotes: [
      'Primitives are stored directly on the call stack or inlined in V8 execution frames, making access instantaneous.',
      'Excessive creation of temporary objects creates Heap fragmentation and triggers costly Garbage Collection cycles.'
    ],
    interviewQuestions: [
      {
        id: 'iq-dt-1',
        question: 'Why does typeof null return "object", and how do you reliably check if a value is a plain object?',
        difficulty: 'intermediate',
        answer: 'In the original 1995 JavaScript implementation, values were stored with a type tag in the lower 3 bits. The tag for "object" was 000. Because null was represented as a NULL pointer (0x00 in all bits), its type tag was also 000, causing typeof null to report "object". This bug cannot be fixed because doing so would break existing web code. To check for a plain object: typeof val === "object" && val !== null && !Array.isArray(val) && val.constructor === Object.',
        followUpQuestions: [
          'What is the difference between null and undefined in JavaScript?',
          'What is the difference between shallow copy and deep copy?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-dt-1',
        title: 'Implement Deep Equal Comparator',
        difficulty: 'advanced',
        description: 'Write a deepEqual(a, b) function that compares two values deeply, handling nested objects, arrays, and primitives.',
        hints: ['Check for primitive equality first', 'Compare Object.keys lengths', 'Recurse on child properties'],
        solution: `function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-dt-1',
        question: 'What is the output of: [] + {} and {} + [] in standard JavaScript?',
        type: 'multiple-choice',
        options: [
          '"[object Object]" and 0',
          '0 and NaN',
          '"[object Object]" and "[object Object]"',
          'TypeError'
        ],
        correctAnswer: 0,
        explanation: '[] + {} coerces [] to "" and {} to "[object Object]", producing "[object Object]". In a browser console, {} + [] interprets {} as an empty block and +[] as unary plus on empty array, producing 0.'
      }
    ]
  },

  'functions': {
    overview: 'Complete guide to JavaScript Functions: Declarations vs Expressions, Arrow Functions, lexical this binding, default parameters, rest parameters, First-Class Functions, and Higher-Order Functions.',
    whyItExists: `Functions are the fundamental building blocks of JavaScript and React.
In React:
- Every functional component is literally a JavaScript function that takes props and returns JSX.
- Every hook is a function that taps into React Fiber state.
Without a solid grasp of functions, developers struggle with:
1. 'this' context bugs when passing event callbacks.
2. Understanding why arrow functions cannot be used as constructors.
3. Writing clean, reusable Higher-Order Functions (HOFs).`,
    howItWorks: `1. FUNCTION DECLARATIONS VS EXPRESSIONS:
- Function Declaration: function add(a, b) { return a + b; }
  Hoisted completely! Can be invoked BEFORE the line where it is written.
- Function Expression: const add = function(a, b) { return a + b; }
  Hoisted as a variable (TDZ if let/const). Cannot be called before declaration.

2. ARROW FUNCTIONS (ES6 =>):
- Concise syntax: (a, b) => a + b
- Lexical 'this': Arrow functions DO NOT have their own 'this'. They inherit 'this' from their enclosing lexical context!
- No 'arguments' object: Use rest parameters (...args) instead.
- Cannot be constructors: Calling new ArrowFn() throws a TypeError.
- No prototype property: Arrow functions do not possess a prototype.

3. FIRST-CLASS CITIZENS & HIGHER-ORDER FUNCTIONS:
- Functions in JS are values: they can be assigned to variables, passed as arguments to other functions (callbacks), and returned from other functions (currying, HOCs).
- Higher-Order Function (HOF): Any function that accepts another function as an argument OR returns a function (e.g. map, filter, compose).`,
    codeExamples: [
      {
        id: 'fn-ex-1',
        title: 'Arrow Function Lexical This vs Regular Function Dynamic This',
        description: 'Demonstrating how regular functions lose this context in timers, while arrow functions preserve it.',
        language: 'javascript',
        level: 'basic',
        code: `const counter = {
  count: 0,
  
  // REGULAR FUNCTION: 'this' depends on how it is invoked!
  startRegular() {
    setTimeout(function() {
      // In this callback, 'this' defaults to window or undefined in strict mode!
      console.log('Regular:', this.count); // undefined!
    }, 100);
  },

  // ARROW FUNCTION: Lexically captures 'this' from counter object!
  startArrow() {
    setTimeout(() => {
      console.log('Arrow:', this.count); // 0! 'this' is counter.
    }, 100);
  }
};

counter.startArrow(); // Successfully logs 0!`,
        explanation: 'Arrow functions do not bind their own this; they look up this along the lexical scope chain just like any ordinary variable.'
      },
      {
        id: 'fn-ex-2',
        title: 'Higher-Order Functions & Currying in React',
        description: 'Creating a curried event handler factory to avoid inline function arrow allocations in JSX.',
        language: 'tsx',
        level: 'intermediate',
        code: `// Higher-Order Function that returns a customized event handler
function createFieldUpdater(fieldName: string) {
  return function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(\`Updating field \${fieldName} to:\`, event.target.value);
  };
}

export function RegistrationForm() {
  // Handlers created once outside or bound cleanly
  const updateUsername = createFieldUpdater('username');
  const updateEmail = createFieldUpdater('email');

  return (
    <form className="space-y-4">
      <input onChange={updateUsername} placeholder="Username" />
      <input onChange={updateEmail} placeholder="Email" />
    </form>
  );
}`,
        explanation: 'Higher-Order Functions return specialized functions configured with pre-set arguments via closure.'
      }
    ],
    realWorldUseCases: [
      'Writing custom React Hooks (useDebounce, useLocalStorage) which are higher-order utility functions.',
      'Composing utility functions in state pipelines (Redux middleware, functional pipes).',
      'Creating reusable event handler factories in form components.'
    ],
    commonMistakes: [
      {
        title: 'Using an Arrow Function as an Object Method when needing this',
        description: 'Declaring object methods with arrow syntax causes this to point to the global window/undefined instead of the object!',
        wrongCode: `const user = {
  name: 'Alex',
  greet: () => \`Hello, I am \${this.name}\` // 'this' is window, NOT user!
};`,
        correctCode: `const user = {
  name: 'Alex',
  greet() { return \`Hello, I am \${this.name}\`; } // Method shorthand binds 'this' to user
};`,
        explanation: 'Never use arrow functions for object methods if you need access to the object properties via this.'
      }
    ],
    bestPractices: [
      'Use arrow functions for callbacks, array iterations, and functional components.',
      'Use standard method shorthand (method() {}) for object methods and class methods.',
      'Use rest parameters (...args) instead of the legacy arguments object.'
    ],
    performanceNotes: [
      'Creating inline arrow functions inside a React render loop (<button onClick={() => ...}>) allocates a new function instance on every render. Use useCallback if passed to memoized children.',
      'V8 optimizes monomorphic function calls (functions called with consistent object shapes) through inline caching.'
    ],
    interviewQuestions: [
      {
        id: 'iq-fn-1',
        question: 'What are the main differences between Arrow Functions and Regular Function Declarations?',
        difficulty: 'intermediate',
        answer: '1) "this" Binding: Regular functions have dynamic this based on how they are called; arrow functions have lexical this inherited from their outer scope. 2) Constructors: Regular functions can be invoked with "new" to construct objects; arrow functions cannot. 3) Arguments: Regular functions have an "arguments" object; arrow functions do not (use ...rest). 4) Prototype: Regular functions have a .prototype property; arrow functions do not. 5) Hoisting: Function declarations are fully hoisted; arrow functions assigned to variables follow variable hoisting rules.',
        followUpQuestions: ['Can you change the "this" of an arrow function using .bind(), .call(), or .apply()?']
      }
    ],
    exercises: [
      {
        id: 'ex-fn-1',
        title: 'Implement Function Pipe / Compose',
        difficulty: 'intermediate',
        description: 'Write a pipe(...fns) utility function that composes multiple unary functions left-to-right.',
        hints: ['Use fns.reduce((acc, fn) => fn(acc), initialValue)'],
        solution: `function pipe<T>(...fns: Array<(arg: any) => any>) {
  return (initialValue: T) => {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

// Usage:
// const add5 = (n: number) => n + 5;
// const double = (n: number) => n * 2;
// const calc = pipe(add5, double);
// calc(10) -> (10 + 5) * 2 = 30`
      }
    ],
    quizQuestions: [
      {
        id: 'q-fn-1',
        question: 'What happens if you invoke an Arrow Function with the new keyword (e.g. new MyArrowFn())?',
        type: 'multiple-choice',
        options: [
          'It constructs a new object normally',
          'It returns undefined',
          'It throws a TypeError: MyArrowFn is not a constructor',
          'It creates an empty prototype'
        ],
        correctAnswer: 2,
        explanation: 'Arrow functions do not have an internal [[Construct]] method or a prototype property, so calling them with new throws a TypeError.'
      }
    ]
  },

  'destructuring': {
    overview: 'Mastery of ES6 Destructuring Assignment, Spread Syntax (...), Rest Parameters, default values, renaming properties, and nested destructuring in React component props and state.',
    whyItExists: `Extracting data from complex objects and arrays in legacy JavaScript required repetitive lines of manual property indexing.
In modern React development:
- Component props are destructured on line 1 of every functional component: ({ title, children, ...rest }).
- useState returns a 2-element array destructured as [count, setCount].
- State updates rely on object and array spread ({ ...state, count: state.count + 1 }) to maintain immutability.`,
    howItWorks: `1. OBJECT DESTRUCTURING:
- Extract by key name: const { name, age } = user;
- Renaming properties: const { name: userName } = user;
- Default values: const { role = 'guest' } = user;
- Rest in objects: const { id, ...details } = user; (details holds remaining keys).

2. ARRAY DESTRUCTURING:
- Extract by index position: const [first, second, , fourth] = list;
- Swapping variables without temporary variable: [a, b] = [b, a];
- Rest in arrays: const [head, ...tail] = list;

3. SPREAD SYNTAX (...) VS REST PARAMETERS (...):
- Rest Operator: Collects remaining items into an array/object. Used in function parameter lists and destructuring patterns.
- Spread Operator: Expands an iterable array or object into individual elements. Used in array literals, object cloning, and function argument calls.`,
    codeExamples: [
      {
        id: 'des-ex-1',
        title: 'Modern React Component Props Destructuring & Rest Spreading',
        description: 'Extracting known props, providing defaults, and forwarding remaining HTML attributes to the underlying element.',
        language: 'tsx',
        level: 'basic',
        code: `import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

// Destructuring with renaming, defaults, and rest props forwarding
export function CustomButton({
  variant = 'primary', // Default value
  isLoading = false,
  children,
  className = '',
  ...restProps // Collects onClick, disabled, id, aria-*, etc.
}: ButtonProps) {
  return (
    <button
      {...restProps} // Spreads all remaining attributes onto native DOM button
      className={\`btn btn-\${variant} \${className}\`}
    >
      {isLoading ? <span>Loading...</span> : children}
    </button>
  );
}`,
        explanation: 'Combining destructuring with rest props allows building flexible, reusable wrapper components that accept any native HTML attribute.'
      },
      {
        id: 'des-ex-2',
        title: 'Immutable Nested State Updates with Spread Operator',
        description: 'Safely updating deep properties in state objects without direct mutation.',
        language: 'typescript',
        level: 'intermediate',
        code: `const initialState = {
  user: {
    profile: {
      name: 'Sarah',
      settings: {
        theme: 'light',
        notifications: true
      }
    }
  }
};

// IMMUTABLE UPDATE: Updating settings.theme without mutating original state
const updatedState = {
  ...initialState,
  user: {
    ...initialState.user,
    profile: {
      ...initialState.user.profile,
      settings: {
        ...initialState.user.profile.settings,
        theme: 'dark' // Only theme is changed, references are safely updated!
      }
    }
  }
};`,
        explanation: 'Because spread syntax performs a shallow clone, updating nested properties requires spreading each parent level up to the root.'
      }
    ],
    realWorldUseCases: [
      'Extracting and sanitizing API payload responses in service layers.',
      'Consuming React Hook tuples (const [state, setState] = useState()).',
      'Implementing immutable state updates in Redux reducers and React state setters.'
    ],
    commonMistakes: [
      {
        title: 'Destructuring properties from null or undefined',
        description: 'Attempting to destructure from null or undefined throws a fatal Uncaught TypeError: Cannot destructure property of null/undefined.',
        wrongCode: `// If user is null (e.g. while data is loading), this crashes the app!
const { name, email } = user;`,
        correctCode: `// Correct: provide default object or optional chaining
const { name, email } = user || {};`,
        explanation: 'Always guard destructuring with default fallback objects (user || {}) when working with async data.'
      }
    ],
    bestPractices: [
      'Destructure props directly in the component signature for readability.',
      'Use default values in destructuring instead of manual ternary or logical OR operators.',
      'Remember that spread (...) performs a shallow copy, not a deep copy.'
    ],
    performanceNotes: [
      'Destructuring is evaluated at compile time and optimized by modern JS engines with zero performance penalty.',
      'Deep manual nested spreading can become unwieldy; consider libraries like Immer for deeply nested immutable state.'
    ],
    interviewQuestions: [
      {
        id: 'iq-des-1',
        question: 'What is the difference between the Spread Operator and Rest Parameters in JavaScript?',
        difficulty: 'basic',
        answer: 'Both use the three dots (...) syntax, but have opposite purposes: 1) Rest Parameters collect multiple individual elements into a single array or object. They are used in function definitions (function sum(...nums)) or in destructuring (const [head, ...tail] = list). 2) Spread Syntax expands an existing array or object into individual elements. It is used in function calls (Math.max(...nums)) or in array/object literals to shallow-clone or merge ({ ...objA, ...objB }).',
        followUpQuestions: ['Does the spread operator create a shallow copy or a deep copy?']
      }
    ],
    exercises: [
      {
        id: 'ex-des-1',
        title: 'Refactor Nested Props with Defaults and Aliasing',
        difficulty: 'basic',
        description: 'Destructure a complex user config object with default settings and renamed keys.',
        hints: ['const { user: { address: { city = "Unknown" } = {} } } = data'],
        solution: `function parseProfile(data: any) {
  const {
    id: userId,
    details: { name = 'Anonymous', email = 'N/A' } = {},
    roles: [primaryRole = 'user', ...otherRoles] = []
  } = data || {};

  return { userId, name, email, primaryRole, otherRoles };
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-des-1',
        question: 'How do you swap two variables a and b in a single line of JavaScript without a temporary variable?',
        type: 'multiple-choice',
        options: [
          '[a, b] = [b, a]',
          '{a, b} = {b, a}',
          'a = b.swap(a)',
          'swap(a, b)'
        ],
        correctAnswer: 0,
        explanation: 'Array destructuring assignment allows swapping variables inline: [a, b] = [b, a].'
      }
    ]
  },

  'promises': {
    overview: 'Complete guide to JavaScript Promises: Pending, Fulfilled, Rejected states, Promise chaining, microtask execution priority, and Promise combinators (Promise.all, Promise.allSettled, Promise.race, Promise.any).',
    whyItExists: `Legacy asynchronous JavaScript relied exclusively on callback functions (e.g. fs.readFile(path, (err, data) => ...)).
This led to:
1. "Callback Hell" (Pyramid of Doom) where deeply nested operations made code unreadable and error handling nearly impossible.
2. Inversion of Control: handing control of your callback to a third-party function without knowing if or when it will be called.
Promises standardize asynchronous control flow into first-class objects with predictable semantics.`,
    howItWorks: `1. THE THREE PROMISE STATES:
- Pending: Initial state, operation is ongoing.
- Fulfilled: The operation succeeded; resolve(value) was called.
- Rejected: The operation failed; reject(error) was called.
Once settled (fulfilled or rejected), a Promise is IMMUTABLE — its state can never change again!

2. PROMISE CHAINING & MICROTASK QUEUE:
- .then(onFulfilled, onRejected): Returns a NEW Promise, allowing chaining.
- .catch(onRejected): Catches any error that occurred earlier in the chain.
- .finally(callback): Runs cleanup regardless of success or failure.
Callbacks passed to .then / .catch execute in the Microtask Queue, running before any timers or rendering passes.

3. THE FOUR PROMISE COMBINATORS:
- Promise.all([p1, p2]): Fails fast! Resolves when ALL promises resolve, or rejects immediately when ANY promise rejects.
- Promise.allSettled([p1, p2]): Waits for all promises to settle (never rejects). Returns array of { status, value | reason }.
- Promise.race([p1, p2]): Resolves or rejects as soon as the FIRST promise settles.
- Promise.any([p1, p2]): Resolves as soon as the FIRST promise FULFILLS. Rejects with AggregateError only if ALL fail.`,
    codeExamples: [
      {
        id: 'prom-ex-1',
        title: 'Promise Chaining and Error Recovery',
        description: 'Demonstrating how returning values or promises from .then chains sequential async operations with centralized error catching.',
        language: 'typescript',
        level: 'basic',
        code: `function fetchUserProfile(userId: string) {
  return fetch(\`/api/users/\${userId}\`)
    .then(res => {
      if (!res.ok) throw new Error(\`Failed to fetch user: \${res.status}\`);
      return res.json();
    })
    .then(user => {
      // Chain another async promise
      return fetch(\`/api/posts?author=\${user.id}\`);
    })
    .then(res => res.json())
    .catch(error => {
      console.error('Handled error in user profile pipeline:', error);
      // Return safe fallback so downstream code does not crash
      return { posts: [] };
    });
}`,
        explanation: 'Each .then callback transforms the resolved value or returns a new Promise, creating a linear pipeline instead of nested callbacks.'
      },
      {
        id: 'prom-ex-2',
        title: 'Concurrent API Fetching with Promise.allSettled',
        description: 'Fetching dashboard widgets in parallel where individual failures do not abort the entire dashboard load.',
        language: 'typescript',
        level: 'intermediate',
        code: `async function loadDashboardData() {
  const [metricsResult, notificationsResult, userResult] = await Promise.allSettled([
    fetch('/api/metrics').then(r => r.json()),
    fetch('/api/notifications').then(r => r.json()),
    fetch('/api/user').then(r => r.json())
  ]);

  const metrics = metricsResult.status === 'fulfilled' ? metricsResult.value : null;
  const notifications = notificationsResult.status === 'fulfilled' ? notificationsResult.value : [];
  const user = userResult.status === 'fulfilled' ? userResult.value : null;

  return { metrics, notifications, user };
}`,
        explanation: 'Promise.allSettled ensures that a failure in notifications does not prevent metrics or user profile data from displaying.'
      }
    ],
    realWorldUseCases: [
      'Batching concurrent data requests in React applications using TanStack Query or Promise.all.',
      'Implementing request timeouts by racing a fetch against a delayed rejection promise.',
      'Handling background telemetry logging without blocking user navigation.'
    ],
    commonMistakes: [
      {
        title: 'The "Broken Chain" anti-pattern inside .then',
        description: 'Forgetting to return a value or a promise inside a .then callback breaks the chain, causing subsequent .then callbacks to receive undefined.',
        wrongCode: `fetchUser()
  .then(user => {
    fetchAvatar(user); // Forgot return! Next .then gets undefined!
  })
  .then(avatar => render(avatar));`,
        correctCode: `fetchUser()
  .then(user => {
    return fetchAvatar(user); // Correctly returns promise to chain
  })
  .then(avatar => render(avatar));`,
        explanation: 'Always return the inner Promise or value to forward it to the next step in the Promise chain.'
      }
    ],
    bestPractices: [
      'Prefer Promise.allSettled over Promise.all when independent dashboard widgets or microservices can fail gracefully.',
      'Always attach a .catch() handler or wrap in try/catch to prevent unhandled promise rejections.',
      'Never create new Promise((resolve) => ...) around an already existing Promise (the deferred anti-pattern).'
    ],
    performanceNotes: [
      'Running independent asynchronous requests in parallel with Promise.all reduces total response time from sum(t1 + t2) to max(t1, t2).',
      'Promise microtasks run immediately after the current synchronous script finishes, before timers (setTimeout) and rendering.'
    ],
    interviewQuestions: [
      {
        id: 'iq-prom-1',
        question: 'What is the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any?',
        difficulty: 'intermediate',
        answer: '1) Promise.all: Resolves when ALL promises resolve; rejects immediately if ANY promise rejects (fail-fast). 2) Promise.allSettled: Waits for all promises to finish (either fulfilled or rejected) and returns an array of outcome objects. It never rejects. 3) Promise.race: Settles (resolves OR rejects) as soon as the first promise settles. 4) Promise.any: Resolves as soon as the first promise FULFILLS. It only rejects if ALL promises fail, returning an AggregateError.',
        followUpQuestions: [
          'How does the microtask queue schedule Promise resolution callbacks?',
          'What is an unhandled promise rejection and how is it detected in Node.js / browsers?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-prom-1',
        title: 'Implement a Promise Timeout Wrapper',
        difficulty: 'intermediate',
        description: 'Write a timeout(promise, ms) function that rejects if the target promise does not settle within ms milliseconds.',
        hints: ['Use Promise.race with a setTimeout rejection'],
        solution: `function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(\`Timed out after \${ms}ms\`)), ms);
  });

  return Promise.race([promise, timeoutPromise]);
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-prom-1',
        question: 'If one promise rejects inside Promise.all([p1, p2, p3]), what is the immediate outcome?',
        type: 'multiple-choice',
        options: [
          'Promise.all waits for p2 and p3 to finish, then rejects',
          'Promise.all rejects immediately with the error of the failed promise',
          'Promise.all returns null',
          'Promise.all ignores the error and returns fulfilled results'
        ],
        correctAnswer: 1,
        explanation: 'Promise.all has fail-fast semantics: the moment any promise rejects, the returned master promise rejects immediately.'
      }
    ]
  },

  'async-await': {
    overview: 'Deep dive into Async/Await syntax: Syntactic sugar over Promises and Generators, try/catch error handling, sequential vs parallel execution patterns, and top-level await.',
    whyItExists: `While Promises eliminated callback hell, extensive .then() chains and nested promise scopes could still become verbose and difficult to reason about.
Async/await (introduced in ES2017) allows writing asynchronous code that looks and behaves like synchronous code:
1. Eliminates chained callback boilerplate.
2. Enables standard try/catch blocks for error handling across both synchronous and asynchronous operations.
3. Simplifies conditional branching and loops involving asynchronous operations.`,
    howItWorks: `1. HOW ASYNC/AWAIT WORKS INTERNALLY:
- The 'async' keyword ensures a function ALWAYS returns a Promise. If the function returns a primitive (e.g. return 42), JavaScript wraps it in Promise.resolve(42).
- The 'await' keyword pauses the execution of the async function until the awaited Promise settles.
- Internally, async/await is implemented using ES6 Generators and the Microtask Queue. When 'await' is encountered, execution yields control back to the caller while the remainder of the function is queued as a microtask callback!

2. SEQUENTIAL VS CONCURRENT EXECUTION:
- Sequential (Often an Anti-pattern):
  const a = await fetchA();
  const b = await fetchB(); // B does not start until A finishes! Total time = A + B.
- Parallel (Optimal):
  const [a, b] = await Promise.all([fetchA(), fetchB()]); // Both start concurrently! Total time = max(A, B).`,
    codeExamples: [
      {
        id: 'aa-ex-1',
        title: 'Sequential vs Parallel Async Execution',
        description: 'Avoiding the accidental serialization bottleneck when fetching independent API endpoints.',
        language: 'typescript',
        level: 'basic',
        code: `// SLOW: Accidental Sequential Execution (Waterfall)
async function loadUserDataSlow(userId: string) {
  // Post request must wait for user request to finish, even though they are independent!
  const user = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
  const posts = await fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json());
  return { user, posts };
}

// FAST: Parallel Execution with Promise.all
async function loadUserDataFast(userId: string) {
  // Fire both network requests concurrently!
  const userPromise = fetch(\`/api/users/\${userId}\`).then(r => r.json());
  const postsPromise = fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json());

  // Wait for both to complete in parallel
  const [user, posts] = await Promise.all([userPromise, postsPromise]);
  return { user, posts };
}`,
        explanation: 'Failing to initiate promises concurrently before awaiting creates an unnecessary network waterfall that doubles response times.'
      },
      {
        id: 'aa-ex-2',
        title: 'Clean Error Handling with Async/Await in React Hooks',
        description: 'Standard useEffect async data fetching pattern with error handling and mounted flags.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useState, useEffect } from 'react';

export function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(\`/api/products/\${productId}\`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        
        if (isMounted) setProduct(data);
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      isMounted = false; // Teardown flag prevents state update on unmounted component
    };
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  return <div>{product?.name}</div>;
}`,
        explanation: 'useEffect cannot be directly declared as an async function; you must declare an inner async function and invoke it.'
      }
    ],
    realWorldUseCases: [
      'React Server Components data fetching directly inside async component functions.',
      'API route handlers in Next.js (App Router GET/POST).',
      'Sequential migration scripts and data transformation pipelines.'
    ],
    commonMistakes: [
      {
        title: 'Making a useEffect callback directly async',
        description: 'Declaring useEffect(async () => { ... }) causes the effect to return a Promise instead of a cleanup function, breaking React effect lifecycle.',
        wrongCode: `// Fatal Error: useEffect must not return a Promise!
useEffect(async () => {
  const data = await fetchUsers();
}, []);`,
        correctCode: `// Correct: Declare inner async function
useEffect(() => {
  async function load() {
    const data = await fetchUsers();
  }
  load();
}, []);`,
        explanation: 'React expects useEffect to return either undefined or a cleanup teardown function (void | (() => void)).'
      }
    ],
    bestPractices: [
      'Start independent promises before awaiting them or use Promise.all to prevent sequential waterfalls.',
      'Always wrap await statements in try/catch/finally blocks.',
      'In React components, use TanStack Query or Server Components instead of ad-hoc useEffect data fetching.'
    ],
    performanceNotes: [
      'Each await keyword introduces a microtask yield. Excessive microtask yields in high-frequency loops can delay main-thread rendering.',
      'V8 optimizes async functions using zero-cost async stack traces, making stack traces in modern Node/Chrome much easier to read.'
    ],
    interviewQuestions: [
      {
        id: 'iq-aa-1',
        question: 'How does async/await work under the hood in JavaScript?',
        difficulty: 'advanced',
        answer: 'Async/await is syntactic sugar built on top of Promises and Generators. An async function is effectively a generator function wrapped by an execution runner (similar to the "co" library). When an await expression is reached, the generator yields the promise. The internal runner attaches a .then() callback to the promise. When the promise resolves, the runner calls generator.next(value) with the result, resuming execution inside the function as a microtask.',
        followUpQuestions: [
          'Why cannot an async function be passed directly to React useEffect?',
          'What happens if an error is thrown inside an async function without a try/catch?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-aa-1',
        title: 'Refactor Promise Chains to Async/Await with Parallel Optimization',
        difficulty: 'intermediate',
        description: 'Convert a multi-tier .then/.catch promise chain into clean, non-blocking async/await code.',
        hints: ['Group independent promises into Promise.all'],
        solution: `async function getFullUserProfile(userId: string) {
  try {
    const userRes = await fetch(\`/api/user/\${userId}\`);
    if (!userRes.ok) throw new Error('User not found');
    const user = await userRes.json();

    // Fetch orders and reviews concurrently
    const [orders, reviews] = await Promise.all([
      fetch(\`/api/orders?user=\${user.id}\`).then(r => r.json()),
      fetch(\`/api/reviews?user=\${user.id}\`).then(r => r.json())
    ]);

    return { ...user, orders, reviews };
  } catch (err) {
    console.error('Profile fetch failed:', err);
    throw err;
  }
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-aa-1',
        question: 'What is the return value of an async function that contains: return 100;?',
        type: 'multiple-choice',
        options: [
          'The number 100',
          'A Promise that resolves with the number 100',
          'undefined',
          'A generator iterator'
        ],
        correctAnswer: 1,
        explanation: 'Async functions always wrap their return values in a Promise: return 100 returns Promise.resolve(100).'
      }
    ]
  },

  'array-methods': {
    overview: 'Complete guide to JavaScript Array methods: Pure/Immutable methods (map, filter, reduce, toSorted, toReversed, flatMap) vs Mutating methods (push, pop, splice, sort), and functional data transformations in React.',
    whyItExists: `React rendering is built entirely on immutability and declarative transformations:
- To render a list of JSX elements: items.map(item => <Card key={item.id} />).
- To remove an item from state: items.filter(item => item.id !== deletedId).
- To calculate summary statistics: items.reduce((sum, item) => sum + item.price, 0).
Mutating arrays with methods like array.sort() or array.push() in React state breaks change detection and corrupts UI state.`,
    howItWorks: `1. IMMUTABLE / PURE METHODS (Returns a new array):
- .map(fn): Transforms every element into a new value. Length stays identical.
- .filter(predicate): Returns a subset of elements matching the condition.
- .reduce(fn, initial): Accumulates array elements into a single value (number, object, group).
- .flatMap(fn): Maps each element and flattens result by 1 level.
- Modern ES2023 Pure Methods:
  - .toSorted(): Pure version of .sort() (returns new array).
  - .toReversed(): Pure version of .reverse().
  - .toSpliced(): Pure version of .splice().

2. MUTATING / IMPURE METHODS (Mutates array in-place!):
- .push(), .pop(), .shift(), .unshift()
- .splice()
- .sort(), .reverse()
Warning: NEVER call mutating methods directly on React state arrays! Use [...array].sort() or array.toSorted().`,
    codeExamples: [
      {
        id: 'arr-ex-1',
        title: 'Mastering Array.prototype.reduce for Grouping and Aggregation',
        description: 'Grouping an array of transactions by category and calculating category totals in a single pass.',
        language: 'typescript',
        level: 'intermediate',
        code: `interface Transaction {
  id: string;
  category: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: '1', category: 'Food', amount: 25 },
  { id: '2', category: 'Tech', amount: 120 },
  { id: '3', category: 'Food', amount: 15 },
  { id: '4', category: 'Travel', amount: 200 }
];

// Grouping by category using reduce
const categoryTotals = transactions.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});

console.log(categoryTotals);
// Output: { Food: 40, Tech: 120, Travel: 200 }`,
        explanation: 'reduce() is the Swiss Army knife of functional JavaScript, capable of implementing map, filter, grouping, and piping.'
      },
      {
        id: 'arr-ex-2',
        title: 'Immutable State Array Operations in React',
        description: 'The canonical patterns for adding, removing, updating, and sorting items in React state.',
        language: 'tsx',
        level: 'basic',
        code: `import { useState } from 'react';

interface Item { id: string; title: string; count: number; }

export function ItemManager() {
  const [items, setItems] = useState<Item[]>([]);

  // 1. ADD ITEM: Spread into new array
  const addItem = (title: string) => {
    setItems(prev => [...prev, { id: crypto.randomUUID(), title, count: 1 }]);
  };

  // 2. REMOVE ITEM: Filter out target id
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // 3. UPDATE ITEM: Map and replace matching item
  const incrementCount = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };

  // 4. SORT ITEMS: toSorted() preserves immutability!
  const sortedItems = items.toSorted((a, b) => b.count - a.count);

  return (
    <div>{/* JSX rendering items */}</div>
  );
}`,
        explanation: 'Immutable array operations guarantee that React receives a new memory reference, triggering clean and predictable re-renders.'
      }
    ],
    realWorldUseCases: [
      'Rendering dynamic lists and tables in React component trees.',
      'Transforming API backend data schemas into UI presentation models.',
      'Filtering, searching, and sorting e-commerce product catalogs.'
    ],
    commonMistakes: [
      {
        title: 'Using array.sort() directly on React state',
        description: 'The native array.sort() method sorts the array IN-PLACE and returns the same reference, meaning React will not detect any change!',
        wrongCode: `// Broken: Mutates state array in-place, same reference!
const sortItems = () => {
  items.sort((a, b) => a.price - b.price);
  setItems(items); // React skips re-render!
};`,
        correctCode: `// Correct: Create new array with toSorted or spread
const sortItems = () => {
  setItems(items.toSorted((a, b) => a.price - b.price));
};`,
        explanation: 'Always use .toSorted() or [...items].sort() to avoid in-place mutation of state.'
      }
    ],
    bestPractices: [
      'Use map, filter, and reduce for all data transformations to maintain purity.',
      'Adopt ES2023 toSorted(), toReversed(), and toSpliced() for immutable operations.',
      'Always supply an initial value to reduce() to prevent errors on empty arrays.'
    ],
    performanceNotes: [
      'Chaining multiple operations (.filter().map().filter()) creates intermediate arrays. For huge datasets (100,000+ items), consider a single reduce() or a generator loop.',
      'V8 optimizes homogeneous arrays (arrays containing single types like numbers) as packed SMI arrays.'
    ],
    interviewQuestions: [
      {
        id: 'iq-arr-1',
        question: 'What is the difference between Array.prototype.map and Array.prototype.forEach?',
        difficulty: 'basic',
        answer: 'Array.prototype.map executes a callback on each element and returns a BRAND NEW array containing the results of the callback, without mutating the original array. Array.prototype.forEach executes a callback on each element for its side-effects and always returns undefined. In React, map is used inside JSX to generate element lists; forEach cannot be used directly in JSX because it returns undefined.',
        followUpQuestions: [
          'Can you break out of a forEach loop using break or return?',
          'What are the new ES2023 immutable array methods?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-arr-1',
        title: 'Implement Array.prototype.map and filter with Reduce',
        difficulty: 'intermediate',
        description: 'Recreate map and filter functions using only Array.prototype.reduce.',
        hints: ['acc.push(fn(item)) inside reduce'],
        solution: `function customMap<T, R>(arr: T[], fn: (item: T, idx: number) => R): R[] {
  return arr.reduce<R[]>((acc, item, idx) => {
    acc.push(fn(item, idx));
    return acc;
  }, []);
}

function customFilter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.reduce<T[]>((acc, item) => {
    if (predicate(item)) acc.push(item);
    return acc;
  }, []);
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-arr-1',
        question: 'Which of the following array methods mutates the original array in-place?',
        type: 'multiple-choice',
        options: [
          'concat()',
          'slice()',
          'splice()',
          'filter()'
        ],
        correctAnswer: 2,
        explanation: 'splice() mutates the original array by removing or replacing existing elements. slice(), concat(), and filter() return new arrays.'
      }
    ]
  }
};
