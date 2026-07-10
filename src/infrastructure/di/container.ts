import _SearchScammerUsecase from "@/application/searcher/usecases/search-scammer.usecase";
import SearchScammerDummyUsecase from "@/application/searcher/usecases/search-scammer-dummy.usecase";

export const createSearchScammerUseCase = () => new SearchScammerDummyUsecase();

export const dependencies = {
  searchScammerUseCase: createSearchScammerUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
