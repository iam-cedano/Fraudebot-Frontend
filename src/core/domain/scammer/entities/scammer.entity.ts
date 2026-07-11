import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";

class ScammerEntity {
  constructor(
    private id: string,
    private name: string,
    private iso_country: string,
    private reports: number,
    private organizations: OrganizationEntity[],
    private tags: string,
    private is_active: boolean,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getIsoCountry(): string {
    return this.iso_country;
  }

  public getReports(): number {
    return this.reports;
  }

  public getOrganizations(): OrganizationEntity[] {
    return this.organizations;
  }

  public getTags(): string {
    return this.tags;
  }

  public getIsActive(): boolean {
    return this.is_active;
  }
}

export default ScammerEntity;
