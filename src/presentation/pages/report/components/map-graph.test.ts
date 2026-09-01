import { buildMapGraphFromApi } from "@presentation/pages/report/components/map-graph";
import type { FindRelationshipMapResult } from "@/core/domain/map/models/find-relationship-map.model";

const baseMap: FindRelationshipMapResult = {
  nodes: [
    {
      id: "party:100",
      type: "party",
      party_id: "100",
      name: "Centro",
      kind: "scammer",
      is_center: true,
    },
    {
      id: "party:200",
      type: "party",
      party_id: "200",
      name: "Vecino",
      kind: "organization",
      is_center: false,
    },
    {
      id: "contact:501",
      type: "contact",
      contact_id: "501",
      label: "WhatsApp",
      detail: "555 123 4567",
      platform: "whatsapp",
    },
    {
      id: "payment:601",
      type: "payment_method",
      payment_method_id: "601",
      label: "CLABE",
      detail: "012345678901234567",
    },
  ],
  edges: [
    {
      id: "e1",
      source: "contact:501",
      target: "party:100",
      kind: "contact",
    },
    {
      id: "e2",
      source: "payment:601",
      target: "party:100",
      kind: "payment",
    },
    {
      id: "e3",
      source: "party:100",
      target: "party:200",
      kind: "linked",
    },
  ],
};

describe("buildMapGraphFromApi", () => {
  it("keeps API node ids when they are unique", () => {
    const { nodes, edges } = buildMapGraphFromApi(baseMap, "100", "scammer");

    expect(nodes).toHaveLength(4);
    expect(nodes.find((node) => node.id === "party:100")).toMatchObject({
      type: "party",
      data: {
        partyId: "100",
        name: "Centro",
        kind: "scammer",
        isCurrent: true,
      },
    });
    expect(nodes.find((node) => node.id === "contact:501")).toMatchObject({
      type: "satellite",
      data: {
        kind: "contact",
        label: "WhatsApp",
        detail: "555 123 4567",
        platform: "whatsapp",
      },
    });
    expect(edges).toHaveLength(3);
    expect(edges[0]).toMatchObject({
      source: "party:100",
      target: "contact:501",
    });
    expect(edges[1]).toMatchObject({
      source: "party:100",
      target: "payment:601",
    });
    expect(edges[2]).toMatchObject({
      source: "party:200",
      target: "party:100",
    });
  });

  it("derives the center party from party id when is_center is false", () => {
    const map: FindRelationshipMapResult = {
      nodes: [
        {
          id: "party:100",
          type: "party",
          party_id: "100",
          name: "Centro",
          kind: "scammer",
          is_center: false,
        },
      ],
      edges: [],
    };

    const { nodes } = buildMapGraphFromApi(map, "100", "scammer");

    expect(nodes[0]?.data).toMatchObject({ isCurrent: true });
  });

  it("positions neighbor parties above the center node", () => {
    const { nodes } = buildMapGraphFromApi(baseMap, "100", "scammer");
    const center = nodes.find((node) => node.id === "party:100");
    const neighbor = nodes.find((node) => node.id === "party:200");

    expect(neighbor?.position.y).toBeLessThan(center?.position.y ?? 0);
  });

  it("positions satellites below their parent party", () => {
    const { nodes } = buildMapGraphFromApi(baseMap, "100", "scammer");
    const center = nodes.find((node) => node.id === "party:100");
    const contact = nodes.find((node) => node.id === "contact:501");

    expect(contact?.position.y).toBeGreaterThan(center?.position.y ?? 0);
  });

  it("renders kind-qualified party ids from the API", () => {
    const map: FindRelationshipMapResult = {
      nodes: [
        {
          id: "party:scammer:1",
          type: "party",
          party_id: "1",
          name: "Jho Low",
          kind: "scammer",
          is_center: true,
        },
        {
          id: "party:organization:1",
          type: "party",
          party_id: "1",
          name: "Aras Investment",
          kind: "organization",
          is_center: false,
        },
      ],
      edges: [],
    };

    const { nodes } = buildMapGraphFromApi(map, "1", "scammer");

    expect(nodes).toHaveLength(2);
    expect(nodes.find((node) => node.id === "party:scammer:1")).toMatchObject({
      data: { name: "Jho Low", isCurrent: true },
    });
    expect(
      nodes.find((node) => node.id === "party:organization:1"),
    ).toMatchObject({
      data: { name: "Aras Investment", isCurrent: false },
    });
  });

  it("disambiguates party ids only when the API reuses the same node id", () => {
    const map: FindRelationshipMapResult = {
      nodes: [
        {
          id: "party:1",
          type: "party",
          party_id: "1",
          name: "Jho Low",
          kind: "scammer",
          is_center: true,
        },
        {
          id: "party:1",
          type: "party",
          party_id: "1",
          name: "Aras Investment",
          kind: "organization",
          is_center: false,
        },
      ],
      edges: [],
    };

    const { nodes } = buildMapGraphFromApi(map, "1", "scammer");

    expect(nodes).toHaveLength(2);
    expect(nodes.find((node) => node.id === "party:scammer:1")).toMatchObject({
      data: { name: "Jho Low", isCurrent: true },
    });
    expect(nodes.find((node) => node.id === "party:organization:1")).toMatchObject({
      data: { name: "Aras Investment", isCurrent: false },
    });
  });

  it("renders satellites without edges by attaching them to the center party", () => {
    const map: FindRelationshipMapResult = {
      nodes: [
        {
          id: "party:scammer:1",
          type: "party",
          party_id: "1",
          name: "Jho Low",
          kind: "scammer",
          is_center: true,
        },
        {
          id: "contact:1",
          type: "contact",
          contact_id: "1",
          label: "Email",
          detail: "freda85@example.com",
          platform: "email",
        },
        {
          id: "payment_method:1",
          type: "payment_method",
          payment_method_id: "1",
          label: "CLABE",
          detail: "3145914092",
        },
      ],
      edges: [],
    };

    const { nodes } = buildMapGraphFromApi(map, "1", "scammer");

    expect(nodes).toHaveLength(3);
    expect(nodes.find((node) => node.id === "contact:1")).toBeDefined();
    expect(nodes.find((node) => node.id === "payment_method:1")).toBeDefined();
  });
});
