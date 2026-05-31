import { Playpen_Sans } from 'next/font/google';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';

const playpenSans = Playpen_Sans({
  variable: '--font-playpen-sans',
  subsets: ['latin']
});

export const metadata = {
  title: `ON SÓN LES CIRÈXITS? El joc d'ÈXIT Sortida d'Emergència`,
  description: 'Cull totes les cirèxits que puguis i aconsegueix la recompensa',
  icons: {
    icon: '/logo.png' // /public path
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body
        className={`${playpenSans.variable} antialiased flex min-h-screen w-full flex-col`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
