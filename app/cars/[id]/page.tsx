import { notFound } from 'next/navigation';
import { fetchCarByIdServer } from '@/lib/api/serverApi';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import  CarClient  from './CarClient.client';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarByIdServer(id);
  return {
    title: `RentalCar - ${car.brand} ${car.model}`,
    description: car.description,
  };
}

export default async function CarPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ['story', id],
      queryFn: () => fetchCarByIdServer(id),
    });
  } catch {
    return notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={styles.container}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CarClient />
          </HydrationBoundary>
        </div>
      </section>
    </main>
  );
}