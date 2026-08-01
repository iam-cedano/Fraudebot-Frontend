import ApiCallerInterface from "@/core/base/api-caller.interface";
import ReportEntity from "@/common/domain/report/entities/report.entity";
import SearchReportResult from "@/common/domain/report/models/search-report.result";

class SearchReportDummyUsecase implements ApiCallerInterface {
  public execute(_query: string, page = 1): Promise<SearchReportResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyReports: ReportEntity[] = [
          new ReportEntity(
            "1",
            "Ecohuertas",
            ["Criptomonedas", "Inversiones"],
            10,
            "organization",
            null,
            ["Huertas", "Inversiones"],
            "active",
          ),
          new ReportEntity(
            "2",
            "Billions Trade Club",
            ["Inversiones"],
            52,
            "organization",
            ["Org 1"],
            ["Trading", "Cursos"],
            "active",
          ),
          new ReportEntity(
            "1",
            "Mario Lopez",
            ["Inversiones"],
            129,
            "individual",
            ["Ecohuertas"],
            ["Criptomonedas"],
            "inactive",
          ),
        ];

        resolve({
          reports: dummyReports,
          total: dummyReports.length,
          page,
          count: dummyReports.length,
        });
      }, 1000);
    });
  }

  public cancel(): void {}
}

export default SearchReportDummyUsecase;
