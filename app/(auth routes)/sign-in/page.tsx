'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
export default function SignInPage() {
  const router = useRouter();

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setError('Fill all fields');
      return;
    }

    setError('');
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}