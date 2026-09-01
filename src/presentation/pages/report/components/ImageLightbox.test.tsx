import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageLightbox from "@presentation/pages/report/components/ImageLightbox";

function renderLightbox(onClose = vi.fn()) {
  render(
    <ImageLightbox
      src="https://example.com/avatar.png"
      alt="Ada Lovelace"
      onClose={onClose}
    />,
  );

  return { onClose };
}

describe("ImageLightbox", () => {
  it("closes when the area outside the picture is clicked", () => {
    const { onClose } = renderLightbox();
    const dialog = screen.getByRole("dialog", { name: "Vista ampliada: Ada Lovelace" });
    const backdrop = dialog.querySelector("[aria-hidden]");

    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop as Element);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the picture is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderLightbox();

    await user.click(screen.getByRole("img", { name: "Ada Lovelace" }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { onClose } = renderLightbox();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render a close button", () => {
    renderLightbox();

    expect(
      screen.queryByRole("button", { name: "Cerrar vista de foto" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cerrar" })).not.toBeInTheDocument();
  });
});
