import SearchScammerUseCase from "@/domain/searcher/usecases/search-scammer.usecase";

export default class SearchScammerImplUsecase extends SearchScammerUseCase {
    public async execute(query: string): Promise<void> {
        console.log("Executing search scammer use case with query:", query);
    }
}