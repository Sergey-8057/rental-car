'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import { fetchCarByIdclient } from '@/lib/api/clientApi';
import RentalForm from '@/components/RentalForm/RentalForm';
import css from './CarClient.module.css';

export default function CarClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchCarByIdclient(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!car) return <p>Note not found.</p>;

  const address = car.address.split(', ');
  const formatMileage = car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formatCarType = car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();
  const accessoriesAndfunctionalities = [...car.accessories, ...car.functionalities];

  return (
    <section className={css.container}>
      <div>
        <div className={css.imgWrapper}>
          <Image
            src={car.img}
            alt={`Photo of ${car.model}`}
            width={640}
            height={512}
            className={css.imgCar}
            priority={true}
          />
        </div>
        <RentalForm />
      </div>
      <div className={css.contInfoCar}>
        <div className={css.infoCarTitle}>
          <div className={css.infoCarTitleModel}>
            <h3 className={css.infoCarBrand}>
              {car.brand} {car.model}, {car.year}
            </h3>
            <p className={css.infoCarModelId}>Id: {car.id.slice(0, 4)}</p>
          </div>
          <div className={css.iconLocationAndAddress}>
            <svg width="16" height="16" aria-hidden="true">
              <use href="/symbol-defs.svg#icon-location" />
            </svg>
            <div className={css.infoCarAddress}>
              <p className={css.infoCarAddresText}>
                {address[1]}, {address[2]}
              </p>
              <p className={css.infoCarAddresText}>Mileage: {formatMileage} km</p>
            </div>
          </div>
          <p className={css.infoCarPrice}>${car.rentalPrice}</p>
          <p className={css.infoCarDescription}>{car.description}</p>
        </div>
        <div className={css.conditionsSpecificationsAccessories}>
          <div>
            <h3 className={css.condSpecAccesTitle}>Rental Conditions:</h3>
            <ul>
              {car.rentalConditions.map((rentalCondition, index) => (
                <li className={css.condSpecAccesItem} key={index}>
                  <svg className={css.iconCheckCircle} width="16" height="16" aria-hidden="true">
                    <use href="/symbol-defs.svg#icon-check-circle" />
                  </svg>
                  <p className={css.condSpecAccesText}>{rentalCondition}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={css.condSpecAccesTitle}>Car Specifications:</h3>
            <ul>
              <li className={css.condSpecAccesText}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-calendar" />
                </svg>
                <p className={css.condSpecAccesText}>Year: {car.year}</p>
              </li>
              <li className={css.condSpecAccesText}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-car" />
                </svg>
                <p className={css.condSpecAccesText}>Type: {formatCarType}</p>
              </li>
              <li className={css.condSpecAccesText}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-fuel-pump" />
                </svg>
                <p className={css.condSpecAccesText}>Fuel Consumption: {car.fuelConsumption}</p>
              </li>
              <li className={css.condSpecAccesText}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-gear" />
                </svg>
                <p className={css.condSpecAccesText}>Engine Size: {car.engineSize}</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={css.condSpecAccesTitle}>Accessories and functionalities:</h3>
            <ul>
              {accessoriesAndfunctionalities.map((item, index) => (
                <li className={css.condSpecAccesText} key={index}>
                  <svg className={css.iconCheckCircle} width="16" height="16" aria-hidden="true">
                    <use href="/symbol-defs.svg#icon-check-circle" />
                  </svg>
                  <p className={css.condSpecAccesText}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
