import ApiCallerInterface from "@/core/base/api-caller.interface";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";
import FindMonthlyReportCountsResponse from "@/core/domain/report/models/find-monthly-report-counts.response";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";

function toMonthlyCounts(
  year: number,
  data: FindMonthlyReportCountsResponse,
): MonthlyReportCountsEntity {
  const counts = Array.from({ length: 12 }, (_, index) => {
    const count = data[String(index + 1)];

    return typeof count === "number" && Number.isFinite(count) ? count : 0;
  });

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
    const route =
      type === "scammer"
        ? API_ROUTES.public.scammers.calendar
        : API_ROUTES.public.organizations.calendar;
    const url = route
      .replace("{id}", encodeURIComponent(id))
      .replace("{year}", encodeURIComponent(String(year)));

    const { data } = await Http.get<FindMonthlyReportCountsResponse>(url, {
      signal,
    });

    return toMonthlyCounts(year, data);
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default FindMonthlyReportCountsUsecase;
