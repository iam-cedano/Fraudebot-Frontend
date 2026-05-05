import SingleSearchResponse from "@domain/searcher/models/responses/single-response.response";

export default abstract class SearchScammerUseCase { 
    public abstract execute(query: string): Promise<SingleSearchResponse>;

    public abstract cancel(): void;
}