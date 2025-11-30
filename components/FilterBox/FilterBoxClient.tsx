'use client';

import { useState, useEffect, useRef } from 'react';
import { CarFilterParams } from '@/types/car';
import css from './FilterBox.module.css';

interface FilterBoxProps {
  brands: string[];
  onFilterChange: (filters: CarFilterParams) => void;
}

export default function FilterBoxClient({ brands, onFilterChange }: FilterBoxProps) {
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');

  const brandMenuRef = useRef<HTMLUListElement>(null);
  const brandButtonRef = useRef<HTMLButtonElement>(null);
  const priceMenuRef = useRef<HTMLUListElement>(null);
  const priceButtonRef = useRef<HTMLButtonElement>(null);

  const prices = Array.from({ length: 8 }, (_, i) => (30 + i * 10).toString());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandMenuRef.current &&
        !brandMenuRef.current.contains(event.target as Node) &&
        brandButtonRef.current &&
        !brandButtonRef.current.contains(event.target as Node)
      ) {
        setOpenBrand(false);
      }

        if (
        priceMenuRef.current &&
        !priceMenuRef.current.contains(event.target as Node) &&
        priceButtonRef.current &&
        !priceButtonRef.current.contains(event.target as Node)
      ) {
        setOpenPrice(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: CarFilterParams = {
      brand: selectedBrand || undefined,
      rentalPrice: selectedPrice || undefined,
      minMileage: mileageFrom || undefined,
      maxMileage: mileageTo || undefined,
    };

    onFilterChange(filters);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setTimeout(() => {
      setOpenBrand(false);
    }, 10);
  };

  const handleBrandClear = () => {
    setSelectedBrand('');
    setTimeout(() => {
      setOpenBrand(false);
    }, 10);
  };

  const handlePriceSelect = (price: string) => {
    setSelectedPrice(price);
    setTimeout(() => {
      setOpenPrice(false);
    }, 10);
  };

  const handlePriceClear = () => {
    setSelectedPrice('');
    setTimeout(() => {
      setOpenPrice(false);
    }, 10);
  };

  const handleToggleBrandMenu = () => {
    setOpenBrand(prev => !prev);
    setOpenPrice(false);
  };

  const handleTogglePriceMenu = () => {
    setOpenPrice(prev => !prev);
    setOpenBrand(false);
  };

  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label className={css.label}>
            Car brand
            <button
              ref={brandButtonRef}
              type="button"
              className={css.menuButton}
              onClick={handleToggleBrandMenu}
            >
              {selectedBrand || 'Choose a brand'}
              {openBrand ? (
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-up" />
                </svg>
              ) : (
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-down" />
                </svg>
              )}
            </button>
            {openBrand && (
              <ul ref={brandMenuRef} className={css.menuList}>
                <li
                  className={css.menuItem}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleBrandClear();
                  }}
                >
                  All brands
                </li>
                {brands.map((brand, i) => (
                  <li
                    key={i}
                    className={css.menuItem}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleBrandSelect(brand);
                    }}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className={css.label}>
            Price / 1 hour
            <button
              ref={priceButtonRef}
              type="button"
              className={css.menuButton}
              onClick={handleTogglePriceMenu}
            >
              {selectedPrice ? `${selectedPrice}` : 'Choose a price'}
              {openPrice ? (
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-up" />
                </svg>
              ) : (
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-down" />
                </svg>
              )}
            </button>
            {openPrice && (
              <ul ref={priceMenuRef} className={css.menuList}>
                <li
                  className={css.menuItem}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePriceClear();
                  }}
                >
                  All prices
                </li>
                {prices.map(price => (
                  <li
                    key={price}
                    className={css.menuItem}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePriceSelect(price);
                    }}
                  >
                    {price}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className={css.label}>
            Car mileage / km
            <div className={css.mileageInputs}>
              <input
                type="text"
                placeholder="From"
                value={mileageFrom}
                onChange={e => setMileageFrom(e.target.value)}
                className={css.inputFrom}
              />
              <input
                type="text"
                placeholder="To"
                value={mileageTo}
                onChange={e => setMileageTo(e.target.value)}
                className={css.inputTo}
              />
            </div>
          </label>

          <button type="submit" className={css.submitButton}>
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
