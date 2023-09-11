export class PaginationParams {
  pageNumber?: number;
  pageSize?: number;
}

export class PaginationResponse<T> {
  pageNumber?: number;
  pageSize?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  totalPage?: number;
  items: T[];
}
