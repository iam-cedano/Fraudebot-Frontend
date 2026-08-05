import { describe, it, expect, vi } from "vitest";
import FindScammerSummaryByIdUsecase from "./find-scammer-summary-by-id.usecase";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";
import Http from "@/infrastructure/http/http";
import { InternalAxiosRequestConfig } from "axios";
import { use } from "react";

describe("FindScammerSummaryByIdUsecase.execute.success", () => {
  it("should return a scammer summary", async () => {
    const scammerSummary = new ScammerSummaryEntity("1", "John Doe", "USA", "https://example.com/profile.jpg", 10, ["Category 1", "Category 2"], true, new Date(), new Date());
    const usecase = new FindScammerSummaryByIdUsecase();

    vi.spyOn(Http, "get").mockResolvedValueOnce({
        data: scammerSummary,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as unknown as InternalAxiosRequestConfig,
    });

    const result = await usecase.execute("1");

    expect(result).toEqual(scammerSummary);
  });
});

describe("FindScammerSummaryByIdUsecase.execute.error", () => {
  it("should return an error if route does not exist", async () => {
    const usecase = new FindScammerSummaryByIdUsecase();
    const error = new Error("Request failed with status code 404");

    vi.spyOn(Http, "get").mockRejectedValueOnce(error);

    await expect(usecase.execute("1")).rejects.toThrow(error);
  });

  it("should return an error if request is cancelled", async () => {
    const usecase = new FindScammerSummaryByIdUsecase();
    const error = new Error("Request cancelled");

    vi.spyOn(Http, "get").mockRejectedValueOnce(error);

    await expect(usecase.execute("1")).rejects.toThrow(error);
  });

  it("should return a 404 error when scammer is not found", async () => {
    const usecase = new FindScammerSummaryByIdUsecase();
    const error = new Error("Request failed with status code 404");

    vi.spyOn(Http, "get").mockRejectedValueOnce(error);

    await expect(usecase.execute("1")).rejects.toThrow(error);
  });
});

describe("FindScammerSummaryByIdUsecase.cancel", () => {
  it("should cancel the request", () => {
    const usecase = new FindScammerSummaryByIdUsecase();

    vi.spyOn(usecase, "cancel");

    usecase.cancel();

    expect(usecase.cancel).toHaveBeenCalled();
  });
});
