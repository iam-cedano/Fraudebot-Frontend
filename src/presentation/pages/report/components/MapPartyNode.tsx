import { Handle, Position, type NodeProps } from "@xyflow/react";
import { organizationPath, scammerPath } from "@/common/app-routes";
import type { MapPartyNode, PartyKind } from "@presentation/pages/report/components/map-graph";

const mapNodeCardClassName =
  "w-52 rounded-md border border-gray-200 bg-white px-3 py-2.5 shadow-sm";

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-3 w-3 shrink-0 text-gray-400"
    >
      <path
        d="M14 4h6v6M20 4 10 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function kindLabel(kind: PartyKind) {
  return kind === "scammer" ? "Estafador" : "Empresa";
}

function PartyCardContent({ data }: { data: MapPartyNode["data"] }) {
  return (
    <>
      <p
        className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${
          data.isCurrent ? "text-red-600" : "text-gray-400"
        }`}
      >
        {data.isCurrent ? "Estás aquí" : kindLabel(data.kind)}
      </p>
      <p className="mt-1 truncate text-sm font-extrabold text-gray-900">
        {data.name}
      </p>
      <p className="mt-0.5 truncate text-xs font-medium text-gray-500">
        {data.isCurrent ? (
          kindLabel(data.kind)
        ) : (
          <span className="inline-flex items-center gap-1">
            <ExternalLinkIcon />
            Abrir perfil
          </span>
        )}
      </p>
    </>
  );
}

function MapPartyNode({ data }: NodeProps<MapPartyNode>) {
  const href =
    data.kind === "scammer"
      ? scammerPath(data.partyId)
      : organizationPath(data.partyId);

  return (
    <div className="font-[Nunito]">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-gray-300 !bg-gray-200"
      />
      {data.isCurrent ? (
        <div
          className={`${mapNodeCardClassName} border-gray-950`}
        >
          <PartyCardContent data={data} />
        </div>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${data.name} en una pestaña nueva`}
          className={`nodrag nopan nowheel pointer-events-auto block cursor-pointer transition-all hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-md ${mapNodeCardClassName}`}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            window.open(href, "_blank", "noopener,noreferrer");
          }}
        >
          <PartyCardContent data={data} />
        </a>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-gray-300 !bg-gray-200"
      />
    </div>
  );
}

export default MapPartyNode;
