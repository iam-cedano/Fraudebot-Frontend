import environment from "@environment/environment";
import SingleSearchResponse from "@/domain/searcher/models/responses/single-response.response";
import SearchScammerUseCase from "@/domain/searcher/usecases/search-scammer.usecase";
import Http from "@/infrastructure/http/http";

export default class SearchScammerImplUsecase extends SearchScammerUseCase {
    private controller: AbortController | null = null;

    public async execute(query: string): Promise<SingleSearchResponse> {
        this.controller = new AbortController();
        const parsedQuery = query.replaceAll(" ", "");

        const response = await Http.get<SingleSearchResponse>(`${environment.API_BASE_URL}/public/scammers/`, {
            signal: this.controller.signal,
            params: {
                "q": parsedQuery
            }
        });

        return response.data;
    }

    public cancel(): void {
        this.controller?.abort();
    }
}