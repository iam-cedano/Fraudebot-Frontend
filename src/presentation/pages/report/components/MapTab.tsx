import { useEffect, useMemo, useState } from "react";
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
  buildMapGraphFromApi,
  type PartyKind,
} from "@presentation/pages/report/components/map-graph";
import type { FindRelationshipMapResult } from "@/core/domain/map/models/find-relationship-map.model";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import { isCanceledError } from "@/common/utils/http-error.util";

const nodeTypes = {
  party: MapPartyNode,
  satellite: MapSatelliteNode,
};

interface MapTabProps {
  partyId: string;
  partyType: PartyKind;
}

function MapCanvas({
  map,
  partyId,
  partyType,
}: {
  map: FindRelationshipMapResult;
  partyId: string;
  partyType: PartyKind;
}) {
  const { nodes, edges } = useMemo(
    () => buildMapGraphFromApi(map, partyId, partyType),
    [map, partyId, partyType],
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

function MapTab({ partyId, partyType }: MapTabProps) {
  const { findRelationshipMapByPartyUseCase } = useDependencies();
  const [map, setMap] = useState<FindRelationshipMapResult>({
    nodes: [],
    edges: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    setErrorMessage(null);

    findRelationshipMapByPartyUseCase
      .execute(partyId, partyType)
      .then((result) => {
        if (ignore) {
          return;
        }

        setMap(result);
      })
      .catch((error) => {
        if (ignore || isCanceledError(error)) {
          return;
        }

        setMap({ nodes: [], edges: [] });
        setErrorMessage(
          "No pudimos cargar el mapa de relaciones. Revisa tu conexión e inténtalo de nuevo.",
        );
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
      findRelationshipMapByPartyUseCase.cancel();
    };
  }, [findRelationshipMapByPartyUseCase, partyId, partyType, requestVersion]);

  const hasGraph = map.nodes.length > 0;

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
            <h2 className="text-2xl font-extrabold text-gray-900">
              Mapa de relaciones
            </h2>
          </div>
          <button type="button" disabled className="cursor-not-allowed rounded-md bg-gray-200 px-4 py-2 text-sm font-extrabold text-gray-600">
            Exportar (próximamente)
          </button>
        </div>
        <div
          className="map-tab relative mt-6 h-[32rem] min-h-[28rem] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
          aria-label="Mapa de relaciones"
        >
          {isLoading && (
            <p className="flex h-full items-center justify-center text-sm text-gray-400">
              Cargando mapa...
            </p>
          )}

          {!isLoading && errorMessage && (
            <div
              role="alert"
              className="flex h-full flex-col items-center justify-center px-6 text-center"
            >
              <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setRequestVersion((version) => version + 1)}
                className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                Reintentar
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && hasGraph && (
            <MapCanvas map={map} partyId={partyId} partyType={partyType} />
          )}

          {!isLoading && !errorMessage && !hasGraph && (
            <p className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-400">
              No hay relaciones registradas para mostrar en el mapa.
            </p>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Arrastra el mapa para recorrerlo y usa la rueda del ratón o los
          controles para acercar o alejar.
        </p>
      </section>
    </ReactFlowProvider>
  );
}

export default MapTab;
