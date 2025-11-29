'use client';

import Link from 'next/link';
import type { Car } from '../../types/car';
import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <li className={css.listItem} key={car.id}>
      <h2 className={css.model}>{car.model}</h2>
      <p className={css.description}>{car.description}</p>
      <div className={css.footer}>
        <Link href={`/notes/${car.id}`} className={css.link}>
          Read more
        </Link>
      </div>
    </li>
  );
}
