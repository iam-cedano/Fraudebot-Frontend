import ApiCallerInterface from "@/core/base/api-caller.interface";
import ScammerEntity from "@/domain/scammer/entities/scammer.entity";

export default abstract class SearchScammerUseCase implements ApiCallerInterface { 
    public abstract execute(query: string): Promise<ScammerEntity[]>;

    public abstract cancel(): void;
}