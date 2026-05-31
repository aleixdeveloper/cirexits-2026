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
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 sm:gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav isAdmin={isAdmin} />
            <p className="text-sm font-semibold">#ONSONLESCIREXITS</p>
            <div className="ml-auto">
              <User session={session} />
            </div>
          </header>
          <main
            className="h-full flex flex-col flex-1 gap-2 p-2 sm:p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40"
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
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
      <SheetContent side="left" className="sm:max-w-xs z-50">
        <SheetTitle>Menú</SheetTitle>
        <nav className="grid gap-6 text-lg py-4 font-medium">
          <SheetTrigger asChild>
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Cherry className="h-5 w-5" />
                  Cirèxits
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShoppingBasket className="h-5 w-5" />
                Mocador de fer farcells
              </Link>
            </SheetTrigger>
          )}

          <SheetTrigger asChild>
            <Link
              href="/com-jugar"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
