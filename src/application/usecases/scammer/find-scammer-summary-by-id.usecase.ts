import ApiCallerInterface from "@/core/base/api-caller.interface";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import Http from "@/infrastructure/http/http";
import RequestCanceller from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";

class FindScammerByIdUsecase implements ApiCallerInterface {

    private requestCanceller = new RequestCanceller();

    public async execute(_id: string): Promise<ScammerEntity> {
        const signal = this.requestCanceller.prepareSignal();
        const response = await Http.get<ScammerEntity>(API_ROUTES.public.scammers.findById, { signal });
        return response.data;
    }

    public cancel(): void {
        this.requestCanceller.cancel();
    }
}

export default FindScammerByIdUsecase;