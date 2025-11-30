'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCarsClient } from '@/lib/api/clientApi';
import { CarsResponse, Car, CarFilterParams } from '@/types/car';
import { DEFAULT_LIMIT } from '@/constants/pagination';
import FilterBoxClient from '@/components/FilterBox/FilterBoxClient';
import CarList from '@/components/CarList/CarList';
import css from './page.module.css';

interface CarsClientProps {
  initialData: CarsResponse;
  initialPage: number;
  brands: string[];
}

export default function CarsClient({ initialData, initialPage, brands }: CarsClientProps) {
  const [page, setPage] = useState(initialPage);
  const [allCars, setAllCars] = useState<Car[]>(initialData.cars);
  const [filters, setFilters] = useState<CarFilterParams>({});

  const limit = DEFAULT_LIMIT;

  const { data: response, refetch } = useQuery({
    queryKey: ['cars', limit, page, filters],
    queryFn: () =>
      fetchAllCarsClient({
        limit,
        page,
        ...filters,
      }),
    initialData,
    enabled: page !== initialPage || Object.keys(filters).length > 0,
  });

  const totalPages = response?.totalPages ?? initialData.totalPages;
  const canLoadMore = page < totalPages;

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);

    fetchAllCarsClient({
      limit,
      page: newPage,
      ...filters,
    }).then(newData => {
      setAllCars(prev => [...prev, ...newData.cars]);
    });
  };

  const handleFilterChange = (newFilters: CarFilterParams) => {
    setFilters(newFilters);
    setPage(1);
    setAllCars([]);

    fetchAllCarsClient({
      limit,
      page: 1,
      ...newFilters,
    }).then(newData => {
      setAllCars(newData.cars);
    });
  };

  return (
    <>
      <FilterBoxClient brands={brands} onFilterChange={handleFilterChange} />
      <CarList cars={allCars} />
      {canLoadMore && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}
