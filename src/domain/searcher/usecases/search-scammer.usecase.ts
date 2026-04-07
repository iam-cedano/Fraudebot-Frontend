export default abstract class SearchScammerUseCase { 
    public abstract execute(query: string): Promise<void>;
}