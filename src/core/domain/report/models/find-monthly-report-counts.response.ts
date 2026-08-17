type MonthlyReportCountItem = {
  month: number;
  count: number;
};

type FindMonthlyReportCountsResponse = {
  year: number;
  months: MonthlyReportCountItem[];
};

export type { MonthlyReportCountItem };
export default FindMonthlyReportCountsResponse;
