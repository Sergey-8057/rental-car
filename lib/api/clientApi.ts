import { nextServer } from './api';
import { CarsResponse, Car, CarFilterParams } from '@/types/car';

export async function fetchAllCarsClient({
  limit = 12,
  page = 1,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}: CarFilterParams): Promise<CarsResponse> {
  const response = await nextServer.get<CarsResponse>('/cars', {
    params: { 
      limit, 
      page, 
      brand, 
      rentalPrice, 
      minMileage, 
      maxMileage 
    },
  });
  return response.data;
}

export async function fetchCarByIdclient(id: string) {
  const res = await nextServer.get<Car>(`/cars/${id}`);
  return res.data;
}
