import FindContactsByPartyStubUsecase from "@/application/usecases/contact/stub/find-contacts-by-party.stub";

describe("FindContactsByPartyStubUsecase", () => {
  const useCase = new FindContactsByPartyStubUsecase();

  it("returns ten contacts on the first page", async () => {
    const result = await useCase.execute("1", "scammer", 1);

    expect(result.data).toHaveLength(10);
    expect(result.total).toBe(25);
    expect(result.page).toBe(1);
    expect(result.count).toBe(10);
  });

  it("returns the remaining contacts on later pages", async () => {
    const result = await useCase.execute("1", "organization", 3);

    expect(result.data).toHaveLength(5);
    expect(result.page).toBe(3);
    expect(result.total).toBe(25);
  });

  it("filters contacts by platform before paginating", async () => {
    const result = await useCase.execute("1", "scammer", 1, "Instagram");

    expect(result.data.every((contact) => contact.platform === "Instagram")).toBe(
      true,
    );
    expect(result.total).toBe(3);
    expect(result.page).toBe(1);
    expect(result.count).toBe(10);
  });
});
