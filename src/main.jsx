import { Fragment, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import '@fontsource-variable/dm-sans';
import { CAPSULES, questions } from './content';
import { Decision, ease } from './Decision';
import { DecisionCamera } from './DecisionCamera';
import { Icon, JourneyRiver, RiverPaths, Terrain } from './graphics';
import './styles.css';

const storageKey = 'ddl-mvp-01';
const contextAfter = { purpose: 'IA019', audience: 'IA007', scope: 'IA032' };
const mapPoints = [
  { x: 180, y: 30 },
  { x: 94, y: 116 },
  { x: 266, y: 116 },
  { x: 94, y: 202 },
  { x: 266, y: 202 },
  { x: 180, y: 288 },
];

function loadDecisions() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return Object.fromEntries(questions.flatMap((question) => {
      const decision = data?.[question.id];
      const validValue = question.kind === 'range'
        ? Number.isFinite(decision?.value) && decision.value >= 0 && decision.value <= 100
        : question.opts.includes(decision?.value);
      return validValue && Number.isFinite(decision.conf) && decision.conf >= 0 && decision.conf <= 100
        ? [[question.id, decision]] : [];
    }));
  } catch {
    return {};
  }
}

function MapDialog({ dialog, active, decisions, openNode, onClose, onExited, reduced }) {
  const count = Object.keys(decisions).length;
  return (
    <dialog className="map-dialog" ref={dialog} aria-labelledby="map-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <AnimatePresence onExitComplete={onExited}>
        {active && (
          <motion.div className="map-panel" initial={{ opacity: 0, scale: reduced ? 1 : 1.13 }}
            animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : 1.09 }}
            transition={{ duration: reduced ? 0 : 0.38, ease }}>
            <div className="map-header">
              <div>
                <p className="eyebrow"><span /> VISTA PANORÁMICA</p>
                <h2 id="map-title">Mapa del recorrido</h2>
              </div>
              <button type="button" autoFocus className="map-close" onClick={() => onClose()} aria-label="Cerrar mapa">
                <Icon name="close" />
              </button>
            </div>
            <p className="map-help">Elegí un nodo para volver al recorrido.</p>
            <div className="map-plot">
              <svg className="map-river" viewBox="0 0 360 320" preserveAspectRatio="none" aria-hidden="true">
                <RiverPaths points={mapPoints} />
              </svg>
              {questions.map((question, index) => {
                const point = mapPoints[index];
                const saved = Boolean(decisions[question.id]);
                return (
                  <button type="button" key={question.id} className={`map-node${saved ? ' map-saved' : ''}${question.id === openNode ? ' map-current' : ''}`}
                    style={{ left: `${point.x / 3.6}%`, top: `${point.y / 3.2}%` }}
                    aria-current={question.id === openNode ? 'location' : undefined}
                    onClick={() => onClose(question.id)}>
                    <span className="map-node-icon"><Icon name={saved ? 'check' : question.id} size={16} /></span>
                    <span>{question.short}</span>
                    {saved && <span className="sr-only">, guardada</span>}
                  </button>
                );
              })}
            </div>
            <div className="map-progress"><span /> {count} de {questions.length} decisiones guardadas</div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function RiverGap({ study }) {
  const context = CAPSULES[study];
  return (
    <div className="river-gap" aria-hidden={context ? undefined : true}>
      {context && (
        <aside className="context-pill">
          <div className="context-kicker"><Icon name="evidence" size={15} /> Contexto</div>
          <p className="context-title">{context[0]}</p>
          <p>{context[1]}</p>
        </aside>
      )}
    </div>
  );
}

function App() {
  const [decisions, setDecisions] = useState(loadDecisions);
  const [openNode, setOpenNode] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState('');
  const reduced = useReducedMotion();
  const dialog = useRef(null);
  const mapDestination = useRef(null);
  const mapTrigger = useRef(null);
  const scrollAnimation = useRef(null);
  const count = Object.keys(decisions).length;
  const next = questions.find((question) => !decisions[question.id])?.id;
  const activeIndex = questions.findIndex((question) => question.id === openNode);

  useEffect(() => {
    const stop = () => scrollAnimation.current?.stop();
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('pointerdown', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      window.removeEventListener('wheel', stop);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', stop);
      stop();
    };
  }, []);

  function openDecision(id) {
    scrollAnimation.current?.stop();
    setStatus('');
    setOpenNode(id);
  }

  function revealDecision(id, duration = 0.42) {
    scrollAnimation.current?.stop();
    const card = document.getElementById(`toggle-${id}`);
    const { top, height } = card.getBoundingClientRect();
    const target = window.scrollY + top + (height - window.innerHeight) / 2;
    const scroll = (y) => window.scrollTo({ top: y, behavior: 'instant' });
    const open = () => {
      card.focus({ preventScroll: true });
      openDecision(id);
    };
    if (reduced || Math.abs(target - window.scrollY) < 8) {
      scroll(target);
      open();
    } else {
      scrollAnimation.current = animate(window.scrollY, target, {
        duration, ease, onUpdate: scroll, onComplete: open,
      });
    }
  }

  function closeDecision(nextId) {
    const id = openNode;
    setOpenNode(null);
    requestAnimationFrame(() => {
      document.getElementById(`toggle-${id}`)?.focus({ preventScroll: true });
      if (nextId) revealDecision(nextId, 0.54);
    });
  }

  function persist(id, value) {
    const updated = { ...decisions };
    if (value) updated[id] = value;
    else delete updated[id];
    setDecisions(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setStatus(value ? 'Decisión guardada en este dispositivo.' : 'Decisión borrada.');
    } catch {
      setStatus('El navegador bloqueó el almacenamiento. La decisión queda disponible durante esta sesión.');
    }
  }

  function openMap(event) {
    mapTrigger.current = event.currentTarget;
    dialog.current.showModal();
    setShowMap(true);
  }

  function closeMap(id = null) {
    if (!showMap) return;
    mapDestination.current = id;
    setShowMap(false);
  }

  function returnFromMap() {
    dialog.current.close();
    const target = mapDestination.current;
    mapDestination.current = null;
    if (target) {
      requestAnimationFrame(() => revealDecision(target));
    } else {
      mapTrigger.current?.focus({ preventScroll: true });
    }
  }

  function start() {
    revealDecision(next ?? questions[0].id);
  }

  return (
    <>
      <a href="#recorrido" className="skip">Ir al recorrido</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#inicio">
            <span className="brand-icon"><Icon name="river" size={21} /></span>
            <span>AI Documentary<br />Strategy Lab</span>
          </a>
          <button type="button" className="map-button" onClick={openMap}>
            <Icon name="map" size={18} /><span>Ver mapa</span>
          </button>
        </div>
      </header>

      <motion.main id="inicio" className="workspace" animate={{ opacity: showMap ? 0.72 : 1 }}
        transition={{ duration: reduced ? 0 : 0.35 }}>
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-inner">
            <div className="intro-art"><Terrain /></div>
            <p className="eyebrow"><span /> LABORATORIO DOCUMENTAL</p>
            <h1 id="page-title">Río <span>editorial</span></h1>
            <p className="intro-text">Seis decisiones para definir la estrategia de tu documental sobre inteligencia artificial, con evidencia para orientar cada elección.</p>
            <button type="button" className="primary start" onClick={start}>
              {count === 0 ? 'Empezar recorrido' : count === questions.length ? 'Revisar decisiones' : 'Continuar recorrido'}
              <Icon name="down" size={18} />
            </button>
            <div className="progress">
              <div className="progress-label"><span>TU PROGRESO</span><span aria-live="polite">{count} de {questions.length} guardadas</span></div>
              <div className="progress-bars" aria-hidden="true">
                {questions.map((question) => <span key={question.id} className={decisions[question.id] ? 'filled' : ''} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="journey" id="recorrido" aria-labelledby="journey-title">
          <div className="journey-art"><Terrain /></div>
          <div className="journey-inner">
            <div className="journey-header">
              <p className="eyebrow"><span /> MAPA DE DECISIONES</p>
              <h2 id="journey-title">El recorrido</h2>
              <p>Tocá un nodo para abrirlo.</p>
            </div>
            <div className="track">
              <JourneyRiver />
              {questions.map((question, index) => (
                <Fragment key={question.id}>
                  <Decision question={question} index={index} open={openNode === question.id && !reduced}
                    saved={decisions[question.id]} next={question.id === next} onOpen={() => openDecision(question.id)} />
                  {index < questions.length - 1 && <RiverGap study={contextAfter[question.id]} />}
                </Fragment>
              ))}
            </div>
            <footer className="journey-footer">
              <span><Icon name="river" size={17} /> Río editorial</span>
              <button type="button" className="quiet" onClick={openMap}>Ver mapa completo <Icon name="map" size={17} /></button>
            </footer>
          </div>
        </section>
      </motion.main>
      {activeIndex >= 0 && (
        <DecisionCamera key={openNode} question={questions[activeIndex]} index={activeIndex} saved={decisions[openNode]}
          nextQuestion={questions[activeIndex + 1]}
          reduced={reduced} onClosed={closeDecision} status={status}
          onSave={(value) => persist(openNode, value)} onClear={() => persist(openNode, null)} />
      )}
      <MapDialog dialog={dialog} active={showMap} decisions={decisions} openNode={openNode}
        onClose={closeMap} onExited={returnFromMap} reduced={reduced} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
