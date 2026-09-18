// Static UI-chrome translations. Document/quiz content translations live
// alongside their data in src/data/topics.js and src/data/quiz.js.

export const LOCALES = ['en', 'es']

export const LEVEL_LABELS = {
  en: { Junior: 'Junior', Mid: 'Mid', Senior: 'Senior', Graduate: 'Graduate' },
  es: { Junior: 'Junior', Mid: 'Intermedio', Senior: 'Senior', Graduate: 'Posgrado' },
}

export const CATEGORY_LABELS = {
  en: {
    Fundamentals: 'Fundamentals',
    Hooks: 'Hooks',
    'State Management': 'State Management',
    Ecosystem: 'Ecosystem',
    Performance: 'Performance',
    Architecture: 'Architecture',
    Testing: 'Testing',
    Accessibility: 'Accessibility',
    Internals: 'Internals',
  },
  es: {
    Fundamentals: 'Fundamentos',
    Hooks: 'Hooks',
    'State Management': 'Gestión de Estado',
    Ecosystem: 'Ecosistema',
    Performance: 'Rendimiento',
    Architecture: 'Arquitectura',
    Testing: 'Pruebas',
    Accessibility: 'Accesibilidad',
    Internals: 'Internos',
  },
}

export const strings = {
  en: {
    nav_home: 'Home',
    nav_docs: 'Documents',
    nav_gamify: 'Gamify',
    nav_github: 'GitHub',
    lang_name_en: 'English',
    lang_name_es: 'Español',
    footer_tagline: 'React Ultimate Guide — a free, open study reference. No backend, no tracking.',
    footer_source: 'View source on GitHub',

    home_kicker: 'No backend • No signup • Everything runs in your browser',
    home_title_pre: "Learn React the way you'd want a",
    home_title_highlight: 'senior engineer',
    home_title_post: 'to teach it to you',
    home_lede:
      'React Ultimate Guide is a free, open study reference covering React.js and its ecosystem end to end — from your very first component to the internals of concurrent rendering and Server Components. Read it, search it, and test yourself with the gamified practice mode.',
    home_cta_docs: 'Browse the documents',
    home_cta_gamify: 'Try the gamified quiz',
    stat_topics: 'Topics',
    stat_levels: 'Levels',
    stat_categories: 'Categories',
    stat_questions: 'Quiz questions',
    feature_docs_title: 'Documents',
    feature_docs_body:
      "Every topic is its own self-contained study document — real explanations and code, not flashcards. Filter by difficulty or search by keyword to find exactly what you need.",
    feature_gamify_title: 'Gamify',
    feature_gamify_body:
      'Turn studying into a game: answer questions tied to each document, build a streak, earn points by difficulty, and see how far you get before missing one.',
    feature_reference_title: 'Reference, forever',
    feature_reference_body:
      'Come back any time you need a refresher — on hooks, rendering internals, testing, or architecture — without digging through scattered blog posts.',
    home_curriculum_title: 'A curriculum from junior to graduate level',
    home_curriculum_cta: 'View all documents →',
    home_topic_singular: 'topic',
    home_topic_plural: 'topics',
    home_categories_title: 'Everything is covered by category',
    home_ready_title: 'Ready to level up?',
    home_ready_body:
      "Pick a topic that matches where you are today, and let the difficulty filter guide you toward what's next.",
    home_ready_cta: 'Start learning',

    docs_title: 'Documents',
    docs_description:
      'self-contained study documents covering React.js and its ecosystem, tagged by difficulty level so you always know what to read next.',
    docs_search_placeholder: 'Search topics, e.g. useEffect, testing, suspense…',
    docs_search_label: 'Search documents',
    docs_filter_label: 'Filter by difficulty level',
    docs_level_all: 'All',
    docs_result_singular: 'result',
    docs_result_plural: 'results',
    docs_empty_prefix: 'No topics match',
    docs_empty_suffix: 'Try a different search or clear the level filter.',
    docs_min_read: 'min read',

    doc_back: '← All documents',
    doc_more_in: 'More in',

    gamify_title: 'Gamify',
    gamify_description:
      'Turn studying into a game. Answer questions tied directly to the Documents library, earn points based on difficulty, and chain a streak for bonus points.',
    gamify_intro_body:
      'Choose a difficulty pool, then answer as many questions as you can without breaking your streak. Higher levels are worth more points, and a 3+ answer streak earns a bonus.',
    gamify_pool_count_prefix: 'questions in this pool',
    gamify_start: 'Start challenge',
    gamify_question_of: 'Question',
    gamify_score: 'Score',
    gamify_streak: 'Streak',
    gamify_pts: 'pts',
    gamify_read_full_doc: 'Read the full document →',
    gamify_next: 'Next question',
    gamify_finish: 'Finish',
    gamify_complete: 'Challenge complete',
    gamify_correct_of: 'correct',
    gamify_best_streak: 'best streak',
    gamify_personal_best: 'Personal best',
    gamify_play_again: 'Play again',
    gamify_review_docs: 'Review the documents',

    doc_body_es_missing:
      'This lesson’s full text is currently only available in English. UI, titles, and summaries are translated — full-body Spanish translation is in progress.',
  },
  es: {
    nav_home: 'Inicio',
    nav_docs: 'Documentos',
    nav_gamify: 'Gamificación',
    nav_github: 'GitHub',
    lang_name_en: 'English',
    lang_name_es: 'Español',
    footer_tagline: 'React Ultimate Guide — una referencia de estudio abierta y gratuita. Sin backend, sin rastreo.',
    footer_source: 'Ver código fuente en GitHub',

    home_kicker: 'Sin backend • Sin registro • Todo se ejecuta en tu navegador',
    home_title_pre: 'Aprende React como querrías que te lo enseñara un',
    home_title_highlight: 'ingeniero senior',
    home_title_post: '',
    home_lede:
      'React Ultimate Guide es una referencia de estudio abierta y gratuita que cubre React.js y su ecosistema de principio a fin — desde tu primer componente hasta los detalles internos del renderizado concurrente y los Server Components. Léela, búscala y pon a prueba lo aprendido con el modo de práctica gamificado.',
    home_cta_docs: 'Explorar los documentos',
    home_cta_gamify: 'Probar el quiz gamificado',
    stat_topics: 'Temas',
    stat_levels: 'Niveles',
    stat_categories: 'Categorías',
    stat_questions: 'Preguntas del quiz',
    feature_docs_title: 'Documentos',
    feature_docs_body:
      'Cada tema es su propio documento de estudio autocontenido — explicaciones y código reales, no tarjetas de memoria. Filtra por dificultad o busca por palabra clave para encontrar justo lo que necesitas.',
    feature_gamify_title: 'Gamificación',
    feature_gamify_body:
      'Convierte estudiar en un juego: responde preguntas vinculadas a cada documento, mantén una racha, gana puntos según la dificultad y descubre hasta dónde llegas antes de fallar.',
    feature_reference_title: 'Referencia, para siempre',
    feature_reference_body:
      'Vuelve cuando necesites repasar — hooks, internos del renderizado, pruebas o arquitectura — sin tener que buscar en publicaciones de blog dispersas.',
    home_curriculum_title: 'Un plan de estudios de nivel junior a posgrado',
    home_curriculum_cta: 'Ver todos los documentos →',
    home_topic_singular: 'tema',
    home_topic_plural: 'temas',
    home_categories_title: 'Todo está cubierto por categoría',
    home_ready_title: '¿Listo para subir de nivel?',
    home_ready_body:
      'Elige un tema que coincida con tu nivel actual, y deja que el filtro de dificultad te guíe hacia lo siguiente.',
    home_ready_cta: 'Empezar a aprender',

    docs_title: 'Documentos',
    docs_description:
      'documentos de estudio autocontenidos que cubren React.js y su ecosistema, etiquetados por nivel de dificultad para que siempre sepas qué leer a continuación.',
    docs_search_placeholder: 'Busca temas, ej. useEffect, testing, suspense…',
    docs_search_label: 'Buscar documentos',
    docs_filter_label: 'Filtrar por nivel de dificultad',
    docs_level_all: 'Todos',
    docs_result_singular: 'resultado',
    docs_result_plural: 'resultados',
    docs_empty_prefix: 'Ningún tema coincide con',
    docs_empty_suffix: 'Prueba otra búsqueda o quita el filtro de nivel.',
    docs_min_read: 'min de lectura',

    doc_back: '← Todos los documentos',
    doc_more_in: 'Más sobre',

    gamify_title: 'Gamificación',
    gamify_description:
      'Convierte estudiar en un juego. Responde preguntas vinculadas directamente a la biblioteca de Documentos, gana puntos según la dificultad y encadena una racha para obtener puntos extra.',
    gamify_intro_body:
      'Elige un nivel de dificultad y responde tantas preguntas como puedas sin romper tu racha. Los niveles más altos valen más puntos, y una racha de 3 o más respuestas correctas otorga un bono.',
    gamify_pool_count_prefix: 'preguntas en este grupo',
    gamify_start: 'Comenzar el reto',
    gamify_question_of: 'Pregunta',
    gamify_score: 'Puntos',
    gamify_streak: 'Racha',
    gamify_pts: 'pts',
    gamify_read_full_doc: 'Leer el documento completo →',
    gamify_next: 'Siguiente pregunta',
    gamify_finish: 'Terminar',
    gamify_complete: 'Reto completado',
    gamify_correct_of: 'correctas',
    gamify_best_streak: 'mejor racha',
    gamify_personal_best: 'Mejor puntaje',
    gamify_play_again: 'Jugar de nuevo',
    gamify_review_docs: 'Repasar los documentos',

    doc_body_es_missing:
      'El contenido completo de esta lección todavía está disponible solo en inglés. La interfaz, los títulos y los resúmenes ya están traducidos — la traducción completa al español está en progreso.',
  },
}
