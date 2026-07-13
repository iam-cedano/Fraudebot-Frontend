import SearchReportDummyUsecase from "@/application/usecases/report/search-report-dummy.usecase";

export const createSearchReportUseCase = () => new SearchReportDummyUsecase();

export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
