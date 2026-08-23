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
    "10-01-2021",
    true,
  ),
  new ContactSummaryEntity(
    "2",
    "Roxane",
    "www.facebook.com/profile.php?id=100094827384756",
    "Facebook",
    "20-11-2026",
    true,
  ),
  new ContactSummaryEntity(
    "3",
    "Nomad Store",
    "www.youtube.com/@nomad.store",
    "Youtube",
    "14-06-2026",
    true,
  ),
  new ContactSummaryEntity(
    "4",
    "Effie",
    "www.tiktok.com/@effie.deals",
    "TikTok",
    "08-07-2026",
    true,
  ),
  new ContactSummaryEntity(
    "5",
    "Roxane",
    "fritz.rice@example.com",
    "Email",
    "23-08-2026",
    true,
  ),
  new ContactSummaryEntity(
    "6",
    "Soporte Ventas",
    "+52 555 000 1122",
    "Cellphone",
    "03-09-2025",
    true,
  ),
  new ContactSummaryEntity(
    "7",
    "Telegram Desk",
    "t.me/nomad_soporte",
    "Telegram",
    "18-04-2026",
    true,
  ),
  new ContactSummaryEntity(
    "8",
    "Nomad Store",
    "www.instagram.com/nomad.store",
    "Instagram",
    "30-12-2026",
    true,
  ),
  new ContactSummaryEntity(
    "9",
    "Effie",
    "https://nomad-store.example/checkout",
    "Webpage",
    "11-02-2026",
    true,
  ),
  new ContactSummaryEntity(
    "10",
    "Fiona",
    "Canal interno de referidos",
    "Other",
    "23-08-2026",
    true,
  ),
  new ContactSummaryEntity(
    "11",
    "Andres",
    "+52 811 444 7788",
    "Whatsapp",
    "27-11-2025",
    true,
  ),
  new ContactSummaryEntity(
    "12",
    "Mario",
    "www.facebook.com/mario.crypto",
    "Facebook",
    "04-06-2026",
    true,
  ),
  new ContactSummaryEntity(
    "13",
    "Lucia",
    "www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Youtube",
    "19-10-2025",
    true,
  ),
  new ContactSummaryEntity(
    "14",
    "Sofia",
    "www.tiktok.com/@sofia.outlet",
    "TikTok",
    "02-01-2026",
    true,
  ),
  new ContactSummaryEntity(
    "15",
    "Fiona",
    "ahermiston@example.org",
    "Email",
    "23-08-2026",
    true,
  ),
  new ContactSummaryEntity(
    "16",
    "Pablo",
    "+52 333 210 9988",
    "Cellphone",
    "21-03-2026",
    true,
  ),
  new ContactSummaryEntity(
    "17",
    "Hugo",
    "t.me/hugo_trading",
    "Telegram",
    "05-05-2026",
    true,
  ),
  new ContactSummaryEntity(
    "18",
    "Camila",
    "www.instagram.com/camila.vip",
    "Instagram",
    "09-12-2026",
    true,
  ),
  new ContactSummaryEntity(
    "19",
    "Diego",
    "www.nomad-store.example/ofertas",
    "Webpage",
    "14-08-2025",
    true,
  ),
  new ContactSummaryEntity(
    "20",
    "Valeria",
    "Grupo de WhatsApp cerrado",
    "Other",
    "28-02-2026",
    true,
  ),
  new ContactSummaryEntity(
    "21",
    "Marta",
    "+52 222 156 3344",
    "Whatsapp",
    "07-04-2026",
    true,
  ),
  new ContactSummaryEntity(
    "22",
    "Paula",
    "www.facebook.com/paula.inversiones",
    "Facebook",
    "01-11-2026",
    true,
  ),
  new ContactSummaryEntity(
    "23",
    "Oscar",
    "www.tiktok.com/@oscar.ofertas",
    "TikTok",
    "25-01-2026",
    true,
  ),
  new ContactSummaryEntity(
    "24",
    "Ivan",
    "www.instagram.com/ivan.forex",
    "Instagram",
    "12-07-2025",
    true,
  ),
  new ContactSummaryEntity(
    "25",
    "Elena",
    "www.youtube.com/@elena.live",
    "Youtube",
    "16-09-2026",
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
