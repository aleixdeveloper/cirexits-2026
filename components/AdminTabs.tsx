'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Cirèxits', href: '/admin/cirexits' },
    {
      name: 'Participants',
      href: '/admin/users'
    },
    {
      name: 'Preguntes',
      href: '/admin/questions'
    },
    {
      name: 'Històric',
      href: '/admin/logs'
    }
  ];
  return (
    <div className="mb-3 flex gap-0.5 md:gap-2 overflow-x-auto rounded-lg border-2 bg-card/80 p-1 md:mb-5">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-extrabold transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-[0_3px_0_hsl(var(--foreground)/0.14)]'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
