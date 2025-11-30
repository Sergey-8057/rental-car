'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <svg className={css.logo} width="104" height="16" aria-hidden="true">
          <use href="/symbol-defs.svg#icon-logo" />
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li
            className={clsx(css.navigationItem, {
              [css.isActive]: pathname === '/',
            })}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={clsx(css.navigationItem, {
              [css.isActive]: pathname === '/cars',
            })}
          >
            <Link href="/cars">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
