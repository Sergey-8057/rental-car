import { serverFetchCars, fetchAllCarBrandServer } from '@/lib/api/serverApi';
import CarsClient from './Cars.client';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination';

export default async function CarsPage() {
  const initialData = await serverFetchCars({
    limit: DEFAULT_LIMIT,
    page: DEFAULT_PAGE,
  });
  const brands = await fetchAllCarBrandServer();

  return <CarsClient initialData={initialData} initialPage={DEFAULT_PAGE} brands={brands} />;
}
