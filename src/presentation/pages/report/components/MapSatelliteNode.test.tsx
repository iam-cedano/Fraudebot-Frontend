import { render, screen } from "@testing-library/react";
import { ReactFlowProvider } from "@xyflow/react";
import MapSatelliteNode from "@presentation/pages/report/components/MapSatelliteNode";
import type { MapSatelliteNode as MapSatelliteNodeType } from "@presentation/pages/report/components/map-graph";

function renderSatelliteNode(data: MapSatelliteNodeType["data"]) {
  render(
    <ReactFlowProvider>
      <MapSatelliteNode
        id="satellite-1"
        type="satellite"
        selected={false}
        dragging={false}
        zIndex={0}
        draggable={false}
        selectable={false}
        deletable={false}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
        isConnectable={false}
        position={{ x: 0, y: 0 }}
        data={data}
      />
    </ReactFlowProvider>,
  );
}

describe("MapSatelliteNode", () => {
  it("renders contact satellites as external links", () => {
    renderSatelliteNode({
      kind: "contact",
      label: "Email",
      detail: "freda85@example.com",
      platform: "Email",
    });

    const link = screen.getByRole("link", { name: "Abrir Email" });
    expect(link).toHaveAttribute("href", "mailto:freda85@example.com");
    expect(screen.getByText("freda85@example.com")).toBeInTheDocument();
  });

  it("renders wallet payment satellites as external links", () => {
    renderSatelliteNode({
      kind: "payment_method",
      label: "Wallet",
      detail: "0x87e33e9e3cdd7dae27f1263993c9c99fce59c909",
      paymentType: 4,
    });

    const link = screen.getByRole("link", {
      name: "Abrir Wallet: 0x87e33e9e3cdd7dae27f1263993c9c99fce59c909",
    });
    expect(link).toHaveAttribute(
      "href",
      "https://etherscan.io/address/0x87e33e9e3cdd7dae27f1263993c9c99fce59c909",
    );
  });

  it("renders non-linkable payment satellites as static cards", () => {
    renderSatelliteNode({
      kind: "payment_method",
      label: "CLABE",
      detail: "3145914092",
      paymentType: 2,
    });

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("3145914092")).toBeInTheDocument();
    expect(screen.getByText("CLABE")).toBeInTheDocument();
  });
});
