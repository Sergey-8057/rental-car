'use client';

import CarCard from '@/components/CarCard/CarCard';
import type { Car } from '../../types/car';
import css from './CarList.module.css';

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <section className={css.container}>
      <ul className={css.list}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
    </section>
  );
}
