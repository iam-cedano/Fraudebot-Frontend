import RequestCanceler from "@/infrastructure/http/request-canceler";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ApiCallerInterface from "@/core/base/api-caller.interface";

export default class SearchScammerDummyUsecase implements ApiCallerInterface {
  private readonly requestCanceler = new RequestCanceler();

  public async execute(_query: string): Promise<ScammerEntity[]> {
    return [
      new ScammerEntity("1", "Scammer 1", "US", 10, [], "tag1, tag2", true),
      new ScammerEntity("2", "Scammer 2", "CA", 5, [], "tag3, tag4", false),
      new ScammerEntity("3", "Scammer 3", "GB", 20, [], "tag5, tag6", true),
    ];
  }

  public cancel(): void {
    this.requestCanceler.cancel();
  }
}
