import ApiCallerInterface from "@/core/base/api-caller.interface";
import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";
import FindContactsByPartyResult, {
  FindContactsByPartyResponse,
} from "@/core/domain/contact/models/find-contacts-by-party.model";
import Http from "@/infrastructure/http/http";
import RequestCanceler from "@/infrastructure/http/request-canceler";
import { API_ROUTES } from "@/common/environment";

class FindContactsByPartyUsecase implements ApiCallerInterface {
  private requestCanceller = new RequestCanceler();

  public async execute(
    id: string,
    type: "scammer" | "organization",
    page = 1,
    platform?: string,
  ): Promise<FindContactsByPartyResult> {
    const signal = this.requestCanceller.prepareSignal();
    const route =
      type === "scammer"
        ? API_ROUTES.public.scammers.contacts
        : API_ROUTES.public.organizations.contacts;
    const url = route.replace("{id}", encodeURIComponent(id));

    const { data, status } = await Http.get<FindContactsByPartyResponse>(url, {
      signal,
      params: {
        p: page,
        ...(platform ? { platform } : {}),
      },
    });

    if (status !== 200) {
      return {
        data: [],
        total: 0,
        page,
        count: 0,
      };
    }

    const contacts = data.data.map(
      (contact) =>
        new ContactSummaryEntity(
          String(contact.id),
          contact.name,
          contact.reference,
          contact.platform,
          contact.created_at,
          Boolean(contact.is_active),
        ),
    );

    return {
      data: contacts,
      total: data.total,
      page: data.page,
      count: data.count,
    };
  }

  public cancel(): void {
    this.requestCanceller.cancel();
  }
}

export default FindContactsByPartyUsecase;
