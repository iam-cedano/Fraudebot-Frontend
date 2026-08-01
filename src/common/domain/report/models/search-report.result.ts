import ReportEntity from "@/common/domain/report/entities/report.entity";

type SearchReportResult = {
  reports: ReportEntity[];
  total: number;
  page: number;
  count: number;
};

export default SearchReportResult;
