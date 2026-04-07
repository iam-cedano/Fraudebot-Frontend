import SearchScammerImplUsecase from '../../application/searcher/repositories/search-scammer.usecase.imp';

// Instantiate our use cases and their dependencies here.
// In the future, if SearchScammerImplUsecase requires a repository, you instantiate the repo first and pass it in.
export const searchScammerUseCase = new SearchScammerImplUsecase();

export const dependencies = {
    searchScammerUseCase,
};

export type Dependencies = typeof dependencies;
