export type SearchContainerProps = {
  children: React.ReactNode;
};

export type LookupFormProps = {
  onSubmit: () => void;
  onInputChange?: (event: React.InputEvent<HTMLInputElement>) => void;
  query: string;
};

export type ReportProps = {
  id: string;
  type: "individual" | "organization";
  name: string;
  status: "active" | "inactive";
  reports: number;
  organizations: string[] | null;
  products: string[];
  tags: string[] | null;
};
