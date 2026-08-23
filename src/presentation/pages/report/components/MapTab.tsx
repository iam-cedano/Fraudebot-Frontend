import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { toJpeg } from "html-to-image";
import {
  Background,
  BackgroundVariant,
  Controls,
  getNodesBounds,
  getViewportForBounds,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { organizationPath, scammerPath } from "@/common/app-routes";
import MapPartyNode from "@presentation/pages/report/components/MapPartyNode";
import MapSatelliteNode from "@presentation/pages/report/components/MapSatelliteNode";
import {
  createExampleMapGraph,
  type MapNode,
  type PartyKind,
} from "@presentation/pages/report/components/map-example-graph";

const nodeTypes = {
  party: MapPartyNode,
  satellite: MapSatelliteNode,
};

const DOWNLOAD_WIDTH = 1600;
const DOWNLOAD_HEIGHT = 1000;

interface MapTabProps {
  partyId: string;
  partyType: PartyKind;
  partyName: string;
}

function fileNameFromParty(name: string) {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `mapa-${slug || "relaciones"}.jpg`;
}

function MapCanvas({
  partyId,
  partyType,
  partyName,
}: MapTabProps) {
  const { nodes, edges } = useMemo(
    () => createExampleMapGraph({ partyId, partyType, partyName }),
    [partyId, partyName, partyType],
  );

  const handleNodeClick = useCallback((_: MouseEvent, node: Node) => {
    const mapNode = node as MapNode;
    if (mapNode.type !== "party" || mapNode.data.isCurrent) {
      return;
    }

    const href =
      mapNode.data.kind === "scammer"
        ? scammerPath(mapNode.data.partyId)
        : organizationPath(mapNode.data.partyId);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      panOnDrag
      zoomOnScroll
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      onNodeClick={handleNodeClick}
    >
      <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e7eb" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

function DownloadMapButton({
  partyName,
  canvasRef,
}: {
  partyName: string;
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const { getNodes } = useReactFlow();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    const viewport = canvasRef.current?.querySelector<HTMLElement>(
      ".react-flow__viewport",
    );

    if (!viewport || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const nodesBounds = getNodesBounds(getNodes());
      const viewportTransform = getViewportForBounds(
        nodesBounds,
        DOWNLOAD_WIDTH,
        DOWNLOAD_HEIGHT,
        0.5,
        2,
        0.2,
      );

      const dataUrl = await toJpeg(viewport, {
        backgroundColor: "#f9fafb",
        width: DOWNLOAD_WIDTH,
        height: DOWNLOAD_HEIGHT,
        quality: 0.95,
        style: {
          width: `${DOWNLOAD_WIDTH}px`,
          height: `${DOWNLOAD_HEIGHT}px`,
          transform: `translate(${viewportTransform.x}px, ${viewportTransform.y}px) scale(${viewportTransform.zoom})`,
        },
      });

      const link = document.createElement("a");
      link.download = fileNameFromParty(partyName);
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }, [canvasRef, getNodes, isDownloading, partyName]);

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDownloading ? "Descargando..." : "Descargar JPG"}
    </button>
  );
}

function MapTab({ partyId, partyType, partyName }: MapTabProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlowProvider>
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
              Relaciones
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
              Mapa de relaciones
            </h2>
          </div>
          <DownloadMapButton partyName={partyName} canvasRef={canvasRef} />
        </div>
        <div
          ref={canvasRef}
          className="map-tab relative mt-6 h-[32rem] min-h-[28rem] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
        >
          <MapCanvas
            partyId={partyId}
            partyType={partyType}
            partyName={partyName}
          />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Arrastra el mapa para recorrer la red y usa la rueda del ratón para
          acercar o alejar. Los estafadores y empresas se abren en una pestaña
          nueva.
        </p>
      </section>
    </ReactFlowProvider>
  );
}

export default MapTab;
