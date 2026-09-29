"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";

type AwsBadgeProps = {
  src: string;
  alt: string;
  href: string;
  /** Colour of the artwork's hexagonal rim; tints the coin's edge. */
  rim: string;
  /** Delay before the one-time reveal spin, in ms. */
  spinDelay?: number;
};

const SIZE = 100; // px, the artwork's rendered size
const THICKNESS = 6; // px, depth of the coin
const DRAG_GAIN = 0.6; // degrees of yaw per pixel dragged sideways
const TILT_GAIN = 0.3; // degrees of pitch per pixel dragged vertically
const MAX_TILT = 25; // degrees, pitch clamp while dragging
const HOVER_TILT = 12; // degrees, max tilt toward a hovering cursor
const CLICK_SLOP = 4; // px of movement still treated as a click
const FLICK_LOOKAHEAD = 12; // frames of release velocity used to pick the resting face
const STIFFNESS = 0.045; // spring pull toward the target, per frame
const DAMPING = 0.7; // velocity kept per frame
const REST_EPSILON = 0.05;

// The artwork is a pointy-top hexagon spanning 97.4% of the box height.
const HEX_RADIUS = 0.487 * SIZE;
const WALL_LENGTH = HEX_RADIUS; // a regular hexagon's side equals its radius
const WALL_OFFSET = HEX_RADIUS * Math.cos(Math.PI / 6); // apothem
// Outward normals of the six sides, clockwise from "up".
const WALL_ANGLES = [30, 90, 150, 210, 270, 330];

type Motion = {
  rx: number; // current pitch, degrees
  ry: number; // current yaw, degrees (accumulates whole turns)
  vx: number;
  vy: number; // velocity, degrees per frame
  tx: number;
  ty: number; // spring target
  rest: number; // yaw the coin settles on: a multiple of 360
  dragging: boolean;
  moved: number; // px travelled during the current drag
  lastX: number;
  lastY: number;
  swallowClick: boolean; // the click that ends a drag must not navigate
  raf: number;
  reduced: boolean; // prefers-reduced-motion
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const nearestTurn = (deg: number) => Math.round(deg / 360) * 360;

export function AwsBadge({ src, alt, href, rim, spinDelay = 0 }: AwsBadgeProps) {
  const coinRef = useRef<HTMLDivElement>(null);
  const m = useRef<Motion>({
    rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, rest: 0,
    dragging: false, moved: 0, lastX: 0, lastY: 0,
    swallowClick: false, raf: 0, reduced: false,
  }).current;

  const paint = () => {
    const el = coinRef.current;
    if (!el) return;
    const yaw = ((m.ry % 360) + 540) % 360 - 180; // -180..180, 0 faces the viewer
    const backYaw = yaw > 0 ? yaw - 180 : yaw + 180; // same, for the back face
    const facing = Math.abs(yaw) <= 90 ? yaw : backYaw; // yaw of whichever face shows
    const lit = 0.55 + 0.45 * Math.abs(Math.cos((yaw * Math.PI) / 180));
    el.style.setProperty("--rx", m.rx.toFixed(2));
    el.style.setProperty("--ry", m.ry.toFixed(2));
    el.style.setProperty("--lit", lit.toFixed(3));
    // A highlight rests near the upper-left corner and sweeps across as the coin turns,
    // brightening while it moves so the face is not washed out when still.
    el.style.setProperty("--shine", `${(((120 - yaw) / 180) * 100).toFixed(1)}%`);
    el.style.setProperty("--shine-back", `${(((60 + backYaw) / 180) * 100).toFixed(1)}%`);
    el.style.setProperty("--gleam", (0.3 + 0.7 * Math.min(1, Math.abs(facing) / 40)).toFixed(3));
  };

  const tick = () => {
    m.vy = m.vy * DAMPING + (m.ty - m.ry) * STIFFNESS;
    m.vx = m.vx * DAMPING + (m.tx - m.rx) * STIFFNESS;
    m.ry += m.vy;
    m.rx += m.vx;
    const settled = [m.ty - m.ry, m.vy, m.tx - m.rx, m.vx].every(
      (v) => Math.abs(v) < REST_EPSILON
    );
    if (settled) {
      m.ry = m.ty;
      m.rx = m.tx;
      m.vx = m.vy = 0;
      m.raf = 0;
    } else {
      m.raf = requestAnimationFrame(tick);
    }
    paint();
  };
  const settle = () => {
    if (!m.raf) m.raf = requestAnimationFrame(tick);
  };
  const halt = () => {
    cancelAnimationFrame(m.raf);
    m.raf = 0;
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      m.reduced = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    // Reveal: wind the coin back a full turn and let the spring bring it home.
    const reveal = m.reduced
      ? undefined
      : setTimeout(() => {
          if (m.dragging) return;
          m.ry -= 360;
          paint();
          settle();
        }, spinDelay);
    return () => {
      query.removeEventListener("change", sync);
      clearTimeout(reveal);
      halt();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (m.reduced) return;
    halt();
    m.dragging = true;
    m.moved = 0;
    m.lastX = e.clientX;
    m.lastY = e.clientY;
    m.vx = m.vy = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (m.reduced) return;
    if (m.dragging) {
      const dx = e.clientX - m.lastX;
      const dy = e.clientY - m.lastY;
      m.lastX = e.clientX;
      m.lastY = e.clientY;
      m.moved += Math.abs(dx) + Math.abs(dy);
      m.ry += dx * DRAG_GAIN;
      m.vy = dx * DRAG_GAIN;
      m.rx = clamp(m.rx - dy * TILT_GAIN, -MAX_TILT, MAX_TILT);
      paint();
    } else if (e.pointerType === "mouse") {
      // Hover: tilt away from the cursor, as if it were pressing on the coin.
      const box = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - box.left) / box.width - 0.5;
      const py = (e.clientY - box.top) / box.height - 0.5;
      m.ty = m.rest + px * 2 * HOVER_TILT;
      m.tx = -py * 2 * HOVER_TILT;
      settle();
    }
  };

  const release = () => {
    if (!m.dragging) return;
    m.dragging = false;
    m.swallowClick = m.moved > CLICK_SLOP;
    // Let a flick carry the coin to the face it was heading for.
    m.rest = nearestTurn(m.ry + m.vy * FLICK_LOOKAHEAD);
    m.ty = m.rest;
    m.tx = 0;
    settle();
  };

  const onPointerLeave = () => {
    if (m.reduced || m.dragging) return;
    m.ty = m.rest;
    m.tx = 0;
    settle();
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!m.swallowClick) return;
    m.swallowClick = false;
    e.preventDefault();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="aws-badge"
      draggable={false}
      style={{ width: SIZE, height: SIZE, "--rim": rim } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <div ref={coinRef} className="aws-badge-coin">
        <div className="aws-badge-face aws-badge-front">
          <Image src={src} alt={alt} width={SIZE} height={SIZE} draggable={false} />
          <span className="aws-badge-shine" aria-hidden />
        </div>
        {WALL_ANGLES.map((angle) => (
          <span
            key={angle}
            className="aws-badge-wall"
            aria-hidden
            style={{
              width: WALL_LENGTH,
              height: THICKNESS,
              marginLeft: -WALL_LENGTH / 2,
              marginTop: -THICKNESS / 2,
              transform: `rotateZ(${angle}deg) translateY(${-WALL_OFFSET}px) rotateX(90deg)`,
            }}
          />
        ))}
        <div className="aws-badge-face aws-badge-back" aria-hidden>
          <svg viewBox="0 0 64 40" width="52" height="33" className="aws-badge-mark">
            <text
              x="32"
              y="23"
              textAnchor="middle"
              fontSize="24"
              fontWeight="700"
              letterSpacing="-1"
              fill="currentColor"
            >
              aws
            </text>
            <path
              d="M9 29c8 7 38 7 46-1"
              fill="none"
              stroke="#f90"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M50 24l5 4-4 4"
              fill="none"
              stroke="#f90"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="aws-badge-shine" />
        </div>
      </div>
    </a>
  );
}
