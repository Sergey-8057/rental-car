'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import css from './RentalForm.module.css';

export default function RentalForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Your request has been sent!', {
      duration: 5000,
    });
    setFormData({
      name: '',
      email: '',
      date: '',
      content: '',
    });
  };

  return (
    <div className={css.containerForm}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formText}>Stay connected! We are always ready to help you.</p>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <input
            id="name"
            type="text"
            name="name"
            className={css.input}
            required
            minLength={3}
            maxLength={50}
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            id="date"
            type="text"
            name="date"
            className={css.input}
            placeholder="Booking date"
            value={formData.date}
            onChange={handleChange}
          />

          <textarea
            id="content"
            name="content"
            className={css.textarea}
            maxLength={500}
            placeholder="Comment"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
