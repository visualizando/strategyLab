import { useEffect, useRef, useState } from 'react';
import { Icon, Terrain } from './graphics';
import { commandments } from './commandments.js';
import './commandments.css';

const storageKey = 'ddl-commandments-v1';
const total = commandments.length;

function loadProgress() {
  const empty = { answers: {}, step: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    const answers = Object.fromEntries(commandments.flatMap(({ options }, index) => {
      const answer = saved?.answers?.[index];
      return Number.isInteger(answer) && options[answer] ? [[index, answer]] : [];
    }));
    const firstUnanswered = commandments.findIndex((_, index) => answers[index] === undefined);
    const lastStep = firstUnanswered === -1 ? total : firstUnanswered;
    return {
      answers,
      step: Number.isInteger(saved?.step) ? Math.max(0, Math.min(saved.step, lastStep)) : 0,
    };
  } catch {
    return empty;
  }
}

export function Commandments() {
  const [{ answers, step }, setProgress] = useState(loadProgress);
  const [notice, setNotice] = useState('');
  const heading = useRef(null);
  const previousStep = useRef(step);
  const finished = step === total;
  const current = commandments[step];
  const labUrl = window.location.pathname;

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, step }));
    } catch {
      // The current session remains usable when storage is unavailable.
    }
  }, [answers, step]);

  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [step]);

  function goTo(nextStep) {
    setNotice('');
    setProgress((previous) => ({ ...previous, step: nextStep }));
  }

  async function copyPrinciples() {
    const lines = commandments.map(({ topic, options }, index) =>
      `${index + 1}. ${topic}\n${options[answers[index]][1]}`);
    try {
      await navigator.clipboard.writeText(['Tus 10 mandamientos', ...lines].join('\n\n'));
      setNotice('Copiaste tus 10 mandamientos.');
    } catch {
      setNotice('Podés seleccionar y copiar el texto desde la lista.');
    }
  }

  return (
    <div className="commandments">
      <a href="#mandamientos" className="skip">Ir al contenido</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href={labUrl}>
            <span className="brand-icon"><Icon name="river" size={21} /></span>
            <span>AI Documentary<br />Strategy Lab</span>
          </a>
          <a className="map-button" href={labUrl}>Volver al Lab</a>
        </div>
      </header>
      <main id="mandamientos" className="commandments-main">
        <header className="commandments-hero">
          <div className="intro-art" aria-hidden="true"><Terrain /></div>
          <h1>Tus 10 mandamientos</h1>
          <p>{finished
            ? 'Tu manifiesto sobre el uso de IA en el cine documental.'
            : 'Elegí cómo querés trabajar con IA y armá tu propio manifiesto para el cine documental.'}</p>
        </header>
        <section className="commandments-panel" aria-labelledby="commandments-heading">
          <div className="commandments-meta">
            <span>{finished ? 'Tu manifiesto' : current.topic}</span>
            <span>{finished ? '10 de 10' : `Pregunta ${step + 1} de ${total}`}</span>
          </div>
          <div className="commandments-meter" aria-hidden="true">
            {commandments.map(({ topic }, index) => (
              <span key={topic} data-answered={answers[index] !== undefined || undefined}
                data-current={index === step || undefined} />
            ))}
          </div>
          <h2 id="commandments-heading" ref={heading} tabIndex={-1}>
            {finished ? 'Mis principios para filmar con IA' : current.question}
          </h2>
          {finished ? (
            <>
              <ol className="commandments-list">
                {commandments.map(({ topic, options }, index) => (
                  <li key={topic}><strong>{topic}</strong><p>{options[answers[index]][1]}</p></li>
                ))}
              </ol>
              <div className="commandments-actions">
                <button className="map-button" onClick={() => goTo(0)}>Revisar mis respuestas</button>
                <button className="primary" onClick={copyPrinciples}>Copiar mis mandamientos</button>
              </div>
              <p className="commandments-notice" role="status">{notice}</p>
            </>
          ) : (
            <form onSubmit={(event) => {
              event.preventDefault();
              if (answers[step] !== undefined) goTo(step + 1);
            }}>
              <fieldset key={step} className="commandments-options" aria-labelledby="commandments-heading">
                {current.options.map(([label], index) => (
                  <label key={label}>
                    <input type="radio" name="principle" checked={answers[step] === index}
                      onChange={() => setProgress((previous) => ({
                        ...previous,
                        answers: { ...previous.answers, [step]: index },
                      }))} />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
              <div className="commandments-actions">
                {step > 0 && <button className="map-button" type="button" onClick={() => goTo(step - 1)}>Atrás</button>}
                <button className="primary" disabled={answers[step] === undefined}>
                  {step === total - 1 ? 'Ver mis 10 mandamientos' : 'Continuar'}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
