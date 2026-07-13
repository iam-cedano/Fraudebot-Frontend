class ScammerEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _iso_country: string,
    private readonly _is_active: boolean,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get isoCountry(): string {
    return this._iso_country;
  }

  public get isActive(): boolean {
    return this._is_active;
  }
}

export default ScammerEntity;
