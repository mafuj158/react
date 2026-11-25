import type { LessonContent } from '../../types';

export const MOD_14_LESSONS: Record<string, Partial<LessonContent>> = {
  'why-nextjs': {
    overview: 'Complete comparison between Vanilla React (SPA) and Next.js: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), React Server Components (RSC), SEO optimization, and file-based routing.',
    whyItExists: `A standard Single Page Application (SPA) built with Vite ships an empty HTML shell (<div id="root"></div>) and a JavaScript bundle.
This creates two critical flaws for production applications:
1. Poor SEO: Web crawlers see an empty page before JavaScript loads and executes.
2. Slow Initial Load (LCP): On slow mobile networks, users stare at a blank white screen while downloading multi-megabyte JavaScript bundles.
Next.js solves this by rendering HTML on the server, streaming content instantly, and eliminating client-side bundle weight.`,
    howItWorks: `THE 4 RENDERING STRATEGIES COMPARED:

1. CSR (Client-Side Rendering):
- HTML is an empty shell; browser downloads JS, runs React, and builds the DOM.
- Fast subsequent navigation, but poor initial load and poor SEO.

2. SSR (Server-Side Rendering):
- Server executes component code on EVERY request and returns fully formed HTML.
- Perfect for real-time dynamic user data and social media preview tags.

3. SSG (Static Site Generation):
- HTML is generated ONCE at build time (npm run build) and served from global CDNs.
- Blazing fast TTFB (< 50ms), perfect for blogs, marketing pages, and documentation.

4. ISR (Incremental Static Regeneration):
- Combines the speed of SSG with the freshness of SSR.
- Generates static pages at build time, but re-generates them in the background on the CDN edge every N seconds!`,
    codeExamples: [
      {
        id: 'nxt-ex-1',
        title: 'Static Generation vs Dynamic Server Rendering in Next.js',
        description: 'Demonstrating how route segment config controls static vs dynamic rendering behavior.',
        language: 'tsx',
        level: 'basic',
        code: `// Next.js App Router (app/blog/[slug]/page.tsx)

// Force static caching or revalidation:
export const revalidate = 3600; // Revalidate at most once every hour (ISR)

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // This fetch executes on the server! Direct database access or cached fetch
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 3600 }
  }).then(r => r.json());

  return (
    <article className="prose max-w-2xl mx-auto p-6">
      <h1>{post.title}</h1>
      <p className="text-gray-500">Published on {post.date}</p>
      <div>{post.content}</div>
    </article>
  );
}`,
        explanation: 'In the Next.js App Router, components are Server Components by default: data is fetched directly on the server without shipping fetch code or libraries to the browser.'
      }
    ],
    realWorldUseCases: [
      'E-commerce websites requiring fast SEO indexing, high Core Web Vitals scores, and instant product previews.',
      'SaaS marketing pages and documentation hubs requiring sub-50ms worldwide edge delivery.',
      'Enterprise web portals requiring authenticated server-rendered dashboards.'
    ],
    commonMistakes: [
      {
        title: 'Adding "use client" at the top of every file in Next.js',
        description: 'Adding "use client" everywhere converts your Next.js application back into a standard client-side SPA, losing all bundle size and SEO benefits of Server Components.',
        explanation: 'Keep components as Server Components by default. Add "use client" only to leaf components that need onClick, useState, or browser APIs.'
      }
    ],
    bestPractices: [
      'Default to React Server Components (RSC) for data fetching and layout shells.',
      'Push "use client" boundaries down to leaf interactive elements (like a search input or like button).',
      'Use revalidate config for ISR caching on static pages.'
    ],
    performanceNotes: [
      'Server Components ship 0 KB of JavaScript to the browser client, slashing bundle sizes by 30-60%.',
      'Edge CDN caching delivers static HTML snapshots in under 30ms globally.'
    ],
    interviewQuestions: [
      {
        id: 'iq-nxt-1',
        question: 'What are the main architectural differences between CSR, SSR, SSG, and ISR?',
        difficulty: 'intermediate',
        answer: '1) CSR (Client-Side Rendering): The browser downloads an empty HTML shell and a JS bundle that executes to build the DOM. Fast page transitions, but slow initial load and poor SEO. 2) SSR (Server-Side Rendering): HTML is generated on the server on every incoming request. Good for SEO and real-time data, but higher server compute load. 3) SSG (Static Site Generation): HTML is built once at deploy time and distributed via CDNs. Ultra-fast TTFB, but cannot show dynamic per-user data. 4) ISR (Incremental Static Regeneration): Serves cached static pages from CDN, but re-generates them in the background after a specified revalidate interval without redeploying the entire app.',
        followUpQuestions: ['How do React Server Components (RSC) differ from traditional SSR?']
      }
    ],
    exercises: [
      {
        id: 'ex-nxt-1',
        title: 'Configure ISR Revalidation in Next.js',
        difficulty: 'intermediate',
        description: 'Set up an e-commerce product page that caches data statically and regenerates in the background every 60 seconds.',
        hints: ['export const revalidate = 60'],
        solution: `// app/products/[id]/page.tsx
export const revalidate = 60; // 60 seconds ISR revalidation`
      }
    ],
    quizQuestions: [
      {
        id: 'q-nxt-1',
        question: 'Which rendering strategy builds HTML once at deploy time and distributes it globally on CDNs with background revalidation?',
        type: 'multiple-choice',
        options: [
          'Client-Side Rendering (CSR)',
          'Server-Side Rendering (SSR)',
          'Incremental Static Regeneration (ISR)',
          'Single Page App (SPA)'
        ],
        correctAnswer: 2,
        explanation: 'ISR (Incremental Static Regeneration) serves static cached HTML from CDN edge locations while re-generating fresh content in the background on a schedule.'
      }
    ]
  },

  'app-router': {
    overview: 'Deep dive into Next.js App Router: Directory conventions (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx), Nested Layouts, Route Groups, and Dynamic Segments.',
    whyItExists: `The legacy Next.js Pages Router (/pages) had significant architectural limitations:
1. Layouts could not be nested without complex custom getLayout wrappers.
2. Data fetching required special top-level exports (getServerSideProps, getStaticProps) that could only run at the page root, not in individual components.
3. Every page required client-side hydration.
The App Router (/app) built on React Server Components resolves all of these issues:
- Co-located nested layouts that do not re-render when navigating between sub-routes.
- Granular streaming with React Suspense (<loading.tsx>).
- Built-in error boundaries (<error.tsx>) at any route level.`,
    howItWorks: `1. SPECIAL FILE CONVENTIONS:
- layout.tsx: Shared UI shell for a segment and its children. Preserves state across navigation and never re-renders!
- page.tsx: The unique, publicly accessible UI for a route.
- loading.tsx: Instant loading skeleton wrapped in <Suspense> for streaming.
- error.tsx: Client-side error boundary wrapped around the segment (<ErrorBoundary>).
- not-found.tsx: UI rendered when notFound() is thrown.

2. NESTED ROUTING HIERARCHY:
app/
├── layout.tsx       # Root layout (<html>, <body>, Global Nav)
├── page.tsx         # / (Home page)
└── dashboard/
    ├── layout.tsx   # Dashboard layout (Sidebar, Header)
    ├── page.tsx     # /dashboard
    └── settings/
        └── page.tsx # /dashboard/settings
Navigating from /dashboard to /dashboard/settings preserves the Dashboard layout state and re-renders ONLY the settings page!`,
    codeExamples: [
      {
        id: 'app-ex-1',
        title: 'Nested Layout and Error Boundary Architecture',
        description: 'Building a robust nested dashboard layout with co-located loading and error states.',
        language: 'tsx',
        level: 'intermediate',
        code: `// app/dashboard/layout.tsx (Server Component)
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2>Dashboard Menu</h2>
        {/* State inside sidebar is preserved when navigating child routes! */}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

// app/dashboard/error.tsx (Must be a Client Component!)
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 border border-red-500 rounded bg-red-50">
      <h3 className="text-red-700 font-bold">Dashboard Segment Crashed!</h3>
      <p className="text-sm text-red-600">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 px-3 py-1 bg-red-600 text-white rounded">
        Try Again
      </button>
    </div>
  );
}`,
        explanation: 'Nested layouts preserve scroll position and component state when users navigate between sub-pages, while error.tsx isolates crashes to the specific route segment.'
      }
    ],
    realWorldUseCases: [
      'Multi-tenant enterprise apps with nested navigation (Admin -> Organizations -> Projects -> Settings).',
      'Streaming slow database queries with loading.tsx while keeping header and sidebar immediately interactive.',
      'Route Groups ((auth), (dashboard)) to share distinct layouts without adding extra URL segments.'
    ],
    commonMistakes: [
      {
        title: 'Making error.tsx a Server Component',
        description: 'Next.js error boundaries MUST be Client Components because they need to catch runtime errors and provide interactive reset() functions.',
        wrongCode: `// app/error.tsx (Missing 'use client'!)
export default function Error() { ... }`,
        correctCode: `'use client'; // Required!
export default function Error() { ... }`,
        explanation: 'Always add "use client" to error.tsx files.'
      }
    ],
    bestPractices: [
      'Use loading.tsx for instant visual feedback and streaming with Suspense.',
      'Use Route Groups like app/(marketing)/ and app/(dashboard)/ to organize folders without affecting URLs.',
      'Keep layout.tsx pure and lightweight.'
    ],
    performanceNotes: [
      'Next.js streams server HTML chunks as they finish via React Suspense, dramatically improving Time to First Byte (TTFB).',
      'Shared layouts avoid unmounting and remounting DOM trees during client navigation.'
    ],
    interviewQuestions: [
      {
        id: 'iq-app-1',
        question: 'What are the key differences between the Next.js Pages Router and the App Router?',
        difficulty: 'advanced',
        answer: '1) Architecture: Pages Router is client-centric; App Router is built on React Server Components (RSC) where components are server-rendered by default. 2) Layouts: Pages Router lacked nested layouts (required manual getLayout); App Router supports co-located nested layout.tsx files that preserve state on route changes. 3) Data Fetching: Pages Router used top-level exports (getServerSideProps, getStaticProps); App Router allows direct async/await fetching anywhere in any Server Component. 4) Granular Streaming: App Router supports loading.tsx and Suspense streaming out of the box. 5) Bundle Size: App Router ships 0 KB JS for server components.',
        followUpQuestions: ['Why must error.tsx be a Client Component?']
      }
    ],
    exercises: [
      {
        id: 'ex-app-1',
        title: 'Design an App Router Folder Hierarchy for an E-Commerce Store',
        difficulty: 'intermediate',
        description: 'Map out the folder structure for home, product list, product detail, and checkout with separate layouts.',
        hints: ['app/(store)/layout.tsx and app/(checkout)/layout.tsx'],
        solution: `app/
├── (store)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── products/
│       ├── page.tsx
│       └── [id]/page.tsx
└── (checkout)/
    ├── layout.tsx
    └── checkout/page.tsx`
      }
    ],
    quizQuestions: [
      {
        id: 'q-app-1',
        question: 'In the Next.js App Router, do nested layouts (layout.tsx) re-render when navigating between sibling child routes?',
        type: 'multiple-choice',
        options: [
          'Yes, the entire layout unmounts and remounts on every navigation',
          'No, layouts preserve state, maintain scroll position, and do not re-render on navigation',
          'Only if configured with revalidate',
          'Only when navigating backwards'
        ],
        correctAnswer: 1,
        explanation: 'In the App Router, layouts are persistent: on navigation, React updates only the changing child page while the parent layout preserves its DOM state.'
      }
    ]
  },

  'server-actions': {
    overview: 'Mastery of Next.js Server Actions and React Form Actions: Writing async server functions with "use server", invoking from forms without client JS, revalidating cache (revalidatePath, revalidateTag), and optimistic updates.',
    whyItExists: `Traditionally, submitting a form in React required:
1. Writing an API route handler (e.g. /pages/api/submit.ts).
2. Setting up an event listener in the component with e.preventDefault().
3. Serializing state into JSON, calling fetch(), and managing loading/error state manually.
Server Actions streamline this into a single seamless paradigm:
- You write an async function with 'use server' directly in your component or action file.
- The function executes securely on the server with direct database access.
- Works even if client-side JavaScript is still downloading or disabled (Progressive Enhancement)!`,
    howItWorks: `1. HOW SERVER ACTIONS WORK:
- When a server action is declared ('use server'), Next.js creates an encrypted, type-safe RPC POST endpoint under the hood.
- When invoked from a form (<form action={myServerAction}>), the browser submits the FormData via a POST request.
- The server executes the function (queries database, updates sessions) and can call revalidatePath('/posts') to trigger an automated cache purge and UI update.

2. PROGRESSIVE ENHANCEMENT:
Because Server Actions integrate with native HTML <form action>, forms function properly even before JavaScript has hydrated on slow mobile devices!`,
    codeExamples: [
      {
        id: 'sa-ex-1',
        title: 'Complete Server Action with Revalidation and Error Handling',
        description: 'Inserting data into a database and purging the page cache in a single server function.',
        language: 'tsx',
        level: 'advanced',
        code: `// app/actions/todo-actions.ts
'use server'; // Marks all exported functions in this file as Server Actions!

import { revalidatePath } from 'next/cache';

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim().length === 0) {
    return { error: 'Title cannot be empty' };
  }

  try {
    // 1. Direct database access on the server!
    // await db.todo.create({ data: { title } });
    console.log('Saved to database securely on server:', title);

    // 2. Purge cached HTML and refresh the UI automatically!
    revalidatePath('/todos');

    return { success: true };
  } catch (err: any) {
    return { error: 'Failed to create todo' };
  }
}

// app/todos/page.tsx (Server Component)
import { createTodoAction } from '@/actions/todo-actions';

export default function TodosPage() {
  return (
    <form action={createTodoAction} className="p-4 space-y-2">
      <input name="title" placeholder="What needs to be done?" className="border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add</button>
    </form>
  );
}`,
        explanation: 'The form submits directly to the server action without writing API routes or manual client-side fetch calls.'
      }
    ],
    realWorldUseCases: [
      'Creating, updating, and deleting database records directly from form submissions.',
      'Authentication flows: Login, signup, password reset, and session cookie setting.',
      'Invoking server actions from client components with useTransition or useActionState.'
    ],
    commonMistakes: [
      {
        title: 'Trusting FormData without server-side validation',
        description: 'Server Actions are public network endpoints. Calling a server action without validating input with Zod exposes your backend to malicious payloads.',
        explanation: 'Always validate incoming arguments in Server Actions using a schema library like Zod.'
      }
    ],
    bestPractices: [
      'Store reusable server actions in a dedicated actions/ folder marked with "use server" at the top.',
      'Always validate arguments using Zod schemas on the server.',
      'Use revalidatePath or revalidateTag to refresh stale data caches after mutations.'
    ],
    performanceNotes: [
      'Server Actions eliminate the client bundle weight of REST fetch boilerplate.',
      'Revalidation updates only the specific stale chunks without a full page reload.'
    ],
    interviewQuestions: [
      {
        id: 'iq-sa-1',
        question: 'What are Server Actions in Next.js and how do they support Progressive Enhancement?',
        difficulty: 'advanced',
        answer: 'Server Actions are asynchronous functions defined with the "use server" directive that execute securely on the server. They eliminate the need to manually build separate API routes for form submissions and mutations. Because they bind to native HTML <form action={myAction}> elements, the browser can submit the form using standard HTTP POST even before the client JavaScript bundle finishes downloading or executing (Progressive Enhancement). Once hydrated, Next.js handles submission via background fetch and coordinates automatic cache revalidation (revalidatePath).',
        followUpQuestions: ['How do you handle loading states with Server Actions in client components?']
      }
    ],
    exercises: [
      {
        id: 'ex-sa-1',
        title: 'Build an Authenticated Server Action with Zod Validation',
        difficulty: 'advanced',
        description: 'Write a server action that validates form data using Zod, checks user authentication, and revalidates the cache.',
        hints: ['Use schema.safeParse(Object.fromEntries(formData))'],
        solution: `'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schema = z.object({ title: z.string().min(1) });

export async function addPost(formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { error: 'Invalid input' };
  // await db.post.create(...)
  revalidatePath('/posts');
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-sa-1',
        question: 'Which directive must be placed at the top of a file or function to define a Next.js Server Action?',
        type: 'multiple-choice',
        options: [
          '"use client"',
          '"use server"',
          '"use backend"',
          '"use api"'
        ],
        correctAnswer: 1,
        explanation: 'The "use server" directive marks an async function or file as a Server Action that runs exclusively on the server.'
      }
    ]
  }
};
