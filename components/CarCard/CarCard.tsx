'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '../../types/car';
import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const address = car.address.split(', ')
  const formatCarType = car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();
  const formatMileage = car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


  return (
    <li className={css.listItem} key={car.id}>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`Photo of ${car.model}`}
          width={276}
          height={268}
          className={css.imgCar}
          priority={true}
        />
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
