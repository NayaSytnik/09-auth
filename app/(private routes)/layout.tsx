import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return <>{children}</>;
}