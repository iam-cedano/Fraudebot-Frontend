import ApiCallerInterface from "@/core/base/api-caller.interface";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";

class FindMonthlyReportCountsStubUsecase implements ApiCallerInterface {
  public async execute(
    _id: string,
    _type: "scammer" | "organization",
    year = new Date().getFullYear(),
  ): Promise<MonthlyReportCountsEntity> {
    return new MonthlyReportCountsEntity(year, [
      4, 7, 3, 9, 12, 6, 8, 5, 10, 14, 11, 7,
    ]);
  }

  public cancel(): void {
    // No cancellation needed for stub usecase
  }
}

export default FindMonthlyReportCountsStubUsecase;
