const gaps = {
  purpose: {
    prompt: '¿Qué enfoque sobre el futuro de la IA puede ayudar a provocar el efecto que buscás?',
    studies: {
      'Comprensión': 'IA032',
      'Cambio de opinión': 'IA005',
      'Conversación': 'IA012',
      'Acción concreta': 'IA019',
    },
  },
  tone: {
    prompt: '¿Para quién sería relevante esta forma de contar el futuro de la IA?',
  },
  audience: {
    prompt: '¿Con qué personaje podría identificarse ese público?',
    studies: {
      'Público general': 'IA003',
      'Personas escépticas': 'IA007',
      'Personas entusiastas': 'IA007',
      'Profesionales y decisores': 'IA012',
    },
  },
  protagonist: {
    prompt: '¿Qué consecuencias de la IA puede mostrar ese personaje desde su experiencia?',
    studies: {
      'Protagonista entusiasta': 'IA005',
      'Protagonista escéptico': 'IA006',
      'Protagonista ambivalente': 'IA029',
      'Múltiples protagonistas': 'IA034',
    },
  },
  scope: {
    prompt: '¿Qué historias, datos o casos te ayudan a mostrar esas consecuencias?',
    studies: {
      'Consecuencias personales': 'IA025',
      'Consecuencias sociales': 'IA034',
      'Riesgos existenciales': 'IA006',
      'Contraste entre escalas': 'IA034',
    },
  },
};

export function getRiverContext(id, decision) {
  const gap = gaps[id];
  if (!gap || !decision) return null;

  const value = decision.value;
  const study = id === 'tone'
    ? (value < 42 ? 'IA006' : value <= 58 ? 'IA001' : 'IA005')
    : gap.studies[value];
  return study ? { study, prompt: gap.prompt } : null;
}
