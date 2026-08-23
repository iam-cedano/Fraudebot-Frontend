import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";

type FindContactsByPartyItem = {
  id: string | number;
  name: string;
  reference: string;
  platform: string;
  created_at: string;
  is_active: boolean;
};

type FindContactsByPartyModel<T> = {
  data: T[];
  total: number;
  page: number;
  count: number;
};

type FindContactsByPartyResponse = FindContactsByPartyModel<FindContactsByPartyItem>;
type FindContactsByPartyResult = FindContactsByPartyModel<ContactSummaryEntity>;

export type {
  FindContactsByPartyItem,
  FindContactsByPartyModel,
  FindContactsByPartyResponse,
};
export default FindContactsByPartyResult;
