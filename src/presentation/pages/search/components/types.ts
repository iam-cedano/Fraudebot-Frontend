export type SearchContainerProps = {
    children: React.ReactNode;
}

export type LookupFormProps = {
    defaultQuery: string | null;
    onSubmit: () => void;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}