import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";

class SearchOrganizationEntity extends OrganizationEntity {
  constructor(
    id: string,
    name: string,
    description: string,
    is_active: boolean,
    private readonly reports: number,
    private readonly tags: string[],
  ) {
    super(id, name, description, is_active);
  }

  public getReports(): number {
    return this.reports;
  }

  public getTags(): string[] {
    return this.tags;
  }
}

export default SearchOrganizationEntity;
