import ApiCallerInterface from "@/core/base/api-caller.interface";
import PartyReportEntity from "@/core/domain/report/entities/party-report.entity";
import FindReportsByPartyResult, {
  FindReportsByPartyResponse,
} from "@/core/domain/report/models/find-reports-by-party.model";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";
import { getHttpStatus } from "@/common/utils/http-error.util";

const emptyResult = (page: number): FindReportsByPartyResult => ({
  data: [],
  total: 0,
  page,
  count: 0,
});

class FindReportsByPartyUsecase implements ApiCallerInterface {
  private requestCanceller = new RequestCanceler();

  public async execute(
    id: string,
    type: "scammer" | "organization",
    page = 1,
  ): Promise<FindReportsByPartyResult> {
    const signal = this.requestCanceller.prepareSignal();
    const route =
      type === "scammer"
        ? API_ROUTES.public.scammers.reports
        : API_ROUTES.public.organizations.reports;
    const url = route.replace("{id}", encodeURIComponent(id));

    try {
      const { data, status } = await Http.get<FindReportsByPartyResponse>(url, {
        signal,
        params: {
          p: page,
        },
      });

      if (status !== 200) {
        return emptyResult(page);
      }

      const reports = (data.data ?? []).map(
        (report) =>
          new PartyReportEntity(
            String(report.id),
            report.title,
            report.short_description,
          ),
      );

      return {
        data: reports,
        total: data.total,
        page: data.page,
        count: data.count,
      };
    } catch (error) {
      if (getHttpStatus(error) === 404) {
        return emptyResult(page);
      }

      throw error;
    }
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default FindReportsByPartyUsecase;
