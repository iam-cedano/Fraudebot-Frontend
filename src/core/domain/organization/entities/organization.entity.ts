class OrganizationEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _is_active: boolean,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get isActive(): boolean {
    return this._is_active;
  }
}

export default OrganizationEntity;
