'use client';

import { useEffect, useState } from 'react';

import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}