'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const init = async () => {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    init();
  }, [setUser, clearAuth]);

  return <>{children}</>;
}