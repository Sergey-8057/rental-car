import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <svg className={css.logo} width="104" height="16" aria-hidden="true">
          <use href="/symbol-defs.svg#icon-logo" />
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={(css.navigationItem, css.isActive)}>
            <Link href="/">Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
