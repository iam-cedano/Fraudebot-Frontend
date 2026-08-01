import SearchReportUsecase from "@/application/usecases/report/search-report.usecase";

export const createSearchReportUseCase = () => new SearchReportUsecase();

export const dependencies = {
  searchReportUseCase: createSearchReportUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
