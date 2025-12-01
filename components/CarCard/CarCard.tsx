'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCarStore } from '@/store/carStore';
import type { Car } from '@/types/car';
import { useEffect, useState } from 'react';
import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useCarStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Проверяем избранное только после монтирования
  const isCarFavorite = mounted ? isFavorite(car.id) : false;

  const address = car.address.split(', ');
  const formatCarType = car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();
  const formatMileage = car.mileage.toLocaleString();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mounted) return; // защита на случай SSR
    if (isCarFavorite) removeFromFavorites(car.id);
    else addToFavorites(car);
  };

  if (!mounted) {
    return (
      <li className={css.listItem}>
        <div className={css.imgWrapper} />
        <div className={css.imgTitle} />
        <div className={css.imgText} />
        <div className={css.btnLink}>
          <Link href={`/cars/${car.id}`} className={css.link}>
            Read more
          </Link>
        </div>
      </li>
    );
  }

  return (
    <li className={css.listItem}>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`Photo of ${car.model}`}
          width={276}
          height={268}
          className={css.imgCar}
          priority
        />
        <button
          className={`${css.favoriteButton} ${isCarFavorite ? css.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isCarFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="16" height="16" aria-hidden="true">
            <use
              href={
                isCarFavorite
                  ? '/symbol-defs.svg#icon-isFavorite'
                  : '/symbol-defs.svg#icon-notFavorite'
              }
            />
          </svg>
        </button>
      </div>
      <div className={css.imgTitle}>
        <p>
          {car.brand} <span className={css.colorModel}>{car.model}, </span>
          {car.year}
        </p>
        <p className={css.model}>${car.rentalPrice}</p>
      </div>
      <div className={css.imgText}>
        <div className={css.imgTextParagraph}>
          <p className={css.vertLine}>{address[1]}</p>
          <p className={css.vertLine}>{address[2]}</p>
          <p className={css.vertLine}>{car.rentalCompany}</p>
        </div>
        <div className={css.imgTextParagraph}>
          <p className={css.vertLine}>{formatCarType}</p>
          <p>{formatMileage} km</p>
        </div>
      </div>
      <div className={css.btnLink}>
        <Link href={`/cars/${car.id}`} className={css.link}>
          Read more
        </Link>
      </div>
    </li>
  );
}
