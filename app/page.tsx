import Link from 'next/link';
import css from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={css.container}>
        <div className={css.hero}>
          <h1 className={css.heroTitle}>Find your perfect rental car</h1>
          <p className={css.heroText}>Reliable and budget-friendly rentals for any journey</p>
          <button className={css.heroBtn}>
            <Link href="/">View Catalog</Link>
          </button>
        </div>
      </section>
    </main>
  );
}
