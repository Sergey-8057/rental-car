import { nextServer } from './api';

import { CarsResponse } from '@/types/car';

export async function fetchAllCarsClient({
  // page = 1,
  // perPage = ITEMS_PER_PAGE,
  // filter,
  // sortField,
  // sortOrder,
}: {
  page?: number;
  perPage?: number;
  filter?: string;
  sortField?: string;
  sortOrder?: string;
}): Promise<CarsResponse> {
  const response = await nextServer.get<CarsResponse>('/cars', {
    // params: {
    //   page,
    //   perPage,
    //   filter,
    //   sortField,
    //   sortOrder,
    // },
  });
  console.log(response.data);
  

  return response.data;
}
