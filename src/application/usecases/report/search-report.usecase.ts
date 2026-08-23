import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import SearchReportResult, {
  SearchReportResponse,
} from "@/core/domain/report/models/search-report.model";
import ApiCallerInterface from "@/core/base/api-caller.interface";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";

class SearchReportUsecase implements ApiCallerInterface {
  private requestCanceller = new RequestCanceler();

  public async execute(query: string, page = 1): Promise<SearchReportResult> {
    const signal = this.requestCanceller.prepareSignal();

    const { data, status } = await Http.get<SearchReportResponse>(
      API_ROUTES.public.reports.search,
      {
        signal,
        params: {
          q: query,
          p: page,
        },
      },
    );

    if (status !== 200) {
      return {
        data: [],
        total: 0,
        page,
        count: 0,
      };
    }

    const reports = data.data.map((report) => {
      return new ReportSummaryEntity(
        String(report.id),
        report.name,
        report.tags || [],
        report.reports,
        report.type === "organization" ? "organization" : "scammer",
        report.organizations || null,
        report.products || [],
        report.status || (report.is_active ? "active" : "inactive"),
      );
    });

    return {
      data: reports,
      total: data.total,
      page: data.page,
      count: data.count,
    };
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default SearchReportUsecase;
