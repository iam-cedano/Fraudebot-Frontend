import environment from "@/common/environment";
import SearchScammerResponse from "@/common/usecases/searcher/models/search-scammer.response";
import PurifierUtil from "@/common/utils/purifier.util";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ApiCallerInterface from "@/core/base/api-caller.interface";
import { AxiosResponse } from "axios";

export default class SearchScammerUsecase implements ApiCallerInterface {
  private readonly requestCanceler = new RequestCanceler();

  public async execute(query: string): Promise<ScammerEntity[]> {
    const signal = this.requestCanceler.prepareSignal();
    const sanitizedQuery = PurifierUtil.Sanitize(query);

    let response: AxiosResponse<SearchScammerResponse, any, {}> | null = null;

    try {
      response = await Http.get<SearchScammerResponse>(
        `${environment.API_BASE_URL}/public/scammers/`,
        {
          signal,
          params: {
            q: sanitizedQuery,
          },
        },
      );
    } catch (error) {
      console.error("SearchScammerUsecase.execute error:", error);
    } finally {
      return response == null
        ? []
        : response.data.data.map(
            ({ id, name, iso_country, is_active }) =>
              new ScammerEntity(id, name, iso_country, 50, [], "", is_active),
          );
    }
  }

  public cancel(): void {
    this.requestCanceler.cancel();
  }
}
