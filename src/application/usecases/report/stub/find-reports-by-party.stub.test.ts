import FindReportsByPartyStubUsecase from "@/application/usecases/report/stub/find-reports-by-party.stub";

describe("FindReportsByPartyStubUsecase", () => {
  const useCase = new FindReportsByPartyStubUsecase();

  it("returns ten reports on the first page", async () => {
    const result = await useCase.execute("1", "scammer", 1);

    expect(result.data).toHaveLength(10);
    expect(result.total).toBe(25);
    expect(result.page).toBe(1);
    expect(result.count).toBe(10);
    expect(result.data[0].id).toBe("1354");
    expect(result.data[0].title).toBe("¡Me estafó $2,000 MXN y estoy enojada!");
    expect(result.data[1].id).toBe("1314");
    expect(result.data[2].id).toBe("1287");
    expect(result.data[2].title).toBe("Cuidado parece estafa!");
  });

  it("returns the remaining reports on later pages", async () => {
    const result = await useCase.execute("1", "organization", 3);

    expect(result.data).toHaveLength(5);
    expect(result.page).toBe(3);
    expect(result.total).toBe(25);
  });

  it("uses unique ids across the stub list", async () => {
    const firstPage = await useCase.execute("1", "scammer", 1);
    const secondPage = await useCase.execute("1", "scammer", 2);
    const thirdPage = await useCase.execute("1", "scammer", 3);
    const ids = [...firstPage.data, ...secondPage.data, ...thirdPage.data].map(
      (report) => report.id,
    );

    expect(new Set(ids).size).toBe(ids.length);
  });
});
