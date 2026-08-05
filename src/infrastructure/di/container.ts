import SearchReportUsecase from "@/application/usecases/report/search-report.usecase";
import FindScammerSummaryByIdUsecase from "@/application/usecases/scammer/find-scammer-summary-by-id.usecase";
import FindScammerSummaryByIdStubUsecase from "@/application/usecases/scammer/stub/find-scammer-summary-by-id.stub";
import FindOrganizationSummaryByIdStubUsecase from "@/application/usecases/organization/stub/find-organization-summary-by-id.stub";

export const createSearchReportUseCase = () => new SearchReportUsecase();
export const createFindScammerSummaryByIdUseCase = () => new FindScammerSummaryByIdUsecase();
export const createFindScammerSummaryByIdStubUseCase = () => new FindScammerSummaryByIdStubUsecase();
export const createFindOrganizationSummaryByIdStubUseCase = () => new FindOrganizationSummaryByIdStubUsecase();

export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
  findScammerSummaryByIdUseCase: createFindScammerSummaryByIdStubUseCase,
  findOrganizationSummaryByIdUseCase: createFindOrganizationSummaryByIdStubUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
