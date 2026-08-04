import SearchReportUsecase from "@/application/usecases/report/search-report.usecase";
import FindScammerSummaryByIdUsecase from "@/application/usecases/scammer/find-scammer-summary-by-id.usecase";
import FindScammerSummaryByIdDummyUsecase from "@/application/usecases/scammer/find-scammer-summary-by-id-dummy.usecase";
import FindOrganizationSummaryByIdDummyUsecase from "@/application/usecases/organization/find-organization-summary-by-id-dummy.usecase";

export const createSearchReportUseCase = () => new SearchReportUsecase();
export const createFindScammerSummaryByIdUseCase = () => new FindScammerSummaryByIdUsecase();
export const createFindScammerSummaryByIdDummyUseCase = () => new FindScammerSummaryByIdDummyUsecase();
export const createFindOrganizationSummaryByIdDummyUseCase = () => new FindOrganizationSummaryByIdDummyUsecase();

export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
  findScammerSummaryByIdUseCase: createFindScammerSummaryByIdDummyUseCase,
  findOrganizationSummaryByIdUseCase: createFindOrganizationSummaryByIdDummyUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
