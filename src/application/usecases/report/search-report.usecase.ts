import ReportEntity from "@/common/domain/report/entities/report.entity";
import SearchReportResponse from "@/common/domain/report/models/search-report.response";
import ApiCallerInterface from "@/core/base/api-caller.interface";
import Http from "@/infrastructure/http/http";

class SearchReportUsecase implements ApiCallerInterface {
  private requestCanceller = new AbortController();

  public async execute(): Promise<ReportEntity[]> {
    const { data, status } = await Http.get<SearchReportResponse>(
      "/api/reports",
      {
        signal: this.requestCanceller.signal,
      },
    );

    if (status !== 200) {
      return [];
    }

    return data.data.map((report) => {
      return new ReportEntity(
        report.id,
        report.name,
        report.tags || [],
        report.reports,
        report.type as "individual" | "organization",
        report.organizations || null,
        report.status as "active" | "inactive",
      );
    });
  }

  public cancel(): void {
    this.requestCanceller.abort();
  }
}

export default SearchReportUsecase;
