import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PiecesPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  return redirect('/admin/cirexits/found');
}
