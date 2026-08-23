import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlatformFilterRow from "@presentation/pages/report/components/PlatformFilterRow";
import { SOCIAL_FILTERS } from "@presentation/pages/report/components/contact-platform";

function mockOverflow(scroller: HTMLElement) {
  Object.defineProperty(scroller, "clientWidth", {
    configurable: true,
    value: 200,
  });
  Object.defineProperty(scroller, "scrollWidth", {
    configurable: true,
    value: 800,
  });
  Object.defineProperty(scroller, "scrollLeft", {
    configurable: true,
    writable: true,
    value: 0,
  });
}

describe("PlatformFilterRow", () => {
  it("renders every platform even when none is selected", () => {
    render(<PlatformFilterRow onPlatformChange={vi.fn()} />);

    for (const filter of SOCIAL_FILTERS) {
      expect(
        screen.getByRole("button", { name: filter.label }),
      ).toBeInTheDocument();
    }
  });

  it("shows a next-arrow when the row overflows and scrolls on click", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PlatformFilterRow onPlatformChange={vi.fn()} />,
    );
    const scroller = container.querySelector(".overflow-x-auto") as HTMLElement;
    const scrollBy = vi.fn();

    mockOverflow(scroller);
    scroller.scrollBy = scrollBy;
    scroller.dispatchEvent(new Event("scroll"));

    const nextButton = await screen.findByRole("button", {
      name: "Más plataformas",
    });

    await user.click(nextButton);

    expect(scrollBy).toHaveBeenCalledWith({
      left: 160,
      behavior: "smooth",
    });
  });
});
