import ReportEntity from "@/common/domain/report/entities/report.entity";
import SearchReportResponse from "@/common/domain/report/models/search-report.response";
import ApiCallerInterface from "@/core/base/api-caller.interface";
import Http from "@/infrastructure/http/http";

class SearchReportUsecase implements ApiCallerInterface {
  private requestCanceller?: AbortController;

  public async execute(query: string): Promise<ReportEntity[]> {
    this.cancel();
    this.requestCanceller = new AbortController();

    const { data, status } = await Http.get<SearchReportResponse>(
      "/public/reports",
      {
        params: { q: query },
        signal: this.requestCanceller.signal,
      },
    );

    if (status !== 200) {
      return [];
    }

    return data.data.map((report) => {
      return new ReportEntity(
        String(report.id),
        report.name,
        report.products || [],
        report.reports,
        report.type === "scammer" ? "individual" : "organization",
        report.organizations || null,
        report.is_active ? "active" : "inactive",
      );
    });
  }

  public cancel(): void {
    this.requestCanceller?.abort();
  }
}

export default SearchReportUsecase;
