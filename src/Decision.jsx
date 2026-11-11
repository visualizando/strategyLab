import { useRef, useState } from 'react';
import { alternatives, CAPSULES, STUDIES, toneLabel } from './content';
import { Icon } from './graphics';

export const ease = [0.22, 1, 0.36, 1];

function Evidence({ id }) {
  const study = STUDIES[id];
  const [title, answer] = CAPSULES[id] ?? [study.ref, study.lesson];
  const source = study.url?.split('](')[0];

  return (
    <article className="evidence">
      <div className="evidence-title"><Icon name="evidence" size={17} /><h5>{title}</h5></div>
      <p>{answer}</p>
      <details>
        <summary><span className="more">Ver más</span><span className="less">Ver menos</span></summary>
        <div className="study">
          <p className="study-meta">{study.ref} · {study.country} · {study.n}</p>
          <p>{study.finding || study.lesson}</p>
          <p>Este estudio analiza mensajes o experiencias específicas; no demuestra qué documental tendrá más audiencia ni mayor éxito.</p>
          {source && <a href={source} target="_blank" rel="noreferrer">Ver fuente original ↗</a>}
        </div>
      </details>
    </article>
  );
}

function Branches({ value, onChange, reduced }) {
  const rail = useRef(null);
  const [visible, setVisible] = useState(0);

  function shift(index) {
    const item = rail.current.children[index];
    if (!item) return;
    rail.current.scrollTo({
      left: item.offsetLeft - rail.current.children[0].offsetLeft,
      behavior: reduced ? 'instant' : 'smooth',
    });
  }

  function syncIndex() {
    const row = rail.current;
    const max = row.scrollWidth - row.clientWidth;
    if (max <= 1) return;
    const first = row.children[0].offsetLeft;
    const points = [...row.children].map((item) => Math.min(item.offsetLeft - first, max));
    setVisible(points.reduce((closest, point, index) =>
      Math.abs(point - row.scrollLeft) < Math.abs(points[closest] - row.scrollLeft) ? index : closest, 0));
  }

  return (
    <section className="branches" aria-label="Alternativas narrativas">
      <div className="section-head">
        <h4><Icon name="branch" size={18} /> Explorar ramas</h4>
        <div className="branch-arrows">
          <button type="button" aria-label="Rama anterior" onClick={() => shift(visible - 1)} disabled={visible === 0}><Icon name="left" size={16} /></button>
          <button type="button" aria-label="Rama siguiente" onClick={() => shift(visible + 1)} disabled={visible === alternatives.length - 1}><Icon name="right" size={16} /></button>
        </div>
      </div>
      <div className="branch-rail" ref={rail} onScroll={syncIndex}>
        {alternatives.map((branch) => (
          <button key={branch.value} type="button" className="branch-card" aria-pressed={value === branch.value}
            onClick={() => onChange(branch.value)}>
            <span>{branch.t}</span>
            <Icon name={value === branch.value ? 'check' : 'right'} size={17} />
          </button>
        ))}
      </div>
    </section>
  );
}

export function Controls({ question, saved, nextQuestion, onSave, onClear, onBack, onNext, reduced }) {
  const { id, title, desc, kind, def, opts, ids } = question;
  const [value, setValue] = useState(saved?.value ?? def);
  const [confidence, setConfidence] = useState(saved?.conf ?? 50);
  const changed = saved?.value !== value || saved?.conf !== confidence;

  function clear() {
    setValue(def);
    setConfidence(50);
    onClear();
  }

  function advance(event) {
    event.preventDefault();
    if (changed) onSave({ value, conf: confidence });
    onNext();
  }

  return (
    <>
      <div className="node-interior">
        <form id={`${id}-form`} onSubmit={advance}>
          <h2 className="question-title" id={`${id}-question`} tabIndex={-1}>{title}</h2>
          <p className="question-description">{desc}</p>
          {kind === 'range' ? (
            <>
              <input className="range tone-range" type="range" min="0" max="100" value={value}
                aria-labelledby={`${id}-question`} aria-valuetext={`${toneLabel(value)}, ${value} de 100`}
                style={{ '--fill': `${value}%` }} onChange={(event) => setValue(event.target.valueAsNumber)} />
              <div className="range-labels"><span>Apocalíptico / riesgo</span><span>Utópico / oportunidad</span></div>
              <output className="tone-value">{toneLabel(value)} · {value}/100</output>
            </>
          ) : (
            <div className="choices" role="radiogroup" aria-labelledby={`${id}-question`}>
              {opts.map((option) => (
                <label key={option} className="choice">
                  <input type="radio" name={id} value={option} checked={option === value}
                    onChange={() => setValue(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          <div className="confidence">
            <div className="section-head">
              <label htmlFor={`${id}-confidence`}>¿Qué tan seguro estás de esta decisión?</label>
              <output htmlFor={`${id}-confidence`}>{confidence}%</output>
            </div>
            <input id={`${id}-confidence`} className="range" type="range" min="0" max="100" step="5"
              value={confidence} aria-valuetext={`${confidence}%`} style={{ '--fill': `${confidence}%` }}
              onChange={(event) => setConfidence(event.target.valueAsNumber)} />
            <div className="range-labels"><span>Es una intuición</span><span>Muy fundamentada</span></div>
          </div>
          {kind === 'range' && <Branches value={value} onChange={setValue} reduced={reduced} />}
          {saved && <button className="quiet clear-decision" type="button" onClick={clear}>Borrar</button>}
        </form>
        <section className="evidence-list" aria-labelledby={`${id}-evidence`}>
          <div className="section-head">
            <h4 id={`${id}-evidence`}>Cápsulas de evidencia</h4>
            <span>{ids.length} hallazgos</span>
          </div>
          {ids.map((study) => <Evidence key={study} id={study} />)}
        </section>
      </div>
      <footer className="camera-actions">
        <div className="camera-actions-inner">
          <button className="camera-back" type="button" onClick={onBack}>{saved ? 'Volver' : 'Decidir luego'}</button>
          <button className="primary" type="submit" form={`${id}-form`}>
            {nextQuestion ? 'Guardar y seguir' : 'Guardar y terminar'}
          </button>
        </div>
      </footer>
    </>
  );
}

export function DecisionStatus({ answered }) {
  return <span className={`decision-status ${answered ? 'is-answered' : 'is-pending'}`}>{answered ? 'Respondida' : 'Pendiente'}</span>;
}

export function DecisionLabel({ question, index, saved }) {
  const { id, short, title, kind } = question;
  const answered = Boolean(saved);
  const summary = answered
    ? (kind === 'range' ? `${toneLabel(saved.value)} · ${saved.value}/100` : saved.value)
    : title;

  return (
    <>
      <span className={`node-icon${answered ? ' is-saved' : ''}`}><Icon name={answered ? 'check' : id} size={19} /></span>
      <span className="node-copy">
        <span className="node-title">{index + 1}. {short}</span>
        <span className={`node-summary${answered ? ' is-saved' : ''}`}>{summary}</span>
        <DecisionStatus answered={answered} />
      </span>
      <span className="node-enter">{answered ? 'Editar' : 'Entrar'}</span>
    </>
  );
}

export function Decision({ question, index, open, saved, next, onOpen }) {
  const { id } = question;

  return (
    <article id={`node-${id}`} className={`node node-${id}${open ? ' is-open' : ''}${next ? ' is-next' : ''}`}>
      <h3 className="node-heading">
        <button id={`toggle-${id}`} className="node-card node-toggle" type="button"
          aria-haspopup="dialog" onClick={onOpen}>
          <DecisionLabel question={question} index={index} saved={saved} />
        </button>
      </h3>
    </article>
  );
}
