import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DependencyProvider } from "@/presentation/providers/DependencyProvider";
import { Dependencies } from "@/infrastructure/di/container";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
  overrides?: Partial<Dependencies>;
}

function TestProviders({
  children,
  route = "/",
  overrides,
}: {
  children: ReactNode;
  route?: string;
  overrides?: Partial<Dependencies>;
}) {
  return (
    <DependencyProvider overrides={overrides}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </DependencyProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", overrides, ...renderOptions }: RenderWithProvidersOptions = {},
) {
  return render(ui, {
  wrapper: ({ children }) => (
    <TestProviders route={route} overrides={overrides}>
      {children}
    </TestProviders>
  ),
  ...renderOptions,
  });
}
