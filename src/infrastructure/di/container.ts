import SearchReportUsecase from "@/application/usecases/report/search-report.usecase";
import FindMonthlyReportCountsUsecase from "@/application/usecases/report/find-monthly-report-counts.usecase";
import FindScammerSummaryByIdUsecase from "@/application/usecases/scammer/find-scammer-summary-by-id.usecase";
import FindOrganizationSummaryByIdUsecase from "@/application/usecases/organization/find-organization-summary-by-id.usecase";
import SearchReportStubUsecase from "@/application/usecases/report/stub/search-report.stub";
import FindContactsByPartyUsecase from "@/application/usecases/contact/find-contacts-by-party.usecase";

export const createSearchReportUseCase = () => new SearchReportUsecase();
export const createFindScammerSummaryByIdUseCase = () => new FindScammerSummaryByIdUsecase();
export const createFindOrganizationSummaryByIdUseCase = () => new FindOrganizationSummaryByIdUsecase();
export const createSearchReportStubUseCase = () => new SearchReportStubUsecase();
export const createFindMonthlyReportCountsUseCase = () => new FindMonthlyReportCountsUsecase();
export const createFindContactsByPartyUseCase = () => new FindContactsByPartyUsecase();
export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
  findScammerSummaryByIdUseCase: createFindScammerSummaryByIdUseCase,
  findOrganizationSummaryByIdUseCase: createFindOrganizationSummaryByIdUseCase,
  searchReportStubUseCase: createSearchReportStubUseCase,
  findMonthlyReportCountsUseCase: createFindMonthlyReportCountsUseCase,
  findContactsByPartyUseCase: createFindContactsByPartyUseCase,
};

type PublicInterface<T> = Pick<T, keyof T>;

export type Dependencies = {
  [K in keyof typeof dependencies]: PublicInterface<
    ReturnType<(typeof dependencies)[K]>
  >;
};

export const createDependencies = (): Dependencies => ({
  searchReportUseCase: dependencies.searchReportUseCase(),
  findScammerSummaryByIdUseCase: dependencies.findScammerSummaryByIdUseCase(),
  findOrganizationSummaryByIdUseCase:
    dependencies.findOrganizationSummaryByIdUseCase(),
  searchReportStubUseCase: dependencies.searchReportStubUseCase(),
  findMonthlyReportCountsUseCase: dependencies.findMonthlyReportCountsUseCase(),
  findContactsByPartyUseCase: dependencies.findContactsByPartyUseCase(),
});
