import { getHiddenPieces } from '@/lib/pieces/getAllPieces';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HiddenPiecesPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }
  const pieces = await getHiddenPieces();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            CIRÈXITS que encara estàn amagades ({pieces.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pieces.map((piece) => (
                <TableRow key={piece.id}>
                  <TableCell className="font-medium text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                    {piece.id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
