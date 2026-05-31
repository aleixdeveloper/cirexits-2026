import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import ThemeProviders from './providers';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['500', '600', '700']
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata = {
  title: `ON SÓN LES CIRÈXITS? El joc d'ÈXIT Sortida d'Emergència`,
  description: 'Cull totes les cirèxits que puguis i aconsegueix la recompensa',
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${nunito.variable} antialiased flex min-h-screen w-full flex-col`}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
      <Analytics />
    </html>
  );
}
