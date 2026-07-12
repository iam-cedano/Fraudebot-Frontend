class OrganizationEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly is_active: boolean,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getIsActive(): boolean {
    return this.is_active;
  }
}

export default OrganizationEntity;
