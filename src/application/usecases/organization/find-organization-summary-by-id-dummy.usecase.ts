import ApiCallerInterface from "@/core/base/api-caller.interface";
import OrganizationSummaryEntity from "@/core/domain/organization/entities/organization-summary.entity";

class FindOrganizationSummaryByIdDummyUsecase implements ApiCallerInterface {
    public async execute(): Promise<OrganizationSummaryEntity> {
        return new OrganizationSummaryEntity(
            "1",
            "Ecohuertas",
            "Mexico",
            null,
            10,
            ["Criptomonedas", "Inversiones"],
            true,
            new Date("2026-01-01"),
            new Date("2026-01-01"),
        );
    }

    public cancel(): void {
        // No cancellation needed for dummy usecase
    }
}

export default FindOrganizationSummaryByIdDummyUsecase;
