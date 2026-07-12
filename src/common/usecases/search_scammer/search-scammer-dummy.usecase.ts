import RequestCanceler from "@/infrastructure/http/request-canceler";
import ApiCallerInterface from "@/core/base/api-caller.interface";
import SearchOrganizationEntity from "@/core/domain/organization/entities/search-organization.entity";
import SearchScammerEntity from "@/core/domain/scammer/entities/search-scammer.entity";

export default class SearchScammerDummyUsecase implements ApiCallerInterface {
  private readonly requestCanceler = new RequestCanceler();

  public async execute(
    _query: string,
  ): Promise<(SearchScammerEntity | SearchOrganizationEntity)[]> {
    const organizations: Record<string, SearchOrganizationEntity> = {
      ecohuertas: new SearchOrganizationEntity(
        "1",
        "EcoHuertas",
        "https://example.com/logo1.png",
        true,
        32,
        ["Investment", "Crypto"],
      ),
      billions_trade_club: new SearchOrganizationEntity(
        "2",
        "Billions Trade Club",
        "https://example.com/logo2.png",
        true,
        1,
        ["Investment", "Crypto"],
      ),
      onecoin: new SearchOrganizationEntity(
        "3",
        "OneCoin",
        "https://example.com/logo3.png",
        true,
        100,
        ["Investment", "Crypto"],
      ),
    };

    return [
      new SearchScammerEntity(
        "1",
        "Scammer 1",
        "US",
        10,
        [organizations.ecohuertas],
        "tag1, tag2",
        true,
      ),
      new SearchScammerEntity(
        "2",
        "Scammer 2",
        "CA",
        5,
        [organizations.billions_trade_club],
        "tag3, tag4",
        false,
      ),
      new SearchScammerEntity(
        "3",
        "Scammer 3",
        "GB",
        20,
        [organizations.ecohuertas],
        "tag5, tag6",
        true,
      ),
      organizations.onecoin,
    ];
  }

  public cancel(): void {
    this.requestCanceler.cancel();
  }
}
