class MonthlyReportCountsEntity {
  constructor(
    private readonly _year: number,
    private readonly _counts: readonly number[],
  ) {
    if (_counts.length !== 12) {
      throw new Error("Monthly report counts must include 12 months");
    }
  }

  public get year(): number {
    return this._year;
  }

  public get counts(): number[] {
    return [...this._counts];
  }

  public get hasReports(): boolean {
    return this._counts.some((count) => count > 0);
  }
}

export default MonthlyReportCountsEntity;
