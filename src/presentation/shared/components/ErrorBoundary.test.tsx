import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowingChild(): never {
  throw new Error("private customer data");
}

describe("ErrorBoundary", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a safe fallback and logs no error details", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Algo salió mal");
    expect(consoleError).toHaveBeenCalledWith(
      "[ErrorBoundary] An unexpected UI error occurred.",
    );
    const boundaryCalls = consoleError.mock.calls.filter(
      ([message]) =>
        typeof message === "string" && message.startsWith("[ErrorBoundary]"),
    );
    expect(boundaryCalls).toEqual([
      ["[ErrorBoundary] An unexpected UI error occurred."],
    ]);
  });

  it("supports a custom fallback and error reporter", () => {
    const onError = vi.fn();
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    render(
      <ErrorBoundary fallback={<p>Try later</p>} onError={onError}>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Try later")).toBeInTheDocument();
    expect(onError).toHaveBeenCalledOnce();
    expect(consoleError).not.toHaveBeenCalledWith(
      "[ErrorBoundary] An unexpected UI error occurred.",
    );
  });
});
