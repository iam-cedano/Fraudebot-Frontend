type SearchReportResponse = {
  data: {
    id: string | number;
    type: "scammer" | "individual" | "organization";
    name: string;
    reports: number;
    organizations?: string[] | null;
    products?: string[] | null;
    tags?: string[] | null;
    is_active: boolean;
    status?: "active" | "inactive";
  }[];
  total: number;
  page: number;
  count: number;
};

export default SearchReportResponse;
