import Link from 'next/link';
import css from './page.module.css';

export const metadata = {
  title: 'RentalCar - Home',
  description: 'Find your perfect rental car. Reliable and budget-friendly rentals.',
};


export default function Home() {
  return (
    <section className={css.container}>
      <div className={css.hero}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <p className={css.heroText}>Reliable and budget-friendly rentals for any journey</p>
        <button className={css.heroBtn}>
          <Link href="/cars">View Catalog</Link>
        </button>
      </div>
    </section>
  );
}
