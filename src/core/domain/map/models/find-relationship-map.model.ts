type PartyKind = "scammer" | "organization";
type MapEdgeKind = "contact" | "payment" | "linked";

type RelationshipMapPartyNode = {
  id: string;
  type: "party";
  party_id: string;
  name: string;
  kind: PartyKind;
  is_center: boolean;
};

type RelationshipMapContactNode = {
  id: string;
  type: "contact";
  contact_id: string;
  label: string;
  detail: string;
  platform: string;
};

type RelationshipMapPaymentNode = {
  id: string;
  type: "payment_method";
  payment_method_id: string;
  label: string;
  detail: string;
  payment_type?: number;
};

type RelationshipMapNode =
  | RelationshipMapPartyNode
  | RelationshipMapContactNode
  | RelationshipMapPaymentNode;

type RelationshipMapEdge = {
  id: string;
  source: string;
  target: string;
  kind: MapEdgeKind;
};

type FindRelationshipMapResponse = {
  nodes: RelationshipMapNode[];
  edges: RelationshipMapEdge[];
};

type FindRelationshipMapResult = FindRelationshipMapResponse;

export type {
  PartyKind,
  MapEdgeKind,
  RelationshipMapPartyNode,
  RelationshipMapContactNode,
  RelationshipMapPaymentNode,
  RelationshipMapNode,
  RelationshipMapEdge,
  FindRelationshipMapResponse,
  FindRelationshipMapResult,
};
