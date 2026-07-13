import ApiCallerInterface from "@/core/base/api-caller.interface";
import ReportEntity from "@/common/domain/report/entities/report.entity";

class SearchReportDummyUsecase implements ApiCallerInterface {
  public execute(_query: string): Promise<ReportEntity[]> {
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
            "active",
          ),
          new ReportEntity(
            "2",
            "Billions Trade Club",
            ["Inversiones"],
            52,
            "organization",
            ["Org 1"],
            "active",
          ),
          new ReportEntity(
            "1",
            "Mario Lopez",
            ["Inversiones"],
            129,
            "individual",
            ["Ecohuertas"],
            "inactive",
          ),
        ];
        resolve(dummyReports);
      }, 1000);
    });
  }

  public cancel(): void {}
}

export default SearchReportDummyUsecase;
