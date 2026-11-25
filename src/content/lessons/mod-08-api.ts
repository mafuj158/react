import type { LessonContent } from '../../types';

export const MOD_08_LESSONS: Record<string, Partial<LessonContent>> = {
  'tanstack-query': {
    overview: 'Complete guide to TanStack Query (React Query): Server State Management, useQuery, useMutation, queryClient.invalidateQueries, Cache garbage collection (gcTime / staleTime), and background refetching.',
    whyItExists: `Traditional client-side data fetching with useEffect + useState suffers from chronic problems:
1. Massive boilerplate for loading, error, and data states in every single component.
2. No automated caching: navigating between pages re-triggers identical API requests, creating flashing spinners and high server costs.
3. Race conditions: fast tab switches trigger out-of-order state updates.
TanStack Query solves this by providing a dedicated asynchronous server-state engine with automated caching, deduplication, background revalidation, and retry logic.`,
    howItWorks: `1. THE CORE CONCEPTS:
- QueryClient: The central cache and registry that stores all server query data.
- QueryKey (['users', id]): Unique serializable array that acts as the cache key.
- staleTime: How long data is considered "fresh" before a background refetch is triggered (default: 0ms).
- gcTime (garbage collection time): How long inactive query data stays in memory cache before being deleted (default: 5 minutes).

2. THE useQuery SIGNATURE:
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5 // 5 minutes fresh
});

3. MUTATIONS & CACHE INVALIDATION:
const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    // Invalidate and refetch fresh todos!
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});`,
    codeExamples: [
      {
        id: 'tq-ex-1',
        title: 'Production Data Fetching & Mutations with TanStack Query',
        description: 'Fetching items with automated caching and updating via useMutation with cache invalidation.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo { id: string; title: string; completed: boolean; }

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

async function addTodo(title: string): Promise<Todo> {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export function TodoApp() {
  const queryClient = useQueryClient();

  // 1. Automatic caching, background refetch on window focus, and retry logic!
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // Data stays fresh for 1 minute
  });

  // 2. Mutations with cache invalidation
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Tells TanStack Query: 'todos' data is stale, please refetch in background!
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) return <div>Loading cached todos...</div>;
  if (isError) return <div>Failed to load todos.</div>;

  return (
    <div>
      <button onClick={() => mutation.mutate('New Task')}>Add Task</button>
      <ul>{todos?.map(t => <li key={t.id}>{t.title}</li>)}</ul>
    </div>
  );
}`,
        explanation: 'TanStack Query eliminates manual useEffect code, deduplicates duplicate network requests, and handles background synchronization automatically.'
      }
    ],
    realWorldUseCases: [
      'Enterprise dashboard data fetching with zero-effort background caching.',
      'Infinite scrolling and pagination with useInfiniteQuery.',
      'Optimistic mutations where UI updates before server response confirms.'
    ],
    commonMistakes: [
      {
        title: 'Using unstable inline functions as query keys',
        description: 'Query keys must be stable arrays of serializable values. Passing unstable objects or random values causes endless refetch loops.',
        wrongCode: `useQuery({ queryKey: ['user', { random: Math.random() }], ... })`,
        correctCode: `useQuery({ queryKey: ['user', userId], ... })`,
        explanation: 'Query keys determine cache identity; keep them stable and dependent only on query parameters.'
      }
    ],
    bestPractices: [
      'Always configure a reasonable staleTime (e.g. 1-5 minutes) to prevent immediate refetching on window focus.',
      'Keep query keys structured and hierarchical: ["todos"], ["todos", "detail", id].',
      'Use queryClient.invalidateQueries() after mutations instead of manually editing the cache.'
    ],
    performanceNotes: [
      'Deduplicates multiple identical requests fired simultaneously from different components into a single network call.',
      'Renders instantly from local memory cache while silently revalidating in the background (stale-while-revalidate).'
    ],
    interviewQuestions: [
      {
        id: 'iq-tq-1',
        question: 'What is the difference between staleTime and gcTime in TanStack Query?',
        difficulty: 'advanced',
        answer: 'staleTime is the duration a fetched query is considered fresh. As long as data is fresh, TanStack Query will read directly from the memory cache without triggering a network refetch on window focus or component remount. Once staleTime expires, data is marked "stale", and the next mount or focus triggers a background refetch. gcTime (Garbage Collection time, formerly cacheTime) is how long unused or unmounted query data remains in memory before being permanently deleted. If a component remounts before gcTime expires, cached data is shown instantly while fresh data is refetched.',
        followUpQuestions: ['How does TanStack Query prevent race conditions in fast user searches?']
      }
    ],
    exercises: [
      {
        id: 'ex-tq-1',
        title: 'Implement Optimistic Updates with onMutate and Rollback',
        difficulty: 'advanced',
        description: 'Write a useMutation hook with onMutate that cancels in-flight queries, applies an optimistic update, and rolls back on error.',
        hints: ['queryClient.cancelQueries, return rollback context, use onError(err, vars, context)'],
        solution: `const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old: any) => [...old, newTodo]);
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context?.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});`
      }
    ],
    quizQuestions: [
      {
        id: 'q-tq-1',
        question: 'What is the default value of staleTime in TanStack Query?',
        type: 'multiple-choice',
        options: [
          '5 minutes',
          '0 milliseconds (queries are marked stale immediately)',
          '1 second',
          'Infinity'
        ],
        correctAnswer: 1,
        explanation: 'By default, staleTime is 0ms, meaning fetched data is considered stale immediately, triggering background revalidations on component remount or window focus.'
      }
    ]
  },

  'fetch-and-axios': {
    overview: 'Complete comparison between the native Fetch API and Axios: Request/Response interceptors, Automatic JSON parsing, Cancel tokens & AbortController, Timeout configuration, and Auth headers.',
    whyItExists: `Every React application must communicate with backend APIs. Developers often debate:
1. Native Fetch: Built into all modern browsers and Node 18+, requires 0 dependencies.
2. Axios: Feature-packed HTTP client with request/response interceptors, automatic JSON serialization, and built-in upload progress.
Understanding the architectural trade-offs between both is essential for professional engineering.`,
    howItWorks: `KEY DIFFERENCES COMPARED:

1. Response Status Handling:
- Fetch: Does NOT reject on HTTP 404 or 500! Only rejects on network failure. You must manually check res.ok.
- Axios: Automatically rejects the promise on any HTTP status code outside the 2xx range (4xx and 5xx throw errors).

2. JSON Parsing:
- Fetch: Requires a manual second step: await res.json().
- Axios: Automatically serializes request bodies to JSON and parses response JSON into response.data.

3. Interceptors:
- Fetch: Has no built-in interceptor concept (requires custom wrapper functions).
- Axios: First-class axios.interceptors.request and axios.interceptors.response for injecting JWT tokens and handling refresh tokens globally.`,
    codeExamples: [
      {
        id: 'fa-ex-1',
        title: 'Production Axios Instance with JWT Interceptor and Refresh Token Handling',
        description: 'Creating an Axios client that attaches bearer tokens and catches 401s for automated token refresh.',
        language: 'typescript',
        level: 'intermediate',
        code: `import axios from 'axios';

// 1. Create configured Axios instance
export const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle 401 Unauthorized globally
apiClient.interceptors.response.use(
  (response) => response.data, // Unwraps data directly!
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('Session expired. Redirecting to login...');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);`,
        explanation: 'Axios interceptors centralize authentication headers, error logging, and token refresh workflows in one place.'
      }
    ],
    realWorldUseCases: [
      'Attaching Authorization: Bearer <token> headers to all outgoing requests.',
      'Global error notifications (toast messages) on 500 server errors.',
      'Displaying file upload percentage progress bars via Axios onUploadProgress.'
    ],
    commonMistakes: [
      {
        title: 'Expecting fetch() to reject on 404 or 500 responses',
        description: 'fetch() only rejects when a network error occurs (like being offline). It fulfills normally with res.ok = false on 404/500.',
        explanation: 'Always check if (!response.ok) throw new Error(...) when using the native fetch API.'
      }
    ],
    bestPractices: [
      'Create a centralized API service module (apiClient) rather than scattering raw fetch/axios calls across components.',
      'Always set request timeouts (e.g. 10000ms) to avoid hung promises on mobile connections.',
      'Use AbortController to cancel pending requests when components unmount.'
    ],
    performanceNotes: [
      'Native fetch adds 0 KB to your bundle size, while Axios adds ~11 KB gzipped.',
      'Use fetch in modern Next.js apps where Next enhances fetch with built-in cache and revalidation options.'
    ],
    interviewQuestions: [
      {
        id: 'iq-fa-1',
        question: 'What are the main advantages of Axios over the native Fetch API, and when would you still choose Fetch?',
        difficulty: 'intermediate',
        answer: 'Axios advantages: 1) Built-in Request and Response Interceptors (essential for JWT token injection and refresh logic), 2) Automatic JSON serialization and deserialization, 3) Automatically throws errors on 4xx/5xx status codes, 4) Built-in timeout configuration, and 5) Download/Upload progress tracking. You would choose native fetch when: 1) You want zero bundle size overhead (0 KB), 2) In Next.js where fetch is enhanced with built-in server-side caching, or 3) For simple lightweight applications where basic HTTP calls suffice.',
        followUpQuestions: ['How do you cancel a request using native Fetch?']
      }
    ],
    exercises: [
      {
        id: 'ex-fa-1',
        title: 'Build an Abortable Fetch Wrapper',
        difficulty: 'intermediate',
        description: 'Implement a fetchWithTimeout function that uses AbortController to cancel requests exceeding 5 seconds.',
        hints: ['const controller = new AbortController()', 'fetch(url, { signal: controller.signal })'],
        solution: `async function fetchWithTimeout(url: string, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') throw new Error('Request timed out');
    throw err;
  }
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-fa-1',
        question: 'What does the native window.fetch() promise do when the server responds with HTTP 404 Not Found?',
        type: 'multiple-choice',
        options: [
          'It rejects with an HTTPError',
          'It resolves successfully with response.ok set to false',
          'It returns null',
          'It retries the request 3 times'
        ],
        correctAnswer: 1,
        explanation: 'fetch() resolves successfully for any response received from the server, including 404 and 500, setting response.ok to false.'
      }
    ]
  }
};
