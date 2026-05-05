import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { dependencies, Dependencies } from '../../infrastructure/di/container';

const DependencyContext = createContext<Dependencies | null>(null);

export const useDependencies = (): Dependencies => {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error('useDependencies must be used within a DependencyProvider');
    }
    return context;
};

interface DependencyProviderProps {
    children: ReactNode;
    overrides?: Partial<Dependencies>;
}

export const DependencyProvider: React.FC<DependencyProviderProps> = ({ 
    children, 
    overrides 
}) => {
    const contextValue = useMemo(() => {
        const instances = Object.keys(dependencies).reduce((acc, key) => {
            const factory = dependencies[key as keyof typeof dependencies];
            acc[key as keyof Dependencies] = factory() as any;
            return acc;
        }, {} as Dependencies);

        return { ...instances, ...overrides };
    }, [overrides]);

    return (
        <DependencyContext.Provider value={contextValue}>
            {children}
        </DependencyContext.Provider>
    );
};
