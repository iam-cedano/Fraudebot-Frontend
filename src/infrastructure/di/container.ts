import SearchReportUsecase from "@/application/usecases/report/search-report.usecase";
import FindMonthlyReportCountsUsecase from "@/application/usecases/report/find-monthly-report-counts.usecase";
import FindMonthlyReportCountsStubUsecase from "@/application/usecases/report/stub/find-monthly-report-counts.stub";
import FindScammerSummaryByIdUsecase from "@/application/usecases/scammer/find-scammer-summary-by-id.usecase";
import FindScammerSummaryByIdStubUsecase from "@/application/usecases/scammer/stub/find-scammer-summary-by-id.stub";
import FindOrganizationSummaryByIdUsecase from "@/application/usecases/organization/find-organization-summary-by-id.usecase";
import FindOrganizationSummaryByIdStubUsecase from "@/application/usecases/organization/stub/find-organization-summary-by-id.stub";
import SearchReportStubUsecase from "@/application/usecases/report/stub/search-report.stub";

export const createSearchReportUseCase = () => new SearchReportUsecase();
export const createFindScammerSummaryByIdUseCase = () => new FindScammerSummaryByIdUsecase();
export const createFindScammerSummaryByIdStubUseCase = () => new FindScammerSummaryByIdStubUsecase();
export const createFindOrganizationSummaryByIdUseCase = () => new FindOrganizationSummaryByIdUsecase();
export const createFindOrganizationSummaryByIdStubUseCase = () => new FindOrganizationSummaryByIdStubUsecase();
export const createSearchReportStubUseCase = () => new SearchReportStubUsecase();
export const createFindMonthlyReportCountsUseCase = () => new FindMonthlyReportCountsUsecase();
export const createFindMonthlyReportCountsStubUseCase = () => new FindMonthlyReportCountsStubUsecase();
export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
  findScammerSummaryByIdUseCase: createFindScammerSummaryByIdUseCase,
  findOrganizationSummaryByIdUseCase: createFindOrganizationSummaryByIdUseCase,
  searchReportStubUseCase: createSearchReportStubUseCase,
  findMonthlyReportCountsUseCase: createFindMonthlyReportCountsUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
