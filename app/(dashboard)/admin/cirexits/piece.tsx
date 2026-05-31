'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { SelectPieceFoundBy } from '@/lib/db/schema';
import { formatDate } from '@/lib/date';

export function Piece({ piece }: { piece: SelectPieceFoundBy }) {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/cirexit/${piece.id}`);
  };
  return (
    <TableRow onClick={handleRowClick}>
      <TableCell className="font-medium text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
        ...{piece.id.toString().slice(-5)}
      </TableCell>
      <TableCell className="text-center">
        <Badge
          variant={piece.foundBy ? 'success' : 'default'}
          className="capitalize"
        >
          {piece.foundBy ? 'Collida' : 'Amagada'}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        {piece.foundBy?.name ?? '-'}
      </TableCell>
      <TableCell className="text-xxs sm:text-xs text-right">
        {formatDate(piece.foundAt)}
      </TableCell>
    </TableRow>
  );
}
