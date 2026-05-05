import SearchScammerImplUsecase from '../../application/searcher/repositories/search-scammer.usecase.imp';

export const createSearchScammerUseCase = () => new SearchScammerImplUsecase();

export const dependencies = {
    searchScammerUseCase: createSearchScammerUseCase,
};

export type Dependencies = {
    [K in keyof typeof dependencies]: ReturnType<(typeof dependencies)[K]>;
};
