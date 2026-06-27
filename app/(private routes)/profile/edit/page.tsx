'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import css from './EditProfilePage.module.css';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(
    user?.username ?? '',
  );

  if (!user) return null;

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const updatedUser = await updateMe({
        username,
      });

      setUser(updatedUser);

      router.push('/profile');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>
          Edit Profile
        </h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form
          className={css.profileInfo}
          onSubmit={handleSubmit}
        >
          <div className={css.usernameWrapper}>
            <label htmlFor="username">
              Username:
            </label>

            <input
              id="username"
              className={css.input}
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              className={css.saveButton}
              type="submit"
            >
              Save
            </button>

            <button
              className={css.cancelButton}
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}