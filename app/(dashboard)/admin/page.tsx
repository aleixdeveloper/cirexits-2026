// app/admin/page.tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminRootPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }
  return redirect('/admin/cirexits');
}
