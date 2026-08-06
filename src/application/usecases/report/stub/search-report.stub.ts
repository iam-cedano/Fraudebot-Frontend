import ApiCallerInterface from "@/core/base/api-caller.interface";
import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import SearchReportResult from "@/core/domain/report/models/search-report.model";

class SearchReportStubUsecase implements ApiCallerInterface {
  public execute(_query: string, page = 1): Promise<SearchReportResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stubReports: ReportSummaryEntity[] = [
          new ReportSummaryEntity(
            "1",
            "Ecohuertas",
            ["Criptomonedas", "Inversiones"],
            10,
            "organization",
            null,
            ["Huertas", "Inversiones"],
            "active",
          ),
          new ReportSummaryEntity(
            "2",
            "Billions Trade Club",
            ["Inversiones"],
            52,
            "organization",
            ["Org 1"],
            ["Trading", "Cursos"],
            "active",
          ),
          new ReportSummaryEntity(
            "1",
            "Mario Lopez",
            ["Inversiones"],
            129,
            "scammer",
            ["Ecohuertas"],
            ["Criptomonedas"],
            "inactive",
          ),
        ];

        resolve({
          data: stubReports,
          total: stubReports.length,
          page,
          count: stubReports.length,
        });
      }, 3000);
    });
  }

  public cancel(): void {}
}

export default SearchReportStubUsecase;
