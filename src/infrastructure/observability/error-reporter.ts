const SAFE_CONSOLE_MESSAGE =
  "[ErrorBoundary] An unexpected UI error occurred.";

function reportUnexpectedUiError(): void {
  const endpoint = import.meta.env.VITE_ERROR_REPORT_URL?.trim();

  if (!endpoint) {
    console.error(SAFE_CONSOLE_MESSAGE);
    return;
  }

  const payload = JSON.stringify({
    event: "unexpected_ui_error",
    occurredAt: new Date().toISOString(),
  });

  if (typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon(
      endpoint,
      new Blob([payload], { type: "application/json" }),
    );
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export { reportUnexpectedUiError, SAFE_CONSOLE_MESSAGE };
