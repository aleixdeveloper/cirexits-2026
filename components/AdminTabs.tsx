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
    <div className="flex space-x-4 border-b mb-1 md:mb-4">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-1 px-2 ${
              isActive
                ? 'border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
