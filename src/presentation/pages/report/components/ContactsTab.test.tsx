import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";
import ContactsTab from "@presentation/pages/report/components/ContactsTab";
import { SOCIAL_FILTERS } from "@presentation/pages/report/components/contact-platform";
import { renderWithProviders } from "@/test/test-utils";

function createContact(
  id: string,
  platform: string,
  reference: string,
): ContactSummaryEntity {
  return new ContactSummaryEntity(
    id,
    `Contact ${id}`,
    reference,
    platform,
    "20-11-2026",
    true,
  );
}

function createPage(page: number, platform?: string) {
  const contacts = Array.from({ length: 10 }, (_, index) =>
    createContact(
      String((page - 1) * 10 + index + 1),
      platform ?? (index % 2 === 0 ? "Facebook" : "Whatsapp"),
      `www.example.com/${page}-${index}`,
    ),
  );

  return {
    data: contacts,
    total: 25,
    page,
    count: 10,
  };
}

describe("ContactsTab", () => {
  it("renders ten contacts from the contacts use case", async () => {
    const execute = vi.fn().mockResolvedValue(createPage(1));

    renderWithProviders(
      <ContactsTab partyId="20" partyType="scammer" />,
      {
        overrides: {
          findContactsByPartyUseCase: {
            execute,
            cancel: vi.fn(),
          },
        },
      },
    );

    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(10);
    });

    expect(execute).toHaveBeenCalledWith("20", "scammer", 1, undefined);
    const contactLinks = screen.getAllByRole("link", { name: /Abrir / });
    expect(contactLinks).toHaveLength(10);
    expect(contactLinks[0]).toHaveAttribute("target", "_blank");
    expect(contactLinks[0]).toHaveClass("cursor-pointer");
    expect(screen.getByText("Contactos:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Agregar Contacto +" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Paginación de contactos")).toBeInTheDocument();
    for (const filter of SOCIAL_FILTERS) {
      expect(
        screen.getByRole("button", { name: filter.label }),
      ).toBeInTheDocument();
    }
  });

  it("requests the next page from the use case", async () => {
    const execute = vi
      .fn()
      .mockResolvedValueOnce(createPage(1))
      .mockResolvedValueOnce(createPage(2));
    const user = userEvent.setup();

    renderWithProviders(
      <ContactsTab partyId="20" partyType="organization" />,
      {
        overrides: {
          findContactsByPartyUseCase: {
            execute,
            cancel: vi.fn(),
          },
        },
      },
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => {
      expect(execute).toHaveBeenCalledWith("20", "organization", 2, undefined);
    });
  });

  it("filters contacts by social platform", async () => {
    const execute = vi
      .fn()
      .mockResolvedValueOnce(createPage(1))
      .mockResolvedValueOnce(createPage(1, "Instagram"));
    const user = userEvent.setup();

    renderWithProviders(<ContactsTab partyId="7" partyType="scammer" />, {
      overrides: {
        findContactsByPartyUseCase: {
          execute,
          cancel: vi.fn(),
        },
      },
    });

    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(10);
    });

    await user.click(screen.getByRole("button", { name: "Instagram" }));

    await waitFor(() => {
      expect(execute).toHaveBeenCalledWith("7", "scammer", 1, "Instagram");
    });

    expect(screen.getByRole("button", { name: "Instagram" })).toHaveClass(
      "bg-blue-500",
    );
    expect(screen.getByLabelText("Paginación de contactos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });
});
