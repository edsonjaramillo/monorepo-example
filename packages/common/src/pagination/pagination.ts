export type Pagination = {
  numberOfPages: number;
  currentPage: number;
};

export type PaginationVariable = {
  limit: number;
  offset: number;
  page: number;
};

export function calculatePaginationDetails(page: number, rows: number, limit: number): Pagination {
  return {
    currentPage: page,
    numberOfPages: Math.ceil(rows / limit),
  };
}
