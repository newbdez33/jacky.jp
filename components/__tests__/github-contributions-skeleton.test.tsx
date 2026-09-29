import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ContributionsSkeleton,
  NumberPill,
  CALENDAR_THEME,
} from "@/components/github-contributions-skeleton";

const greenKeys = (root: HTMLElement) =>
  Array.from(root.querySelectorAll(".gh-skeleton-green")).map((el) =>
    el.getAttribute("data-cell")
  );

const delayOf = (el: Element | null) =>
  parseFloat((el as HTMLElement).style.animationDelay);

describe("ContributionsSkeleton", () => {
  it("renders a 53 by 7 grid at the calendar's exact geometry", () => {
    const { container } = render(<ContributionsSkeleton wave={null} seed={1} />);
    const svg = container.querySelector("svg")!;
    // 53 weeks * (11px block + 3px gap) - 3px; 20px label row + 7 * 14px - 3px
    expect(svg).toHaveAttribute("width", "739");
    expect(svg).toHaveAttribute("height", "115");
    expect(container.querySelectorAll("[data-cell]")).toHaveLength(53 * 7);
    const first = container.querySelector('[data-cell="0-0"]')!;
    expect(first).toHaveAttribute("x", "0");
    expect(first).toHaveAttribute("y", "20");
    expect(first).toHaveAttribute("width", "11");
    expect(first).toHaveAttribute("rx", "2");
    expect(first).toHaveAttribute("fill", CALENDAR_THEME.dark[0]);
  });

  it("stays static until a wave is chosen", () => {
    const { container } = render(<ContributionsSkeleton wave={null} seed={1} />);
    expect(container.querySelector(".gh-skeleton")).not.toHaveAttribute("data-wave");
    expect(container.querySelectorAll(".gh-skeleton-green")).toHaveLength(0);
    expect(container.querySelector("[data-cell]")).not.toHaveAttribute("style");
  });

  it("lights up green cells in real level colours along a diagonal wave", () => {
    const { container } = render(<ContributionsSkeleton wave="diag" seed={1} />);
    expect(container.querySelector(".gh-skeleton")).toHaveAttribute("data-wave", "diag");

    const greens = container.querySelectorAll(".gh-skeleton-green");
    expect(greens.length).toBeGreaterThan(150);
    greens.forEach((g) =>
      expect(CALENDAR_THEME.dark.slice(1)).toContain(g.getAttribute("fill"))
    );

    const cell = (c: number, d: number) => container.querySelector(`[data-cell="${c}-${d}"]`);
    expect(delayOf(cell(0, 0))).toBe(0);
    expect(delayOf(cell(5, 2))).toBeCloseTo(delayOf(cell(2, 5)));
    expect(delayOf(cell(10, 0))).toBeGreaterThan(delayOf(cell(3, 0)));
  });

  it("sweeps column by column for the horizontal wave", () => {
    const { container } = render(<ContributionsSkeleton wave="horiz" seed={1} />);
    const cell = (c: number, d: number) => container.querySelector(`[data-cell="${c}-${d}"]`);
    expect(delayOf(cell(5, 2))).toBeCloseTo(delayOf(cell(5, 6)));
    expect(delayOf(cell(20, 0))).toBeGreaterThan(delayOf(cell(5, 0)));
  });

  it("uses per-row keyframes for the sine wave", () => {
    render(<ContributionsSkeleton wave="sine" seed={1} />);
    const css = Array.from(document.querySelectorAll("style"))
      .map((s) => s.textContent)
      .join("\n");
    expect(css).toContain("@keyframes gh-wave-sine-green-3");
    expect(css).toContain("@keyframes gh-wave-sine-base-0");
  });

  it("is deterministic for a seed and differs across seeds", () => {
    const a = render(<ContributionsSkeleton wave="diag" seed={7} />);
    const b = render(<ContributionsSkeleton wave="diag" seed={7} />);
    const c = render(<ContributionsSkeleton wave="diag" seed={8} />);
    expect(greenKeys(a.container)).toEqual(greenKeys(b.container));
    expect(greenKeys(a.container)).not.toEqual(greenKeys(c.container));
  });
});

describe("NumberPill", () => {
  it("joins the wave once one is chosen", () => {
    const { container, rerender } = render(<NumberPill wave={null} />);
    const pill = container.querySelector(".gh-skeleton-pill")!;
    expect(pill).not.toHaveAttribute("data-wave");
    rerender(<NumberPill wave="horiz" />);
    expect(pill).toHaveAttribute("data-wave", "horiz");
    expect((pill as HTMLElement).style.animationDelay).not.toBe("");
  });
});
