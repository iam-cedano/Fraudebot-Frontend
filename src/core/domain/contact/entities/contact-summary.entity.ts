class ContactSummaryEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _reference: string,
    private readonly _platform: string,
    private readonly _created_at: string,
    private readonly _is_active: boolean,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get reference(): string {
    return this._reference;
  }

  public get platform(): string {
    return this._platform;
  }

  public get createdAt(): string {
    return this._created_at;
  }

  public get isActive(): boolean {
    return this._is_active;
  }
}

export default ContactSummaryEntity;
