import { nextServer } from './api';
import { CarsResponse } from '@/types/car';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination';

export async function serverFetchCars(
  limit: number = DEFAULT_LIMIT,
  page: number = DEFAULT_PAGE
): Promise<CarsResponse> {
  const response = await nextServer.get<CarsResponse>('/cars', {
    params: { limit, page },
  });

  return response.data;
}
