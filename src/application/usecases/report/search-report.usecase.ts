import ApiCallerInterface from "@/core/base/api-caller.interface";

class SearchReportUsecase implements ApiCallerInterface {
  public execute(): Promise<any> {
    throw new Error("Method not implemented");
  }
  public cancel(): void {}
}

export default SearchReportUsecase;
