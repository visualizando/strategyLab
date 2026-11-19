export const commandments = [
  {
    topic: 'Propósito',
    question: '¿En qué parte de tu proceso le harías lugar a la IA?',
    options: [
      ['Solo en tareas operativas', 'Usaré IA para ordenar materiales o transcribir, con controles de privacidad y revisión humana.'],
      ['También para explorar ideas', 'Usaré IA para explorar ideas y probar caminos, y decidiré con mi equipo la forma final de la película.'],
      ['Como parte de la película', 'Incorporaré IA al lenguaje de la película cuando el recurso tenga una función narrativa que pueda explicar.'],
    ],
  },
  {
    topic: 'Autoría',
    question: '¿Quién va a decidir qué aportes de la IA quedan en el corte?',
    options: [
      ['La dirección', 'Como responsable de la dirección, revisaré y aprobaré cada aporte de IA que llegue al corte.'],
      ['El equipo editorial', 'Decidiré con el equipo editorial qué aportes de IA llegan al corte y registraré quién aprobó cada uno.'],
      ['El equipo y las personas involucradas', 'Consultaré a las personas involucradas cuando un aporte de IA cambie cómo aparecen en la película y asumiré la responsabilidad editorial del corte.'],
    ],
  },
  {
    topic: 'Consentimiento',
    question: '¿Cómo vas a cuidar la voz y la imagen de las personas filmadas?',
    options: [
      ['Sin recrear voces ni rostros', 'Excluiré las recreaciones sintéticas de voces y rostros de personas reales.'],
      ['Con permiso para cada uso', 'Pediré consentimiento explícito para cada recreación de una voz o un rostro y explicaré dónde aparecerá.'],
      ['Con permiso y revisión de la escena', 'Acordaré cada recreación de voz o rostro y mostraré la escena a la persona antes de incluirla en el corte.'],
    ],
  },
  {
    topic: 'Archivo y derechos',
    question: '¿Qué materiales le darías a una herramienta de IA?',
    options: [
      ['Material propio o con permiso específico', 'Usaré material propio o con permiso expreso para el uso previsto y conservaré constancia de ese permiso.'],
      ['También material con licencias compatibles', 'Verificaré las condiciones de cada licencia y registraré la procedencia y los créditos del material que use con IA.'],
      ['Material de prueba creado para el proyecto', 'Crearé materiales de prueba para experimentar y reservaré el archivo de la película para los usos acordados con sus titulares.'],
    ],
  },
  {
    topic: 'Investigación',
    question: '¿Qué lugar tendrá la IA en la búsqueda de hechos?',
    options: [
      ['Sugerir preguntas', 'Usaré IA para preparar preguntas de investigación y construiré el relato factual a partir de fuentes verificadas.'],
      ['Encontrar pistas y documentos', 'Trataré las pistas de IA como puntos de partida y comprobaré documentos y citas en sus fuentes originales.'],
      ['Comparar materiales ya verificados', 'Usaré IA para comparar materiales verificados y revisaré cada coincidencia o contradicción contra los originales.'],
    ],
  },
  {
    topic: 'Reconstrucciones',
    question: 'Si falta una imagen de archivo, ¿cómo resolverías esa escena?',
    options: [
      ['Haría visible la ausencia', 'Haré visible la ausencia de archivo mediante el relato, el sonido o el montaje.'],
      ['Usaría una ilustración estilizada', 'Si uso una ilustración generada, le daré un lenguaje visual propio y la identificaré como reconstrucción.'],
      ['Evaluaría una recreación realista', 'Evaluaré si la escena requiere una recreación realista. Si la incluyo, la identificaré en pantalla desde su primera aparición.'],
    ],
  },
  {
    topic: 'Privacidad',
    question: '¿Dónde procesarías entrevistas y brutos sensibles?',
    options: [
      ['Fuera de las herramientas de IA', 'Mantendré las entrevistas y los brutos sensibles fuera de las herramientas de IA.'],
      ['En un entorno local del equipo', 'Procesaré materiales sensibles en equipos bajo nuestro control y limitaré quién puede acceder a ellos.'],
      ['En un servicio autorizado, con material minimizado', 'Revisaré las condiciones de retención y entrenamiento del servicio, y enviaré solo el material imprescindible con los datos identificatorios retirados.'],
    ],
  },
  {
    topic: 'Sesgos y representación',
    question: '¿Cómo revisarías lo que la IA cambia sobre las personas o sus contextos?',
    options: [
      ['Con revisión editorial', 'Compararé los aportes de IA con los materiales originales y revisaré si aplanan voces, contextos o diferencias culturales.'],
      ['Con una mirada externa', 'Pediré una revisión a alguien que conozca el contexto retratado y corregiré los sesgos detectados antes del estreno.'],
      ['Con las personas retratadas', 'Consultaré a las personas retratadas sobre cambios que afecten su representación y registraré cómo atendí sus observaciones.'],
    ],
  },
  {
    topic: 'Trabajo y créditos',
    question: '¿Cómo decidirías con tu equipo qué tareas se pueden automatizar?',
    options: [
      ['Acordar límites desde el inicio', 'Acordaré con el equipo qué tareas pueden apoyarse en IA y quién conserva la responsabilidad y el crédito por cada aporte.'],
      ['Probar en pequeño y revisar juntos', 'Haré una prueba acotada con el equipo y evaluaré la calidad, la carga de revisión y el efecto sobre los roles antes de ampliar el uso.'],
      ['Reservar las tareas creativas al equipo', 'Reservaré las tareas creativas al equipo y acordaré cualquier automatización operativa con las personas a cargo.'],
    ],
  },
  {
    topic: 'Transparencia',
    question: '¿Cómo le contarías al público que usaste IA?',
    options: [
      ['En pantalla y en créditos', 'Señalaré en pantalla los aportes sintéticos que puedan confundirse con registros reales y explicaré en créditos cómo usé IA.'],
      ['En pantalla y con una nota de proceso', 'Identificaré en pantalla los aportes sintéticos relevantes y publicaré una nota que explique qué hice con IA, para qué y con qué revisión.'],
      ['En pantalla y en las piezas que circulen aparte', 'Identificaré en pantalla los aportes sintéticos relevantes y mantendré ese aviso en avances, clips y otras piezas donde aparezcan.'],
    ],
  },
];

// Criteria are [topic, zero-based answer index], from most to least important.
// Every profile has the same maximum score, and one answer can support multiple profiles.
const weights = [5, 4, 3, 2, 1];
const profiles = [
  {
    title: 'El archivo manda',
    summary: 'El material original marca el límite de lo que puede afirmar tu película. La procedencia, los permisos y la comparación con las fuentes pesan en las decisiones de montaje.',
    criteria: [['Archivo y derechos', 0], ['Investigación', 2], ['Sesgos y representación', 0], ['Reconstrucciones', 0], ['Autoría', 0]],
  },
  {
    title: 'El hueco también cuenta',
    summary: 'Cuando falta un registro, el vacío puede ser parte de la escena. El sonido, el testimonio y el montaje te permiten contar lo que se sabe y dejar abierta la pregunta por lo que falta.',
    criteria: [['Reconstrucciones', 0], ['Consentimiento', 0], ['Propósito', 1], ['Investigación', 0], ['Trabajo y créditos', 2]],
  },
  {
    title: 'Del indicio a la prueba',
    summary: 'La IA puede abrir una pista, pero la afirmación llega al corte después de pasar por la fuente original. Tu método deja un rastro de documentos, citas y permisos que el equipo puede revisar.',
    criteria: [['Investigación', 1], ['Archivo y derechos', 1], ['Transparencia', 1], ['Sesgos y representación', 0], ['Autoría', 1]],
  },
  {
    title: 'El corte final es del equipo',
    summary: 'Tu política de IA también es una política de trabajo. El equipo editorial discute qué delegar, define quién aprueba cada aporte y acuerda cómo reconocer el trabajo en los créditos.',
    criteria: [['Autoría', 1], ['Trabajo y créditos', 0], ['Propósito', 1], ['Privacidad', 1], ['Transparencia', 0]],
  },
  {
    title: 'Mi voz tiene voz y voto',
    summary: 'Una recreación de voz o rostro es una decisión que compartís con la persona retratada. El permiso tiene un uso concreto y la revisión de la escena forma parte del acuerdo.',
    criteria: [['Consentimiento', 2], ['Autoría', 2], ['Sesgos y representación', 2], ['Privacidad', 1], ['Archivo y derechos', 0]],
  },
  {
    title: 'El contexto pide otra toma',
    summary: 'Tu película busca una segunda mirada de alguien que conozca el mundo retratado. Esa revisión tiene consecuencias en el corte cuando aparecen sesgos, simplificaciones o errores de contexto.',
    criteria: [['Sesgos y representación', 1], ['Autoría', 2], ['Investigación', 2], ['Trabajo y créditos', 1], ['Transparencia', 1]],
  },
  {
    title: 'Los brutos se quedan en casa',
    summary: 'El cuidado empieza antes de subir un archivo. Tu flujo reserva las entrevistas y los brutos sensibles, y acota las pruebas de IA a materiales que el equipo puede usar y controlar.',
    criteria: [['Privacidad', 0], ['Archivo y derechos', 2], ['Propósito', 0], ['Consentimiento', 0], ['Trabajo y créditos', 2]],
  },
  {
    title: 'La IA entra por la sala de máquinas',
    summary: 'Le das a la IA un lugar en la trastienda, para ordenar, transcribir y preparar materiales. El equipo acuerda esas tareas y conserva el control de las decisiones que le dan forma a la película.',
    criteria: [['Propósito', 0], ['Trabajo y créditos', 2], ['Privacidad', 1], ['Autoría', 0], ['Investigación', 0]],
  },
  {
    title: 'Ensayo antes del estreno',
    summary: 'La IA entra primero en una prueba acotada. Usás materiales preparados para experimentar y el equipo decide si el resultado justifica incorporarla según la calidad, la carga de revisión y el efecto en los roles.',
    criteria: [['Trabajo y créditos', 1], ['Archivo y derechos', 2], ['Propósito', 1], ['Autoría', 1], ['Privacidad', 2]],
  },
  {
    title: 'La ilustración toma la palabra',
    summary: 'Una imagen generada puede abrir un registro expresivo propio. Tu película le da un estilo reconocible a la reconstrucción y hace visible el proceso que llevó a incluirla.',
    criteria: [['Reconstrucciones', 1], ['Propósito', 2], ['Transparencia', 1], ['Sesgos y representación', 1], ['Archivo y derechos', 2]],
  },
  {
    title: 'Realista, con el cartel puesto',
    summary: 'Considerás la recreación realista cuando una escena la necesita. El espectador se entera desde la primera aparición, y el uso de voces o rostros de personas reales requiere un acuerdo específico.',
    criteria: [['Reconstrucciones', 2], ['Consentimiento', 1], ['Propósito', 2], ['Transparencia', 0], ['Autoría', 0]],
  },
  {
    title: 'El aviso viaja con el plano',
    summary: 'Tu transparencia está pensada para cómo circula el cine. Si un plano generado termina en un tráiler, un clip o una pieza suelta, lleva consigo la información necesaria para que el público pueda interpretarlo.',
    criteria: [['Transparencia', 2], ['Reconstrucciones', 2], ['Propósito', 2], ['Consentimiento', 2], ['Autoría', 2]],
  },
];

export function getManifiestoProfile(answers) {
  const byTopic = Object.fromEntries(commandments.map(({ topic }, index) => [topic, answers[index]]));
  let best = profiles[0];
  let bestScore = -1;
  let bestPriority = -1;

  for (const profile of profiles) {
    let score = 0;
    let priority = 0;
    profile.criteria.forEach(([topic, answer], index) => {
      if (byTopic[topic] !== answer) return;
      score += weights[index];
      priority += 2 ** (weights.length - index - 1);
    });
    // Ties favor matching higher-priority criteria, then the order of the catalog.
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      best = profile;
      bestScore = score;
      bestPriority = priority;
    }
  }

  return { title: best.title, summary: best.summary };
}
