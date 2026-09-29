import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AwsBadge } from "@/components/aws-badge";

const props = {
  src: "/images/saa.png",
  alt: "AWS Certified Solutions Architect – Associate",
  href: "https://www.credly.com/badges/example",
  rim: "#3c92f8",
};

function setReducedMotion(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

const coinOf = (root: HTMLElement) => root.querySelector(".aws-badge-coin") as HTMLElement;
const turnOf = (coin: HTMLElement) => parseFloat(coin.style.getPropertyValue("--ry")) || 0;

const pointer = (x: number, y: number) => ({ clientX: x, clientY: y, pointerId: 1, pointerType: "touch" });

function drag(link: HTMLElement, from: [number, number], to: [number, number]) {
  fireEvent.pointerDown(link, pointer(...from));
  fireEvent.pointerMove(link, pointer(...to));
  fireEvent.pointerUp(link, pointer(...to));
}

describe("AwsBadge", () => {
  beforeEach(() => setReducedMotion(false));
  afterEach(() => jest.useRealTimers());

  it("links to the credential and shows the badge image", () => {
    render(<AwsBadge {...props} />);
    const link = screen.getByRole("link", { name: props.alt });
    expect(link).toHaveAttribute("href", props.href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("img", { name: props.alt })).toHaveAttribute("src", expect.stringContaining("saa.png"));
  });

  it("does not start a native link drag, which would cancel the pointer events", () => {
    render(<AwsBadge {...props} />);
    expect(screen.getByRole("link")).toHaveAttribute("draggable", "false");
  });

  it("turns the coin as it is dragged sideways", () => {
    const { container } = render(<AwsBadge {...props} />);
    const link = screen.getByRole("link");
    fireEvent.pointerDown(link, pointer(50, 50));
    fireEvent.pointerMove(link, pointer(110, 50));
    expect(turnOf(coinOf(container))).toBeGreaterThan(0);
  });

  it("lets a plain click open the credential", () => {
    render(<AwsBadge {...props} />);
    const link = screen.getByRole("link");
    drag(link, [50, 50], [51, 50]);
    expect(fireEvent.click(link)).toBe(true);
  });

  it("swallows the click that ends a drag", () => {
    render(<AwsBadge {...props} />);
    const link = screen.getByRole("link");
    drag(link, [50, 50], [110, 50]);
    expect(fireEvent.click(link)).toBe(false);
    // Only that one click is swallowed.
    expect(fireEvent.click(link)).toBe(true);
  });

  it("settles on a full turn after the drag is released", () => {
    jest.useFakeTimers();
    const { container } = render(<AwsBadge {...props} />);
    const link = screen.getByRole("link");
    drag(link, [50, 50], [110, 50]);
    const coin = coinOf(container);
    expect(turnOf(coin) % 360).not.toBe(0);
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(turnOf(coin) % 360).toBe(0);
  });

  it("stays flat when the visitor prefers reduced motion", () => {
    jest.useFakeTimers();
    setReducedMotion(true);
    const { container } = render(<AwsBadge {...props} spinDelay={0} />);
    const link = screen.getByRole("link");
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(turnOf(coinOf(container))).toBe(0);
    fireEvent.pointerDown(link, pointer(50, 50));
    fireEvent.pointerMove(link, pointer(110, 50));
    expect(turnOf(coinOf(container))).toBe(0);
    fireEvent.pointerUp(link, pointer(110, 50));
    expect(fireEvent.click(link)).toBe(true);
  });

  it("plays the reveal spin once the given delay has passed", () => {
    jest.useFakeTimers();
    const { container } = render(<AwsBadge {...props} spinDelay={240} />);
    const coin = coinOf(container);
    act(() => {
      jest.advanceTimersByTime(239);
    });
    expect(turnOf(coin)).toBe(0);
    act(() => {
      jest.advanceTimersByTime(1 + 16);
    });
    expect(turnOf(coin)).toBeLessThan(0);
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(turnOf(coin)).toBe(0);
  });
});
