import { getVisiblePages } from "@/presentation/shared/utils/search-pagination.util";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel: string;
  className?: string;
}

function PaginationNav({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel,
  className = "",
}: PaginationNavProps) {
  if (totalPages < 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const buttonClassName =
    "px-3 py-2 text-sm font-semibold border rounded-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

  return (
    <nav
      className={`flex items-center justify-center gap-2 font-[Nunito] ${className}`}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={`${buttonClassName} border-gray-200 bg-white text-gray-700 hover:bg-gray-50`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const shouldShowGap =
          previousPage !== undefined && page - previousPage > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {shouldShowGap && (
              <span aria-hidden="true" className="text-sm font-semibold text-gray-400">
                …
              </span>
            )}
            <button
              type="button"
              className={`${buttonClassName} ${
                page === currentPage
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        className={`${buttonClassName} border-gray-200 bg-white text-gray-700 hover:bg-gray-50`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}

export default PaginationNav;
