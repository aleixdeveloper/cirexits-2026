// app/admin/layout.tsx
import { AdminTabs } from '@/components/AdminTabs';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-1">Panell d'administració</h2>
      <AdminTabs />
      <div>{children}</div>
    </div>
  );
}
