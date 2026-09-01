class PartyReportEntity {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _description: string,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }
}

export default PartyReportEntity;
