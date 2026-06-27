import type { Metadata } from 'next';
import { ReactNode } from 'react';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Header from '@/components/Header/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub application',
};

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}