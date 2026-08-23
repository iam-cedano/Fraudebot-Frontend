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
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
        Relaciones
      </p>
      <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
        Mapa de relaciones
      </h2>
      <div className="map-tab relative mt-6 h-[32rem] min-h-[28rem] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <ReactFlowProvider>
          <MapCanvas
            partyId={partyId}
            partyType={partyType}
            partyName={partyName}
          />
        </ReactFlowProvider>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Arrastra el mapa para recorrer la red y usa la rueda del ratón para
        acercar o alejar. Los estafadores y empresas se abren en una pestaña
        nueva.
      </p>
    </section>
  );
}

export default MapTab;
