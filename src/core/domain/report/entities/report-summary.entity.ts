class ReportSummaryEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _tags: string[],
    private readonly _reports: number,
    private readonly _type: "scammer" | "organization",
    private readonly _organizations: string[] | null,
    private readonly _products: string[],
    private readonly _status: "active" | "inactive",
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get tags(): string[] {
    return [...this._tags];
  }

  public get reports(): number {
    return this._reports;
  }

  public get type(): "scammer" | "organization" {
    return this._type;
  }

  public get organizations(): string[] | null {
    return this._organizations;
  }

  public get products(): string[] {
    return [...this._products];
  }

  public get status(): "active" | "inactive" {
    return this._status;
  }
}

export default ReportSummaryEntity;
