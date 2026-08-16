type FindScammerSummaryByIdResponse = {
  id: number | string;
  name: string;
  country: string;
  reports: number;
  avatar_path: string | null;
  products?: string[] | null;
  status: boolean;
  created_at: string;
};

export default FindScammerSummaryByIdResponse;
