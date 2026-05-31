import { getPieceById, markPieceAsFound } from '@/lib/pieces/getPieceById';
import { PieceDetail } from '@/components/piece/PieceDetail';
import { Alert } from '@/components/ui/alert/Alert';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function ScanPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session) {
    redirect(`/auth/login?redirect=/scan/${id}`);
  }

  const piece = await getPieceById(id);

  if (!piece) {
    return (
      <div>
        <Alert variant="destructive">QR ID: #{id} no trobat</Alert>
        <Link href="/">Torna al Inici</Link>
      </div>
    );
  }

  if (!piece.isFound) {
    await markPieceAsFound(id, session.user.id);
  }

  return (
    <PieceDetail
      id={id}
      hue={piece.hue}
      isFound={piece.isFound}
      userId={session.user.id}
    />
  );
}
