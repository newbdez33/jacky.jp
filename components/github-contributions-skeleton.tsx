import { useMemo, type CSSProperties } from "react";

export type Wave = "diag" | "horiz" | "sine";
export const WAVES: readonly Wave[] = ["diag", "horiz", "sine"];

// Geometry shared with <ActivityCalendar>. LABEL_MARGIN mirrors the library's
// internal constant so the skeleton lines up with the real calendar pixel for pixel.
export const CALENDAR = { blockSize: 11, blockMargin: 3, fontSize: 12, weeks: 53, days: 7 } as const;
const LABEL_MARGIN = 8;
const STEP = CALENDAR.blockSize + CALENDAR.blockMargin;
const LABEL_HEIGHT = CALENDAR.fontSize + LABEL_MARGIN;
export const CALENDAR_WIDTH = CALENDAR.weeks * STEP - CALENDAR.blockMargin;
export const CALENDAR_HEIGHT = LABEL_HEIGHT + CALENDAR.days * STEP - CALENDAR.blockMargin;

export const CALENDAR_THEME: { light: string[]; dark: string[] } = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};
const CELL = CALENDAR_THEME.dark[0];
const CREST = "#272c35";
const CELL_STROKE = "rgba(255, 255, 255, 0.04)"; // same stroke the library draws on dark blocks

// Wave motion
const PERIOD = 2.4; // seconds per wave
const SPREAD = 0.85; // fraction of the period the wave takes to cross the grid
const WAVELENGTH = 18; // sine wavelength in columns
const DENSITY = 0.6; // share of cells that light up green
const JITTER = 0.08; // per-cell random offset, as a fraction of the period

// Month-label placeholders, roughly every 4.3 weeks like the real labels.
const LABEL_COLUMNS = Array.from({ length: 12 }, (_, i) => 1 + Math.round((i * (CALENDAR.weeks - 1)) / 12));

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type GreenCell = { col: number; row: number; fill: string; jitter: number };

function greenCells(seed: number): GreenCell[] {
  const rand = lcg(seed);
  const cells: GreenCell[] = [];
  for (let col = 0; col < CALENDAR.weeks; col++) {
    for (let row = 0; row < CALENDAR.days; row++) {
      if (rand() >= DENSITY) continue;
      const x = rand();
      const level = x < 0.45 ? 1 : x < 0.75 ? 2 : x < 0.92 ? 3 : 4;
      cells.push({ col, row, fill: CALENDAR_THEME.dark[level], jitter: (rand() - 0.5) * JITTER * PERIOD });
    }
  }
  return cells;
}

function delay(wave: Wave, col: number, row: number): number {
  switch (wave) {
    case "diag":
      return (SPREAD * PERIOD * (col + row)) / (CALENDAR.weeks - 1 + CALENDAR.days - 1);
    case "horiz":
      return (SPREAD * PERIOD * col) / (CALENDAR.weeks - 1);
    case "sine":
      // Negative so the whole curve is already running on the first frame.
      return ((col % WAVELENGTH) / WAVELENGTH) * PERIOD - PERIOD;
  }
}

function mix(from: string, to: string, t: number): string {
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  const rgb = [0, 1, 2].map((i) => Math.round(channel(from, i) + (channel(to, i) - channel(from, i)) * t));
  return `rgb(${rgb.join(",")})`;
}

// The sine wave crosses each row at fixed phases (twice per period for the inner
// rows, once at the crest and trough), so every row gets its own keyframes.
function sineKeyframes(): string[] {
  const HALF_WIDTH = 0.12;
  const CENTER = (CALENDAR.days - 1) / 2;
  const wrap = (x: number) => ((x % 1) + 1) % 1;
  const smooth = (u: number) => u * u * (3 - 2 * u);
  const out: string[] = [];
  for (let row = 0; row < CALENDAR.days; row++) {
    const v = (CENTER - row) / CENTER;
    const angles = Math.abs(v) >= 1 ? [Math.asin(v)] : [Math.asin(v), Math.PI - Math.asin(v)];
    const centers = angles.map((a) => wrap(-a / (2 * Math.PI)));
    const value = (x: number) =>
      Math.max(
        ...centers.map((q) => {
          const d = Math.min(Math.abs(x - q), 1 - Math.abs(x - q));
          return d >= HALF_WIDTH ? 0 : smooth(1 - d / HALF_WIDTH);
        })
      );
    const xs = new Set<number>([0, 1]);
    centers.forEach((q) => [-1, -0.5, 0, 0.5, 1].forEach((k) => xs.add(wrap(q + k * HALF_WIDTH))));
    const stops = [...xs]
      .sort((a, b) => a - b)
      .map((x) => ({ pct: (x * 100).toFixed(2), a: value(x === 1 ? 0 : x) }));
    out.push(`@keyframes gh-wave-sine-green-${row}{${stops.map((s) => `${s.pct}%{opacity:${s.a.toFixed(3)}}`).join("")}}`);
    out.push(`@keyframes gh-wave-sine-base-${row}{${stops.map((s) => `${s.pct}%{fill:${mix(CELL, CREST, s.a)}}`).join("")}}`);
  }
  return out;
}

const WAVE_CSS = [
  `@keyframes gh-wave-green{0%{opacity:0}4%{opacity:1}12%{opacity:1}24%,100%{opacity:0}}`,
  `@keyframes gh-wave-base{0%,24%,100%{fill:${CELL}}4%,12%{fill:${CREST}}}`,
  `@keyframes gh-wave-pill{0%,24%,100%{background-color:${CELL}}4%,12%{background-color:${CREST}}}`,
  ...sineKeyframes(),
  `.gh-skeleton[data-wave] :is([data-cell],[data-label]){animation:gh-wave-base ${PERIOD}s linear infinite}`,
  `.gh-skeleton[data-wave] .gh-skeleton-green{animation:gh-wave-green ${PERIOD}s linear infinite}`,
  `.gh-skeleton-pill[data-wave]{animation:gh-wave-pill ${PERIOD}s linear infinite}`,
  ...Array.from({ length: CALENDAR.days }, (_, row) =>
    `.gh-skeleton[data-wave=sine] :is([data-cell],[data-label])[data-row="${row}"]{animation-name:gh-wave-sine-base-${row}}` +
    `.gh-skeleton[data-wave=sine] .gh-skeleton-green[data-row="${row}"]{animation-name:gh-wave-sine-green-${row}}`
  ),
  `@media (prefers-reduced-motion:reduce){.gh-skeleton *,.gh-skeleton-pill{animation:none!important}.gh-skeleton-green{display:none}}`,
].join("\n");

const delayStyle = (wave: Wave | null, col: number, row: number, extra = 0): CSSProperties | undefined =>
  wave ? { animationDelay: `${(delay(wave, col, row) + extra).toFixed(3)}s` } : undefined;

export function ContributionsSkeleton({ wave, seed }: { wave: Wave | null; seed: number }) {
  const greens = useMemo(() => (wave ? greenCells(seed) : []), [wave, seed]);

  return (
    <div
      className="gh-skeleton max-w-full overflow-x-auto overflow-y-hidden pt-[2px]"
      data-testid="contributions-skeleton"
      data-wave={wave ?? undefined}
      aria-hidden
    >
      {wave && (
        <style href="gh-contributions-skeleton" precedence="default">
          {WAVE_CSS}
        </style>
      )}
      <svg
        width={CALENDAR_WIDTH}
        height={CALENDAR_HEIGHT}
        viewBox={`0 0 ${CALENDAR_WIDTH} ${CALENDAR_HEIGHT}`}
        className="block overflow-visible"
      >
        {LABEL_COLUMNS.map((col) => (
          <rect
            key={`label-${col}`}
            data-label=""
            data-row={0}
            x={col * STEP}
            y={3}
            width={22}
            height={9}
            rx={3}
            fill={CELL}
            style={delayStyle(wave, col, 0)}
          />
        ))}
        {Array.from({ length: CALENDAR.weeks }, (_, col) =>
          Array.from({ length: CALENDAR.days }, (_, row) => (
            <rect
              key={`${col}-${row}`}
              data-cell={`${col}-${row}`}
              data-row={row}
              x={col * STEP}
              y={LABEL_HEIGHT + row * STEP}
              width={CALENDAR.blockSize}
              height={CALENDAR.blockSize}
              rx={2}
              fill={CELL}
              stroke={CELL_STROKE}
              style={delayStyle(wave, col, row)}
            />
          ))
        )}
        {greens.map(({ col, row, fill, jitter }) => (
          <rect
            key={`green-${col}-${row}`}
            className="gh-skeleton-green"
            data-green={`${col}-${row}`}
            data-row={row}
            x={col * STEP}
            y={LABEL_HEIGHT + row * STEP}
            width={CALENDAR.blockSize}
            height={CALENDAR.blockSize}
            rx={2}
            fill={fill}
            style={{ opacity: 0, ...delayStyle(wave, col, row, jitter) }}
          />
        ))}
      </svg>
    </div>
  );
}

export function NumberPill({ wave }: { wave: Wave | null }) {
  // Bottom-left of the grid for the sweeping waves; the sine curve's trough for the sine.
  const pillDelay = wave === "sine" ? 0.17 * PERIOD - PERIOD : wave ? delay(wave, 0, CALENDAR.days - 1) : 0;
  return (
    <span
      aria-hidden
      className="gh-skeleton-pill inline-block h-[10px] w-[34px] rounded-[3px] align-[-1px]"
      data-wave={wave ?? undefined}
      style={{ backgroundColor: CELL, animationDelay: wave ? `${pillDelay.toFixed(3)}s` : undefined }}
    />
  );
}
