type FindScammerSummaryByIdResponse = {
  id: string;
  name: string;
  country: string;
  profile_picture: string | null;
  reports: number;
  categories: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default FindScammerSummaryByIdResponse;