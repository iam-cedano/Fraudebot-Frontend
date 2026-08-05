import ApiCallerInterface from "@/core/base/api-caller.interface";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";

class FindScammerSummaryByIdStubUsecase implements ApiCallerInterface {
    public async execute(): Promise<ScammerSummaryEntity> {
        return new ScammerSummaryEntity(
            "1",
            "Rugna Ignatova",
            "Bulgaria",
            "https://i.headtopics.com/images/2024/6/5/closerfr/ruja-ignatova-cette-theorie-qui-tient-la-corde-dan-ruja-ignatova-cette-theorie-qui-tient-la-corde-dan-7D697CB656A858FA86487FFEA6EFC46F.webp?w=640",
            10,
            ["Investment Scam", "Financial Fraud"],
            true,
            new Date("2026-01-01"),
            new Date("2026-01-01"),
        );
    }

    public cancel(): void {
        // No cancellation needed for stub usecase
    }
}

export default FindScammerSummaryByIdStubUsecase;
