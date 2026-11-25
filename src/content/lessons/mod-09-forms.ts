import type { LessonContent } from '../../types';

export const MOD_09_LESSONS: Record<string, Partial<LessonContent>> = {
  'react-hook-form': {
    overview: 'Complete guide to React Hook Form (RHF): Uncontrolled form performance, register, handleSubmit, Controller component, formState (errors, isSubmitting, isValid), and integration with UI component libraries.',
    whyItExists: `Traditional controlled forms in React (where every input has value={val} and onChange={e => setVal(e.target.value)}) have major flaws:
1. Every single keystroke triggers a re-render of the entire form and all child inputs.
2. Large forms with 30-50 fields suffer from severe typing lag on mobile devices.
3. Managing validation errors, dirty states, and touched fields manually requires thousands of lines of boilerplate.
React Hook Form solves this by embracing Uncontrolled Inputs with Refs:
- Keystrokes do NOT trigger component re-renders!
- Input values are stored directly in native browser DOM nodes and read only when needed.
- Up to 10-20x faster rendering performance than Formik or controlled forms.`,
    howItWorks: `1. HOW REACT HOOK FORM WORKS:
- register: Attaches an unmanaged ref to the input element and registers event listeners for validation:
  <input {...register('username', { required: 'Username required' })} />
- handleSubmit: Validates all registered fields before executing your onSubmit callback.
- formState: Provides reactive proxies for errors, isSubmitting, isDirty, and isValid.

2. THE CONTROLLER COMPONENT:
For custom UI components (like Radix UI Select, Material UI DatePicker, or React Select) that do not expose a native input ref, RHF provides <Controller render={({ field }) => ...} /> to bridge controlled components seamlessly.`,
    codeExamples: [
      {
        id: 'rhf-ex-1',
        title: 'High-Performance Form with React Hook Form and Zod Validation',
        description: 'Building an enterprise registration form with schema validation and error feedback.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  age: number;
  newsletter: boolean;
}

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: { email: '', age: 18, newsletter: false }
  });

  const onSubmit = async (data: FormValues) => {
    // Zero re-renders while typing! Data is extracted upon submission.
    console.log('Valid form data submitted:', data);
    await new Promise(r => setTimeout(r, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Email Address</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\\S+@\\S+\\.\\S+/, message: 'Invalid email address' }
          })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Age</label>
        <input
          type="number"
          {...register('age', { valueAsNumber: true, min: { value: 18, message: 'Must be at least 18' } })}
          className="w-full p-2 border rounded"
        />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}`,
        explanation: 'React Hook Form leverages native uncontrolled inputs through refs, keeping the form component mounted without re-rendering on keystrokes.'
      }
    ],
    realWorldUseCases: [
      'High-performance enterprise checkout and onboarding wizards with 50+ fields.',
      'Complex dynamic forms with field arrays (add/remove row items on the fly).',
      'Integration with Zod and Yup schema resolvers for full end-to-end type safety.'
    ],
    commonMistakes: [
      {
        title: 'Manually setting value and onChange on registered inputs',
        description: 'Overriding value or onChange on an input after spreading {...register()} breaks React Hook Form registration and returns the component to slow controlled mode!',
        wrongCode: `<input {...register('name')} value={myValue} onChange={myChange} />`,
        correctCode: `<input {...register('name')} /> // Let RHF manage props!`,
        explanation: 'register() provides its own ref, name, onChange, and onBlur. Do not override them manually.'
      }
    ],
    bestPractices: [
      'Use zodResolver with Zod for robust schema-based validation.',
      'Use the Controller component when integrating with non-native custom UI libraries.',
      'Use useFieldArray for dynamic field lists (e.g. adding multiple invoice items).'
    ],
    performanceNotes: [
      'Eliminates 95% of re-renders during form filling compared to controlled forms.',
      'RHF only re-renders components when error states change or when watched fields update.'
    ],
    interviewQuestions: [
      {
        id: 'iq-rhf-1',
        question: 'Why is React Hook Form drastically faster than controlled forms (like Formik)?',
        difficulty: 'intermediate',
        answer: 'Controlled forms store input state in React component state (useState). Every keystroke triggers a component re-render, running layout calculations for all inputs in the form. In large forms, this produces noticeable input latency. React Hook Form uses Uncontrolled Inputs via native DOM refs. Keystrokes are captured directly by the browser DOM without notifying React, resulting in ZERO component re-renders while typing. React only reads the input values when the form is submitted or when a validation rule fails.',
        followUpQuestions: ['How does React Hook Form handle third-party controlled components like React-Select?']
      }
    ],
    exercises: [
      {
        id: 'ex-rhf-1',
        title: 'Build a Dynamic Form with useFieldArray',
        difficulty: 'advanced',
        description: 'Implement a form that allows users to dynamically add and remove line items using RHF useFieldArray.',
        hints: ['const { fields, append, remove } = useFieldArray({ control, name: "items" })'],
        solution: `const { fields, append, remove } = useFieldArray({ control, name: "items" });
// Render: fields.map((item, index) => <input {...register(\`items.\${index}.name\`)} />)`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rhf-1',
        question: 'By default, does typing in an input registered with React Hook Form {...register()} trigger a component re-render?',
        type: 'multiple-choice',
        options: [
          'Yes, on every single keystroke',
          'No, inputs are uncontrolled via refs and do not re-render the component while typing',
          'Only if the form is valid',
          'Only in development mode'
        ],
        correctAnswer: 1,
        explanation: 'React Hook Form uses uncontrolled inputs under the hood; keystrokes are handled by the browser DOM without triggering React re-renders.'
      }
    ]
  },

  'zod-validation': {
    overview: 'Complete guide to Zod Schema Validation: Defining type-safe schemas, inferring TypeScript types (z.infer), validating API payloads, and integrating Zod with React Hook Form via @hookform/resolvers.',
    whyItExists: `TypeScript types only exist at compile time; once your code is compiled to JavaScript, all type checks evaporate.
At runtime:
1. API responses could return unexpected nulls or missing fields, crashing your app.
2. User form inputs could contain invalid data.
Zod bridges this gap: it defines a single Schema that validates data at runtime AND automatically generates static TypeScript types!`,
    howItWorks: `1. DEFINING A ZOD SCHEMA:
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, 'At least 3 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
  role: z.enum(['admin', 'user'])
});

2. INFERRING TYPES AUTOMATICALLY:
// No need to write a separate interface! Zod infers it directly:
export type User = z.infer<typeof userSchema>;

3. VALIDATING DATA:
- userSchema.parse(data): Validates and returns typed data, or throws ZodError.
- userSchema.safeParse(data): Returns { success: true, data } or { success: false, error } without throwing!`,
    codeExamples: [
      {
        id: 'zod-ex-1',
        title: 'End-to-End Type Safety: React Hook Form + Zod Resolver',
        description: 'Connecting a Zod schema to React Hook Form for automatic form validation and type inference.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Single Source of Truth: Define Schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean().default(false)
});

// 2. Automatically derive TypeScript interface!
type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) // Bridges Zod to RHF!
  });

  const onSubmit = (data: LoginFormValues) => {
    // 'data' is guaranteed to be 100% valid and typed!
    console.log('Login credentials:', data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('email')} placeholder="Email" className="p-2 border" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('password')} type="password" placeholder="Password" className="p-2 border" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        Sign In
      </button>
    </form>
  );
}`,
        explanation: 'zodResolver connects Zod validation errors directly to React Hook Form formState.errors, ensuring your UI matches your backend schema.'
      }
    ],
    realWorldUseCases: [
      'Validating incoming API payloads and environment variables (env.mjs).',
      'Client-side and Server-side form validation in Next.js Server Actions.',
      'Inferring database schemas and REST API contracts in TypeScript.'
    ],
    commonMistakes: [
      {
        title: 'Duplicate typing: Writing an interface AND a separate Zod schema',
        description: 'Manually maintaining both interface User and userSchema leads to synchronization bugs when fields are added or modified.',
        explanation: 'Always use type User = z.infer<typeof userSchema> to derive the TypeScript type from the Zod schema automatically.'
      }
    ],
    bestPractices: [
      'Use safeParse() instead of parse() when validating user input to avoid try/catch blocks.',
      'Use z.infer to keep types in sync with schemas automatically.',
      'Compose schemas using .extend(), .merge(), or .pick() to avoid code duplication.'
    ],
    performanceNotes: [
      'Zod parses objects in microseconds with minimal memory allocation.',
      'Zero external dependencies and works in browsers, Node.js, and edge runtimes.'
    ],
    interviewQuestions: [
      {
        id: 'iq-zod-1',
        question: 'Why is runtime schema validation (like Zod) necessary in a TypeScript codebase?',
        difficulty: 'intermediate',
        answer: 'TypeScript only provides static type checking during development and build time. Once compiled to JavaScript, all type annotations are stripped away. At runtime, data entering your application from external sources (such as REST API responses, user form inputs, localStorage, or environment variables) is completely untrusted. Without runtime validation, an API returning null instead of an array can crash the app with "Cannot read properties of null". Zod validates data at runtime and guarantees that the shape matches your TypeScript types.',
        followUpQuestions: ['What is the difference between parse() and safeParse() in Zod?']
      }
    ],
    exercises: [
      {
        id: 'ex-zod-1',
        title: 'Build a Nested E-Commerce Order Schema with Zod',
        difficulty: 'intermediate',
        description: 'Define an order schema with customer info, array of items with quantity/price, and payment method.',
        hints: ['z.object({ items: z.array(z.object(...)) })'],
        solution: `const orderSchema = z.object({
  id: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })).min(1, 'Order must contain at least 1 item'),
  total: z.number().positive()
});`
      }
    ],
    quizQuestions: [
      {
        id: 'q-zod-1',
        question: 'How do you extract the TypeScript interface from a Zod schema named mySchema?',
        type: 'multiple-choice',
        options: [
          'type MyType = mySchema.type',
          'type MyType = z.infer<typeof mySchema>',
          'type MyType = z.extract<mySchema>',
          'type MyType = typeof mySchema'
        ],
        correctAnswer: 1,
        explanation: 'z.infer<typeof mySchema> automatically computes and derives the static TypeScript type representation from the runtime Zod schema.'
      }
    ]
  }
};
