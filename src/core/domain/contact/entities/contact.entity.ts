class ContactEntity {
  constructor(
    private readonly _id: string,
    private readonly _organization_id: string | null,
    private readonly _scammer_id: string | null,
    private readonly _name: string,
    private readonly _platform: number,
    private readonly _contact: string,
    private readonly _is_active: boolean,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get organizationId(): string | null {
    return this._organization_id;
  }

  public get scammerId(): string | null {
    return this._scammer_id;
  }

  public get name(): string {
    return this._name;
  }

  public get platform(): number {
    return this._platform;
  }

  public get contact(): string {
    return this._contact;
  }

  public get isActive(): boolean {
    return this._is_active;
  }
}

export default ContactEntity;
