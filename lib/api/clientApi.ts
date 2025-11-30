import { nextServer } from './api';
import { CarsResponse, Car } from '@/types/car';

export async function fetchAllCarsClient({
  limit = 12,
  page = 1,
}: {
  limit?: number;
  page?: number;
}): Promise<CarsResponse> {
  const response = await nextServer.get<CarsResponse>('/cars', {
    params: { limit, page },
  });

  return response.data;
}

export const fetchCarByIdclient = async (id: string) => {
  const res = await nextServer.get<Car>(`/cars/${id}`);
  return res.data;
};