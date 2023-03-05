export interface Paginated<T> {
  page: number;
  count: number;
  total: number;
  payload: T;
}
