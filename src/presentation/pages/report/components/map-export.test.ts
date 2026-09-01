import { toPng } from "html-to-image";
import { exportRelationshipMap } from "@presentation/pages/report/components/map-export";
import type { Node } from "@xyflow/react";

vi.mock("html-to-image", () => ({
  toPng: vi.fn(),
}));

const mockedToPng = vi.mocked(toPng);

const nodes: Node[] = [
  {
    id: "party:1",
    position: { x: 0, y: 0 },
    data: {},
    width: 208,
    height: 88,
  },
];

function createViewport() {
  const viewport = document.createElement("div");
  viewport.className = "react-flow__viewport";
  document.body.appendChild(viewport);
  return viewport;
}

describe("exportRelationshipMap", () => {
  let clickSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickSpy = vi.fn();
    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      const element = document.implementation
        .createHTMLDocument()
        .createElement(tagName);

      if (tagName === "a") {
        Object.defineProperty(element, "click", { value: clickSpy });
      }

      return element;
    });
    mockedToPng.mockResolvedValue("data:image/png;base64,AAAA");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
  });

  it("downloads a PNG of the diagram", async () => {
    const viewportElement = createViewport();

    await exportRelationshipMap({
      nodes,
      viewportElement,
      fileName: "mapa-relaciones",
    });

    expect(mockedToPng).toHaveBeenCalledWith(
      viewportElement,
      expect.objectContaining({
        backgroundColor: "#f9fafb",
        pixelRatio: 2,
      }),
    );
    expect(clickSpy).toHaveBeenCalledTimes(1);
    const link = clickSpy.mock.instances[0] as HTMLAnchorElement;
    expect(link.download).toBe("mapa-relaciones.png");
    expect(link.href).toContain("data:image/png");
  });

  it("rejects when the diagram has no nodes", async () => {
    await expect(
      exportRelationshipMap({
        nodes: [],
        viewportElement: createViewport(),
        fileName: "mapa-relaciones",
      }),
    ).rejects.toThrow("El mapa no tiene elementos para exportar.");
  });
});
