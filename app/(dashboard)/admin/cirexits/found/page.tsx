import { getFoundPieces } from '@/lib/pieces/getAllPieces';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FoundPieceComp } from './FoundPiece';

export default async function FoundPiecesPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }
  const pieces = await getFoundPieces();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          CIRÈXITS que ja han estat collides ({pieces.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="text-center">Collida per</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pieces.map((piece) => (
              <FoundPieceComp key={piece.id} piece={piece} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
