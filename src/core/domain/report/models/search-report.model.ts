import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";

type SearchReportItem = {
  id: string | number;
  type: "scammer" | "organization";
  name: string;
  reports: number;
  organizations?: string[] | null;
  products?: string[] | null;
  tags?: string[] | null;
  is_active: boolean;
  status?: "active" | "inactive";
};

type SearchReportModel<T> = {
  data: T[];
  total: number;
  page: number;
  count: number;
};

type SearchReportResponse = SearchReportModel<SearchReportItem>;
type SearchReportResult = SearchReportModel<ReportSummaryEntity>;

export type { SearchReportItem, SearchReportModel, SearchReportResponse };
export default SearchReportResult;
