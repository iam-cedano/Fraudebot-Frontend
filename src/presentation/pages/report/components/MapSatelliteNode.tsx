import { Handle, Position, type NodeProps } from "@xyflow/react";
import type {
  MapSatelliteNode,
  SatelliteKind,
} from "@presentation/pages/report/components/map-example-graph";

function kindLabel(kind: SatelliteKind) {
  return kind === "contact" ? "Contacto" : "Método de pago";
}

function MapSatelliteNode({ data }: NodeProps<MapSatelliteNode>) {
  return (
    <div className="font-[Nunito]">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-gray-300 !bg-gray-200"
      />
      <div className="w-52 rounded-md border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
          {kindLabel(data.kind)}
        </p>
        <p className="mt-1 truncate text-sm font-extrabold text-gray-900">
          {data.label}
        </p>
        <p className="mt-0.5 truncate text-xs font-medium text-gray-500" title={data.detail}>
          {data.detail}
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-gray-300 !bg-gray-200"
      />
    </div>
  );
}

export default MapSatelliteNode;
