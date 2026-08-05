export function getValidPage(page: string | null): number {
  const parsedPage = Number(page);

  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const pages = new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);
}
