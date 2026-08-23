import { useEffect, useState } from "react";
import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ContactCard from "@presentation/pages/report/components/ContactCard";
import PlatformFilterRow from "@presentation/pages/report/components/PlatformFilterRow";
import { getVisiblePages } from "@/presentation/shared/utils/search-pagination.util";

function isCanceledError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const maybeCanceledError = error as { code?: string; name?: string };

  return (
    maybeCanceledError.name === "CanceledError" ||
    maybeCanceledError.code === "ERR_CANCELED"
  );
}

interface ContactsTabProps {
  partyId: string;
  partyType: "scammer" | "organization";
}

function ContactsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages < 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      className="mt-6 flex items-center justify-center gap-2 font-[Nunito]"
      aria-label="Paginación de contactos"
    >
      <button
        type="button"
        className="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const shouldShowGap = previousPage && page - previousPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {shouldShowGap && (
              <span className="text-sm font-semibold text-gray-400">...</span>
            )}

            <button
              type="button"
              className={`px-3 py-2 text-sm font-semibold border rounded-sm shadow-sm ${
                page === currentPage
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}

function ContactsTab({ partyId, partyType }: ContactsTabProps) {
  const { findContactsByPartyUseCase } = useDependencies();
  const [currentPage, setCurrentPage] = useState(1);
  const [platform, setPlatform] = useState<string | undefined>();
  const [contacts, setContacts] = useState<ContactSummaryEntity[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = pageSize > 0 ? Math.ceil(totalResults / pageSize) : 0;

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);

    findContactsByPartyUseCase
      .execute(partyId, partyType, currentPage, platform)
      .then((result) => {
        if (ignore) {
          return;
        }

        setContacts(result.data);
        setCurrentPage(result.page);
        setTotalResults(result.total);
        setPageSize(result.count);
      })
      .catch((error) => {
        if (ignore || isCanceledError(error)) {
          return;
        }

        setContacts([]);
        setTotalResults(0);
        setPageSize(0);
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [currentPage, findContactsByPartyUseCase, partyId, partyType, platform]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const handlePlatformChange = (nextPlatform: string) => {
    setPlatform((current) =>
      current === nextPlatform ? undefined : nextPlatform,
    );
    setCurrentPage(1);
  };

  return (
    <section className="border border-gray-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-extrabold leading-none text-gray-900">
          Contactos:
        </h2>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-red-700"
        >
          Agregar Contacto +
        </button>
      </div>

      <p className="mt-4 text-base leading-6 text-gray-900">
        Los medios de contacto que este estafador/empresa ha utilizado a lo
        largo del tiempo.
      </p>

      <PlatformFilterRow
        selectedPlatform={platform}
        onPlatformChange={handlePlatformChange}
      />

      <div className="mt-6 max-h-[30rem] space-y-3 overflow-y-scroll pr-1">
        {isLoading && (
          <p className="py-10 text-center text-sm text-gray-400">
            Cargando contactos...
          </p>
        )}

        {!isLoading &&
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}

        {!isLoading && contacts.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            No se encontraron contactos.
          </p>
        )}
      </div>

      {!isLoading && (
        <ContactsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

export default ContactsTab;
