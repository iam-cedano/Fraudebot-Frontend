import PartyReportEntity from "@/core/domain/report/entities/party-report.entity";

type FindReportsByPartyItem = {
  id: string | number;
  title: string;
  description: string;
};

type FindReportsByPartyModel<T> = {
  data: T[];
  total: number;
  page: number;
  count: number;
};

type FindReportsByPartyResponse = FindReportsByPartyModel<FindReportsByPartyItem>;
type FindReportsByPartyResult = FindReportsByPartyModel<PartyReportEntity>;

export type {
  FindReportsByPartyItem,
  FindReportsByPartyModel,
  FindReportsByPartyResponse,
};
export default FindReportsByPartyResult;
