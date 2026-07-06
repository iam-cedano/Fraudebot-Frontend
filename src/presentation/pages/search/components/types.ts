export type SearchContainerProps = {
  children: React.ReactNode;
};

export type LookupFormProps = {
  onSubmit: () => void;
  onInputChange?: (event: React.InputEvent<HTMLInputElement>) => void;
  query: string;
};
