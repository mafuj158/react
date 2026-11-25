import type { LessonContent } from '../../types';

export const MOD_01_LESSONS: Record<string, Partial<LessonContent>> = {
  'how-the-web-works': {
    overview: 'Comprehensive breakdown of web networking: how clients communicate with servers over TCP/IP, the anatomy of HTTP/HTTPS requests, DNS resolution, and the complete journey of a URL from browser keystroke to rendered pixel.',
    whyItExists: `Modern frontend development does not exist in a vacuum. A React Single Page Application (SPA) relies continuously on network requests, DNS lookups, TLS handshakes, caching headers, and HTTP status codes.
Without understanding the underlying network layer:
1. Developers struggle to debug CORS issues, 401/403 authorization failures, and 502/504 gateway timeouts.
2. Applications suffer from poor Time to First Byte (TTFB) and high latency due to unoptimized network round trips.
3. Developers fail to configure caching headers (Cache-Control, ETag), leading to either stale user data or unnecessary server overload.`,
    howItWorks: `THE COMPLETE JOURNEY OF A URL (Step-by-step):

1. URL Parsing & HSTS Check:
- The browser parses the protocol (https), domain (api.example.com), port (443), and path (/users).
- Checks the browser HSTS (HTTP Strict Transport Security) list to enforce HTTPS.

2. DNS Resolution (Hierarchical IP Lookup):
- Checks Browser DNS Cache -> OS DNS Cache -> Router Cache -> ISP Resolver (Recursive Resolver).
- If not cached, queries: Root Nameserver (.) -> TLD Nameserver (.com) -> Authoritative Nameserver (example.com).
- Returns the target server IP address (IPv4 or IPv6).

3. TCP 3-Way Handshake:
- Client sends SYN (Synchronize).
- Server responds with SYN-ACK (Synchronize-Acknowledge).
- Client returns ACK (Acknowledge). The bidirectional TCP connection is established.

4. TLS / SSL Handshake (HTTPS Security):
- ClientHello: Supported cipher suites and TLS version.
- ServerHello & Certificate: Server sends its SSL certificate verified by a Certificate Authority (CA) and public key.
- Key Exchange (Diffie-Hellman or RSA) generates symmetric session keys for encrypted data transfer.

5. HTTP Request & Response Cycle:
- Client transmits HTTP request (Method, Headers, Cookie, Body).
- Web Server (Nginx, Caddy) / Reverse Proxy routes request to backend application server.
- Server returns HTTP response (Status Code, Response Headers, Payload).

6. Browser Parsing & Connection Reuse:
- Keep-Alive and HTTP/2 multiplexing allow multiple concurrent requests over a single TCP connection.`,
    codeExamples: [
      {
        id: 'web-ex-1',
        title: 'Inspecting HTTP Request/Response Headers via Fetch',
        description: 'Demonstrating how to inspect response headers, status codes, and handle redirect/cache policies in JavaScript.',
        language: 'typescript',
        level: 'basic',
        code: `async function inspectWebTraffic(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache' // Bypasses browser HTTP cache
      }
    });

    console.log('HTTP Status:', response.status); // e.g. 200, 304, 404, 500
    console.log('Status Text:', response.statusText);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('Cache-Control:', response.headers.get('cache-control'));
    console.log('ETag:', response.headers.get('etag'));

    if (!response.ok) {
      throw new Error(\`HTTP request failed with status \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or DNS resolution failure:', error);
    throw error;
  }
}`,
        explanation: 'The fetch API interacts directly with the browser HTTP layer, exposing status codes and response headers configured by the origin server.'
      },
      {
        id: 'web-ex-2',
        title: 'Configuring Cache-Control & Conditional Requests',
        description: 'Using If-None-Match headers with ETags to prevent redundant data downloads (HTTP 304 Not Modified).',
        language: 'typescript',
        level: 'intermediate',
        code: `// Simulating conditional HTTP requests with ETags
async function fetchWithETag(url: string, cachedETag?: string) {
  const headers: HeadersInit = {
    'Accept': 'application/json'
  };

  if (cachedETag) {
    // If the server resource has not changed, it returns HTTP 304 with an empty body!
    headers['If-None-Match'] = cachedETag;
  }

  const res = await fetch(url, { headers });

  if (res.status === 304) {
    console.log('Data unchanged on server. Using locally cached snapshot.');
    return { status: 304, data: null };
  }

  const newETag = res.headers.get('ETag');
  const data = await res.json();
  return { status: res.status, data, etag: newETag };
}`,
        explanation: 'HTTP 304 conditional requests save mobile bandwidth and accelerate page load times by reusing verified cached payloads.'
      }
    ],
    realWorldUseCases: [
      'Configuring CDN edge caching (Cloudflare, CloudFront) for React static build bundles with immutable hashing.',
      'Diagnosing CORS preflight (OPTIONS) bottlenecks across microservices.',
      'Implementing client-side retry policies with exponential backoff for flaky mobile connections.'
    ],
    commonMistakes: [
      {
        title: 'Ignoring HTTP Status Codes and checking only for network exceptions',
        description: 'The native fetch() promise only rejects on network failure (e.g. DNS failure or offline). It DOES NOT reject on 404 Not Found or 500 Internal Server Error!',
        wrongCode: `// Broken error handling: 404 or 500 will NOT trigger catch!
try {
  const res = await fetch('/api/user');
  const data = await res.json();
} catch (err) {
  showErrorToast('Failed to load user'); // Never runs on 404 or 500!
}`,
        correctCode: `// Correct error handling: check res.ok
try {
  const res = await fetch('/api/user');
  if (!res.ok) {
    throw new Error(\`Server error: \${res.status} \${res.statusText}\`);
  }
  const data = await res.json();
} catch (err) {
  showErrorToast(err.message);
}`,
        explanation: 'Always verify res.ok (which returns true for status 200-299) before reading response JSON.'
      }
    ],
    bestPractices: [
      'Enable HTTP/2 or HTTP/3 on your hosting server to take advantage of request multiplexing.',
      'Set Cache-Control: max-age=31536000, immutable for hashed assets (JS/CSS) in Vite or Next.js.',
      'Use DNS prefetching (<link rel="dns-prefetch" href="//api.example.com">) for external API endpoints.'
    ],
    performanceNotes: [
      'TCP handshake + TLS negotiation adds 2 to 3 network round trips (RTT) before the first byte of HTML can be transmitted. Keep connections alive with HTTP Keep-Alive.',
      'HTTP/2 multiplexing removes head-of-line blocking at the application layer, allowing hundreds of assets to download in parallel over one TCP stream.'
    ],
    interviewQuestions: [
      {
        id: 'iq-web-1',
        question: 'What happens when you type a URL into a browser address bar and press Enter?',
        difficulty: 'intermediate',
        answer: 'The process involves: 1) URL parsing & protocol determination, 2) DNS lookup (browser cache -> OS -> recursive resolver -> root/TLD/authoritative nameservers) to resolve IP, 3) TCP 3-way handshake (SYN, SYN-ACK, ACK), 4) TLS handshake for HTTPS, 5) Sending HTTP GET request, 6) Web server processing & response generation, 7) Browser receiving bytes and executing the Critical Rendering Path (HTML parsing -> DOM tree -> CSSOM tree -> Render tree -> Layout -> Paint -> Compositing).',
        followUpQuestions: [
          'How does DNS caching reduce network latency?',
          'What is the purpose of the TLS session key exchange?'
        ]
      },
      {
        id: 'iq-web-2',
        question: 'What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?',
        difficulty: 'advanced',
        answer: 'HTTP/1.1 uses persistent TCP connections but suffers from Head-of-Line (HoL) blocking because requests on a connection must complete sequentially. HTTP/2 introduces binary framing and multiplexing, allowing multiple streams over a single TCP connection, plus header compression (HPACK). HTTP/3 replaces TCP with QUIC over UDP, eliminating TCP-level Head-of-Line blocking and enabling 0-RTT connection re-establishment.',
        followUpQuestions: ['Why did HTTP/2 still suffer from TCP Head-of-Line blocking?']
      }
    ],
    exercises: [
      {
        id: 'ex-web-1',
        title: 'Build a Resilient Network Client with Timeout & Status Checks',
        difficulty: 'intermediate',
        description: 'Write a wrapper function around fetch that accepts a timeout parameter (via AbortSignal.timeout) and throws clear descriptive errors for 4xx/5xx responses.',
        hints: ['Use AbortController or AbortSignal.timeout(ms)', 'Check response.ok before parsing response.json()'],
        solution: `async function resilientFetch<T>(url: string, timeoutMs: number = 5000): Promise<T> {
  const signal = AbortSignal.timeout(timeoutMs);

  try {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    if (err.name === 'TimeoutError') {
      throw new Error(\`Request timed out after \${timeoutMs}ms\`);
    }
    throw err;
  }
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-web-1',
        question: 'Which HTTP response status code indicates that the cached resource on the client is still fresh and does not need to be re-downloaded?',
        type: 'multiple-choice',
        options: [
          '200 OK',
          '301 Moved Permanently',
          '304 Not Modified',
          '412 Precondition Failed'
        ],
        correctAnswer: 2,
        explanation: 'HTTP 304 Not Modified signals that the conditional request headers (such as If-None-Match or If-Modified-Since) matched the server state, saving bandwidth.'
      }
    ]
  },

  'browser-architecture': {
    overview: 'Deep exploration of browser process architecture, multi-process isolation (Browser, Renderer, GPU, Network), and the Critical Rendering Path: DOM, CSSOM, Render Tree, Layout, Paint, and Compositing.',
    whyItExists: `React components do not manipulate pixels directly; they describe UI structures that the browser engine must parse, layout, and rasterize.
If a frontend developer does not understand browser architecture:
1. They inadvertently cause "Layout Thrashing" (Forced Synchronous Layout) by alternating DOM reads and writes in loops.
2. They animate properties like width, top, or margin instead of transform and opacity, dropping framerates from 60fps to single digits.
3. They misunderstand why heavy JavaScript computation blocks the main UI thread and prevents user inputs from registering.`,
    howItWorks: `1. MULTI-PROCESS BROWSER ARCHITECTURE (Chrome / Chromium):
- Browser Process: Controls address bar, bookmarks, tabs, back/forward buttons, and coordinates other processes.
- Network Process: Handles HTTP/HTTPS networking, DNS queries, web sockets, and disk/memory cache.
- GPU Process: Handles rasterization and communicates with the graphics hardware card.
- Renderer Process (One per tab/site): Runs Blink (layout engine) and V8 (JavaScript engine). Executes the main thread, worker threads, and compositor thread.

2. THE CRITICAL RENDERING PATH (CRP):
- Step 1: HTML Parsing & DOM Construction:
  Bytes -> Characters -> Tokens (StartTag, EndTag) -> Nodes -> DOM Tree.
- Step 2: CSS Parsing & CSSOM Construction:
  CSS rules are parsed into the CSS Object Model (CSSOM). CSS is render-blocking: the browser will not render until CSSOM is ready!
- Step 3: Render Tree:
  Combines DOM and CSSOM. Excludes invisible elements (e.g. display: none, <head>, <script>).
- Step 4: Layout (Reflow):
  Calculates exact geometry, dimensions (width, height), and coordinates (x, y) for each visible node in the viewport.
- Step 5: Paint (Repaint):
  Fills in pixels for colors, borders, shadows, and text into bitmap layers.
- Step 6: Compositing:
  Draws layers onto screen surfaces via the GPU compositor thread. Transform and opacity changes happen exclusively in Compositing!`,
    codeExamples: [
      {
        id: 'ba-ex-1',
        title: 'Preventing Layout Thrashing (Forced Synchronous Layout)',
        description: 'Demonstrating how interweaving DOM style reads and style writes forces the browser to recalculate layout repeatedly in a loop.',
        language: 'javascript',
        level: 'intermediate',
        code: `// BAD: Causes Forced Synchronous Layout (Layout Thrashing)
function resizeBad(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    // READ: Asking for offsetWidth forces immediate layout recalculation!
    const width = boxes[i].offsetWidth;
    // WRITE: Mutating style invalidates layout!
    boxes[i].style.width = (width + 10) + 'px';
  }
}

// GOOD: Batch all reads first, then batch all writes!
function resizeOptimized(boxes) {
  // Batch 1: READ all values in one clean pass
  const widths = boxes.map(b => b.offsetWidth);

  // Batch 2: WRITE all styles together in requestAnimationFrame
  requestAnimationFrame(() => {
    boxes.forEach((box, i) => {
      box.style.width = (widths[i] + 10) + 'px';
    });
  });
}`,
        explanation: 'Reading layout metrics (like offsetWidth or clientHeight) right after writing a style property forces the browser to immediately halt JavaScript and run a full layout reflow.'
      },
      {
        id: 'ba-ex-2',
        title: 'Hardware-Accelerated 60fps Animations',
        description: 'Animating exclusively with transform and opacity skips both Layout and Paint phases, running directly on the GPU Compositor thread.',
        language: 'css',
        level: 'basic',
        code: `/* BAD: Triggers Layout + Paint + Composite on every frame (Laggy!) */
.modal-bad {
  transition: top 0.3s ease, width 0.3s ease;
  top: 100px;
  width: 500px;
}

/* GOOD: Skips Layout and Paint! Runs entirely on GPU compositor thread (Silky 60fps) */
.modal-good {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(100px) scale(1.05);
  opacity: 1;
  will-change: transform, opacity; /* Hints the browser to promote to dedicated GPU layer */
}`,
        explanation: 'Transform and opacity properties are handled independently by the GPU compositor thread without blocking the browser main JavaScript thread.'
      }
    ],
    realWorldUseCases: [
      'Virtualizing large 10,000+ item data tables without triggering layout reflow freezes.',
      'Building smooth 60fps drag-and-drop interfaces and swipe gestures in mobile web apps.',
      'Profiling web performance using Chrome DevTools Performance panel (identifying Long Tasks > 50ms).'
    ],
    commonMistakes: [
      {
        title: 'Using synchronous layout-forcing properties in high-frequency scroll or resize handlers',
        description: 'Querying window.scrollY, element.getBoundingClientRect(), or element.scrollTop inside unthrottled scroll listeners causes continuous layout thrashing.',
        wrongCode: `window.addEventListener('scroll', () => {
  // Read triggers layout on EVERY scroll event tick!
  if (box.getBoundingClientRect().top < 0) {
    box.classList.add('stuck');
  }
});`,
        correctCode: `// Correct: Use IntersectionObserver instead of scroll listener!
const observer = new IntersectionObserver(([entry]) => {
  box.classList.toggle('stuck', !entry.isIntersecting);
});
observer.observe(triggerElement);`,
        explanation: 'IntersectionObserver runs asynchronously off the main thread and avoids triggering forced layout reflows.'
      }
    ],
    bestPractices: [
      'Animate exclusively via transform and opacity to keep animations on the GPU compositor.',
      'Use IntersectionObserver instead of querying DOM coordinates inside scroll event listeners.',
      'Break up heavy JavaScript execution (tasks > 50ms) using requestIdleCallback or Web Workers.'
    ],
    performanceNotes: [
      'The browser main thread is single-threaded: HTML parsing, CSS calculation, Layout, Paint, and JavaScript execution all compete for the same execution thread.',
      'A 60fps display provides a 16.6ms budget per frame. Long Tasks exceeding 50ms create noticeable input delay and jank.'
    ],
    interviewQuestions: [
      {
        id: 'iq-ba-1',
        question: 'What is the Critical Rendering Path, and what is the difference between Layout, Paint, and Compositing?',
        difficulty: 'advanced',
        answer: 'The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels: 1) DOM creation, 2) CSSOM creation, 3) Render Tree construction, 4) Layout (calculating exact sizes and coordinates for elements), 5) Paint (filling in visual pixels: colors, borders, text, shadows onto layers), and 6) Compositing (combining layers on the GPU). Modifying layout properties (width, height, top) forces Layout -> Paint -> Composite. Modifying colors forces Paint -> Composite. Modifying transform/opacity skips Layout and Paint, running directly in Compositing.',
        followUpQuestions: [
          'What is layout thrashing and how can developers avoid it?',
          'Why is CSS considered a render-blocking resource?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-ba-1',
        title: 'Refactor Layout-Thrashing Loop to RequestAnimationFrame',
        difficulty: 'intermediate',
        description: 'Rewrite a loop that updates 50 card element heights so that DOM reads and DOM writes are separated cleanly.',
        hints: ['Collect all heights into an array first', 'Update styles inside requestAnimationFrame'],
        solution: `function batchUpdateCardHeights(cards: HTMLElement[]) {
  // Phase 1: Read all dimensions
  const heights = cards.map(c => c.getBoundingClientRect().height);
  const maxHeight = Math.max(...heights);

  // Phase 2: Schedule writes on next animation frame
  requestAnimationFrame(() => {
    cards.forEach(card => {
      card.style.height = \`\${maxHeight}px\`;
    });
  });
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-ba-1',
        question: 'Which of the following CSS properties can be animated strictly on the GPU compositor thread without triggering Layout or Paint?',
        type: 'multiple-choice',
        options: [
          'width and height',
          'top and left',
          'transform and opacity',
          'margin and padding'
        ],
        correctAnswer: 2,
        explanation: 'transform and opacity can be composited directly by the GPU thread without requiring the browser main thread to recalculate Layout geometry or repaint bitmaps.'
      }
    ]
  },

  'event-propagation': {
    overview: 'Complete guide to DOM Event Propagation: Event Capturing (Trickling), Target Phase, Event Bubbling, and Event Delegation patterns in Vanilla JS and React Synthetic Events.',
    whyItExists: `User interaction on the web is driven by events. If you attach individual event listeners to thousands of list items, buttons, or table rows:
1. Application memory consumption explodes, degrading mobile device performance.
2. Dynamically added or deleted items require manual attaching and detaching of event handlers, inviting memory leaks.
3. Developers fail to understand why clicking an inner button triggers outer modal closes, or why e.stopPropagation() is needed.`,
    howItWorks: `THE 3 PHASES OF EVENT PROPAGATION:

1. Capturing Phase (Trickling Phase):
- Event travels downwards from the top of the DOM tree (window -> document -> <html> -> <body> -> ... -> parent -> target).
- Event listeners registered with element.addEventListener('click', fn, true) (capture: true) fire here.

2. Target Phase:
- Event reaches the exact element that received the user interaction (event.target).

3. Bubbling Phase (Default in Web & React):
- Event bubbles upwards from the target back to the window (target -> parent -> ... -> <body> -> <html> -> document -> window).
- Standard listeners (addEventListener('click', fn) or React onClick) execute here.

EVENT DELEGATION PATTERN:
Instead of attaching 1,000 click listeners to 1,000 <li> elements:
Attach a SINGLE listener to the parent <ul> container!
When any <li> is clicked, the event bubbles up to the <ul>. The listener inspects event.target to identify which item was clicked.

REACT SYNTHETIC EVENTS:
- React does not attach onClick listeners directly to individual DOM nodes.
- In React 17+, React attaches a single root listener to the root DOM container (e.g. #root) and manages its own SyntheticEvent bubbling system!`,
    codeExamples: [
      {
        id: 'ep-ex-1',
        title: 'Event Delegation in Vanilla JavaScript',
        description: 'Handling actions for an infinite or dynamic list with a single parent event listener.',
        language: 'typescript',
        level: 'intermediate',
        code: `// Single event listener on parent table/list container
const userList = document.querySelector<HTMLUListElement>('#user-list')!;

userList.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // Find nearest action button inside clicked row
  const actionButton = target.closest<HTMLButtonElement>('[data-action]');
  if (!actionButton) return;

  const action = actionButton.dataset.action; // 'delete' or 'edit'
  const userId = actionButton.dataset.userId;

  if (action === 'delete') {
    deleteUser(userId);
  } else if (action === 'edit') {
    openEditModal(userId);
  }
});`,
        explanation: 'element.closest() traverses up the tree to match the target element, making delegation resilient even when buttons have nested icons or spans.'
      },
      {
        id: 'ep-ex-2',
        title: 'stopPropagation vs stopImmediatePropagation',
        description: 'Demonstrating how to prevent parent handlers from firing and how to prevent other listeners on the SAME element from executing.',
        language: 'typescript',
        level: 'intermediate',
        code: `const modal = document.querySelector('#modal')!;
const deleteBtn = document.querySelector('#delete-btn')!;

// Closes modal when clicking backdrop
modal.addEventListener('click', () => {
  console.log('Backdrop clicked: Closing modal');
});

// Delete button inside modal
deleteBtn.addEventListener('click', (e) => {
  // Prevents event from bubbling to modal backdrop!
  e.stopPropagation();
  console.log('Delete button clicked');
});

deleteBtn.addEventListener('click', (e) => {
  // If stopImmediatePropagation() was called, subsequent listeners on this element would be blocked!
  console.log('Audit logger: action logged');
});`,
        explanation: 'e.stopPropagation() halts traversal up the DOM tree. e.stopImmediatePropagation() stops both traversal AND blocks any remaining listeners on the current element.'
      }
    ],
    realWorldUseCases: [
      'Dropdown menus and modal dialogs that close when clicking anywhere outside their container.',
      'High-performance data grids with thousands of interactive cells using a single delegated click handler.',
      'Preventing button clicks inside clickable card components from triggering card navigation.'
    ],
    commonMistakes: [
      {
        title: 'Confusing event.target with event.currentTarget',
        description: 'event.target is the innermost element clicked (e.g. an icon inside a button), whereas event.currentTarget is the element the listener is attached to.',
        wrongCode: `button.addEventListener('click', (e) => {
  // If user clicks the <span> or <svg> inside the button, e.target is the SVG, NOT the button!
  const btnId = (e.target as HTMLElement).dataset.id; // undefined!
});`,
        correctCode: `button.addEventListener('click', (e) => {
  // e.currentTarget is ALWAYS the <button> element that owns the listener!
  const btnId = (e.currentTarget as HTMLElement).dataset.id;
});`,
        explanation: 'Always use event.currentTarget when accessing attributes on the element that attached the handler.'
      }
    ],
    bestPractices: [
      'Use event delegation when rendering dynamic lists to minimize memory overhead.',
      'Use e.target.closest(selector) inside delegated listeners to safely handle child icons or spans.',
      'Avoid abusing e.stopPropagation() as it can break third-party analytics and document-level listeners.'
    ],
    performanceNotes: [
      'Event delegation reduces memory consumption by instantiating 1 listener instead of N listeners, reducing garbage collection pressure.',
      'React SyntheticEvent pools and delegates events at the #root container level, avoiding thousands of native event bindings.'
    ],
    interviewQuestions: [
      {
        id: 'iq-ep-1',
        question: 'What is the difference between event.target, event.currentTarget, and how does event delegation work?',
        difficulty: 'intermediate',
        answer: 'event.target is the element that triggered the event (the actual origin of click). event.currentTarget is the element to which the event handler is currently attached. Event delegation is a technique where a single listener is placed on a common ancestor to manage events for multiple child elements by taking advantage of event bubbling. The ancestor listener inspects event.target to handle actions based on which child was clicked.',
        followUpQuestions: [
          'What is the difference between e.stopPropagation() and e.preventDefault()?',
          'How does React 17+ handle event delegation differently from React 16?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-ep-1',
        title: 'Implement an Accessible Click-Outside Hook in React',
        difficulty: 'intermediate',
        description: 'Create a custom hook useClickOutside(ref, callback) that listens for clicks outside a designated ref element.',
        hints: ['Attach mousedown listener to document', 'Check if ref.current && !ref.current.contains(e.target)'],
        solution: `import { useEffect, RefObject } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-ep-1',
        question: 'In which order do event propagation phases execute in the browser DOM?',
        type: 'multiple-choice',
        options: [
          'Bubbling -> Target -> Capturing',
          'Target -> Capturing -> Bubbling',
          'Capturing -> Target -> Bubbling',
          'Target -> Bubbling -> Capturing'
        ],
        correctAnswer: 2,
        explanation: 'Event propagation starts with the Capturing phase (trickling down from window), hits the Target phase, and finally enters the Bubbling phase (moving back up).'
      }
    ]
  },

  'semantic-html': {
    overview: 'Mastery of semantic HTML5 elements, web accessibility (WCAG 2.2, ARIA attributes, keyboard navigation), accessible form architecture, and SEO fundamentals for modern web applications.',
    whyItExists: `Building applications exclusively with <div> and <span> elements (div soup) creates severe accessibility and engineering issues:
1. Screen readers and assistive technologies cannot discern document structure, landmark regions, or interactive control states.
2. The browser cannot provide built-in keyboard navigation (Tab navigation, Enter/Space activation) or native focus states.
3. Search engines (Googlebot) struggle to parse content hierarchy, penalizing SEO rankings.`,
    howItWorks: `1. SEMANTIC LANDMARK ELEMENTS:
- <header>: Introductory content, navigation wrapper, or site branding.
- <nav>: Primary navigational links.
- <main>: Central, unique content of the page (strictly one per page).
- <article>: Self-contained composition that makes sense independently (blog post, product card, comment).
- <section>: Thematic grouping of content, typically with a heading (<h2>).
- <aside>: Indirectly related content (sidebar, callouts, related links).
- <footer>: Author info, copyright, sitemap, legal links.

2. ACCESSIBILITY (a11y) & ARIA PRINCIPLES:
- Rule #1 of ARIA: If you can use a native HTML element (e.g. <button>, <dialog>, <details>), DO NOT use ARIA on a <div>!
- Keyboard Focusability: Interactive elements must be reachable via Tab and activatable with Enter/Space.
- Contrast Ratio: WCAG AA requires a minimum 4.5:1 contrast ratio for normal text and 3:1 for large text.
- Accessible Names: Every interactive control must have an accessible name via text content, <label for="...">, aria-label, or aria-labelledby.`,
    codeExamples: [
      {
        id: 'sem-ex-1',
        title: 'Accessible Custom Button vs Inaccessible Div Button',
        description: 'Demonstrating why native <button> elements are vastly superior to custom div buttons.',
        language: 'tsx',
        level: 'basic',
        code: `// INACCESSIBLE ANTI-PATTERN:
// Missing keyboard focus, missing screen reader role, missing Enter/Space handlers!
export function BadButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div onClick={onClick} className="btn-style">
      {label}
    </div>
  );
}

// FULLY ACCESSIBLE NATIVE PATTERN:
// Handles Tab focus, Space/Enter keys, disabled states, and assistive roles out of the box!
export function GoodButton({ 
  onClick, 
  label, 
  disabled = false,
  ariaLabel 
}: { 
  onClick: () => void; 
  label: string; 
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className="btn-style disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}`,
        explanation: 'The native <button> provides built-in accessibility: focus management, Tab order, keyboard triggers (Space/Enter), and screen reader role announcements without any extra code.'
      },
      {
        id: 'sem-ex-2',
        title: 'Accessible Form with Explicit Label Associations & Error Announcements',
        description: 'Associating input fields with labels using htmlFor and connecting live validation error messages via aria-describedby and aria-invalid.',
        language: 'tsx',
        level: 'intermediate',
        code: `import { useId } from 'react';

export function AccessibleInput({
  label,
  value,
  onChange,
  error
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="space-y-1">
      {/* Explicit htmlFor links label to input for click focus and screen reader announcements */}
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={\`w-full px-3 py-1.5 border rounded-[var(--radius)] \${error ? 'border-red-500' : 'border-subtle'}\`}
      />

      {error && (
        // role="alert" automatically announces error to screen readers
        <p id={errorId} role="alert" className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}`,
        explanation: 'aria-describedby links the error message to the input, allowing screen reader users to hear the validation error as soon as the input is focused.'
      }
    ],
    realWorldUseCases: [
      'Meeting ADA / WCAG 2.2 AA compliance standards for enterprise web apps and legal certification.',
      'Optimizing e-commerce product pages for search engine crawler indexing and rich snippet previews.',
      'Building accessible design system component libraries (comboboxes, modals, tabs, accordions).'
    ],
    commonMistakes: [
      {
        title: 'Icon-only buttons without accessible labels',
        description: 'Rendering a button containing only an SVG or icon font leaves screen reader users with no indication of what the button does.',
        wrongCode: `// Screen reader announces: "Button", purpose unknown!
<button onClick={openSettings}>
  <SettingsIcon />
</button>`,
        correctCode: `// Screen reader announces: "Settings, button"
<button onClick={openSettings} aria-label="Open system settings">
  <SettingsIcon aria-hidden="true" />
</button>`,
        explanation: 'Always supply aria-label to icon buttons and hide decorative icons with aria-hidden="true".'
      }
    ],
    bestPractices: [
      'Prefer native HTML elements over ARIA emulation whenever possible.',
      'Ensure every page has a single <main> landmark and logical heading hierarchy (<h1> -> <h2> -> <h3>).',
      'Test your application using keyboard-only navigation (Tab, Shift+Tab, Enter, Space, Escape).'
    ],
    performanceNotes: [
      'Semantic HTML requires zero extra JavaScript runtime, improving parse and render speed compared to complex JS-emulated div widgets.',
      'Screen readers parse semantic trees efficiently without requiring expensive DOM tree traversals.'
    ],
    interviewQuestions: [
      {
        id: 'iq-sem-1',
        question: 'What is the first rule of ARIA, and how do you make a web application fully accessible to keyboard and screen reader users?',
        difficulty: 'intermediate',
        answer: 'The First Rule of ARIA states: "If you can use a native HTML element or attribute with the semantics and behavior already built in, then do so instead of re-purposing an element and adding an ARIA role." To make an app accessible: 1) Use semantic landmarks (<main>, <nav>, <header>), 2) Use native interactive tags (<button>, <a>, <input>), 3) Ensure visible focus rings (:focus-visible), 4) Support Tab and Arrow key navigation, 5) Ensure accessible color contrast (minimum 4.5:1), and 6) Provide text alternatives via aria-label or alt text.',
        followUpQuestions: ['What is the difference between aria-hidden="true" and display: none?']
      }
    ],
    exercises: [
      {
        id: 'ex-sem-1',
        title: 'Audit and Fix Inaccessible Modal Dialog',
        difficulty: 'intermediate',
        description: 'Refactor an unaccessible custom modal so that it traps focus, supports Escape key to close, and has proper ARIA attributes.',
        hints: ['Use role="dialog" and aria-modal="true"', 'Listen for Escape key in useEffect'],
        solution: `// Proper modal markup:
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title" 
  className="modal-container"
>
  <h2 id="modal-title">Confirm Deletion</h2>
  <button aria-label="Close dialog" onClick={onClose}>×</button>
</div>`
      }
    ],
    quizQuestions: [
      {
        id: 'q-sem-1',
        question: 'Which HTML element should strictly appear only ONCE per rendered web page?',
        type: 'multiple-choice',
        options: [
          '<header>',
          '<section>',
          '<main>',
          '<article>'
        ],
        correctAnswer: 2,
        explanation: 'According to HTML5 specification and accessibility guidelines, there must only be one visible <main> landmark per document representing the central topic.'
      }
    ]
  },

  'css-fundamentals': {
    overview: 'Deep dive into CSS Core: The Box Model (content-box vs border-box), CSS Specificity calculation, Stacking Contexts & z-index, and CSS Positioning mechanisms (static, relative, absolute, fixed, sticky).',
    whyItExists: `CSS is the visual engine of web development. In modern component-driven libraries like React:
1. Inconsistent box model sizing causes unexpected overflow, misalignment, and broken responsive layouts.
2. Misunderstanding CSS Specificity leads developers into "!important wars" where styling becomes unmaintainable.
3. Stacking context issues cause dropdowns and modals to get hidden behind lower elements despite setting z-index: 999999!`,
    howItWorks: `1. THE CSS BOX MODEL:
Every element in CSS is a rectangular box consisting of 4 layers:
- Content: The area where text, images, or children appear.
- Padding: Transparent space surrounding content.
- Border: The border line surrounding the padding.
- Margin: Transparent space outside the border separating it from neighbors.

box-sizing: content-box (Default):
Width = content width. Padding and border are ADDED on top, expanding the total element size!
box-sizing: border-box (Modern Standard):
Width = Content + Padding + Border. Padding and border fit INSIDE the designated width.

2. CSS SPECIFICITY WEIGHT HIERARCHY:
Specificity determines which rule wins when multiple CSS rules target the same element:
- Inline styles: (1, 0, 0, 0) -> style="..."
- IDs: (0, 1, 0, 0) -> #header
- Classes, Attributes, Pseudo-classes: (0, 0, 1, 0) -> .btn, [type="text"], :hover
- Elements & Pseudo-elements: (0, 0, 0, 1) -> div, p, ::before
- Universal selector (*), combinators (+, >, ~): (0, 0, 0, 0)

3. STACKING CONTEXT & Z-INDEX:
A stacking context is a three-dimensional conceptualization of HTML elements along an imaginary z-axis.
A higher z-index NEVER beats a lower z-index if its parent stacking context has a lower level!
Created by:
- position: absolute/relative with z-index other than auto.
- position: fixed or sticky.
- opacity less than 1.
- transform, filter, or will-change not none.`,
    codeExamples: [
      {
        id: 'css-ex-1',
        title: 'Universal Border-Box Reset and Specificity Safe Architecture',
        description: 'The standard box-sizing reset used in every modern production application and Tailwind CSS.',
        language: 'css',
        level: 'basic',
        code: `/* Standard modern CSS box-sizing reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Specificity demonstration */
/* Specificity: (0, 0, 1, 1) -> 1 class + 1 tag */
nav.primary-nav {
  background-color: #1e293b;
}

/* Specificity: (0, 1, 0, 0) -> 1 ID. Wins over the rule above! */
#main-navigation {
  background-color: #0f172a;
}`,
        explanation: 'Applying box-sizing: border-box globally ensures that adding padding or borders never unexpectedly changes an element total dimensions.'
      },
      {
        id: 'css-ex-2',
        title: 'CSS Positioning Breakdown (Relative, Absolute, Sticky)',
        description: 'Demonstrating how position: absolute anchors to the nearest positioned ancestor and how sticky headers function.',
        language: 'css',
        level: 'intermediate',
        code: `/* Container creates the positioning context */
.card-container {
  position: relative; /* Non-static: establishes coordinate origin for children! */
  padding: 24px;
  border: 1px solid #e2e8f0;
}

/* Badge pinned precisely to top-right corner of .card-container */
.badge-top-right {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ef4444;
  color: white;
  padding: 2px 8px;
}

/* Sticky table header that stays pinned when scrolling */
.table-header {
  position: sticky;
  top: 0; /* Sticks when reaching top of scroll container */
  z-index: 10;
  background-color: white;
}`,
        explanation: 'An element with position: absolute positions itself relative to its closest non-static ancestor, whereas position: sticky alternates between relative and fixed depending on scroll position.'
      }
    ],
    realWorldUseCases: [
      'Sticky headers, sidebars, and floating action buttons (FABs).',
      'Modal dialog backdrops and popover tooltips with stacking context isolation.',
      'Building scalable CSS architectures using CSS modules, Tailwind CSS, or Vanilla Extract.'
    ],
    commonMistakes: [
      {
        title: 'Using z-index: 999999 without realizing the parent Stacking Context is isolated',
        description: 'Setting a massive z-index on a child element has zero effect if its parent has a lower z-index or a separate stacking context created by opacity or transform.',
        explanation: 'A child element can never escape or render in front of a sibling container if its own parent stacking context is below the sibling.'
      }
    ],
    bestPractices: [
      'Always set box-sizing: border-box universally on all elements.',
      'Maintain low specificity by styling with single classes (.button) rather than nested tag chains (div > ul > li > a).',
      'Manage z-index layers centrally using CSS custom properties or design token scales (e.g. --z-dropdown: 100, --z-modal: 500).'
    ],
    performanceNotes: [
      'Avoid deeply nested CSS selectors (e.g. body div.container ul li.active a span). The browser matches selectors right-to-left (key selector first), making deep chains slower to evaluate.',
      'Sticky positioning is processed by the compositor thread and is significantly more performant than JavaScript-driven scroll positioning.'
    ],
    interviewQuestions: [
      {
        id: 'iq-css-1',
        question: 'What is the difference between content-box and border-box in the CSS Box Model?',
        difficulty: 'basic',
        answer: 'With content-box (the default), width and height apply only to the content area. Any padding and border are added onto the specified width, making the total element wider than expected. With border-box, width includes content, padding, and border. Adding padding shrinks the internal content area while keeping the element total dimensions fixed.',
        followUpQuestions: [
          'How does CSS specificity work and how is it scored?',
          'What triggers the creation of a new stacking context?'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-css-1',
        title: 'Calculate Specificity Winner',
        difficulty: 'intermediate',
        description: 'Calculate the specificity scores of 4 given selectors and predict which color will be applied to a link.',
        hints: ['Format: (inline, ID, Class/attr/pseudo, tag)'],
        solution: `// Selector 1: div#app a.active -> (0, 1, 1, 2)
// Selector 2: #app nav a:hover -> (0, 1, 1, 2)
// Selector 3: body #app .nav-link -> (0, 1, 1, 1)
// Selector 4: a.active.highlight -> (0, 0, 2, 1)
// Selector 1 and 2 tie on specificity! Selector 2 wins if it appears later in source order.`
      }
    ],
    quizQuestions: [
      {
        id: 'q-css-1',
        question: 'Which of the following creates a new Stacking Context in modern browsers?',
        type: 'multiple-choice',
        options: [
          'margin: auto',
          'opacity: 0.99',
          'display: inline-block',
          'box-sizing: border-box'
        ],
        correctAnswer: 1,
        explanation: 'Any element with opacity less than 1 creates a brand-new Stacking Context, preventing its children from interweaving with outside elements.'
      }
    ]
  },

  'flexbox-grid': {
    overview: 'Comprehensive guide to 1-Dimensional and 2-Dimensional modern CSS layouts: Flexbox for components & alignments, and CSS Grid for complex page architectures and responsive grid systems.',
    whyItExists: `Prior to Flexbox and CSS Grid, developers were forced to rely on floats, clearfixes, inline-block quirks, and HTML table layouts.
These legacy techniques were brittle, broke easily on different screen sizes, and made vertical centering one of the most frustrating tasks in web development.
Modern frontend engineering requires mastering both:
- Flexbox: 1D layout model for alignment, distribution, and component micro-layouts.
- CSS Grid: 2D layout model for controlling rows and columns simultaneously.`,
    howItWorks: `FLEXBOX (1-Dimensional Layout):
- Operates along a Main Axis and a Cross Axis (controlled by flex-direction: row | column).
- Justify-Content: Distributes space along the Main Axis (flex-start, center, space-between, space-around).
- Align-Items: Aligns items along the Cross Axis (flex-start, center, stretch, baseline).
- Flex-Grow: How much an item expands relative to siblings.
- Flex-Shrink: How much an item compresses when space is constrained.
- Flex-Basis: Default initial size before growing or shrinking.

CSS GRID (2-Dimensional Layout):
- Defines rows and columns simultaneously using grid-template-columns and grid-template-rows.
- The 'fr' (fractional unit) represents a fraction of available free space in the grid container.
- Grid Areas (grid-template-areas) allows naming layout sections ('header', 'sidebar', 'main', 'footer').
- Auto-fit & minmax(): Creates completely fluid, responsive grids WITHOUT writing media queries!`,
    codeExamples: [
      {
        id: 'fg-ex-1',
        title: 'Perfect Vertical and Horizontal Centering with Flexbox',
        description: 'The canonical 3-line centering pattern and responsive navbar layout.',
        language: 'css',
        level: 'basic',
        code: `/* Perfect centering in 3 lines */
.center-box {
  display: flex;
  justify-content: center; /* Main axis centering */
  align-items: center;     /* Cross axis centering */
  min-height: 100vh;
}

/* Common App Navbar */
.navbar {
  display: flex;
  justify-content: space-between; /* Spreads brand and links apart */
  align-items: center;
  padding: 16px 24px;
}

.nav-links {
  display: flex;
  gap: 16px; /* Native gap property avoids brittle margin hacks */
}`,
        explanation: 'Flexbox distributes items along the main and cross axes cleanly, and the modern gap property handles spacing without margin collapse bugs.'
      },
      {
        id: 'fg-ex-2',
        title: 'Zero-Media-Query Responsive Card Grid with CSS Grid',
        description: 'Using repeat(auto-fit, minmax(...)) to automatically reflow cards on mobile, tablet, and desktop without a single media query.',
        language: 'css',
        level: 'intermediate',
        code: `/* Responsive Grid without media queries! */
.card-grid {
  display: grid;
  /* Automatically fits as many 280px columns as will fit, expanding them to fill remaining space */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Asymmetrical Dashboard Layout */
.dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr; /* Fixed 240px sidebar, fluid main area */
  grid-template-rows: 64px 1fr;     /* Fixed 64px header, fluid body */
  min-height: 100vh;
}`,
        explanation: 'repeat(auto-fit, minmax(280px, 1fr)) instructs the browser to calculate how many 280px columns can fit in the viewport and expand them proportionally.'
      }
    ],
    realWorldUseCases: [
      'Dashboard layout grids with fixed sidebars and fluid content areas.',
      'Card catalog grids with automatic wrapping and equal height cards.',
      'Form input groups with prefix icons, input field, and action buttons.'
    ],
    commonMistakes: [
      {
        title: 'Using margin hacks on flex items instead of the gap property',
        description: 'Adding margin-right to flex children requires writing :last-child exceptions to prevent right-edge overflow.',
        wrongCode: `.flex-item { margin-right: 16px; }
.flex-item:last-child { margin-right: 0; }`,
        correctCode: `.flex-container { display: flex; gap: 16px; }`,
        explanation: 'The gap property handles spacing between children cleanly without leaking outer margins.'
      }
    ],
    bestPractices: [
      'Use Flexbox for 1-dimensional layouts (navbars, button groups, vertical stacks).',
      'Use CSS Grid for 2-dimensional layouts (page shells, card galleries, dashboards).',
      'Leverage repeat(auto-fit, minmax(...)) for responsive card lists.'
    ],
    performanceNotes: [
      'Both Flexbox and Grid are calculated natively in browser C++ code and are vastly faster than JavaScript layout calculations.',
      'Avoid deeply nesting grid containers inside flex containers unnecessarily to prevent deep layout reflow trees.'
    ],
    interviewQuestions: [
      {
        id: 'iq-fg-1',
        question: 'When should you choose CSS Grid over Flexbox, and vice-versa?',
        difficulty: 'intermediate',
        answer: 'Flexbox is designed for 1-Dimensional layouts (either a row OR a column). It excels at distributing space between items and aligning components (such as navbars, button groups, and micro-layouts). CSS Grid is designed for 2-Dimensional layouts (rows AND columns simultaneously). It excels at macro page layouts, dashboards, and complex responsive card grids where elements need alignment across both horizontal and vertical axes.',
        followUpQuestions: ['What is the difference between auto-fill and auto-fit in CSS Grid?']
      }
    ],
    exercises: [
      {
        id: 'ex-fg-1',
        title: 'Build a Responsive Dashboard Shell with CSS Grid',
        difficulty: 'intermediate',
        description: 'Create a 2D layout with Header, Sidebar, Main Content, and Footer using grid-template-areas.',
        hints: ['Define grid-template-areas with strings: "header header", "sidebar main", "footer footer"'],
        solution: `.app-shell {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`
      }
    ],
    quizQuestions: [
      {
        id: 'q-fg-1',
        question: 'Which CSS Grid unit represents a fractional share of free available space in the container?',
        type: 'multiple-choice',
        options: [
          'em',
          'fr',
          'ch',
          'vh'
        ],
        correctAnswer: 1,
        explanation: 'The fr unit represents a fraction of the unused space inside the grid container.'
      }
    ]
  },

  'responsive-design': {
    overview: 'Mobile-first responsive web design principles: Viewport meta tag, Media Queries, Container Queries, Fluid Typography with clamp(), and responsive images with srcset and picture.',
    whyItExists: `Users browse web applications on thousands of screen dimensions ranging from 320px mobile phones to 4K ultra-wide monitors.
Without responsive design engineering:
1. Mobile users face horizontal scrolling, tiny unreadable text, and tap targets that are impossible to touch.
2. Desktop displays suffer from stretched, distorted layouts and poor readability.
3. Mobile devices download huge desktop-sized images, wasting bandwidth and triggering high mobile bounce rates.`,
    howItWorks: `1. THE VIEWPORT META TAG:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Tells the mobile browser to match the viewport width to the device physical width rather than zooming out to a 980px desktop snapshot.

2. MOBILE-FIRST VS DESKTOP-FIRST:
- Mobile-First: Write default styles for mobile, then use min-width media queries to enhance for larger screens.
  (Preferred in modern web development for cleaner CSS and progressive enhancement).
- Desktop-First: Write default styles for desktop, then use max-width media queries to override for smaller screens.

3. MODERN CONTAINER QUERIES (@container):
Media queries inspect the global browser viewport width. Container queries inspect the size of the PARENT container!
Allows a component to adapt its layout based on whether it is rendered in a narrow sidebar or a wide main content area.

4. FLUID TYPOGRAPHY WITH clamp():
font-size: clamp(1rem, 2.5vw, 2rem);
Smoothly scales font size between 1rem (minimum) and 2rem (maximum) based on viewport width without rigid breakpoints!`,
    codeExamples: [
      {
        id: 'rd-ex-1',
        title: 'Mobile-First Media Queries & Fluid Typography',
        description: 'Clean responsive architecture using min-width breakpoints and CSS clamp().',
        language: 'css',
        level: 'basic',
        code: `/* Fluid Typography: Scales smoothly from 18px to 32px based on viewport */
h1 {
  font-size: clamp(1.125rem, 2.5vw + 0.5rem, 2rem);
  line-height: 1.25;
}

/* Mobile-First Layout: Default is single-column stacked */
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

/* Tablet & Desktop: Enhances to side-by-side row layout */
@media (min-width: 768px) {
  .profile-card {
    flex-direction: row;
    padding: 24px;
  }
}`,
        explanation: 'Mobile-first CSS keeps base code lightweight for mobile devices and progressively enhances the interface as screen real-estate increases.'
      },
      {
        id: 'rd-ex-2',
        title: 'Container Queries for Reusable Component Architecture',
        description: 'Using @container to make a card component adapt to its container size regardless of page location.',
        language: 'css',
        level: 'intermediate',
        code: `/* Define the container */
.widget-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

/* Default card layout (stacked) */
.user-widget {
  display: flex;
  flex-direction: column;
}

/* When the container is at least 400px wide, switch to horizontal! */
@container card-container (min-width: 400px) {
  .user-widget {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
}`,
        explanation: 'Container queries make UI components truly modular: the exact same component renders stacked in a sidebar and horizontal in the main content without writing custom modifier classes.'
      }
    ],
    realWorldUseCases: [
      'Reusable design system widgets that adapt seamlessly whether placed in a narrow modal or a full-width page.',
      'Responsive data tables that collapse into card lists on mobile viewports.',
      'Responsive navigation drawers that convert from mobile hamburger menus to full desktop link bars.'
    ],
    commonMistakes: [
      {
        title: 'Forgetting the Viewport Meta tag in index.html',
        description: 'Without the viewport meta tag, mobile browsers render pages in a simulated 980px desktop window and zoom out, breaking all media queries.',
        wrongCode: `<!-- Broken: Missing viewport meta tag! -->
<head><title>App</title></head>`,
        correctCode: `<!-- Correct: Enforce device width scale -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`,
        explanation: 'The viewport meta tag is mandatory for mobile browsers to respect media query breakpoints.'
      }
    ],
    bestPractices: [
      'Always design and code Mobile-First using min-width media queries.',
      'Use relative units (rem, %, vw, vh) and clamp() instead of rigid pixel widths.',
      'Ensure touch targets on mobile are at least 44x44px according to WCAG touch guidelines.'
    ],
    performanceNotes: [
      'Use modern image formats (AVIF, WebP) and srcset to deliver appropriately sized images to mobile screens.',
      'Container queries run on the layout thread and have near-native performance in all modern browsers.'
    ],
    interviewQuestions: [
      {
        id: 'iq-rd-1',
        question: 'What is the fundamental difference between Media Queries and Container Queries?',
        difficulty: 'intermediate',
        answer: 'Media Queries evaluate styles based on the global dimensions of the browser viewport (window width/height). Container Queries evaluate styles based on the dimensions of a specific parent container element. Container queries enable true modularity: a component can change its layout based on whether it is placed inside a 300px sidebar or an 800px main area, regardless of the user overall device screen size.',
        followUpQuestions: ['How does the CSS clamp() function work?']
      }
    ],
    exercises: [
      {
        id: 'ex-rd-1',
        title: 'Implement Fluid Responsive Spacing and Typography',
        difficulty: 'intermediate',
        description: 'Write CSS rules using clamp() so that padding and font sizes scale smoothly between 375px mobile and 1440px desktop.',
        hints: ['clamp(min, preferred, max)'],
        solution: `.hero-title {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
  padding: clamp(1rem, 3vw, 2.5rem);
}`
      }
    ],
    quizQuestions: [
      {
        id: 'q-rd-1',
        question: 'Which media query strategy is considered best practice for modern responsive engineering?',
        type: 'multiple-choice',
        options: [
          'Desktop-First with max-width',
          'Mobile-First with min-width',
          'Fixed pixel breakpoints with JavaScript resize listeners',
          'User-Agent string sniffing'
        ],
        correctAnswer: 1,
        explanation: 'Mobile-first design using min-width queries promotes progressive enhancement, cleaner CSS hierarchies, and optimal mobile performance.'
      }
    ]
  }
};
