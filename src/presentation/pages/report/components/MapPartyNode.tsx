import { Handle, Position, type NodeProps } from "@xyflow/react";
import { organizationPath, scammerPath } from "@/common/app-routes";
import type { MapPartyNode, PartyKind } from "@presentation/pages/report/components/map-example-graph";

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-4 w-4 shrink-0 text-gray-400"
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

function PartyIcon({ kind }: { kind: PartyKind }) {
  if (kind === "scammer") {
    return (
      <svg
        className="h-4 w-4 shrink-0 text-gray-700"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    );
  }

  return (
    <svg
      className="h-4 w-4 shrink-0 text-gray-700"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  );
}

function kindLabel(kind: PartyKind) {
  return kind === "scammer" ? "Estafador" : "Empresa";
}

function MapPartyNode({ data }: NodeProps<MapPartyNode>) {
  const href =
    data.kind === "scammer"
      ? scammerPath(data.partyId)
      : organizationPath(data.partyId);

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <PartyIcon kind={data.kind} />
          <p className="truncate text-sm font-extrabold text-gray-900">
            {data.name}
          </p>
        </div>
        {!data.isCurrent && (
          <span aria-hidden>
            <ExternalLinkIcon />
          </span>
        )}
      </div>
      <p className="mt-1 text-xs font-semibold text-gray-500">
        {kindLabel(data.kind)}
      </p>
    </>
  );

  return (
    <div className="font-[Nunito]">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-gray-300 !bg-gray-200"
      />
      {data.isCurrent ? (
        <div className="w-52 rounded-md border-2 border-gray-950 bg-white px-3 py-2.5 shadow-sm">
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-600">
            Estás aquí
          </p>
          {content}
        </div>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${data.name} en una pestaña nueva`}
          className="nodrag nopan nowheel block w-52 cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-md"
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
        >
          {content}
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
