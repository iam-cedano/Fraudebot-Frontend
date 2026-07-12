import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ReportedOrganizationEntity from "@/core/domain/organization/entities/search-organization.entity";

class SearchScammerEntity extends ScammerEntity {
  constructor(
    id: string,
    name: string,
    iso_country: string,
    is_active: boolean,
    private readonly reports: number,
    private readonly organizations: ReportedOrganizationEntity[],
    private readonly tags: string[],
  ) {
    super(id, name, iso_country, is_active);
  }

  public getReports(): number {
    return this.reports;
  }

  public getOrganizations(): ReportedOrganizationEntity[] {
    return this.organizations;
  }

  public getTags(): string[] {
    return this.tags;
  }
}

export default SearchScammerEntity;
