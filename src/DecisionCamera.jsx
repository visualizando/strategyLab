import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Controls, DecisionLabel, ease } from './Decision';
import { Icon } from './graphics';

function cardFrame(id) {
  const card = document.getElementById(`toggle-${id}`);
  const { left, top, width, height } = card.getBoundingClientRect();
  const style = getComputedStyle(card);

  return {
    x: left, y: top, width, height,
    borderTopLeftRadius: style.borderTopLeftRadius,
    borderTopRightRadius: style.borderTopRightRadius,
    borderBottomRightRadius: style.borderBottomRightRadius,
    borderBottomLeftRadius: style.borderBottomLeftRadius,
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
  };
}

function atScrollEdge(element, direction) {
  const remaining = element.scrollHeight - element.clientHeight - element.scrollTop;
  return direction < 0 ? element.scrollTop <= 1 : remaining <= 2;
}

export function DecisionCamera({ question, index, saved, reduced, onSave, onClear, onClosed, status }) {
  const dialog = useRef(null);
  const back = useRef(null);
  const [origin] = useState(() => cardFrame(question.id));
  const [destination, setDestination] = useState(null);
  const [viewport, setViewport] = useState(null);
  const touch = useRef(null);
  const wheel = useRef({ time: 0, direction: 0, distance: 0 });
  const lastExitWheel = useRef(null);
  const closeTimer = useRef(null);

  useLayoutEffect(() => {
    const surface = dialog.current;
    surface.showModal();
    back.current?.focus({ preventScroll: true });
    const measure = () => {
      const width = window.innerWidth;
      const height = surface.clientHeight;
      setViewport((size) => size?.width === width && size.height === height ? size : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(surface);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(closeTimer.current);
      surface.close();
    };
  }, []);

  function close() {
    if (!destination) setDestination(cardFrame(question.id));
  }

  function finishClose() {
    // Keep the page still until the wheel gesture that closed the card has ended.
    const remaining = lastExitWheel.current === null ? 0 : 180 - (performance.now() - lastExitWheel.current);
    if (remaining > 0) closeTimer.current = setTimeout(finishClose, remaining);
    else onClosed();
  }

  function handleWheel(event) {
    if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const direction = Math.sign(event.deltaY);
    if (!atScrollEdge(event.currentTarget, direction)) {
      wheel.current.distance = 0;
      return;
    }
    const { time, direction: previousDirection, distance } = wheel.current;
    const previousDistance = event.timeStamp - time < 220 && previousDirection === direction ? distance : 0;
    const step = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? event.currentTarget.clientHeight : 1;
    const nextDistance = previousDistance + Math.abs(event.deltaY) * step;
    wheel.current = { time: event.timeStamp, direction, distance: nextDistance };
    if (nextDistance >= 96) {
      lastExitWheel.current = performance.now();
      close();
    }
  }

  function startTouch(event) {
    touch.current = null;
    if (event.touches.length !== 1 || event.target.closest('button, input, label, a, summary, .branch-rail')) return;
    const { clientX, clientY } = event.touches[0];
    touch.current = {
      x: clientX, y: clientY,
      atTop: atScrollEdge(event.currentTarget, -1),
      atBottom: atScrollEdge(event.currentTarget, 1),
    };
  }

  function endTouch(event) {
    const start = touch.current;
    touch.current = null;
    if (!start || event.touches.length || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dy) < 72 || Math.abs(dy) <= Math.abs(dx) * 1.4) return;
    if ((dy > 0 && start.atTop) || (dy < 0 && start.atBottom)) close();
  }

  const closing = destination !== null;
  const full = viewport && {
    ...viewport,
    x: 0, y: 0,
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
    backgroundColor: '#fffaf3',
    borderColor: '#fffaf3',
  };

  return (
    <dialog ref={dialog} className="camera-dialog" style={{ width: viewport?.width }} aria-labelledby={`${question.id}-question`}
      onWheelCapture={() => { if (lastExitWheel.current !== null) lastExitWheel.current = performance.now(); }}
      onCancel={(event) => { event.preventDefault(); close(); }}>
      <motion.div className="camera-shade" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.38 }} />
      <motion.div className="camera-frame" initial={reduced ? false : origin}
        animate={destination ?? full ?? origin} transition={{ duration: reduced ? 0 : 0.48, ease }}
        onAnimationComplete={() => { if (closing) finishClose(); }}>
        {!reduced && (
          <motion.div className="camera-mini node-toggle" aria-hidden="true" style={{ width: origin.width, height: origin.height }}
            initial={{ opacity: 1 }} animate={{ opacity: closing || !viewport ? 1 : 0 }}
            transition={{ duration: 0.14, delay: closing ? 0.18 : 0 }}>
            <DecisionLabel question={question} index={index} saved={saved} />
          </motion.div>
        )}
        <motion.div className="camera-scroll" style={viewport ?? undefined} inert={closing}
          initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: !closing && viewport ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.22, delay: closing || reduced ? 0 : 0.13 }}
          onWheel={handleWheel} onTouchStart={startTouch} onTouchEnd={endTouch}
          onTouchCancel={() => { touch.current = null; }}>
          <header className="camera-header">
            <div className="camera-header-inner">
              <button type="button" ref={back} className="camera-back" aria-label="Volver al recorrido" onClick={close}>
                <Icon name="left" size={22} />
              </button>
              <span>{index + 1}. {question.short}</span>
            </div>
          </header>
          <Controls question={question} saved={saved} onSave={onSave} onClear={onClear} onClose={close} reduced={reduced} />
          <p className={status.startsWith('El navegador') ? 'storage-status' : 'sr-only'} role="status">{status}</p>
        </motion.div>
      </motion.div>
    </dialog>
  );
}
