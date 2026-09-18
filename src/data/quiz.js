// Quiz bank for the Gamify experience page.
// Each question is tied to a topic id from data/topics.js so it can link
// back to the relevant study document, and carries a difficulty level
// used for scoring (harder questions are worth more points).
// _es fields hold the Spanish translation of prompt/options/explanation;
// GamifyGame falls back to the English field when a translation is missing.

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
    prompt_es: '¿A qué se compila un JSX como <h1>Hi</h1>?',
    options: [
      'A call to React.createElement (or the jsx() runtime function)',
      'Raw HTML that the browser parses directly',
      'A template string that gets eval()\'d',
      'A CSS-in-JS style object',
    ],
    options_es: [
      'A una llamada a React.createElement (o a la función jsx() del runtime)',
      'A HTML puro que el navegador parsea directamente',
      'A un template string al que se le hace eval()',
      'A un objeto de estilos CSS-in-JS',
    ],
    correctIndex: 0,
    explanation:
      'JSX is syntactic sugar for function calls that produce plain JS objects describing the UI — it is never raw HTML.',
    explanation_es:
      'JSX es azúcar sintáctico para llamadas a funciones que producen objetos JS planos que describen la interfaz — nunca es HTML puro.',
  },
  {
    id: 'q2',
    topicId: 'jsx-basics',
    level: 'Junior',
    prompt: 'Why does {isVisible && <Banner />} sometimes render a stray "0" on screen?',
    prompt_es: '¿Por qué {isVisible && <Banner />} a veces muestra un "0" suelto en pantalla?',
    options: [
      'Because isVisible is a number like 0, and 0 is falsy but still gets rendered as text',
      'Because <Banner /> always returns 0 on error',
      'Because JSX cannot use the && operator',
      'Because React converts booleans to 0/1',
    ],
    options_es: [
      'Porque isVisible es un número como 0, y 0 es falsy pero igual se renderiza como texto',
      'Porque <Banner /> siempre devuelve 0 en caso de error',
      'Porque JSX no puede usar el operador &&',
      'Porque React convierte los booleanos a 0/1',
    ],
    correctIndex: 0,
    explanation:
      '0 is falsy, so && short-circuits to 0 — and unlike null/undefined/false, the number 0 is a valid renderable child, so it shows up literally.',
    explanation_es:
      '0 es falsy, así que && se detiene en 0 — y a diferencia de null/undefined/false, el número 0 es un hijo válido para renderizar, así que aparece literalmente.',
  },
  {
    id: 'q3',
    topicId: 'components-props',
    level: 'Junior',
    prompt: 'What is the correct way for a child component to update data owned by its parent?',
    prompt_es: '¿Cuál es la forma correcta de que un componente hijo actualice datos que pertenecen a su padre?',
    options: [
      'Mutate the prop object directly inside the child',
      'Call a callback function passed down as a prop, which the parent defined',
      'Reach up the component tree using document.querySelector',
      'Reassign the prop variable inside the child function',
    ],
    options_es: [
      'Mutar el objeto de la prop directamente dentro del hijo',
      'Llamar a una función callback pasada como prop, definida por el padre',
      'Subir por el árbol de componentes usando document.querySelector',
      'Reasignar la variable de la prop dentro de la función del hijo',
    ],
    correctIndex: 1,
    explanation:
      'Data flows down as props, and events flow up as callback props — props themselves must never be mutated by the child.',
    explanation_es:
      'Los datos fluyen hacia abajo como props, y los eventos fluyen hacia arriba como callbacks pasados como props — las props nunca deben ser mutadas por el hijo.',
  },
  {
    id: 'q4',
    topicId: 'usestate',
    level: 'Junior',
    prompt: 'Why does calling setCount(count + 1) twice in the same event handler only increment by 1, not 2?',
    prompt_es: '¿Por qué llamar a setCount(count + 1) dos veces en el mismo manejador de eventos solo incrementa en 1, no en 2?',
    options: [
      'React ignores the second call entirely',
      'Both calls read the same stale "count" value captured in that render\'s closure',
      'useState only allows one update per component per second',
      'It is a bug in React that was never fixed',
    ],
    options_es: [
      'React ignora por completo la segunda llamada',
      'Ambas llamadas leen el mismo valor obsoleto de "count" capturado en el closure de ese render',
      'useState solo permite una actualización por componente por segundo',
      'Es un bug de React que nunca se corrigió',
    ],
    correctIndex: 1,
    explanation:
      'Both calls close over the same "count" from that render. The fix is the functional updater form: setCount(c => c + 1).',
    explanation_es:
      'Ambas llamadas capturan el mismo "count" de ese render. La solución es la forma de actualización funcional: setCount(c => c + 1).',
  },
  {
    id: 'q5',
    topicId: 'usestate',
    level: 'Junior',
    prompt: 'When should you pass a function to useState instead of a plain value?',
    prompt_es: '¿Cuándo deberías pasarle una función a useState en lugar de un valor simple?',
    options: [
      'Never — it always throws',
      'When the initial value is expensive to compute, so it only runs once on mount',
      'Only when the state is a boolean',
      'Whenever you want the state to update automatically every second',
    ],
    options_es: [
      'Nunca — siempre lanza un error',
      'Cuando el valor inicial es costoso de calcular, así solo se ejecuta una vez al montar',
      'Solo cuando el estado es un booleano',
      'Cuando quieras que el estado se actualice automáticamente cada segundo',
    ],
    correctIndex: 1,
    explanation:
      'Lazy initial state (useState(() => expensiveCalc())) avoids re-running an expensive computation on every render — it only runs once.',
    explanation_es:
      'El estado inicial perezoso (useState(() => calculoCostoso())) evita repetir un cálculo costoso en cada render — solo se ejecuta una vez.',
  },
  {
    id: 'q6',
    topicId: 'conditional-list-rendering',
    level: 'Junior',
    prompt: 'Why shouldn\'t you use the array index as the key when rendering a reorderable list?',
    prompt_es: '¿Por qué no deberías usar el índice del array como key al renderizar una lista reordenable?',
    options: [
      'Indexes are always numbers and React only accepts string keys',
      'It causes an immediate crash',
      'React matches items between renders by key, so an unstable key can attach state/focus to the wrong item after reordering',
      'It makes the list render in reverse order',
    ],
    options_es: [
      'Los índices siempre son números y React solo acepta keys de tipo string',
      'Provoca un error inmediato',
      'React relaciona los elementos entre renders por su key, así que una key inestable puede asociar el estado/foco al elemento equivocado tras reordenar',
      'Hace que la lista se renderice en orden inverso',
    ],
    correctIndex: 2,
    explanation:
      'Keys are how React matches old and new list items during reconciliation. Index-based keys shift when the list reorders, misattaching state.',
    explanation_es:
      'Las keys son cómo React relaciona los elementos viejos y nuevos de una lista durante la reconciliación. Las keys basadas en índice cambian al reordenar la lista, asociando mal el estado.',
  },
  {
    id: 'q7',
    topicId: 'forms-controlled-inputs',
    level: 'Junior',
    prompt: 'What makes an <input> a "controlled" component in React?',
    prompt_es: '¿Qué hace que un <input> sea un componente "controlado" en React?',
    options: [
      'It has an onClick handler',
      'Its value is driven entirely by React state, and onChange updates that state on every keystroke',
      'It is wrapped in a <form> tag',
      'It uses a ref instead of state',
    ],
    options_es: [
      'Tiene un manejador onClick',
      'Su valor está determinado completamente por el estado de React, y onChange actualiza ese estado en cada tecla',
      'Está envuelto en una etiqueta <form>',
      'Usa un ref en lugar de estado',
    ],
    correctIndex: 1,
    explanation:
      'Controlled means the DOM value and React state are always in sync — state is the single source of truth for the input\'s value.',
    explanation_es:
      'Controlado significa que el valor del DOM y el estado de React siempre están sincronizados — el estado es la única fuente de verdad para el valor del input.',
  },
  {
    id: 'q8',
    topicId: 'useeffect',
    level: 'Mid',
    prompt: 'What is the purpose of the function returned from inside useEffect?',
    prompt_es: '¿Cuál es el propósito de la función que se retorna dentro de useEffect?',
    options: [
      'It re-runs the effect immediately',
      'It is a cleanup function, called before the effect re-runs and on unmount',
      'It replaces the component\'s render output',
      'It has no special meaning; it is just ignored',
    ],
    options_es: [
      'Vuelve a ejecutar el efecto inmediatamente',
      'Es una función de limpieza, llamada antes de que el efecto se re-ejecute y al desmontar',
      'Reemplaza el resultado del render del componente',
      'No tiene ningún significado especial; simplemente se ignora',
    ],
    correctIndex: 1,
    explanation:
      'The returned function is cleanup — essential for canceling subscriptions, timers, and listeners to avoid leaks and stale updates.',
    explanation_es:
      'La función retornada es de limpieza — esencial para cancelar suscripciones, temporizadores y listeners y así evitar fugas y actualizaciones obsoletas.',
  },
  {
    id: 'q9',
    topicId: 'useeffect',
    level: 'Mid',
    prompt: 'An effect reads a prop "userId" but the dependency array is []. What bug results?',
    prompt_es: 'Un efecto lee una prop "userId" pero el array de dependencias es []. ¿Qué bug resulta?',
    options: [
      'The effect throws a compile error',
      'The effect runs once on mount and keeps using the userId value from that first render forever (a stale closure)',
      'React automatically fixes the dependency array for you',
      'The component fails to render at all',
    ],
    options_es: [
      'El efecto lanza un error de compilación',
      'El efecto se ejecuta una vez al montar y sigue usando para siempre el valor de userId de ese primer render (un closure obsoleto)',
      'React corrige automáticamente el array de dependencias por ti',
      'El componente falla al renderizar por completo',
    ],
    correctIndex: 1,
    explanation:
      'An empty dependency array means the effect only runs once, closing over whatever values existed at that time — a classic stale-closure bug.',
    explanation_es:
      'Un array de dependencias vacío significa que el efecto solo se ejecuta una vez, capturando los valores que existían en ese momento — un bug clásico de closure obsoleto.',
  },
  {
    id: 'q10',
    topicId: 'refs-and-dom',
    level: 'Mid',
    prompt: 'What is the key difference between useRef and useState?',
    prompt_es: '¿Cuál es la diferencia clave entre useRef y useState?',
    options: [
      'useRef can only store numbers',
      'Updating a ref does not trigger a re-render; updating state does',
      'useState is deprecated in favor of useRef',
      'They are exactly interchangeable',
    ],
    options_es: [
      'useRef solo puede almacenar números',
      'Actualizar un ref no dispara un re-render; actualizar el estado sí',
      'useState está obsoleto en favor de useRef',
      'Son exactamente intercambiables',
    ],
    correctIndex: 1,
    explanation:
      'Refs persist a mutable value across renders without causing React to re-render — use state for anything that must show up in the UI.',
    explanation_es:
      'Los refs conservan un valor mutable entre renders sin causar que React vuelva a renderizar — usa estado para todo lo que deba reflejarse en la interfaz.',
  },
  {
    id: 'q11',
    topicId: 'context-api',
    level: 'Mid',
    prompt: 'Why does passing value={{ user, setUser }} directly on a Context.Provider hurt performance?',
    prompt_es: '¿Por qué pasar value={{ user, setUser }} directamente en un Context.Provider perjudica el rendimiento?',
    options: [
      'Context providers can only accept primitive values',
      'It creates a brand-new object every render, so every consuming component re-renders even when the actual data is unchanged',
      'Objects cannot be passed through Context at all',
      'It causes a memory leak that crashes the browser tab',
    ],
    options_es: [
      'Los providers de Context solo pueden aceptar valores primitivos',
      'Crea un objeto completamente nuevo en cada render, así que todo componente consumidor se re-renderiza aunque los datos reales no cambien',
      'Los objetos no se pueden pasar a través de Context en absoluto',
      'Causa una fuga de memoria que bloquea la pestaña del navegador',
    ],
    correctIndex: 1,
    explanation:
      'Every render creates a new object reference; consumers compare by reference, so they all re-render. Memoizing the value with useMemo fixes it.',
    explanation_es:
      'Cada render crea una nueva referencia de objeto; los consumidores comparan por referencia, así que todos se re-renderizan. Memoizar el valor con useMemo lo soluciona.',
  },
  {
    id: 'q12',
    topicId: 'custom-hooks',
    level: 'Mid',
    prompt: 'Which of these is a valid reason the "rules of hooks" require calling hooks at the top level only?',
    prompt_es: '¿Cuál de estas es una razón válida por la que las "reglas de los hooks" exigen llamarlos solo en el nivel superior?',
    options: [
      'It makes the code prettier',
      'React tracks hook state by call order across renders, so conditionally skipping a hook call shifts that order and corrupts state',
      'Hooks are only allowed in class components',
      'It is purely a stylistic ESLint preference with no functional impact',
    ],
    options_es: [
      'Hace que el código se vea más bonito',
      'React rastrea el estado de los hooks por el orden de las llamadas entre renders, así que omitir condicionalmente una llamada desplaza ese orden y corrompe el estado',
      'Los hooks solo se permiten en componentes de clase',
      'Es puramente una preferencia de estilo de ESLint sin impacto funcional',
    ],
    correctIndex: 1,
    explanation:
      'React has no names for hook calls internally — only call order. Conditional hook calls break that ordering between renders.',
    explanation_es:
      'React no tiene nombres para las llamadas a hooks internamente — solo el orden de llamada. Las llamadas condicionales a hooks rompen ese orden entre renders.',
  },
  {
    id: 'q13',
    topicId: 'usememo-usecallback',
    level: 'Mid',
    prompt: 'When is useMemo actually worth using?',
    prompt_es: '¿Cuándo realmente vale la pena usar useMemo?',
    options: [
      'On every derived value, always, as a best practice',
      'When a computation is measurably expensive and/or its stable reference is needed by another memoized dependency',
      'Never — useMemo was removed in React 18',
      'Only inside class components',
    ],
    options_es: [
      'En cada valor derivado, siempre, como buena práctica',
      'Cuando un cálculo es medible y costoso, y/o su referencia estable es necesaria para otra dependencia memoizada',
      'Nunca — useMemo se eliminó en React 18',
      'Solo dentro de componentes de clase',
    ],
    correctIndex: 1,
    explanation:
      'useMemo has its own overhead (dependency comparison). It pays off for real expensive computations or to stabilize references other memoization depends on.',
    explanation_es:
      'useMemo tiene su propio costo (comparar dependencias). Vale la pena para cálculos realmente costosos o para estabilizar referencias de las que depende otra memoización.',
  },
  {
    id: 'q14',
    topicId: 'state-management-at-scale',
    level: 'Senior',
    prompt: 'What is the FIRST question to ask when deciding where a piece of state should live?',
    prompt_es: '¿Cuál es la PRIMERA pregunta que hay que hacerse al decidir dónde debe vivir un estado?',
    options: [
      'Which state library is trendiest right now?',
      'How close to where it is used can this state be colocated, and how many distant components actually need it?',
      'Should it always go directly into Redux for consistency?',
      'Can it be stored in localStorage instead?',
    ],
    options_es: [
      '¿Cuál librería de estado está más de moda ahora mismo?',
      '¿Qué tan cerca de donde se usa se puede colocar este estado, y cuántos componentes distantes realmente lo necesitan?',
      '¿Debería ir siempre directamente a Redux por consistencia?',
      '¿Se puede guardar en localStorage en su lugar?',
    ],
    correctIndex: 1,
    explanation:
      'Colocation first: lift state only as far as necessary. Reaching for a global store before checking this leads to unnecessary complexity.',
    explanation_es:
      'Primero la colocación: eleva el estado solo hasta donde sea necesario. Recurrir a un store global antes de verificar esto genera complejidad innecesaria.',
  },
  {
    id: 'q15',
    topicId: 'state-management-at-scale',
    level: 'Senior',
    prompt: 'What problem do libraries like React Query / TanStack Query solve that Redux/Context don\'t address well out of the box?',
    prompt_es: '¿Qué problema resuelven librerías como React Query / TanStack Query que Redux/Context no manejan bien de fábrica?',
    options: [
      'They solve client-only UI state like "is this modal open"',
      'They handle server-state concerns: caching, revalidation, deduplication, and background refetching of API data',
      'They replace the need for any component state at all',
      'They are a routing solution',
    ],
    options_es: [
      'Resuelven estado de interfaz puramente del cliente, como "¿está este modal abierto?"',
      'Manejan asuntos de estado del servidor: caché, revalidación, deduplicación y refetching en segundo plano de datos de la API',
      'Eliminan por completo la necesidad de tener estado en los componentes',
      'Son una solución de enrutamiento',
    ],
    correctIndex: 1,
    explanation:
      'Server state (data fetched from an API) has fundamentally different needs — caching and freshness — than client UI state, and dedicated libraries model that directly.',
    explanation_es:
      'El estado del servidor (datos obtenidos de una API) tiene necesidades fundamentalmente distintas — caché y frescura de los datos — que el estado de interfaz del cliente, y las librerías dedicadas modelan eso directamente.',
  },
  {
    id: 'q16',
    topicId: 'performance-optimization',
    level: 'Senior',
    prompt: 'What should you do BEFORE reaching for React.memo or useMemo to fix a slow UI?',
    prompt_es: '¿Qué deberías hacer ANTES de recurrir a React.memo o useMemo para arreglar una interfaz lenta?',
    options: [
      'Wrap every component in memo preemptively',
      'Profile with React DevTools to confirm which components re-render, how often, and why',
      'Rewrite the app in a different framework',
      'Add more useEffect calls',
    ],
    options_es: [
      'Envolver preventivamente todos los componentes en memo',
      'Perfilar con React DevTools para confirmar qué componentes se re-renderizan, con qué frecuencia y por qué',
      'Reescribir la app en otro framework',
      'Agregar más llamadas a useEffect',
    ],
    correctIndex: 1,
    explanation:
      'Optimizing without profiling is guesswork. The Profiler tells you exactly which components re-render and why before you add memoization complexity.',
    explanation_es:
      'Optimizar sin perfilar es adivinar. El Profiler te dice exactamente qué componentes se re-renderizan y por qué, antes de agregar la complejidad de la memoización.',
  },
  {
    id: 'q17',
    topicId: 'performance-optimization',
    level: 'Senior',
    prompt: 'Why does list virtualization help performance more than React.memo alone for a 10,000-item list?',
    prompt_es: '¿Por qué la virtualización de listas ayuda más al rendimiento que solo React.memo en una lista de 10,000 elementos?',
    options: [
      'It reduces network requests',
      'It limits the number of DOM nodes actually created and laid out to only what is visible in the viewport',
      'It automatically sorts the list faster',
      'It disables scrolling to save CPU',
    ],
    options_es: [
      'Reduce las peticiones de red',
      'Limita la cantidad de nodos del DOM realmente creados y renderizados solo a lo visible en el viewport',
      'Ordena automáticamente la lista más rápido',
      'Desactiva el scroll para ahorrar CPU',
    ],
    correctIndex: 1,
    explanation:
      'Even with perfect memoization, laying out and painting 10,000 real DOM nodes is slow. Virtualization keeps rendered DOM node count roughly constant.',
    explanation_es:
      'Incluso con memoización perfecta, calcular el layout y pintar 10,000 nodos reales del DOM es lento. La virtualización mantiene el número de nodos renderizados aproximadamente constante.',
  },
  {
    id: 'q18',
    topicId: 'design-patterns',
    level: 'Senior',
    prompt: 'What problem do compound components (like <Tabs><Tabs.Trigger/></Tabs>) solve?',
    prompt_es: '¿Qué problema resuelven los componentes compuestos (como <Tabs><Tabs.Trigger/></Tabs>)?',
    options: [
      'They let a widget be split into flexible, freely-composable pieces that share implicit state via Context',
      'They eliminate the need for any props',
      'They are required for all React components since v18',
      'They replace CSS entirely',
    ],
    options_es: [
      'Permiten dividir un widget en piezas flexibles y componibles libremente que comparten estado implícito vía Context',
      'Eliminan la necesidad de usar props',
      'Son obligatorios para todos los componentes de React desde la v18',
      'Reemplazan CSS por completo',
    ],
    correctIndex: 0,
    explanation:
      'Compound components share state through Context internally while giving the consumer full control over composition and ordering of the pieces.',
    explanation_es:
      'Los componentes compuestos comparten estado internamente a través de Context, mientras le dan al consumidor control total sobre la composición y el orden de las piezas.',
  },
  {
    id: 'q19',
    topicId: 'testing-react',
    level: 'Senior',
    prompt: 'According to React Testing Library\'s philosophy, which query should you prefer first?',
    prompt_es: 'Según la filosofía de React Testing Library, ¿qué query deberías preferir primero?',
    options: [
      'getByTestId, always, for reliability',
      'getByRole, because it mirrors how real users and assistive technology perceive the page',
      'Directly accessing component internal state',
      'querySelector with a CSS class name',
    ],
    options_es: [
      'getByTestId, siempre, por confiabilidad',
      'getByRole, porque refleja cómo los usuarios reales y la tecnología asistiva perciben la página',
      'Acceder directamente al estado interno del componente',
      'querySelector con el nombre de una clase CSS',
    ],
    correctIndex: 1,
    explanation:
      'getByRole tests what a user (including one using a screen reader) can actually perceive, giving the most real-world confidence.',
    explanation_es:
      'getByRole prueba lo que un usuario (incluyendo quien usa un lector de pantalla) realmente puede percibir, dando la mayor confianza del mundo real.',
  },
  {
    id: 'q20',
    topicId: 'accessibility',
    level: 'Senior',
    prompt: 'Why is <button onClick={fn}>Save</button> better than <div onClick={fn}>Save</div>?',
    prompt_es: '¿Por qué <button onClick={fn}>Guardar</button> es mejor que <div onClick={fn}>Guardar</div>?',
    options: [
      'There is no difference, both are equally accessible',
      'A native button is focusable and keyboard-activatable (Enter/Space) and is announced correctly by screen readers, for free',
      'div elements cannot have onClick handlers at all',
      'button elements render faster in every browser',
    ],
    options_es: [
      'No hay diferencia, ambos son igual de accesibles',
      'Un button nativo es enfocable y se activa con el teclado (Enter/Espacio), y los lectores de pantalla lo anuncian correctamente, gratis',
      'Los elementos div no pueden tener manejadores onClick en absoluto',
      'Los elementos button se renderizan más rápido en todos los navegadores',
    ],
    correctIndex: 1,
    explanation:
      'Semantic HTML elements come with built-in keyboard and assistive-technology behavior that a div requires manual ARIA and key handling to replicate — imperfectly.',
    explanation_es:
      'Los elementos HTML semánticos ya incluyen comportamiento de teclado y tecnología asistiva que un div requeriría replicar manualmente con ARIA y manejo de teclas — de forma imperfecta.',
  },
  {
    id: 'q21',
    topicId: 'concurrent-rendering-suspense',
    level: 'Graduate',
    prompt: 'What does useTransition let you do?',
    prompt_es: '¿Qué te permite hacer useTransition?',
    options: [
      'Animate CSS transitions declaratively',
      'Mark a state update as non-urgent so React can keep the UI responsive to more urgent updates',
      'Delay a component from ever rendering',
      'Force a synchronous re-render',
    ],
    options_es: [
      'Animar transiciones CSS de forma declarativa',
      'Marcar una actualización de estado como no urgente para que React mantenga la interfaz responsiva ante actualizaciones más urgentes',
      'Evitar que un componente se renderice jamás',
      'Forzar un re-render síncrono',
    ],
    correctIndex: 1,
    explanation:
      'Transitions deprioritize an update so React can interrupt it for urgent work like typing or clicking, keeping the UI responsive.',
    explanation_es:
      'Las transiciones despriorizan una actualización para que React pueda interrumpirla ante trabajo urgente como escribir o hacer clic, manteniendo la interfaz responsiva.',
  },
  {
    id: 'q22',
    topicId: 'concurrent-rendering-suspense',
    level: 'Graduate',
    prompt: 'What architectural change enabled React to make rendering interruptible starting with React 16?',
    prompt_es: '¿Qué cambio arquitectónico permitió que React hiciera el renderizado interrumpible a partir de React 16?',
    options: [
      'The Fiber reconciler, which tracks per-component work as resumable units',
      'Switching from JSX to plain HTML templates',
      'Removing the virtual DOM entirely',
      'Adding TypeScript support',
    ],
    options_es: [
      'El reconciliador Fiber, que rastrea el trabajo por componente como unidades reanudables',
      'Cambiar de JSX a templates de HTML puro',
      'Eliminar por completo el DOM virtual',
      'Agregar soporte para TypeScript',
    ],
    correctIndex: 0,
    explanation:
      'Fiber replaced the old stack-based reconciler with a data structure that lets React pause, resume, or abandon rendering work mid-tree.',
    explanation_es:
      'Fiber reemplazó al antiguo reconciliador basado en pila con una estructura de datos que permite a React pausar, reanudar o abandonar el trabajo de renderizado a mitad del árbol.',
  },
  {
    id: 'q23',
    topicId: 'server-components-nextjs',
    level: 'Graduate',
    prompt: 'What is the core distinction between a Server Component and a traditionally server-rendered (SSR) component?',
    prompt_es: '¿Cuál es la distinción central entre un Server Component y un componente renderizado tradicionalmente en el servidor (SSR)?',
    options: [
      'There is no difference, they are the same thing',
      'A Server Component never ships its code to the client bundle at all, while traditional SSR still ships every component\'s JS for hydration',
      'Server Components can only render static text',
      'Server Components require a NoSQL database',
    ],
    options_es: [
      'No hay diferencia, son lo mismo',
      'Un Server Component nunca envía su código al bundle del cliente, mientras que el SSR tradicional sí envía el JS de cada componente para la hidratación',
      'Los Server Components solo pueden renderizar texto estático',
      'Los Server Components requieren una base de datos NoSQL',
    ],
    correctIndex: 1,
    explanation:
      'Server Components are excluded from the client bundle entirely, not just pre-rendered — this is what shrinks bundle size and enables direct server-resource access.',
    explanation_es:
      'Los Server Components se excluyen por completo del bundle del cliente, no solo se pre-renderizan — esto es lo que reduce el tamaño del bundle y permite el acceso directo a recursos del servidor.',
  },
  {
    id: 'q24',
    topicId: 'build-tooling',
    level: 'Graduate',
    prompt: 'Why does ESM (import/export) tree-shake better than CommonJS (require/module.exports)?',
    prompt_es: '¿Por qué ESM (import/export) hace mejor tree-shaking que CommonJS (require/module.exports)?',
    options: [
      'ESM files are always smaller in raw byte size',
      'ESM\'s import/export graph is static and analyzable at build time, while CommonJS exports are dynamic JS objects that resist static analysis',
      'CommonJS is not supported by any modern bundler',
      'Tree-shaking is unrelated to module format',
    ],
    options_es: [
      'Los archivos ESM siempre pesan menos en bytes',
      'El grafo de import/export de ESM es estático y analizable en tiempo de build, mientras que los exports de CommonJS son objetos JS dinámicos que resisten el análisis estático',
      'Ningún bundler moderno soporta CommonJS',
      'El tree-shaking no tiene relación con el formato de módulos',
    ],
    correctIndex: 1,
    explanation:
      'A bundler can statically prove which ESM exports are unused and safely remove them; CommonJS\'s dynamic nature makes that proof much harder in general.',
    explanation_es:
      'Un bundler puede probar estáticamente qué exports de ESM no se usan y eliminarlos con seguridad; la naturaleza dinámica de CommonJS hace esa prueba mucho más difícil en general.',
  },
  {
    id: 'q25',
    topicId: 'architecting-large-apps',
    level: 'Graduate',
    prompt: 'What is the main advantage of feature-based (colocated) folder structure over grouping files strictly by type?',
    prompt_es: '¿Cuál es la principal ventaja de una estructura de carpetas basada en features (colocada) frente a agrupar archivos estrictamente por tipo?',
    options: [
      'It requires fewer files overall',
      'All the code for one feature lives together, making it clear what is safe to change or delete without hunting across the whole tree',
      'It removes the need for any shared components',
      'It is required by the JavaScript spec',
    ],
    options_es: [
      'Requiere menos archivos en total',
      'Todo el código de una feature vive junto, dejando claro qué es seguro cambiar o borrar sin tener que buscar por todo el árbol',
      'Elimina la necesidad de tener componentes compartidos',
      'Lo exige la especificación de JavaScript',
    ],
    correctIndex: 1,
    explanation:
      'Type-based grouping (all components/, all hooks/) scatters a single feature across the tree; colocating by feature keeps related code (and its blast radius) together.',
    explanation_es:
      'Agrupar por tipo (todos los components/, todos los hooks/) dispersa una sola feature por todo el árbol; colocar por feature mantiene junto el código relacionado (y su radio de impacto).',
  },
]
