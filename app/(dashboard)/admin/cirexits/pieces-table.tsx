'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Piece } from './piece';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectPieceFoundBy } from '@/lib/db/schema';
import { PIECES_PER_PAGE } from './constants';

export function PiecesTable({
  pieces,
  offset,
  totalPieces
}: {
  pieces: SelectPieceFoundBy[];
  offset: number;
  totalPieces: number;
}) {
  let router = useRouter();
  let piecesPerPage = PIECES_PER_PAGE;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CIRÈXITS</CardTitle>
        <CardDescription>Gestiona totes les Cirèxits</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">ID</TableHead>
              <TableHead className="text-center">Estat</TableHead>
              <TableHead className="text-center">Collida per</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pieces.map((piece) => (
              <Piece key={piece.id} piece={piece} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Mostrant{' '}
            <strong>
              {Math.max(0, Math.min(offset - piecesPerPage, totalPieces) + 1)}-
              {offset}
            </strong>{' '}
            de <strong>{totalPieces}</strong> cirèxits
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === piecesPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + piecesPerPage > totalPieces}
            >
              Següent
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
