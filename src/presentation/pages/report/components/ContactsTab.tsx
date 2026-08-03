import { Contact } from "./types";

interface ContactsTabProps {
  contacts: Contact[];
}

function ContactsTab({ contacts }: ContactsTabProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-gray-900">
        Contactos relacionados
      </h2>
      <div className="mt-5 divide-y divide-gray-100">
        {contacts.map((contact) => (
          <div
            key={contact.label}
            className="grid gap-1 py-4 sm:grid-cols-[140px_1fr]"
          >
            <span className="font-bold text-gray-500">{contact.label}</span>
            <span className="font-semibold text-gray-900">{contact.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactsTab;
