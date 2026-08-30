import { useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MapPartyNode from "@presentation/pages/report/components/MapPartyNode";
import MapSatelliteNode from "@presentation/pages/report/components/MapSatelliteNode";
import {
  createExampleMapGraph,
  type PartyKind,
} from "@presentation/pages/report/components/map-example-graph";

const nodeTypes = {
  party: MapPartyNode,
  satellite: MapSatelliteNode,
};

interface MapTabProps {
  partyId: string;
  partyType: PartyKind;
  partyName: string;
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
    >
      <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e7eb" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

function MapTab({ partyId, partyType, partyName }: MapTabProps) {
  return (
    <ReactFlowProvider>
      <section
        role="tabpanel"
        id="report-panel-mapa"
        aria-labelledby="report-tab-mapa"
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
              Vista ilustrativa
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
              Mapa de relaciones (ejemplo)
            </h2>
          </div>
          <button type="button" disabled className="cursor-not-allowed rounded-md bg-gray-200 px-4 py-2 text-sm font-extrabold text-gray-600">
            Exportar (próximamente)
          </button>
        </div>
        <div
          className="map-tab relative mt-6 h-[32rem] min-h-[28rem] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
          aria-label="Ejemplo visual de un mapa de relaciones"
        >
          <MapCanvas
            partyId={partyId}
            partyType={partyType}
            partyName={partyName}
          />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Este diagrama usa datos ficticios para mostrar cómo funcionará la
          herramienta. No representa vínculos verificados. Arrastra el mapa
          para recorrerlo y usa la rueda del ratón o los controles para acercar
          o alejar.
        </p>
      </section>
    </ReactFlowProvider>
  );
}

export default MapTab;
