import ApiCallerInterface from "@/core/base/api-caller.interface";
import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";
import FindContactsByPartyResult from "@/core/domain/contact/models/find-contacts-by-party.model";

const PAGE_SIZE = 10;

const stubContacts: ContactSummaryEntity[] = [
  new ContactSummaryEntity(
    "1",
    "Soporte Ventas",
    "+52 666 123 1234",
    "Whatsapp",
    "2021-01-10",
    true,
  ),
  new ContactSummaryEntity(
    "2",
    "Roxane",
    "www.facebook.com/profile.php?id=100094827384756",
    "Facebook",
    "2026-11-20",
    true,
  ),
  new ContactSummaryEntity(
    "3",
    "Nomad Store",
    "www.youtube.com/@nomad.store",
    "Youtube",
    "2026-06-14",
    true,
  ),
  new ContactSummaryEntity(
    "4",
    "Effie",
    "www.tiktok.com/@effie.deals",
    "TikTok",
    "2026-07-08",
    true,
  ),
  new ContactSummaryEntity(
    "5",
    "Roxane",
    "fritz.rice@example.com",
    "Email",
    "2026-08-23",
    true,
  ),
  new ContactSummaryEntity(
    "6",
    "Soporte Ventas",
    "+52 555 000 1122",
    "Cellphone",
    "2025-09-03",
    true,
  ),
  new ContactSummaryEntity(
    "7",
    "Telegram Desk",
    "t.me/nomad_soporte",
    "Telegram",
    "2026-04-18",
    true,
  ),
  new ContactSummaryEntity(
    "8",
    "Nomad Store",
    "www.instagram.com/nomad.store",
    "Instagram",
    "2026-12-30",
    true,
  ),
  new ContactSummaryEntity(
    "9",
    "Effie",
    "https://nomad-store.example/checkout",
    "Webpage",
    "2026-02-11",
    true,
  ),
  new ContactSummaryEntity(
    "10",
    "Fiona",
    "Canal interno de referidos",
    "Other",
    "2026-08-23",
    true,
  ),
  new ContactSummaryEntity(
    "11",
    "Andres",
    "+52 811 444 7788",
    "Whatsapp",
    "2025-11-27",
    true,
  ),
  new ContactSummaryEntity(
    "12",
    "Mario",
    "www.facebook.com/mario.crypto",
    "Facebook",
    "2026-06-04",
    true,
  ),
  new ContactSummaryEntity(
    "13",
    "Lucia",
    "www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Youtube",
    "2025-10-19",
    true,
  ),
  new ContactSummaryEntity(
    "14",
    "Sofia",
    "www.tiktok.com/@sofia.outlet",
    "TikTok",
    "2026-01-02",
    true,
  ),
  new ContactSummaryEntity(
    "15",
    "Fiona",
    "ahermiston@example.org",
    "Email",
    "2026-08-23",
    true,
  ),
  new ContactSummaryEntity(
    "16",
    "Pablo",
    "+52 333 210 9988",
    "Cellphone",
    "2026-03-21",
    true,
  ),
  new ContactSummaryEntity(
    "17",
    "Hugo",
    "t.me/hugo_trading",
    "Telegram",
    "2026-05-05",
    true,
  ),
  new ContactSummaryEntity(
    "18",
    "Camila",
    "www.instagram.com/camila.vip",
    "Instagram",
    "2026-12-09",
    true,
  ),
  new ContactSummaryEntity(
    "19",
    "Diego",
    "www.nomad-store.example/ofertas",
    "Webpage",
    "2025-08-14",
    true,
  ),
  new ContactSummaryEntity(
    "20",
    "Valeria",
    "Grupo de WhatsApp cerrado",
    "Other",
    "2026-02-28",
    true,
  ),
  new ContactSummaryEntity(
    "21",
    "Marta",
    "+52 222 156 3344",
    "Whatsapp",
    "2026-04-07",
    true,
  ),
  new ContactSummaryEntity(
    "22",
    "Paula",
    "www.facebook.com/paula.inversiones",
    "Facebook",
    "2026-11-01",
    true,
  ),
  new ContactSummaryEntity(
    "23",
    "Oscar",
    "www.tiktok.com/@oscar.ofertas",
    "TikTok",
    "2026-01-25",
    true,
  ),
  new ContactSummaryEntity(
    "24",
    "Ivan",
    "www.instagram.com/ivan.forex",
    "Instagram",
    "2025-07-12",
    true,
  ),
  new ContactSummaryEntity(
    "25",
    "Elena",
    "www.youtube.com/@elena.live",
    "Youtube",
    "2026-09-16",
    true,
  ),
];

class FindContactsByPartyStubUsecase implements ApiCallerInterface {
  public execute(
    _id: string,
    _type: "scammer" | "organization",
    page = 1,
    platform?: string,
  ): Promise<FindContactsByPartyResult> {
    const filtered = platform
      ? stubContacts.filter(
          (contact) =>
            contact.platform.toLowerCase() === platform.toLowerCase(),
        )
      : stubContacts;

    const safePage = page > 0 ? page : 1;
    const start = (safePage - 1) * PAGE_SIZE;

    return Promise.resolve({
      data: filtered.slice(start, start + PAGE_SIZE),
      total: filtered.length,
      page: safePage,
      count: PAGE_SIZE,
    });
  }

  public cancel(): void {
    // No cancellation needed for stub usecase
  }
}

export default FindContactsByPartyStubUsecase;
