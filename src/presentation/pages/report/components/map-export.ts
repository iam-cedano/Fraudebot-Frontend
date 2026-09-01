import {
  getNodesBounds,
  getViewportForBounds,
  type Node,
} from "@xyflow/react";
import { toPng } from "html-to-image";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const PADDING_PX = 48;
const PIXEL_RATIO = 2;
const BACKGROUND_COLOR = "#f9fafb";

type ExportRelationshipMapParams = {
  nodes: Node[];
  viewportElement: HTMLElement;
  fileName: string;
};

function getExportViewport(nodes: Node[]) {
  const bounds = getNodesBounds(nodes);
  const width = Math.max(Math.ceil(bounds.width) + PADDING_PX * 2, 320);
  const height = Math.max(Math.ceil(bounds.height) + PADDING_PX * 2, 240);
  const viewport = getViewportForBounds(
    bounds,
    width,
    height,
    MIN_ZOOM,
    MAX_ZOOM,
    0,
  );

  return { width, height, viewport };
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

export async function exportRelationshipMap({
  nodes,
  viewportElement,
  fileName,
}: ExportRelationshipMapParams): Promise<void> {
  if (nodes.length === 0) {
    throw new Error("El mapa no tiene elementos para exportar.");
  }

  const { width, height, viewport } = getExportViewport(nodes);
  const dataUrl = await toPng(viewportElement, {
    backgroundColor: BACKGROUND_COLOR,
    width,
    height,
    pixelRatio: PIXEL_RATIO,
    cacheBust: true,
    skipFonts: true,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    },
  });

  downloadDataUrl(dataUrl, `${fileName}.png`);
}
