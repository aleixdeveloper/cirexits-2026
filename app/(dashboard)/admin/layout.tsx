// app/admin/layout.tsx
import { AdminTabs } from '@/components/AdminTabs';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border-2 bg-card/85 p-3 shadow-[0_8px_0_hsl(var(--foreground)/0.05)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
          Backstage
        </p>
        <h2 className="text-xl font-bold">Panell d'administració</h2>
      </div>
      <AdminTabs />
      <div className="space-y-3">{children}</div>
    </div>
  );
}
