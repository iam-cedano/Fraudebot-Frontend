type SearchReportResponse = {
  data: {
    id: string;
    type: string;
    name: string;
    reports: number;
    organizations: string[] | null;
    tags: string[] | null;
    status: string;
  }[];
};

export default SearchReportResponse;
