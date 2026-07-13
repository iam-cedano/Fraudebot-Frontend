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
            ["Crypto", "Investment"],
            10,
            "organization",
            null,
          ),
          new ReportEntity(
            "2",
            "Billions Trade Club",
            ["Investment"],
            52,
            "organization",
            ["Org 1"],
          ),
          new ReportEntity(
            "1",
            "Mario Lopez",
            ["Investment"],
            129,
            "individual",
            ["Ecohuertas"],
          ),
        ];
        resolve(dummyReports);
      }, 1000);
    });
  }

  public cancel(): void {}
}

export default SearchReportDummyUsecase;
