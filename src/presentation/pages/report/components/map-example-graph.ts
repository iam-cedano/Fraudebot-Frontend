import type { Edge, Node } from "@xyflow/react";

export type PartyKind = "scammer" | "organization";
export type SatelliteKind = "contact" | "payment_method";

export type PartyNodeData = {
  partyId: string;
  name: string;
  kind: PartyKind;
  isCurrent: boolean;
};

export type SatelliteNodeData = {
  kind: SatelliteKind;
  label: string;
  detail: string;
};

export type MapPartyNode = Node<PartyNodeData, "party">;
export type MapSatelliteNode = Node<SatelliteNodeData, "satellite">;
export type MapNode = MapPartyNode | MapSatelliteNode;

const nodeStyle = {
  padding: 0,
  border: "none",
  background: "transparent",
  width: "auto",
} as const;

const NODE_WIDTH = 208;
const NODE_HEIGHT = 88;

const RELATED_SCAMMER_A = "2001";
const RELATED_SCAMMER_B = "2002";
const RELATED_ORG_A = "3001";
const RELATED_ORG_B = "3002";

function partyNode(
  id: string,
  position: { x: number; y: number },
  data: PartyNodeData,
): MapPartyNode {
  return {
    id,
    type: "party",
    position,
    data,
    className: "nopan",
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    style: {
      ...nodeStyle,
      ...(data.isCurrent ? {} : { pointerEvents: "auto" }),
    },
  };
}

function satelliteNode(
  id: string,
  position: { x: number; y: number },
  data: SatelliteNodeData,
): MapSatelliteNode {
  return {
    id,
    type: "satellite",
    position,
    data,
    className: "nopan",
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    style: nodeStyle,
  };
}

function edge(id: string, source: string, target: string, label: string): Edge {
  return {
    id,
    source,
    target,
    label,
    style: { stroke: "#d1d5db" },
    labelStyle: { fill: "#6b7280", fontSize: 11, fontWeight: 700 },
    labelBgStyle: { fill: "#ffffff" },
    labelBgPadding: [4, 2],
  };
}

function createExampleMapGraph({
  partyId,
  partyType,
  partyName,
}: {
  partyId: string;
  partyType: PartyKind;
  partyName: string;
}): { nodes: MapNode[]; edges: Edge[] } {
  const neighborKind: PartyKind =
    partyType === "organization" ? "scammer" : "organization";
  const neighborAId =
    neighborKind === "scammer" ? RELATED_SCAMMER_A : RELATED_ORG_A;
  const neighborBId =
    neighborKind === "scammer" ? RELATED_SCAMMER_B : RELATED_ORG_B;
  const neighborAName =
    neighborKind === "scammer" ? "Persona de ejemplo A" : "Empresa de ejemplo A";
  const neighborBName =
    neighborKind === "scammer" ? "Persona de ejemplo B" : "Empresa de ejemplo B";

  const nodes: MapNode[] = [
    satelliteNode("sat-contact-current", { x: 40, y: 0 }, {
      kind: "contact",
      label: "Contacto ficticio",
      detail: "000 000 0000",
    }),
    satelliteNode("sat-payment-current", { x: 520, y: 0 }, {
      kind: "payment_method",
      label: "Cuenta ficticia",
      detail: "000 000 000000000000",
    }),
    partyNode("party-current", { x: 280, y: 170 }, {
      partyId,
      name: partyName,
      kind: partyType,
      isCurrent: true,
    }),
    partyNode("party-neighbor-a", { x: 40, y: 360 }, {
      partyId: neighborAId,
      name: neighborAName,
      kind: neighborKind,
      isCurrent: false,
    }),
    partyNode("party-neighbor-b", { x: 520, y: 360 }, {
      partyId: neighborBId,
      name: neighborBName,
      kind: neighborKind,
      isCurrent: false,
    }),
    satelliteNode("sat-contact-neighbor", { x: 40, y: 540 }, {
      kind: "contact",
      label: "Red social ficticia",
      detail: "@cuenta_ejemplo",
    }),
    satelliteNode("sat-payment-neighbor", { x: 520, y: 540 }, {
      kind: "payment_method",
      label: "Pago ficticio",
      detail: "identificador-de-ejemplo",
    }),
  ];

  const edges: Edge[] = [
    edge("e-contact-current", "sat-contact-current", "party-current", "contacto"),
    edge("e-payment-current", "sat-payment-current", "party-current", "pago"),
    edge("e-neighbor-a", "party-current", "party-neighbor-a", "vinculado"),
    edge("e-neighbor-b", "party-current", "party-neighbor-b", "vinculado"),
    edge(
      "e-contact-neighbor",
      "party-neighbor-a",
      "sat-contact-neighbor",
      "contacto",
    ),
    edge(
      "e-payment-neighbor",
      "party-neighbor-b",
      "sat-payment-neighbor",
      "pago",
    ),
  ];

  return { nodes, edges };
}

export { createExampleMapGraph };
