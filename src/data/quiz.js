// Quiz bank for the Gamify experience page.
// Each question is tied to a topic id from data/topics.js so it can link
// back to the relevant study document, and carries a difficulty level
// used for scoring (harder questions are worth more points).

export const POINTS_BY_LEVEL = {
  Junior: 10,
  Mid: 15,
  Senior: 20,
  Graduate: 25,
}

export const questions = [
  {
    id: 'q1',
    topicId: 'jsx-basics',
    level: 'Junior',
    prompt: 'What does JSX like <h1>Hi</h1> compile down to?',
    options: [
      'A call to React.createElement (or the jsx() runtime function)',
      'Raw HTML that the browser parses directly',
      'A template string that gets eval()\'d',
      'A CSS-in-JS style object',
    ],
    correctIndex: 0,
    explanation:
      'JSX is syntactic sugar for function calls that produce plain JS objects describing the UI — it is never raw HTML.',
  },
  {
    id: 'q2',
    topicId: 'jsx-basics',
    level: 'Junior',
    prompt: 'Why does {isVisible && <Banner />} sometimes render a stray "0" on screen?',
    options: [
      'Because isVisible is a number like 0, and 0 is falsy but still gets rendered as text',
      'Because <Banner /> always returns 0 on error',
      'Because JSX cannot use the && operator',
      'Because React converts booleans to 0/1',
    ],
    correctIndex: 0,
    explanation:
      '0 is falsy, so && short-circuits to 0 — and unlike null/undefined/false, the number 0 is a valid renderable child, so it shows up literally.',
  },
  {
    id: 'q3',
    topicId: 'components-props',
    level: 'Junior',
    prompt: 'What is the correct way for a child component to update data owned by its parent?',
    options: [
      'Mutate the prop object directly inside the child',
      'Call a callback function passed down as a prop, which the parent defined',
      'Reach up the component tree using document.querySelector',
      'Reassign the prop variable inside the child function',
    ],
    correctIndex: 1,
    explanation:
      'Data flows down as props, and events flow up as callback props — props themselves must never be mutated by the child.',
  },
  {
    id: 'q4',
    topicId: 'usestate',
    level: 'Junior',
    prompt: 'Why does calling setCount(count + 1) twice in the same event handler only increment by 1, not 2?',
    options: [
      'React ignores the second call entirely',
      'Both calls read the same stale "count" value captured in that render\'s closure',
      'useState only allows one update per component per second',
      'It is a bug in React that was never fixed',
    ],
    correctIndex: 1,
    explanation:
      'Both calls close over the same "count" from that render. The fix is the functional updater form: setCount(c => c + 1).',
  },
  {
    id: 'q5',
    topicId: 'usestate',
    level: 'Junior',
    prompt: 'When should you pass a function to useState instead of a plain value?',
    options: [
      'Never — it always throws',
      'When the initial value is expensive to compute, so it only runs once on mount',
      'Only when the state is a boolean',
      'Whenever you want the state to update automatically every second',
    ],
    correctIndex: 1,
    explanation:
      'Lazy initial state (useState(() => expensiveCalc())) avoids re-running an expensive computation on every render — it only runs once.',
  },
  {
    id: 'q6',
    topicId: 'conditional-list-rendering',
    level: 'Junior',
    prompt: 'Why shouldn\'t you use the array index as the key when rendering a reorderable list?',
    options: [
      'Indexes are always numbers and React only accepts string keys',
      'It causes an immediate crash',
      'React matches items between renders by key, so an unstable key can attach state/focus to the wrong item after reordering',
      'It makes the list render in reverse order',
    ],
    correctIndex: 2,
    explanation:
      'Keys are how React matches old and new list items during reconciliation. Index-based keys shift when the list reorders, misattaching state.',
  },
  {
    id: 'q7',
    topicId: 'forms-controlled-inputs',
    level: 'Junior',
    prompt: 'What makes an <input> a "controlled" component in React?',
    options: [
      'It has an onClick handler',
      'Its value is driven entirely by React state, and onChange updates that state on every keystroke',
      'It is wrapped in a <form> tag',
      'It uses a ref instead of state',
    ],
    correctIndex: 1,
    explanation:
      'Controlled means the DOM value and React state are always in sync — state is the single source of truth for the input\'s value.',
  },
  {
    id: 'q8',
    topicId: 'useeffect',
    level: 'Mid',
    prompt: 'What is the purpose of the function returned from inside useEffect?',
    options: [
      'It re-runs the effect immediately',
      'It is a cleanup function, called before the effect re-runs and on unmount',
      'It replaces the component\'s render output',
      'It has no special meaning; it is just ignored',
    ],
    correctIndex: 1,
    explanation:
      'The returned function is cleanup — essential for canceling subscriptions, timers, and listeners to avoid leaks and stale updates.',
  },
  {
    id: 'q9',
    topicId: 'useeffect',
    level: 'Mid',
    prompt: 'An effect reads a prop "userId" but the dependency array is []. What bug results?',
    options: [
      'The effect throws a compile error',
      'The effect runs once on mount and keeps using the userId value from that first render forever (a stale closure)',
      'React automatically fixes the dependency array for you',
      'The component fails to render at all',
    ],
    correctIndex: 1,
    explanation:
      'An empty dependency array means the effect only runs once, closing over whatever values existed at that time — a classic stale-closure bug.',
  },
  {
    id: 'q10',
    topicId: 'refs-and-dom',
    level: 'Mid',
    prompt: 'What is the key difference between useRef and useState?',
    options: [
      'useRef can only store numbers',
      'Updating a ref does not trigger a re-render; updating state does',
      'useState is deprecated in favor of useRef',
      'They are exactly interchangeable',
    ],
    correctIndex: 1,
    explanation:
      'Refs persist a mutable value across renders without causing React to re-render — use state for anything that must show up in the UI.',
  },
  {
    id: 'q11',
    topicId: 'context-api',
    level: 'Mid',
    prompt: 'Why does passing value={{ user, setUser }} directly on a Context.Provider hurt performance?',
    options: [
      'Context providers can only accept primitive values',
      'It creates a brand-new object every render, so every consuming component re-renders even when the actual data is unchanged',
      'Objects cannot be passed through Context at all',
      'It causes a memory leak that crashes the browser tab',
    ],
    correctIndex: 1,
    explanation:
      'Every render creates a new object reference; consumers compare by reference, so they all re-render. Memoizing the value with useMemo fixes it.',
  },
  {
    id: 'q12',
    topicId: 'custom-hooks',
    level: 'Mid',
    prompt: 'Which of these is a valid reason the "rules of hooks" require calling hooks at the top level only?',
    options: [
      'It makes the code prettier',
      'React tracks hook state by call order across renders, so conditionally skipping a hook call shifts that order and corrupts state',
      'Hooks are only allowed in class components',
      'It is purely a stylistic ESLint preference with no functional impact',
    ],
    correctIndex: 1,
    explanation:
      'React has no names for hook calls internally — only call order. Conditional hook calls break that ordering between renders.',
  },
  {
    id: 'q13',
    topicId: 'usememo-usecallback',
    level: 'Mid',
    prompt: 'When is useMemo actually worth using?',
    options: [
      'On every derived value, always, as a best practice',
      'When a computation is measurably expensive and/or its stable reference is needed by another memoized dependency',
      'Never — useMemo was removed in React 18',
      'Only inside class components',
    ],
    correctIndex: 1,
    explanation:
      'useMemo has its own overhead (dependency comparison). It pays off for real expensive computations or to stabilize references other memoization depends on.',
  },
  {
    id: 'q14',
    topicId: 'state-management-at-scale',
    level: 'Senior',
    prompt: 'What is the FIRST question to ask when deciding where a piece of state should live?',
    options: [
      'Which state library is trendiest right now?',
      'How close to where it is used can this state be colocated, and how many distant components actually need it?',
      'Should it always go directly into Redux for consistency?',
      'Can it be stored in localStorage instead?',
    ],
    correctIndex: 1,
    explanation:
      'Colocation first: lift state only as far as necessary. Reaching for a global store before checking this leads to unnecessary complexity.',
  },
  {
    id: 'q15',
    topicId: 'state-management-at-scale',
    level: 'Senior',
    prompt: 'What problem do libraries like React Query / TanStack Query solve that Redux/Context don\'t address well out of the box?',
    options: [
      'They solve client-only UI state like "is this modal open"',
      'They handle server-state concerns: caching, revalidation, deduplication, and background refetching of API data',
      'They replace the need for any component state at all',
      'They are a routing solution',
    ],
    correctIndex: 1,
    explanation:
      'Server state (data fetched from an API) has fundamentally different needs — caching and freshness — than client UI state, and dedicated libraries model that directly.',
  },
  {
    id: 'q16',
    topicId: 'performance-optimization',
    level: 'Senior',
    prompt: 'What should you do BEFORE reaching for React.memo or useMemo to fix a slow UI?',
    options: [
      'Wrap every component in memo preemptively',
      'Profile with React DevTools to confirm which components re-render, how often, and why',
      'Rewrite the app in a different framework',
      'Add more useEffect calls',
    ],
    correctIndex: 1,
    explanation:
      'Optimizing without profiling is guesswork. The Profiler tells you exactly which components re-render and why before you add memoization complexity.',
  },
  {
    id: 'q17',
    topicId: 'performance-optimization',
    level: 'Senior',
    prompt: 'Why does list virtualization help performance more than React.memo alone for a 10,000-item list?',
    options: [
      'It reduces network requests',
      'It limits the number of DOM nodes actually created and laid out to only what is visible in the viewport',
      'It automatically sorts the list faster',
      'It disables scrolling to save CPU',
    ],
    correctIndex: 1,
    explanation:
      'Even with perfect memoization, laying out and painting 10,000 real DOM nodes is slow. Virtualization keeps rendered DOM node count roughly constant.',
  },
  {
    id: 'q18',
    topicId: 'design-patterns',
    level: 'Senior',
    prompt: 'What problem do compound components (like <Tabs><Tabs.Trigger/></Tabs>) solve?',
    options: [
      'They let a widget be split into flexible, freely-composable pieces that share implicit state via Context',
      'They eliminate the need for any props',
      'They are required for all React components since v18',
      'They replace CSS entirely',
    ],
    correctIndex: 0,
    explanation:
      'Compound components share state through Context internally while giving the consumer full control over composition and ordering of the pieces.',
  },
  {
    id: 'q19',
    topicId: 'testing-react',
    level: 'Senior',
    prompt: 'According to React Testing Library\'s philosophy, which query should you prefer first?',
    options: [
      'getByTestId, always, for reliability',
      'getByRole, because it mirrors how real users and assistive technology perceive the page',
      'Directly accessing component internal state',
      'querySelector with a CSS class name',
    ],
    correctIndex: 1,
    explanation:
      'getByRole tests what a user (including one using a screen reader) can actually perceive, giving the most real-world confidence.',
  },
  {
    id: 'q20',
    topicId: 'accessibility',
    level: 'Senior',
    prompt: 'Why is <button onClick={fn}>Save</button> better than <div onClick={fn}>Save</div>?',
    options: [
      'There is no difference, both are equally accessible',
      'A native button is focusable and keyboard-activatable (Enter/Space) and is announced correctly by screen readers, for free',
      'div elements cannot have onClick handlers at all',
      'button elements render faster in every browser',
    ],
    correctIndex: 1,
    explanation:
      'Semantic HTML elements come with built-in keyboard and assistive-technology behavior that a div requires manual ARIA and key handling to replicate — imperfectly.',
  },
  {
    id: 'q21',
    topicId: 'concurrent-rendering-suspense',
    level: 'Graduate',
    prompt: 'What does useTransition let you do?',
    options: [
      'Animate CSS transitions declaratively',
      'Mark a state update as non-urgent so React can keep the UI responsive to more urgent updates',
      'Delay a component from ever rendering',
      'Force a synchronous re-render',
    ],
    correctIndex: 1,
    explanation:
      'Transitions deprioritize an update so React can interrupt it for urgent work like typing or clicking, keeping the UI responsive.',
  },
  {
    id: 'q22',
    topicId: 'concurrent-rendering-suspense',
    level: 'Graduate',
    prompt: 'What architectural change enabled React to make rendering interruptible starting with React 16?',
    options: [
      'The Fiber reconciler, which tracks per-component work as resumable units',
      'Switching from JSX to plain HTML templates',
      'Removing the virtual DOM entirely',
      'Adding TypeScript support',
    ],
    correctIndex: 0,
    explanation:
      'Fiber replaced the old stack-based reconciler with a data structure that lets React pause, resume, or abandon rendering work mid-tree.',
  },
  {
    id: 'q23',
    topicId: 'server-components-nextjs',
    level: 'Graduate',
    prompt: 'What is the core distinction between a Server Component and a traditionally server-rendered (SSR) component?',
    options: [
      'There is no difference, they are the same thing',
      'A Server Component never ships its code to the client bundle at all, while traditional SSR still ships every component\'s JS for hydration',
      'Server Components can only render static text',
      'Server Components require a NoSQL database',
    ],
    correctIndex: 1,
    explanation:
      'Server Components are excluded from the client bundle entirely, not just pre-rendered — this is what shrinks bundle size and enables direct server-resource access.',
  },
  {
    id: 'q24',
    topicId: 'build-tooling',
    level: 'Graduate',
    prompt: 'Why does ESM (import/export) tree-shake better than CommonJS (require/module.exports)?',
    options: [
      'ESM files are always smaller in raw byte size',
      'ESM\'s import/export graph is static and analyzable at build time, while CommonJS exports are dynamic JS objects that resist static analysis',
      'CommonJS is not supported by any modern bundler',
      'Tree-shaking is unrelated to module format',
    ],
    correctIndex: 1,
    explanation:
      'A bundler can statically prove which ESM exports are unused and safely remove them; CommonJS\'s dynamic nature makes that proof much harder in general.',
  },
  {
    id: 'q25',
    topicId: 'architecting-large-apps',
    level: 'Graduate',
    prompt: 'What is the main advantage of feature-based (colocated) folder structure over grouping files strictly by type?',
    options: [
      'It requires fewer files overall',
      'All the code for one feature lives together, making it clear what is safe to change or delete without hunting across the whole tree',
      'It removes the need for any shared components',
      'It is required by the JavaScript spec',
    ],
    correctIndex: 1,
    explanation:
      'Type-based grouping (all components/, all hooks/) scatters a single feature across the tree; colocating by feature keeps related code (and its blast radius) together.',
  },
]
