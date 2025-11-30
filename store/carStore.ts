import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

interface CarState {
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

export const useCarStore = create<CarState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (car: Car) => {
        set(state => ({
          favorites: [...state.favorites, car],
        }));
      },

      removeFromFavorites: (carId: string) => {
        set(state => ({
          favorites: state.favorites.filter(car => car.id !== carId),
        }));
      },

      isFavorite: (carId: string) => {
        return get().favorites.some(car => car.id === carId);
      },
    }),
    {
      name: 'car-favorites-storage',
    }
  )
);
