/**
 * Business requirements:
 * - Filter the warmups by score, date, time spent
 * - Order the warmups by score, date, time spent
 * - Paginate the warmups
 * - Limit the number of warmups
 */
export interface FilterByCriteria {
  score: string;
  date: string;
  timeSpent: string;
}
export interface OrderByCriteria {
  score: string;
  date: string;
  timeSpent: string;
}
export interface WarmupsRequest {
  filterBy: FilterByCriteria;
  orderBy: OrderByCriteria;
  page: number;
  limit: number;
}
