type SearchReportResponse = {
  data: {
    id: number | string;
    type: "scammer" | "organization";
    name: string;
    reports: number;
    organizations: string[] | null;
    products: string[] | null;
    is_active: boolean;
  }[];
  total: number;
  page: number;
  count: number;
};

export default SearchReportResponse;
