import environment from "@/common/environment";
import SearchScammerResponse from "@/domain/searcher/models/responses/search-scammer.response";
import SearchScammerUseCase from "@/domain/searcher/usecases/search-scammer.usecase";
import PurifierUtil from "@/utils/purifier.util"
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import ScammerEntity from "@/domain/scammer/entities/scammer.entity";

export default class SearchScammerImplUsecase extends SearchScammerUseCase {
    private readonly requestCanceler = new RequestCanceler();

    public async execute(query: string): Promise<ScammerEntity[]> {
        const signal = this.requestCanceler.prepareSignal();
        const sanitizedQuery = PurifierUtil.sanitize(query);

        const response = await Http.get<SearchScammerResponse>(`${environment.API_BASE_URL}/public/scammers/`, {
            signal,
            params: {
                "q": sanitizedQuery
            }
        });

        return response.data.data.map(({id, name, iso_country, is_active}) => 
            new ScammerEntity(id, name, iso_country, is_active));
    }

    public cancel(): void {
        this.requestCanceler.cancel();
    }
}