'use client';

import { AdminTabs } from '@/components/AdminTabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: 'Collides', href: '/admin/cirexits/found' },
    { name: 'Amagades', href: '/admin/cirexits/hidden' },
    { name: 'Totes', href: '/admin/cirexits/all' }
  ];

  return (
    <>
      <div className="flex space-x-4 border-b mb-1 md:mb-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`py-1 px-2 ${
                isActive
                  ? 'border-b-2 border-fuchsia-600 font-semibold'
                  : 'text-gray-500 hover:text-fuchsia-500'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </>
  );
}
