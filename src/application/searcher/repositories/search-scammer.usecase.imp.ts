import environment from "@environment/environment";
import SingleSearchResponse from "@/domain/searcher/models/responses/single-response.response";
import SearchScammerUseCase from "@/domain/searcher/usecases/search-scammer.usecase";
import PurifierUtil from "@/utils/purifier.util"
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";

export default class SearchScammerImplUsecase extends SearchScammerUseCase {
    private readonly requestCanceler = new RequestCanceler();

    public async execute(query: string): Promise<SingleSearchResponse> {
        const signal = this.requestCanceler.prepareSignal();
        const sanitizedQuery = PurifierUtil.sanitize(query);

        await this.requestCanceler.delay(5000);

        const response = await Http.get<SingleSearchResponse>(`${environment.API_BASE_URL}/public/scammers/`, {
            signal,
            params: {
                "q": sanitizedQuery
            }
        });

        return response.data;
    }

    public cancel(): void {
        this.requestCanceler.cancel();
    }
}