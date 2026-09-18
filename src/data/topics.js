// Central content library for the Documents page.
// Each topic is a self-contained study document with a level, category,
// summary, and structured body content rendered by DocBody.

export const LEVELS = ['Junior', 'Mid', 'Senior', 'Graduate']

const p = (text) => ({ type: 'p', text })
const h3 = (text) => ({ type: 'h3', text })
const ul = (items) => ({ type: 'ul', items })
const code = (text, lang = 'jsx') => ({ type: 'code', lang, text })

export const topics = [
  {
    id: 'jsx-basics',
    title: 'JSX & Rendering Basics',
    title_es: 'JSX y Fundamentos del Renderizado',
    level: 'Junior',
    category: 'Fundamentals',
    minutes: 6,
    summary:
      'What JSX actually compiles to, how React renders elements, and the rules that trip up beginners.',
    summary_es:
      'A qué se compila realmente el JSX, cómo React renderiza elementos, y las reglas que confunden a los principiantes.',
    tags: ['jsx', 'rendering', 'elements'],
    blocks: [
      p(
        'JSX is syntactic sugar over JavaScript function calls. When you write <div className="card">Hello</div>, the compiler (Babel/esbuild) turns it into React.createElement("div", { className: "card" }, "Hello"), or with the modern JSX runtime, a call to jsx() imported automatically from react/jsx-runtime. Understanding this transform demystifies almost every "weird" JSX rule.'
      ),
      code(
        `// What you write
const el = <h1 className="title">Hi, {name}</h1>

// What it becomes (classic runtime)
const el = React.createElement('h1', { className: 'title' }, 'Hi, ', name)`
      ),
      h3('Elements are plain objects'),
      p(
        'A React element is a lightweight description of what should appear on screen — a JS object with a type, props, and children. It is NOT a DOM node. React takes this tree of objects and reconciles it against the previous tree to compute the minimal set of real DOM mutations.'
      ),
      h3('Rules that follow from the transform'),
      ul([
        'A component must return a single root element (or a Fragment <>...</>) because a function can only return one value.',
        'className instead of class, and htmlFor instead of for — these are just object property names, and class/for are reserved words in JS.',
        'Expressions go in curly braces; statements (if, for) do not work inline — use ternaries, &&, or extract logic above the return.',
        'Boolean, null, and undefined children render nothing — this is what makes condition && <Component /> work.',
      ]),
      h3('Common beginner mistakes'),
      ul([
        'Forgetting keys on lists (covered in its own topic).',
        'Rendering objects directly: {someObject} throws — you must render a primitive or a valid element.',
        'Using inline styles as strings instead of objects: style={{ color: "red" }}, not style="color:red".',
      ]),
    ],
  },
  {
    id: 'components-props',
    title: 'Components & Props',
    title_es: 'Componentes y Props',
    level: 'Junior',
    category: 'Fundamentals',
    minutes: 7,
    summary:
      'Function components as pure(ish) functions of props, composition over inheritance, and prop drilling basics.',
    summary_es:
      'Los componentes de función como funciones (casi) puras de las props, composición sobre herencia, y los fundamentos del prop drilling.',
    tags: ['components', 'props', 'composition'],
    blocks: [
      p(
        'A React component is a JavaScript function that accepts a single "props" object and returns JSX describing the UI for those props. Mentally, a component is a function: UI = f(props). Given the same props, it should render the same output — this predictability is what makes React apps easy to reason about and test.'
      ),
      code(
        `function Avatar({ src, alt, size = 40 }) {
  return <img className="avatar" src={src} alt={alt} width={size} height={size} />
}

// usage
<Avatar src={user.photoUrl} alt={user.name} size={64} />`
      ),
      h3('Composition over configuration'),
      p(
        'Instead of building one component with dozens of boolean props to handle every case, React favors composing small components together and passing children. The "children" prop is just another prop — whatever is nested between a component\'s opening and closing tags.'
      ),
      code(
        `function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

<Card title="Profile">
  <Avatar src={user.photoUrl} alt={user.name} />
  <p>{user.bio}</p>
</Card>`
      ),
      h3('Props are read-only'),
      p(
        'A component must never mutate its own props. If a child needs to change something that lives in a parent, the parent passes a callback prop down, and the child calls it — data flows down, events flow up. This one-directional flow is the backbone of predictable React apps.'
      ),
      h3('Prop drilling and when it becomes a problem'),
      p(
        'Passing a prop through several layers of components that don\'t use it themselves, just to hand it to a deeply nested child, is called prop drilling. It is fine for 2-3 levels. Beyond that, reach for Context or a state management library rather than threading the same prop through every component in between.'
      ),
    ],
  },
  {
    id: 'usestate',
    title: 'State with useState',
    title_es: 'Estado con useState',
    level: 'Junior',
    category: 'Hooks',
    minutes: 7,
    summary:
      'How useState works, why state updates are asynchronous and batched, and the functional-updater pattern.',
    summary_es:
      'Cómo funciona useState, por qué las actualizaciones de estado son asíncronas y agrupadas, y el patrón de actualización funcional.',
    tags: ['hooks', 'usestate', 'state'],
    blocks: [
      p(
        'useState lets a function component "remember" a value across re-renders. Calling useState(initial) returns a pair: the current value, and a setter function. Calling the setter schedules a re-render with the new value — it does not mutate the variable in place.'
      ),
      code(
        `function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}`
      ),
      h3('State updates are asynchronous and batched'),
      p(
        'Inside event handlers, React batches multiple setState calls into a single re-render for performance. This means reading "count" right after calling setCount will NOT reflect the new value yet — the update is scheduled, not applied synchronously.'
      ),
      code(
        `function handleClick() {
  setCount(count + 1)
  console.log(count) // still logs the OLD value
}`
      ),
      h3('The functional updater form'),
      p(
        'When a new state value depends on the previous one, pass a function to the setter instead of a value. React guarantees this function receives the most up-to-date state, which avoids stale-value bugs when multiple updates fire before a re-render.'
      ),
      code(
        `// Bug-prone: both calls capture the same stale "count"
setCount(count + 1)
setCount(count + 1) // count is only +1, not +2

// Correct: functional updater always sees the latest value
setCount((c) => c + 1)
setCount((c) => c + 1) // count is +2`
      ),
      h3('Lazy initial state'),
      p(
        'If computing the initial value is expensive, pass a function to useState instead of a value: useState(() => expensiveCompute()). React only calls it once, on mount, instead of on every render.'
      ),
    ],
  },
  {
    id: 'event-handling',
    title: 'Handling Events',
    title_es: 'Manejo de Eventos',
    level: 'Junior',
    category: 'Fundamentals',
    minutes: 5,
    summary:
      "React's synthetic event system, passing arguments to handlers, and preventing default behavior correctly.",
    summary_es:
      'El sistema de eventos sintéticos de React, cómo pasar argumentos a los manejadores, y cómo prevenir el comportamiento por defecto correctamente.',
    tags: ['events', 'synthetic-events'],
    blocks: [
      p(
        'React wraps native DOM events in a cross-browser wrapper called a SyntheticEvent, exposing a consistent API (stopPropagation, preventDefault, target, etc.) regardless of browser. You attach handlers with camelCase props like onClick, onChange, onSubmit — passing a function reference, not a string.'
      ),
      code(
        `<button onClick={handleClick}>Save</button>       // correct: reference
<button onClick={handleClick()}>Save</button>     // wrong: calls it immediately on render`
      ),
      h3('Passing arguments'),
      p(
        'To pass extra data to a handler, wrap it in an inline arrow function. Be aware this creates a new function every render — usually fine, but relevant when optimizing with memo (see the Performance Optimization document).'
      ),
      code(`<li onClick={() => removeItem(item.id)}>{item.label}</li>`),
      h3('preventDefault and controlled forms'),
      p(
        'Calling event.preventDefault() inside a form\'s onSubmit stops the browser\'s native full-page navigation/reload, which is almost always required when a form is handled entirely in React state.'
      ),
      code(
        `function handleSubmit(e) {
  e.preventDefault()
  submitToApi(formValues)
}`
      ),
    ],
  },
  {
    id: 'conditional-list-rendering',
    title: 'Conditional & List Rendering',
    title_es: 'Renderizado Condicional y de Listas',
    level: 'Junior',
    category: 'Fundamentals',
    minutes: 6,
    summary:
      'Ternaries vs &&, rendering arrays with map, and why keys matter for reconciliation correctness.',
    summary_es:
      'Ternarios vs &&, renderizado de arrays con map, y por qué las keys son importantes para la corrección de la reconciliación.',
    tags: ['lists', 'keys', 'conditional'],
    blocks: [
      h3('Conditional rendering patterns'),
      ul([
        'Ternary for either/or output: {isLoggedIn ? <Dashboard /> : <Login />}',
        'Logical && for "render or nothing": {error && <ErrorBanner message={error} />}',
        'Early return in the component body for whole-component guards (loading/error states).',
      ]),
      p(
        'Watch out for the && pitfall with numbers: {count && <Badge count={count} />} renders the literal "0" on screen when count is 0, because 0 is falsy but not null/undefined. Use a boolean coercion: {count > 0 && ...} or {Boolean(count) && ...}.'
      ),
      h3('Rendering lists with map'),
      code(
        `<ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>`
      ),
      h3('Why keys matter'),
      p(
        'React uses keys to match array items between renders during reconciliation. Without a stable key, React falls back to index-based matching, which can cause form inputs, focus, and animation state to attach to the wrong item when the list is reordered, filtered, or items are inserted/removed in the middle.'
      ),
      p(
        'Keys must be stable, unique among siblings, and derived from the data itself (an id) — never the array index for lists that can reorder or change length, and never Math.random() (a new key every render defeats the purpose entirely, forcing full remounts).'
      ),
    ],
  },
  {
    id: 'forms-controlled-inputs',
    title: 'Forms & Controlled Inputs',
    title_es: 'Formularios e Inputs Controlados',
    level: 'Junior',
    category: 'Fundamentals',
    minutes: 7,
    summary:
      'Controlled vs uncontrolled inputs, handling multiple fields, and basic client-side validation.',
    summary_es:
      'Inputs controlados vs no controlados, manejo de múltiples campos, y validación básica del lado del cliente.',
    tags: ['forms', 'controlled-components'],
    blocks: [
      p(
        'A controlled input is one whose value is driven entirely by React state: the input\'s "value" prop always reflects state, and every keystroke fires onChange, which updates that state. This makes the current UI value and the JS state a single source of truth.'
      ),
      code(
        `function NameField() {
  const [name, setName] = useState('')
  return <input value={name} onChange={(e) => setName(e.target.value)} />
}`
      ),
      h3('Uncontrolled inputs'),
      p(
        'An uncontrolled input keeps its own internal DOM state, and you read it on demand via a ref (e.g. on submit) instead of on every keystroke. Useful for simple forms, file inputs (which can\'t be controlled), or when you want to avoid re-rendering on every character typed.'
      ),
      h3('Handling multiple fields with one handler'),
      code(
        `const [form, setForm] = useState({ email: '', password: '' })

function handleChange(e) {
  const { name, value } = e.target
  setForm((prev) => ({ ...prev, [name]: value }))
}

<input name="email" value={form.email} onChange={handleChange} />
<input name="password" type="password" value={form.password} onChange={handleChange} />`
      ),
      h3('Basic validation'),
      p(
        'For simple forms, validate on submit and keep an errors object in state. For anything non-trivial (cross-field validation, async validation, complex schemas), reach for a library like React Hook Form or Formik combined with a schema validator like Zod or Yup rather than hand-rolling it.'
      ),
    ],
  },
  {
    id: 'useeffect',
    title: 'useEffect & Side Effects',
    title_es: 'useEffect y Efectos Secundarios',
    level: 'Mid',
    category: 'Hooks',
    minutes: 9,
    summary:
      'Synchronizing with external systems, the dependency array, cleanup functions, and the effects mental model.',
    summary_es:
      'Sincronización con sistemas externos, el arreglo de dependencias, funciones de limpieza, y el modelo mental de los efectos.',
    tags: ['hooks', 'useeffect', 'side-effects'],
    blocks: [
      p(
        'useEffect lets a component synchronize with something outside of React\'s rendering model: fetching data, subscribing to an event, manually manipulating the DOM, setting a timer, or connecting to a WebSocket. The mental model is not "run this after render" but "keep this external system in sync with these reactive values."'
      ),
      code(
        `useEffect(() => {
  const controller = new AbortController()
  fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setUser)

  return () => controller.abort() // cleanup
}, [userId])`
      ),
      h3('The dependency array'),
      ul([
        'No array: effect runs after every single render (rarely what you want).',
        'Empty array []: effect runs once, after the initial mount only.',
        '[a, b]: effect re-runs whenever a or b changes between renders (compared with Object.is).',
      ]),
      p(
        'Every value from component scope that the effect reads (props, state, functions defined in the component) should be listed as a dependency. Omitting one is the single most common source of stale-closure bugs, where the effect keeps using an old value forever.'
      ),
      h3('Cleanup functions'),
      p(
        'If the function passed to useEffect returns another function, React calls that returned function to clean up — before the effect re-runs, and when the component unmounts. This is essential for subscriptions, timers, and event listeners to avoid leaks and "setState on unmounted component" warnings.'
      ),
      code(
        `useEffect(() => {
  const id = setInterval(() => setTick((t) => t + 1), 1000)
  return () => clearInterval(id)
}, [])`
      ),
      h3('Effects are not lifecycle methods'),
      p(
        'It is tempting to map useEffect to componentDidMount/componentDidUpdate/componentWillUnmount, but that framing leads to bugs. Effects describe a synchronization that reruns whenever its dependencies change — think in terms of "what does this effect depend on," not "when does this run in the lifecycle."'
      ),
    ],
  },
  {
    id: 'refs-and-dom',
    title: 'Refs & Imperative DOM Access',
    title_es: 'Refs y Acceso Imperativo al DOM',
    level: 'Mid',
    category: 'Hooks',
    minutes: 6,
    summary:
      'useRef for mutable values and DOM access, forwardRef, and when imperative code is the right tool.',
    summary_es:
      'useRef para valores mutables y acceso al DOM, forwardRef, y cuándo el código imperativo es la herramienta correcta.',
    tags: ['hooks', 'useref', 'dom'],
    blocks: [
      p(
        'useRef returns a mutable object ({ current: initialValue }) that persists for the lifetime of the component without causing a re-render when it changes. It has two common uses: holding a mutable value that isn\'t part of the rendered UI, and getting direct access to a DOM node.'
      ),
      code(
        `function TextInputWithFocusButton() {
  const inputRef = useRef(null)
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
    </>
  )
}`
      ),
      h3('Refs vs state'),
      p(
        'Updating a ref does NOT trigger a re-render — React has no idea the value changed. Use state for anything that should be reflected in the UI, and refs for values that need to persist between renders but should never themselves cause a render (previous values, timers/interval IDs, instance-like mutable data, imperative DOM handles).'
      ),
      h3('forwardRef and exposing imperative APIs'),
      p(
        'By default, function components cannot receive a ref — refs don\'t exist on plain JS functions. forwardRef lets a component accept a ref and forward it to an inner DOM node or expose an imperative handle via useImperativeHandle, useful for building reusable component libraries (e.g. a custom Modal exposing .open()/.close()).'
      ),
      code(
        `const FancyInput = forwardRef(function FancyInput(props, ref) {
  return <input ref={ref} className="fancy" {...props} />
})`
      ),
    ],
  },
  {
    id: 'context-api',
    title: 'Context API',
    title_es: 'API de Context',
    level: 'Mid',
    category: 'State Management',
    minutes: 8,
    summary:
      'Avoiding prop drilling with Context, provider/consumer patterns, and performance pitfalls.',
    summary_es:
      'Cómo evitar el prop drilling con Context, patrones de proveedor/consumidor, y los problemas de rendimiento a evitar.',
    tags: ['context', 'state-management'],
    blocks: [
      p(
        'Context lets a value be read by any component in a subtree without passing it down through every intermediate component\'s props. It is built for values that are truly "global" to a tree: current theme, current authenticated user, locale, or a router.'
      ),
      code(
        `const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext) // no prop drilling needed
  return <div className={theme}>...</div>
}`
      ),
      h3('The performance pitfall'),
      p(
        'Every component that calls useContext for a given Context re-renders whenever that Context\'s value changes — even if the component only cares about a slice of it. Passing a fresh object literal as the value on every render of the Provider (value={{ user, setUser }}) causes all consumers to re-render every time the Provider re-renders, whether the data actually changed or not.'
      ),
      code(
        `// Bad: new object every render, all consumers re-render
<UserContext.Provider value={{ user, setUser }}>

// Better: memoize the context value
const value = useMemo(() => ({ user, setUser }), [user])
<UserContext.Provider value={value}>`
      ),
      h3('When NOT to reach for Context'),
      p(
        'Context is not a general state management replacement — it has no concept of selectors, so it cannot avoid re-rendering components that only care about one field of a large context value. For frequently-updated, deeply-nested state (e.g. a large form or a real-time data feed), a dedicated state library with selector support is usually the better tool.'
      ),
    ],
  },
  {
    id: 'react-router',
    title: 'Client-Side Routing Concepts',
    title_es: 'Conceptos de Enrutamiento del Lado del Cliente',
    level: 'Mid',
    category: 'Ecosystem',
    minutes: 8,
    summary:
      'How SPA routing works under the hood, nested layouts, dynamic params, and data loading patterns (React Router and the Next.js App Router).',
    summary_es:
      'Cómo funciona el enrutamiento de una SPA por dentro, layouts anidados, parámetros dinámicos, y patrones de carga de datos (React Router y el App Router de Next.js).',
    tags: ['routing', 'react-router', 'nextjs', 'spa'],
    blocks: [
      p(
        'In a single-page app, a client-side router intercepts navigation (link clicks, back/forward buttons via the History API) and swaps which components are rendered based on the current URL, without a full page reload. React Router is the most common standalone router; Next.js\'s App Router builds routing directly into the framework using the filesystem.'
      ),
      code(
        `// React Router (standalone)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'docs/:topicId', element: <DocPage /> },
    ],
  },
])`
      ),
      h3('File-system routing (Next.js App Router)'),
      p(
        'Instead of declaring routes in a config object, Next.js maps folders under app/ directly to URL segments. A folder app/docs/[topicId]/page.js maps to the URL /docs/anything, where [topicId] is a dynamic segment read via the params prop.'
      ),
      code(
        `// app/docs/[topicId]/page.js
export default async function DocPage({ params }) {
  const { topicId } = await params
  const topic = topics.find((t) => t.id === topicId)
  ...
}`
      ),
      h3('Nested routes and layouts'),
      p(
        'A parent route can render a persistent layout (navbar, sidebar) that wraps whichever child route matches — in React Router via an <Outlet />, in Next.js via nested layout.js files that automatically wrap their child segment\'s page.js. This avoids re-mounting shared UI on every navigation.'
      ),
      h3('Data loading approaches'),
      ul([
        'Fetch-on-render: component mounts, then useEffect fetches — simple but causes a loading waterfall (render, then fetch, then render again).',
        'Loader-based (React Router data APIs): route loaders fetch data before rendering the component, eliminating the waterfall.',
        'Framework-level (Next.js App Router): server components can await data directly during rendering, before any HTML is sent — no client waterfall at all for that data.',
      ]),
    ],
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    title_es: 'Hooks Personalizados',
    level: 'Mid',
    category: 'Hooks',
    minutes: 7,
    summary:
      'Extracting reusable stateful logic into your own hooks, naming conventions, and composition rules.',
    summary_es:
      'Cómo extraer lógica de estado reutilizable en tus propios hooks, convenciones de nombres, y reglas de composición.',
    tags: ['hooks', 'custom-hooks', 'reuse'],
    blocks: [
      p(
        'A custom hook is just a JavaScript function whose name starts with "use" and that calls other hooks inside it. It lets you extract component logic (not UI) into a reusable, testable unit — the actual JSX still lives in the component that uses the hook.'
      ),
      code(
        `function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}

// usage
const debouncedQuery = useDebouncedValue(query, 300)`
      ),
      h3('Rules of hooks (why they exist)'),
      ul([
        'Only call hooks at the top level — never inside loops, conditions, or nested functions.',
        'Only call hooks from React function components or other custom hooks.',
      ]),
      p(
        'React tracks hook state by call order, not by name. If a hook call is conditionally skipped on some renders, the order shifts and React attaches the wrong stored state to the wrong useState/useRef call — the "rules of hooks" exist specifically to keep that call order stable across renders.'
      ),
      h3('Good candidates for extraction'),
      ul([
        'Data fetching with loading/error/data state (useFetch, useQuery-style hooks).',
        'Subscribing to browser APIs (useOnlineStatus, useWindowSize, useMediaQuery).',
        'Form field logic, debouncing, local-storage-synced state, previous-value tracking.',
      ]),
    ],
  },
  {
    id: 'usememo-usecallback',
    title: 'useMemo & useCallback',
    title_es: 'useMemo y useCallback',
    level: 'Mid',
    category: 'Performance',
    minutes: 8,
    summary:
      'What memoization hooks actually do, referential equality, and when they are worth the complexity.',
    summary_es:
      'Qué hacen realmente los hooks de memoización, la igualdad referencial, y cuándo valen la pena la complejidad que agregan.',
    tags: ['hooks', 'performance', 'memoization'],
    blocks: [
      p(
        'useMemo(fn, deps) re-computes and caches the return value of fn only when one of the values in deps changes; otherwise it returns the cached value from last render. useCallback(fn, deps) is the same idea but caches a function reference itself rather than a computed value — useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).'
      ),
      code(
        `const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
)

const handleSelect = useCallback(
  (id) => setSelectedId(id),
  [] // stable reference across renders
)`
      ),
      h3('Why referential equality matters'),
      p(
        'In JavaScript, [] !== [] and (() => {}) !== (() => {}) — every render creates brand-new array/object/function values unless you intentionally cache them. This matters specifically when that value is a dependency of another hook, or a prop passed to a component wrapped in React.memo, because those comparisons use Object.is (reference equality), not deep equality.'
      ),
      h3('When memoization is NOT worth it'),
      p(
        'useMemo/useCallback are not free — they cost a dependency comparison and a cache slot every render. For cheap computations and components that render fast regardless, the overhead of memoizing can exceed the cost of just recomputing. Reach for these hooks when you have measured a real cost: an expensive computation (sorting/filtering large lists, heavy derived data) or breaking an unnecessary re-render chain into a memoized child component.'
      ),
      p(
        'A useful heuristic: add memoization when profiling shows a problem, not preemptively on every value. Premature memoization adds cognitive overhead and dependency-array bugs without a measured benefit.'
      ),
    ],
  },
  {
    id: 'state-management-at-scale',
    title: 'State Management at Scale',
    title_es: 'Gestión de Estado a Gran Escala',
    level: 'Senior',
    category: 'State Management',
    minutes: 10,
    summary:
      'Choosing between local state, Context, and libraries like Redux/Zustand; colocating state correctly.',
    summary_es:
      'Cómo elegir entre estado local, Context, y librerías como Redux/Zustand; cómo colocar el estado correctamente.',
    tags: ['redux', 'zustand', 'architecture'],
    blocks: [
      p(
        'The first and most important state management decision in React is not which library to use — it is where a piece of state should live. State should be colocated as close as possible to where it is used. Lifting state up to a shared ancestor (or a global store) should happen only when two or more distant components genuinely need to read or write the same data.'
      ),
      h3('A decision ladder'),
      ul([
        'Local component state (useState/useReducer) — the default; most state belongs here.',
        'Lifted state in a shared parent — when a few sibling components need the same value.',
        'Context — for low-frequency-update, broadly-needed values (theme, auth, locale).',
        'A dedicated store (Redux, Zustand, Jotai, Recoil) — for state shared widely across the tree, updated frequently, or that needs middleware, devtools, or fine-grained subscriptions.',
      ]),
      h3('Redux: predictable state via reducers'),
      p(
        'Redux centralizes state in a single store and requires all updates to go through pure reducer functions in response to dispatched actions. This makes state changes traceable and testable, and enables powerful tooling (time-travel debugging, action logging), at the cost of more boilerplate — significantly reduced today by Redux Toolkit\'s createSlice.'
      ),
      code(
        `const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload) // Immer makes this "mutation" safe
    },
  },
})`
      ),
      h3('Zustand/Jotai: minimal, hook-first stores'),
      p(
        'Newer libraries like Zustand expose state via a plain hook with built-in selector support, so a component only re-renders when the specific slice it selects changes — solving Context\'s all-consumers-re-render problem without Redux\'s ceremony.'
      ),
      code(
        `const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
}))

// only re-renders when items.length changes, not on every store update
const itemCount = useCartStore((s) => s.items.length)`
      ),
      h3('Server state is a different problem'),
      p(
        'Data that originates from a server (API responses) has different needs than client UI state: caching, revalidation, deduplication, background refetching. Libraries like React Query / TanStack Query or SWR solve this specifically and should not be reimplemented by hand in Redux or Context.'
      ),
    ],
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization Patterns',
    title_es: 'Patrones de Optimización de Rendimiento',
    level: 'Senior',
    category: 'Performance',
    minutes: 10,
    summary:
      'React.memo, code splitting, virtualization, and how to actually profile before optimizing.',
    summary_es:
      'React.memo, code splitting, virtualización, y cómo perfilar realmente antes de optimizar.',
    tags: ['performance', 'memo', 'virtualization', 'code-splitting'],
    blocks: [
      h3('Profile first'),
      p(
        'Before applying any optimization, use the React DevTools Profiler to identify which components re-render, how often, and why (it shows the reason: props changed, state changed, parent re-rendered, context changed). Optimizing without profiling is guessing, and often makes code more complex for no measurable benefit.'
      ),
      h3('React.memo'),
      p(
        'React.memo wraps a component so React skips re-rendering it when its props are shallowly equal to the previous render. It only helps when the component is expensive to render AND its parent re-renders frequently with the same props — memoizing a cheap component adds overhead for no gain.'
      ),
      code(
        `const Row = React.memo(function Row({ item }) {
  return <li>{item.label}</li>
})`
      ),
      h3('Code splitting with lazy + Suspense'),
      p(
        'React.lazy() combined with Suspense (or next/dynamic in Next.js) splits a component into a separate bundle chunk that is only downloaded when it is actually rendered, shrinking the initial bundle. This is most valuable for routes, modals, and heavy rarely-used features (e.g. a rich text editor or chart library).'
      ),
      code(
        `const ChartPanel = lazy(() => import('./ChartPanel'))

<Suspense fallback={<Spinner />}>
  <ChartPanel data={data} />
</Suspense>`
      ),
      h3('List virtualization'),
      p(
        'Rendering thousands of DOM nodes for a long list is slow regardless of memoization, because the browser still has to lay out and paint every node. Virtualization libraries (react-window, TanStack Virtual) render only the items currently visible in the viewport (plus a small overscan buffer), keeping DOM node count roughly constant no matter how large the underlying list is.'
      ),
      h3('Avoiding unnecessary re-renders structurally'),
      p(
        'Often the highest-leverage fix isn\'t a memoization hook at all — it\'s moving state down (so only the component that needs it re-renders) or moving expensive children up as "children" props (so they aren\'t re-created when an unrelated sibling\'s state changes, since children passed as JSX from a parent aren\'t re-evaluated by the child that receives them).'
      ),
    ],
  },
  {
    id: 'design-patterns',
    title: 'Component Design Patterns',
    title_es: 'Patrones de Diseño de Componentes',
    level: 'Senior',
    category: 'Architecture',
    minutes: 9,
    summary:
      'Higher-order components, render props, and compound components — what problems each pattern solves.',
    summary_es:
      'Componentes de orden superior, render props, y componentes compuestos — qué problema resuelve cada patrón.',
    tags: ['patterns', 'hoc', 'render-props', 'compound-components'],
    blocks: [
      h3('Higher-Order Components (HOCs)'),
      p(
        'A HOC is a function that takes a component and returns a new, enhanced component — a pattern for reusing cross-cutting logic (auth checks, logging, injected data) before hooks existed. Largely superseded by custom hooks today, but still found in older codebases and some library APIs (e.g. connect() from Redux, forwardRef itself is HOC-shaped).'
      ),
      code(
        `function withAuth(Component) {
  return function AuthedComponent(props) {
    const user = useAuth()
    if (!user) return <Redirect to="/login" />
    return <Component {...props} user={user} />
  }
}

const ProtectedDashboard = withAuth(Dashboard)`
      ),
      h3('Render props'),
      p(
        'A render prop is a prop whose value is a function that returns JSX, letting a component share stateful logic while leaving the actual rendering entirely up to the caller. Also mostly superseded by hooks, but still valuable when a component needs to expose imperative render-time data (e.g. mouse position, measured DOM size) to consumers with very different visual needs.'
      ),
      code(
        `<MouseTracker render={({ x, y }) => <Tooltip x={x} y={y} />} />`
      ),
      h3('Compound components'),
      p(
        'A compound component splits a UI widget into several small components that share implicit state via Context, letting the consumer compose and reorder the pieces freely while the parent manages shared behavior. This is the pattern behind libraries like Radix UI and Headless UI\'s Tabs, Accordion, and Select components.'
      ),
      code(
        `<Tabs defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile"><ProfileForm /></Tabs.Panel>
  <Tabs.Panel value="settings"><SettingsForm /></Tabs.Panel>
</Tabs>`
      ),
      p(
        'Choosing between these today: reach for a custom hook first for shared logic without a specific markup shape; reach for compound components when building a flexible, composable UI widget; HOCs and render props are mostly legacy patterns worth recognizing in existing code rather than reaching for in new code.'
      ),
    ],
  },
  {
    id: 'testing-react',
    title: 'Testing React Applications',
    title_es: 'Pruebas en Aplicaciones React',
    level: 'Senior',
    category: 'Testing',
    minutes: 9,
    summary:
      'Testing philosophy with React Testing Library, what to mock, and the testing pyramid for UI code.',
    summary_es:
      'Filosofía de pruebas con React Testing Library, qué mockear, y la pirámide de pruebas para código de interfaz.',
    tags: ['testing', 'jest', 'react-testing-library'],
    blocks: [
      p(
        'React Testing Library (RTL) is built around a guiding principle: "the more your tests resemble the way your software is used, the more confidence they can give you." Instead of reaching into component internals (state, instance methods), tests query the rendered DOM the way a user would — by visible text, label, or accessibility role.'
      ),
      code(
        `test('submits the login form', async () => {
  render(<LoginForm onSubmit={mockSubmit} />)

  await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'secret')
  await userEvent.click(screen.getByRole('button', { name: /log in/i }))

  expect(mockSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'secret' })
})`
      ),
      h3('Query priority'),
      p(
        'RTL recommends preferring queries in this order: getByRole (mirrors accessibility tree, catches a11y issues for free), then getByLabelText/getByPlaceholderText for forms, then getByText, and getByTestId only as a last resort — a test-id query gives zero confidence that real users (including assistive technology) can actually find that element.'
      ),
      h3('What to mock, and what not to'),
      ul([
        'Mock network calls (fetch/axios) at the boundary — with MSW (Mock Service Worker) for realistic request/response behavior, or jest.mock for simple cases.',
        'Do NOT mock your own components or hooks just to make a test pass — that tests the mock, not your code.',
        'Avoid mocking React itself (hooks, timers) unless testing time-dependent logic, in which case use fake timers deliberately and document why.',
      ]),
      h3('The testing pyramid, applied to a frontend app'),
      p(
        'Many fast unit tests for pure logic (reducers, utility functions, custom hooks in isolation via renderHook), a solid middle layer of component/integration tests (render a feature, interact with it, assert on outcomes — the RTL sweet spot), and a small number of slow end-to-end tests (Playwright/Cypress) covering critical user journeys only.'
      ),
    ],
  },
  {
    id: 'typescript-with-react',
    title: 'TypeScript with React',
    title_es: 'TypeScript con React',
    level: 'Senior',
    category: 'Ecosystem',
    minutes: 9,
    summary:
      'Typing props, hooks, and events correctly, and where type inference already does the job for you.',
    summary_es:
      'Cómo tipar props, hooks, y eventos correctamente, y dónde la inferencia de tipos ya hace el trabajo por ti.',
    tags: ['typescript', 'types'],
    blocks: [
      p(
        'TypeScript catches an entire class of React bugs at compile time — wrong prop names, missing required props, wrong event handler shapes — before the app ever runs. The core skill is knowing what to type explicitly versus what TypeScript can already infer.'
      ),
      code(
        `type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  onClick: () => void
  children?: React.ReactNode
}

function Button({ label, variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children ?? label}
    </button>
  )
}`
      ),
      h3('Typing hooks'),
      code(
        `// useState: TS infers number from the initial value
const [count, setCount] = useState(0)

// but for values that start empty/null, be explicit
const [user, setUser] = useState<User | null>(null)

// useRef for a DOM node needs the element type and null initial value
const inputRef = useRef<HTMLInputElement>(null)`
      ),
      h3('Typing events'),
      code(
        `function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value)
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
}`
      ),
      h3('Generic components'),
      p(
        'Components that operate on arbitrary data (a generic List, Select, or Table) should be generic functions, so TypeScript can infer the item type at the call site and give correct autocompletion inside the renderItem callback.'
      ),
      code(
        `function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => React.ReactNode }) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>
}`
      ),
      h3('Avoid over-typing'),
      p(
        'Do not annotate a return type of JSX.Element on every component, or wrap every prop type in a utility type "for safety" — this adds noise TypeScript\'s inference already handles. Save explicit types for function boundaries: component props, hook parameters/returns, and event handlers.'
      ),
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility (a11y) in React',
    title_es: 'Accesibilidad (a11y) en React',
    level: 'Senior',
    category: 'Accessibility',
    minutes: 8,
    summary:
      'Semantic HTML first, ARIA as a last resort, focus management, and testing with automated tools.',
    summary_es:
      'HTML semántico primero, ARIA como último recurso, gestión del foco, y pruebas con herramientas automatizadas.',
    tags: ['a11y', 'accessibility', 'aria'],
    blocks: [
      p(
        'The single most impactful accessibility rule: use the native semantic HTML element that already has the behavior you need before reaching for ARIA attributes. A <button> is focusable, keyboard-activatable (Enter/Space), and announced correctly by screen readers for free. A <div onClick> has none of that, and rebuilding it with ARIA and manual keyboard handlers is strictly worse and easy to get wrong.'
      ),
      code(
        `// Avoid
<div onClick={handleClick} className="button">Save</div>

// Prefer
<button onClick={handleClick} className="button">Save</button>`
      ),
      h3('ARIA as an augmentation, not a replacement'),
      p(
        'ARIA attributes (role, aria-label, aria-expanded, aria-live, etc.) exist to describe custom widgets that have no native HTML equivalent — a combobox, a tab panel, a toast notification region. The first rule of ARIA use is: "No ARIA is better than bad ARIA" — an incorrect role can make a widget less accessible than no annotation at all.'
      ),
      h3('Focus management'),
      p(
        'When a modal opens, focus should move into it, and Escape or closing it should return focus to the triggering element. When content is inserted dynamically (route change, async content load), consider whether focus or an aria-live region needs to announce it. This is one of the most commonly missed pieces of accessibility in single-page apps, because unlike a full page load, focus does not reset automatically on route change.'
      ),
      code(
        `useEffect(() => {
  if (isOpen) dialogRef.current?.focus()
}, [isOpen])`
      ),
      h3('Automated + manual testing'),
      ul([
        'eslint-plugin-jsx-a11y catches common mistakes at write time (missing alt text, invalid ARIA roles).',
        'jest-axe / axe-core can assert "no automatically-detectable violations" in component tests — catches roughly 30-40% of real issues, not a full audit.',
        'Manual keyboard-only navigation (Tab, Shift+Tab, Enter, Escape, arrow keys) and a real screen reader pass (VoiceOver/NVDA) are irreplaceable for the rest.',
      ]),
    ],
  },
  {
    id: 'concurrent-rendering-suspense',
    title: 'Concurrent Rendering & Suspense',
    title_es: 'Renderizado Concurrente y Suspense',
    level: 'Graduate',
    category: 'Internals',
    minutes: 11,
    summary:
      'How React can interrupt, pause, and prioritize rendering work, and what Suspense actually coordinates.',
    summary_es:
      'Cómo React puede interrumpir, pausar, y priorizar el trabajo de renderizado, y qué coordina realmente Suspense.',
    tags: ['concurrent', 'suspense', 'fiber', 'scheduler'],
    blocks: [
      p(
        'Before React 18, rendering was synchronous and uninterruptible: once React started rendering a tree, it ran to completion, blocking the main thread and any user input for the duration. Concurrent React changes this by making rendering interruptible — React can start rendering an update, pause partway through if something more urgent arrives (a keystroke, a click), work on that instead, and resume or discard the paused render.'
      ),
      h3('Fiber: the data structure that makes this possible'),
      p(
        'Fiber is React\'s internal reconciliation architecture: each component instance corresponds to a "fiber" node holding its type, props, state, and links to parent/child/sibling fibers, plus enough bookkeeping to pause and resume work on it. This replaced the old stack-based reconciler (React 15 and earlier), which had no way to yield control mid-render.'
      ),
      h3('Priority and transitions'),
      p(
        'Not all updates are equally urgent. useTransition marks an update as non-urgent ("this can render whenever the browser has spare time"), so React keeps the UI responsive to urgent updates (typing, clicking) while a heavier update (e.g. re-filtering a large list) renders in the background without blocking the main thread.'
      ),
      code(
        `const [isPending, startTransition] = useTransition()

function handleChange(e) {
  setQuery(e.target.value) // urgent: keep the input responsive
  startTransition(() => {
    setResults(filterHugeList(e.target.value)) // can be deprioritized
  })
}`
      ),
      h3('Suspense: a declarative loading boundary'),
      p(
        'Suspense lets a component "suspend" rendering (by throwing a promise, conceptually) while it waits for something async — code (lazy import), or data (frameworks/libraries with Suspense-compatible data fetching, like React Query\'s suspense mode or the Next.js App Router\'s server data fetching). The nearest ancestor <Suspense> boundary shows its fallback until the suspended work resolves, without the component itself needing loading-state boilerplate.'
      ),
      code(
        `<Suspense fallback={<Skeleton />}>
  <ProfileDetails userId={id} />   {/* can suspend */}
  <Suspense fallback={<CommentsSkeleton />}>
    <ProfileComments userId={id} /> {/* independent boundary */}
  </Suspense>
</Suspense>`
      ),
      p(
        'Nesting boundaries lets independent parts of the UI stream in separately rather than blocking the entire page on the slowest piece of data — a pattern that becomes especially powerful combined with server rendering (streaming SSR, covered in the next document).'
      ),
    ],
  },
  {
    id: 'server-components-nextjs',
    title: 'Server Components & the Next.js App Router',
    title_es: 'Server Components y el App Router de Next.js',
    level: 'Graduate',
    category: 'Architecture',
    minutes: 12,
    summary:
      'The client/server component split, streaming SSR, and how the App Router changes the data-fetching model.',
    summary_es:
      'La división entre componentes de servidor y de cliente, el SSR en streaming, y cómo el App Router cambia el modelo de obtención de datos.',
    tags: ['rsc', 'ssr', 'nextjs', 'streaming'],
    blocks: [
      h3('Why server rendering at all'),
      p(
        'Client-side-only rendering ships an empty HTML shell plus a JS bundle; the user sees a blank page (or a spinner) until JS downloads, parses, and runs. Server-Side Rendering (SSR) renders the initial HTML on the server so the user sees meaningful content immediately, then "hydrates" it — attaching React\'s event handlers to that existing HTML — to make it interactive.'
      ),
      h3('React Server Components (RSC): a new axis, not just "SSR v2"'),
      p(
        'Traditional SSR still ships every component\'s JS to the client for hydration. Server Components are a distinct concept: they render ONLY on the server, never ship their code to the client bundle at all, and can directly access server-only resources (databases, filesystems, secrets) without an API layer. Client Components (marked with the "use client" directive) are the ones that ship JS and can use state, effects, and browser APIs. In the Next.js App Router, every component under app/ is a Server Component by default.'
      ),
      code(
        `// app/products/page.js — Server Component by default (no directive needed)
async function ProductsPage() {
  const products = await db.query('SELECT * FROM products') // direct DB access, server-only
  return (
    <ul>
      {products.map((p) => <ProductRow key={p.id} product={p} />)}
    </ul>
  )
}

// ProductRow.jsx
'use client' // opts into client rendering — needed because it uses state
function ProductRow({ product }) {
  const [expanded, setExpanded] = useState(false)
  return <li onClick={() => setExpanded(!expanded)}>{product.name}</li>
}`
      ),
      h3('The mental model shift'),
      p(
        'Rather than "fetch data in a client component with useEffect, then render," the RSC model is "render server components that already have their data (via direct await), and hand only the interactive leaves to the client." This shrinks the client bundle (server-only components ship zero JS) and eliminates client-server request waterfalls for data that never needed to leave the server.'
      ),
      h3('Streaming'),
      p(
        'Instead of waiting for the entire page\'s data to resolve before sending any HTML, streaming SSR (built on Suspense boundaries, exposed in the App Router via loading.js files and nested <Suspense>) sends the shell immediately and streams in each suspended section\'s HTML as its data resolves — the browser progressively reveals content instead of showing nothing until the slowest query finishes.'
      ),
      h3('Trade-offs to reason about'),
      ul([
        'Server Components cannot use hooks, state, or browser-only APIs — they render once, on the server, per request.',
        'The server/client boundary is a real architectural decision, not a toggle: pushing data-fetching to the server reduces client JS, but every interactive piece of UI still needs its own Client Component boundary.',
        'This model requires a framework with server infrastructure (Next.js App Router, or similar) — a plain client-only SPA has no concept of Server Components.',
      ]),
    ],
  },
  {
    id: 'build-tooling',
    title: 'Build Tooling & Bundling',
    title_es: 'Herramientas de Build y Bundling',
    level: 'Graduate',
    category: 'Internals',
    minutes: 10,
    summary:
      'What a bundler actually does, ESM vs CommonJS, tree-shaking, and how Next.js/Turbopack fit in.',
    summary_es:
      'Qué hace realmente un bundler, ESM vs CommonJS, tree-shaking, y cómo encajan Next.js/Turbopack.',
    tags: ['nextjs', 'turbopack', 'webpack', 'bundling'],
    blocks: [
      p(
        'A bundler\'s job is to take a graph of modules (your JS/CSS/assets and their import/require relationships) and produce a smaller set of output files optimized for the browser: resolving module specifiers, transforming syntax (JSX, TypeScript, newer JS) into something the target browsers understand, and combining/splitting files for efficient loading. Next.js uses Webpack (and increasingly Turbopack, its Rust-based successor) under the hood, so most apps never configure a bundler directly.'
      ),
      h3('Why Turbopack dev mode is fast: incremental, function-level caching'),
      p(
        'Traditional bundlers rebuild large portions of the dependency graph on each change. Turbopack (written in Rust, used by "next dev --turbo" and the default in newer Next.js versions) caches build work at a granular, function level and only recomputes what actually changed, so incremental rebuilds stay fast even as an app grows to thousands of modules — the same problem Vite\'s dev server solves via native ESM, solved instead via a faster incremental bundler.'
      ),
      h3('Production builds still bundle and optimize'),
      p(
        '"next build" produces an optimized production bundle: per-route JS chunks, shared vendor chunks, minification, and (for the App Router) a split between server-only code and client bundles based on "use client" boundaries — because serving unbundled, unminified files in production is slower and larger than a well-structured, cached production bundle.'
      ),
      h3('Tree-shaking'),
      p(
        'Tree-shaking removes exported code that is never imported anywhere, based on static analysis of ES Module import/export statements. This is why ESM (import/export) enables far better tree-shaking than CommonJS (require/module.exports) — CommonJS exports are dynamic JS objects that a bundler cannot always statically prove are unused, while ESM\'s static import graph can be analyzed at build time.'
      ),
      h3('Code splitting at the framework level'),
      p(
        'Next.js automatically code-splits by route — visiting one page only downloads that page\'s JS, not the whole app\'s. Dynamic imports via next/dynamic (built on React.lazy) let you split further within a page, deferring heavy rarely-used components (a chart library, a rich text editor) until they are actually rendered.'
      ),
      h3('Source maps and dev vs prod trade-offs'),
      p(
        'Minification (renaming variables, removing whitespace, dead-code elimination) shrinks production bundles but makes stack traces unreadable; source maps restore readable file/line info in error reporting tools and browser devtools by mapping minified positions back to original source, at the cost of an extra (usually separately-hosted) file.'
      ),
    ],
  },
  {
    id: 'architecting-large-apps',
    title: 'Architecting Large-Scale React Applications',
    title_es: 'Arquitectura de Aplicaciones React a Gran Escala',
    level: 'Graduate',
    category: 'Architecture',
    minutes: 11,
    summary:
      'Feature-based folder structure, module boundaries, and scaling a codebase across many contributors.',
    summary_es:
      'Estructura de carpetas basada en features, límites entre módulos, y cómo escalar un código base entre muchos colaboradores.',
    tags: ['architecture', 'scalability', 'monorepo'],
    blocks: [
      h3('From "type-based" to "feature-based" structure'),
      p(
        'Small apps often group files by type: components/, hooks/, utils/. As an app grows past a handful of features, this scatters everything related to one feature across the whole tree, and it becomes hard to tell what is safe to delete or change. Feature-based ("colocation") structure instead groups all files for one feature/domain together, with only truly cross-cutting code (design-system primitives, shared hooks, API client) living in a shared/ or common/ layer — a pattern that composes naturally with the Next.js App Router, where route folders already colocate a feature\'s page, layout, and loading state.'
      ),
      code(
        `src/
  features/
    checkout/
      Checkout.jsx
      useCheckoutForm.js
      checkoutApi.js
      checkout.test.jsx
    profile/
      ProfilePage.jsx
      useProfile.js
  shared/
    components/Button.jsx
    hooks/useDebouncedValue.js
    api/client.js`
      ),
      h3('Defining module boundaries deliberately'),
      p(
        'In a large codebase with many contributors, an implicit rule ("don\'t import across features") isn\'t enough — it gets violated within a week. Enforce boundaries with tooling: ESLint rules like eslint-plugin-boundaries or import/no-restricted-paths, or a monorepo tool (Nx, Turborepo) with explicit package dependency graphs, so a feature can only import from shared/ and its own public API (e.g. an index.js barrel), not another feature\'s internals.'
      ),
      h3('Public API per module'),
      p(
        'Each feature folder should expose a small, deliberate public surface (typically one index file re-exporting only what other parts of the app are allowed to use), while internal helpers stay unexported. This is the same principle as encapsulation in any large software system, applied at the folder level instead of the class level.'
      ),
      h3('Shared design system as its own package'),
      p(
        'Beyond a certain team size, the UI primitives (Button, Input, Modal, design tokens) are best extracted into a versioned internal package, decoupling their release cycle from the app\'s and making it possible to reuse across multiple apps in the same organization without copy-pasting components.'
      ),
      h3('Where the boundary between "React architecture" and "just software architecture" disappears'),
      p(
        'At this scale, the hard problems are rarely React-specific — they are the general software-engineering problems of managing coupling, defining ownership boundaries between teams, and keeping build/test feedback loops fast as the codebase grows (incremental builds, affected-only test runs, dependency graph analysis). React expertise matters for the details; the architecture skill that scales is the same one that scales any large system.'
      ),
    ],
  },
]

export const CATEGORIES = [...new Set(topics.map((t) => t.category))].sort()
