import React, { createContext, useContext, ReactNode } from 'react';
import { dependencies, Dependencies } from '../../infrastructure/di/container';

const DependencyContext = createContext<Dependencies>(dependencies);

export const useDependencies = (): Dependencies => {
    return useContext(DependencyContext);
};

interface DependencyProviderProps {
    children: ReactNode;
    overrides?: Partial<Dependencies>;
}

export const DependencyProvider: React.FC<DependencyProviderProps> = ({ 
    children, 
    overrides 
}) => {
    // Merge default dependencies with any overrides (useful for mocks in tests)
    const contextValue = { ...dependencies, ...overrides };

    return (
        <DependencyContext.Provider value={contextValue}>
            {children}
        </DependencyContext.Provider>
    );
};
