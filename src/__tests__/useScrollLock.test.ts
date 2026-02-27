import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollLock } from "@/hooks/useScrollLock";

// jsdom doesn't implement scrollTo or scrollY, so we mock them
let mockScrollY = 0;
const mockScrollTo = vi.fn((options?: ScrollToOptions | number, y?: number) => {
  if (typeof options === "number") {
    mockScrollY = y ?? 0;
  } else if (options && typeof options === "object") {
    mockScrollY = options.top ?? 0;
  }
});

beforeEach(() => {
  mockScrollY = 0;
  mockScrollTo.mockClear();
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  Object.defineProperty(window, "scrollY", {
    get: () => mockScrollY,
    configurable: true,
  });
  window.scrollTo = mockScrollTo as unknown as typeof window.scrollTo;
});

afterEach(() => {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
});

describe("useScrollLock", () => {
  it("locks body scroll when enabled", () => {
    mockScrollY = 500;

    renderHook(() => useScrollLock(true));

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-500px");
    expect(document.body.style.width).toBe("100%");
  });

  it("does not lock scroll when disabled", () => {
    renderHook(() => useScrollLock(false));

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
  });

  it("restores scroll position on unmount", () => {
    mockScrollY = 1750;

    const { unmount } = renderHook(() => useScrollLock(true));

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-1750px");

    unmount();

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 1750,
      left: 0,
      behavior: "instant",
    });
  });

  it("uses behavior: instant to override smooth scroll CSS", () => {
    mockScrollY = 300;

    const { unmount } = renderHook(() => useScrollLock(true));
    unmount();

    // The critical assertion: behavior must be "instant", not absent
    const call = mockScrollTo.mock.calls.find(
      (c) => typeof c[0] === "object" && c[0].behavior === "instant"
    );
    expect(call).toBeDefined();
  });

  it("preserves scroll position through enable/disable cycle", () => {
    mockScrollY = 2000;

    const { unmount } = renderHook(() => useScrollLock(true));

    // While locked, scrollY reads as 0 (body is fixed)
    // But the hook captured 2000 in its closure
    unmount();

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 2000,
      left: 0,
      behavior: "instant",
    });
  });

  it("handles zero scroll position", () => {
    mockScrollY = 0;

    const { unmount } = renderHook(() => useScrollLock(true));

    // -0 renders as "0px" not "-0px" in template literals
    expect(document.body.style.top).toBe("0px");

    unmount();

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });

  it("handles multiple lock/unlock cycles correctly", () => {
    mockScrollY = 800;
    const { unmount: unmount1 } = renderHook(() => useScrollLock(true));
    unmount1();
    expect(mockScrollTo).toHaveBeenLastCalledWith({
      top: 800,
      left: 0,
      behavior: "instant",
    });

    // Simulate scroll to new position after unlock
    mockScrollY = 1200;
    mockScrollTo.mockClear();

    const { unmount: unmount2 } = renderHook(() => useScrollLock(true));
    expect(document.body.style.top).toBe("-1200px");
    unmount2();
    expect(mockScrollTo).toHaveBeenLastCalledWith({
      top: 1200,
      left: 0,
      behavior: "instant",
    });
  });
});
