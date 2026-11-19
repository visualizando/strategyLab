import { Icon } from './graphics';
import './capsule-examples.css';

const examples = [
  {
    category: 'audience',
    label: 'Datos de audiencia',
    icon: 'audience',
    title: 'Taquilla de documentales comparables',
    summary: 'En una muestra ficticia, un estreno reunió 1.200 espectadores en 12 funciones y otro, 900 en 6. Eso da 100 y 150 espectadores por función, respectivamente.',
  },
  {
    category: 'trend',
    label: 'Tendencias',
    icon: 'tone',
    title: 'Interés de búsqueda a lo largo del tiempo',
    summary: 'En una serie ficticia, las búsquedas sobre voces generadas con IA suben durante una semana y después vuelven a su nivel habitual.',
  },
];

export function CapsuleExamples({ heading: Heading = 'h5' }) {
  return examples.map(({ category, label, icon, title, summary }) => (
    <article key={category} className="evidence" data-capsule-category={category}>
      <div className="capsule-meta">
        <span className="capsule-category">{label}</span>
        <span>Ejemplo ilustrativo</span>
      </div>
      <div className="evidence-title">
        <Icon name={icon} size={17} />
        <Heading className="evidence-heading">{title}</Heading>
      </div>
      <p>{summary}</p>
    </article>
  ));
}
