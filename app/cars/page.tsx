import { serverFetchCars } from '@/lib/api/serverApi';
import CarsClient from './Cars.client';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination';

export default async function CarsPage() {
  const initialData = await serverFetchCars(DEFAULT_LIMIT, DEFAULT_PAGE);

  return <CarsClient initialData={initialData} initialPage={DEFAULT_PAGE} />;
}
