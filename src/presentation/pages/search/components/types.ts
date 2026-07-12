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
  type: "individual" | "company";
  name: string;
  status: "active" | "inactive";
  reportsCount: number;
  organization?: string;
  tags?: string[];
};
