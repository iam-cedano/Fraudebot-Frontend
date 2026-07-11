import _SearchScammerUsecase from "@/common/usecases/search/search-scammer.usecase";
import SearchScammerDummyUsecase from "@/common/usecases/search/search-scammer-dummy.usecase";

export const createSearchScammerUseCase = () => new SearchScammerDummyUsecase();

export const dependencies = {
  searchScammerUseCase: createSearchScammerUseCase,
};

export type Dependencies = {
  [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
