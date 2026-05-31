import { auth } from '@/lib/auth';
import { PiecesTable } from '../pieces-table';
import { getPieces } from '@/lib/pieces/getAllPieces';
import { redirect } from 'next/navigation';

export default async function AllPiecesPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { pieces, newOffset, totalPieces } = await getPieces(
    search,
    Number(offset)
  );

  return (
    <PiecesTable
      pieces={pieces}
      offset={newOffset ?? 0}
      totalPieces={totalPieces}
    />
  );
}
