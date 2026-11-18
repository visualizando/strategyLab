const gaps = {
  purpose: {
    studies: {
      'Comprensión': 'IA032',
      'Cambio de opinión': 'IA005',
      'Conversación': 'IA012',
      'Acción concreta': 'IA019',
    },
  },
  audience: {
    studies: {
      'Público general': 'IA003',
      'Personas escépticas': 'IA007',
      'Personas entusiastas': 'IA007',
      'Profesionales y decisores': 'IA012',
    },
  },
  protagonist: {
    studies: {
      'Protagonista entusiasta': 'IA005',
      'Protagonista escéptico': 'IA006',
      'Protagonista ambivalente': 'IA029',
      'Múltiples protagonistas': 'IA034',
    },
  },
  scope: {
    studies: {
      'Consecuencias personales': 'IA025',
      'Consecuencias sociales': 'IA034',
      'Riesgos existenciales': 'IA006',
      'Contraste entre escalas': 'IA034',
    },
  },
};

export function getRiverContext(id, decision) {
  if (!decision) return null;

  const value = decision.value;
  const study = id === 'tone'
    ? (value < 42 ? 'IA006' : value <= 58 ? 'IA001' : 'IA005')
    : gaps[id]?.studies[value];
  return study ?? null;
}
