import { useLayoutEffect, useRef, useState } from 'react';
import { pairs, questions } from './content';

const paths = {
  river: 'M4 3c11 0 1 7 8 9s9 4 8 9M9 3c9 2 2 6 7 8s7 5 7 10M1 3c0 5 2 8 7 10s8 4 8 8',
  map: 'M8 3H3v5m13-5h5v5m0 8v5h-5M3 16v5h5m1-5 3-8 3 8-3-2z',
  down: 'M12 4v15m-5-5 5 5 5-5',
  right: 'M4 12h15m-5-5 5 5-5 5',
  left: 'M20 12H5m5 5-5-5 5-5',
  plus: 'M5 12h14m-7-7v14',
  minus: 'M5 12h14',
  close: 'm6 6 12 12M18 6 6 18',
  check: 'm5 12 4 4L19 6',
  purpose: 'M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3m0-14-3 3m-8 8-3 3m7-11 1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4Z',
  tone: 'M4 20V4m0 16h16M8 15l4-5 3 2 5-6m-4 0h4v4',
  audience: 'M15 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.9M13 7.5A3.5 3.5 0 1 1 6 7.5a3.5 3.5 0 0 1 7 0Zm3-3.4a3.5 3.5 0 0 1 0 6.8',
  protagonist: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8v-1a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v1',
  scope: 'm2 17 6-9 4 6 3-4 7 7H2Zm11-10h.01',
  approach: 'M12 6v14M3 4c4-1 7 0 9 2 2-2 5-3 9-2v14c-4-1-7 0-9 2-2-2-5-3-9-2z',
  branch: 'M5 19c8 0 6-13 14-13m-5 0h5v5M5 19c5 0 8-4 14-4',
  evidence: 'M7 3h7l4 4v14H6V3zm6 0v5h5M9 12h6m-6 4h6',
};

export function Icon({ name, size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}

export function Terrain() {
  return (
    <svg viewBox="0 0 680 440" fill="none" aria-hidden="true">
      <path className="terrain-far" d="M0 255C78 247 100 128 203 169S298 231 363 215 453 91 529 102 620 197 680 169V440H0Z" />
      <path className="terrain-near" d="M0 300C72 289 122 207 199 225S275 305 361 285 436 190 522 188 617 261 680 223V440H0Z" />
      <g className="terrain-contours">
        <path d="M-15 308C74 300 130 214 199 230S271 310 364 294 433 198 524 194 620 265 699 222" />
        <path d="M-15 322C74 315 130 229 201 243S274 320 365 305 437 209 525 205 620 277 699 233" />
        <path d="M-15 336C74 330 130 244 203 256S277 330 366 316 440 220 526 216 620 289 699 244" />
      </g>
    </svg>
  );
}

const tributaries = new Set(['0-2', '1-4', '2-4', '4-5']);

function riverPath(a, b) {
  const mid = a.y + (b.y - a.y) * 0.48;
  return `M ${a.x} ${a.y} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}`;
}

export function RiverPaths({ points }) {
  if (points.length !== 6) return null;

  return pairs.map(([from, to]) => {
    const key = `${from}-${to}`;
    const d = riverPath(points[from], points[to]);
    return (
      <g key={key} className={tributaries.has(key) ? 'tributary' : 'current'}>
        <path className="river-bank" d={d} />
        <path className="river-line" d={d} />
      </g>
    );
  });
}

export function JourneyRiver({ decisions }) {
  const [segments, setSegments] = useState([]);
  const svg = useRef(null);

  useLayoutEffect(() => {
    const track = svg.current.parentElement;
    const cards = [...track.querySelectorAll('.node-card')];
    const measure = () => {
      const bounds = svg.current.getBoundingClientRect();
      const banks = cards.map((card, index) => {
        const box = card.getBoundingClientRect();
        const left = box.left - bounds.left;
        return {
          entry: { x: left + box.width * (index % 2 ? 0.36 : 0.61), y: box.top - bounds.top + 2 },
          exit: { x: left + box.width * (index % 2 ? 0.63 : 0.35), y: box.bottom - bounds.top - 2 },
        };
      });
      const start = banks[0].entry;
      const end = banks[banks.length - 1].exit;
      setSegments([
        [{ x: start.x + 29, y: start.y - 32 }, start],
        ...banks.slice(1).map((bank, index) => [banks[index].exit, bank.entry]),
        [end, { x: end.x - 26, y: end.y + 33 }],
      ]);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    cards.forEach((card) => observer.observe(card));
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <svg className="journey-river" ref={svg} aria-hidden="true">
      {segments.map(([from, to], index) => {
        const height = to.y - from.y;
        const reach = Math.min(88, Math.max(30, height * 0.51)) * (index % 2 ? 1 : -1);
        const d = `M ${from.x} ${from.y} C ${from.x + reach} ${from.y + height * 0.64}, ${to.x - reach} ${to.y - height * 0.59}, ${to.x} ${to.y}`;
        return (
          <g key={index} className={index > 0 && decisions[questions[index - 1].id] ? 'river-completed' : undefined}>
            <path className="river-bank" d={d} />
            <path className="river-line" d={d} />
            {(index === 0 || index === segments.length - 1) &&
              <circle className="river-source" cx={index === 0 ? from.x : to.x} cy={index === 0 ? from.y : to.y} r="4" />}
          </g>
        );
      })}
    </svg>
  );
}
