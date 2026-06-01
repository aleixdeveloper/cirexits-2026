import Link from 'next/link';
import {
  Home,
  MessageCircleQuestion,
  PanelLeft,
  Cherry,
  ShoppingBasket,
  UsersRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import { ModalProvider } from 'app/context/ModalContext';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user.isAdmin;
  return (
    <Providers>
      <DesktopNav isAdmin={isAdmin} />
      <ModalProvider>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-[4.5rem]">
          <header className="z-30 mx-2 mt-2 flex h-16 items-center gap-2 rounded-lg border-2 bg-card/90 px-3 shadow-[0_6px_0_hsl(var(--foreground)/0.06)] backdrop-blur sm:static sm:mx-4 sm:h-auto sm:min-h-14 sm:px-5">
            <MobileNav isAdmin={isAdmin} />
            <p className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-foreground shadow-sm sm:text-sm">
              #ONSONLESCIREXITS
            </p>
            <div className="ml-auto">
              <User session={session} />
            </div>
          </header>
          <main
            className="h-full flex flex-col flex-1 gap-3 p-3 sm:p-4 sm:px-6 sm:py-0 md:gap-5"
            style={{
              minHeight: 'calc(100dvh - 95px)'
            }}
          >
            {children}
            <Toaster />
          </main>
        </div>
      </ModalProvider>

      <Analytics />
    </Providers>
  );
}

function DesktopNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r-2 bg-card/90 shadow-[8px_0_0_hsl(var(--foreground)/0.04)] backdrop-blur sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>
        {isAdmin ? (
          <>
            <NavItem href="/admin/cirexits" label="Cirèxits">
              <Cherry className="h-5 w-5" />
            </NavItem>
            <NavItem href="/admin/users" label="Participants">
              <UsersRound className="h-5 w-5" />
            </NavItem>
          </>
        ) : (
          <NavItem href="/mocador-de-farcells" label="Mocador de fer farcells">
            <ShoppingBasket className="h-5 w-5" />
          </NavItem>
        )}

        <NavItem href="/com-jugar" label="Com es juga?">
          <MessageCircleQuestion className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
}

function MobileNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs z-50 border-r-2 bg-card">
        <SheetTitle className="font-extrabold">Menú</SheetTitle>
        <nav className="grid gap-3 text-lg py-4 font-extrabold">
          <SheetTrigger asChild>
            <Link
              href="/"
              className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              Inici
            </Link>
          </SheetTrigger>

          {isAdmin ? (
            <>
              <SheetTrigger asChild>
                <Link
                  href="/admin/cirexits"
                  className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Cherry className="h-5 w-5" />
                  Cirèxits
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <UsersRound className="h-5 w-5" />
                  Participants
                </Link>
              </SheetTrigger>
            </>
          ) : (
            <SheetTrigger asChild>
              <Link
                href="/mocador-de-farcells"
                className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingBasket className="h-5 w-5" />
                Mocador de fer farcells
              </Link>
            </SheetTrigger>
          )}

          <SheetTrigger asChild>
            <Link
              href="/com-jugar"
              className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MessageCircleQuestion className="h-5 w-5" />
              Com es juga?
            </Link>
          </SheetTrigger>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
