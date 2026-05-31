'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { type FoundPiece } from '@/lib/pieces/types';
import { useRouter } from 'next/navigation';

export function FoundPieceComp({ piece }: { piece: FoundPiece }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/admin/users/${piece.foundBy?.id}`);
  };

  return (
    <TableRow onClick={handleRowClick}>
      <TableCell className="font-medium max-w-[100px]">
        ...{piece.id.toString().slice(-5)}
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
