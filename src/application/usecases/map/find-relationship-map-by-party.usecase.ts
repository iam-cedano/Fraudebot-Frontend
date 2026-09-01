import ApiCallerInterface from "@/core/base/api-caller.interface";
import {
  FindRelationshipMapResponse,
  FindRelationshipMapResult,
} from "@/core/domain/map/models/find-relationship-map.model";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";
import { getHttpStatus } from "@/common/utils/http-error.util";

const emptyResult = (): FindRelationshipMapResult => ({
  nodes: [],
  edges: [],
});

class FindRelationshipMapByPartyUsecase implements ApiCallerInterface {
  private requestCanceller = new RequestCanceler();

  public async execute(
    id: string,
    type: "scammer" | "organization",
    depth = 1,
    limit = 20,
  ): Promise<FindRelationshipMapResult> {
    const signal = this.requestCanceller.prepareSignal();
    const route =
      type === "scammer"
        ? API_ROUTES.public.scammers.map
        : API_ROUTES.public.organizations.map;
    const url = route.replace("{id}", encodeURIComponent(id));

    try {
      const { data, status } = await Http.get<FindRelationshipMapResponse>(
        url,
        {
          signal,
          params: {
            depth,
            limit,
          },
        },
      );

      if (status !== 200) {
        return emptyResult();
      }

      return {
        nodes: data.nodes ?? [],
        edges: data.edges ?? [],
      };
    } catch (error) {
      if (getHttpStatus(error) === 404) {
        return emptyResult();
      }

      throw error;
    }
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default FindRelationshipMapByPartyUsecase;
