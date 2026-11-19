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
