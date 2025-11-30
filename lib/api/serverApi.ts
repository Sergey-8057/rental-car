import axios from 'axios';
import { CarsResponse, Car, CarFilterParams } from '@/types/car';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination';

const externalApi = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

export async function serverFetchCars({
  limit = DEFAULT_LIMIT,
  page = DEFAULT_PAGE,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}: CarFilterParams = {}): Promise<CarsResponse> {
  const response = await externalApi.get<CarsResponse>('/cars', {
    params: {
      limit,
      page,
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    },
  });

  return response.data;
}

export async function fetchCarByIdServer(id: string) {
  const res = await externalApi.get<Car>(`/cars/${id}`);
  return res.data;
}

export async function fetchAllCarBrandServer(): Promise<string[]> {
  const res = await externalApi.get<string[]>(`/brands`);
  return res.data;
}
