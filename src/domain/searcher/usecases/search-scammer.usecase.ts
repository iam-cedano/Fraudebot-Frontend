import ApiCallerInterface from "@/core/base/api-caller.interface";
import SingleSearchResponse from "@domain/searcher/models/responses/single-response.response";

export default abstract class SearchScammerUseCase implements ApiCallerInterface { 
    public abstract execute(query: string): Promise<SingleSearchResponse>;

    public abstract cancel(): void;
}