import type { Edge, Node } from "@xyflow/react";
import type {
  FindRelationshipMapResult,
  RelationshipMapEdge,
  RelationshipMapNode,
} from "@/core/domain/map/models/find-relationship-map.model";

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
const HORIZONTAL_GAP = 240;
const ROW_GAP = 190;
const CENTER_POSITION = { x: 280, y: 380 };
const NEIGHBOR_Y = CENTER_POSITION.y - ROW_GAP;

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

function findDuplicateApiIds(nodes: RelationshipMapNode[]): Set<string> {
  const counts = new Map<string, number>();

  for (const node of nodes) {
    counts.set(node.id, (counts.get(node.id) ?? 0) + 1);
  }

  return new Set(
    [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([id]) => id),
  );
}

function createNodeIdResolver(nodes: RelationshipMapNode[]) {
  const duplicateApiIds = findDuplicateApiIds(nodes);

  const getFlowNodeId = (node: RelationshipMapNode): string => {
    if (duplicateApiIds.has(node.id) && isPartyNode(node)) {
      return `party:${node.kind}:${node.party_id}`;
    }

    return node.id;
  };

  const apiIdToFlowId = new Map<string, string>();

  for (const node of nodes) {
    if (!duplicateApiIds.has(node.id)) {
      apiIdToFlowId.set(node.id, getFlowNodeId(node));
    }
  }

  return { getFlowNodeId, apiIdToFlowId };
}

function toFlowEdge(
  edge: RelationshipMapEdge,
  apiIdToFlowId: Map<string, string>,
  centerFlowId?: string,
): Edge | null {
  const apiSource = apiIdToFlowId.get(edge.source) ?? edge.source;
  const apiTarget = apiIdToFlowId.get(edge.target) ?? edge.target;

  if (!apiSource || !apiTarget) {
    return null;
  }

  const isSatelliteEdge =
    edge.kind === "contact" || edge.kind === "payment";
  const isCenterLinkedEdge =
    edge.kind === "linked" &&
    centerFlowId !== undefined &&
    apiSource === centerFlowId;

  let source = apiSource;
  let target = apiTarget;

  if (isSatelliteEdge) {
    // API stores satellite -> party; render party -> satellite so lines connect
    // from the party bottom handle to the satellite top handle.
    source = apiTarget;
    target = apiSource;
  } else if (isCenterLinkedEdge) {
    // API stores center -> neighbor; render neighbor -> center so lines connect
    // from the neighbor bottom handle to the center top handle.
    source = apiTarget;
    target = apiSource;
  }

  return {
    id: edge.id,
    source,
    target,
    style: { stroke: "#d1d5db" },
  };
}

function spreadHorizontally(
  ids: string[],
  centerX: number,
  y: number,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();

  if (ids.length === 0) {
    return positions;
  }

  const totalWidth = (ids.length - 1) * HORIZONTAL_GAP;
  const startX = centerX - totalWidth / 2;

  ids.forEach((id, index) => {
    positions.set(id, { x: startX + index * HORIZONTAL_GAP, y });
  });

  return positions;
}

function isPartyNode(
  node: RelationshipMapNode,
): node is Extract<RelationshipMapNode, { type: "party" }> {
  return node.type === "party";
}

function isSatelliteNode(
  node: RelationshipMapNode,
): node is Extract<
  RelationshipMapNode,
  { type: "contact" | "payment_method" }
> {
  return node.type === "contact" || node.type === "payment_method";
}

function buildMapGraphFromApi(
  map: FindRelationshipMapResult,
  centerPartyId: string,
  centerPartyKind: PartyKind,
): { nodes: MapNode[]; edges: Edge[] } {
  const partyNodes = map.nodes.filter(isPartyNode);
  const satelliteNodes = map.nodes.filter(isSatelliteNode);
  const { getFlowNodeId, apiIdToFlowId } = createNodeIdResolver(map.nodes);

  const centerParty =
    partyNodes.find((node) => node.is_center) ??
    partyNodes.find(
      (node) =>
        node.party_id === centerPartyId && node.kind === centerPartyKind,
    ) ??
    partyNodes[0];

  const centerFlowId = centerParty ? getFlowNodeId(centerParty) : undefined;

  const neighborParties = centerParty
    ? partyNodes.filter((node) => getFlowNodeId(node) !== centerFlowId)
    : partyNodes;

  const positions = new Map<string, { x: number; y: number }>();

  if (centerParty && centerFlowId) {
    positions.set(centerFlowId, CENTER_POSITION);
  }

  const neighborPositions = spreadHorizontally(
    neighborParties.map((node) => getFlowNodeId(node)),
    CENTER_POSITION.x,
    NEIGHBOR_Y,
  );
  neighborPositions.forEach((position, id) => {
    positions.set(id, position);
  });

  const satellitesByParty = new Map<string, string[]>();

  for (const edge of map.edges) {
    if (edge.kind === "linked") {
      continue;
    }

    const satellite = satelliteNodes.find((node) => node.id === edge.source);
    const party = partyNodes.find((node) => node.id === edge.target);

    if (!satellite || !party) {
      continue;
    }

    const partyFlowId = getFlowNodeId(party);
    const satelliteFlowId = getFlowNodeId(satellite);
    const current = satellitesByParty.get(partyFlowId) ?? [];

    if (!current.includes(satelliteFlowId)) {
      satellitesByParty.set(partyFlowId, [...current, satelliteFlowId]);
    }
  }

  if (centerFlowId) {
    const linkedSatelliteIds = new Set(
      [...satellitesByParty.values()].flat(),
    );
    const orphanedSatellites = satelliteNodes
      .map((node) => getFlowNodeId(node))
      .filter((flowId) => !linkedSatelliteIds.has(flowId));

    if (orphanedSatellites.length > 0) {
      const current = satellitesByParty.get(centerFlowId) ?? [];
      satellitesByParty.set(centerFlowId, [...current, ...orphanedSatellites]);
    }
  }

  for (const [partyFlowId, satelliteFlowIds] of satellitesByParty) {
    const partyPosition = positions.get(partyFlowId);
    if (!partyPosition) {
      continue;
    }

    const satellitePositions = spreadHorizontally(
      satelliteFlowIds,
      partyPosition.x,
      partyPosition.y + ROW_GAP,
    );
    satellitePositions.forEach((position, id) => {
      positions.set(id, position);
    });
  }

  const flowNodes: MapNode[] = map.nodes.flatMap((node) => {
    const flowId = getFlowNodeId(node);
    const position = positions.get(flowId);
    if (!position) {
      return [];
    }

    if (isPartyNode(node)) {
      return [
        partyNode(flowId, position, {
          partyId: node.party_id,
          name: node.name,
          kind: node.kind,
          isCurrent:
            node.is_center ||
            (node.party_id === centerPartyId && node.kind === centerPartyKind),
        }),
      ];
    }

    return [
      satelliteNode(flowId, position, {
        kind: node.type === "contact" ? "contact" : "payment_method",
        label: node.label,
        detail: node.detail,
      }),
    ];
  });

  return {
    nodes: flowNodes,
    edges: map.edges
      .map((edge) => toFlowEdge(edge, apiIdToFlowId, centerFlowId))
      .filter((edge): edge is Edge => edge !== null),
  };
}

export { buildMapGraphFromApi };
