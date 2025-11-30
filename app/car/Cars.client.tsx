'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCarsClient } from '@/lib/api/clientApi';
import { CarsResponse, Car } from '@/types/car';
import { DEFAULT_LIMIT } from '@/constants/pagination';
import FilterBox from '@/components/FilterBox/FilterBox';
import CarList from '@/components/CarList/CarList';
import css from './page.module.css';

interface CarsClientProps {
  initialData: CarsResponse;
  initialPage: number;
}

export default function CarsClient({ initialData, initialPage }: CarsClientProps) {
  const [page, setPage] = useState(initialPage);
  const [allCars, setAllCars] = useState<Car[]>(initialData.cars);

  const limit = DEFAULT_LIMIT;

  const { data: response } = useQuery({
    queryKey: ['cars', limit, page],
    queryFn: () => fetchAllCarsClient({ limit, page }),
    initialData,
    enabled: page !== initialPage,
  });

  const totalPages = response?.totalPages ?? initialData.totalPages;
  const canLoadMore = page < totalPages;

  const handleLoadMore = () => {
    setPage(prev => prev + 1);

    fetchAllCarsClient({ limit, page: page + 1 }).then(newData => {
      setAllCars(prev => [...prev, ...newData.cars]);
    });
  };

  return (
    <>
      <FilterBox />

      <CarList cars={allCars} />

      {canLoadMore && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}
