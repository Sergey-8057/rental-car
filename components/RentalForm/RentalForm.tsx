'use client';

import css from './RentalForm.module.css';

export default function RentalForm() {
  return (
    <div className={css.containerForm}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formText}>Stay connected! We are always ready to help you.</p>
      <form className={css.form}>
        <div className={css.formGroup}>
          <input
            id="name"
            type="name"
            name="name"
            className={css.input}
            required
            placeholder="Name*"
          />
        </div>

        <div className={css.formGroup}>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            placeholder="Email*"
          />
        </div>

        <div className={css.formGroup}>
          <input
            id="date"
            type="text"
            name="date"
            className={css.input}
            required
            placeholder="Booking date"
          />
        </div>

        <div className={css.formGroup}>
          <textarea id="comment" name="content" rows={8} className={css.textarea} maxLength={500} />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Зареєструватись
          </button>
        </div>
      </form>
    </div>
  );
}
