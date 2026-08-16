import ApiCallerInterface from "@/core/base/api-caller.interface";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";
import FindMonthlyReportCountsResponse from "@/core/domain/report/models/find-monthly-report-counts.response";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";

function toMonthlyCounts(
  year: number,
  months: FindMonthlyReportCountsResponse["months"],
): MonthlyReportCountsEntity {
  const counts = Array.from({ length: 12 }, () => 0);

  for (const item of months) {
    if (item.month >= 1 && item.month <= 12) {
      counts[item.month - 1] = item.count;
    }
  }

  return new MonthlyReportCountsEntity(year, counts);
}

class FindMonthlyReportCountsUsecase implements ApiCallerInterface {
  private requestCanceller = new RequestCanceler();

  public async execute(
    id: string,
    type: "scammer" | "organization",
    year = new Date().getFullYear(),
  ): Promise<MonthlyReportCountsEntity> {
    const signal = this.requestCanceller.prepareSignal();
    const url = API_ROUTES.public.reports.monthly
      .replace("{type}", encodeURIComponent(type))
      .replace("{id}", encodeURIComponent(id));

    const { data } = await Http.get<FindMonthlyReportCountsResponse>(url, {
      signal,
      params: { year },
    });

    return toMonthlyCounts(data.year, data.months);
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default FindMonthlyReportCountsUsecase;
