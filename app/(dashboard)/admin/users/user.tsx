'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { UserWithScore } from './utils';

export function User({ user }: { user: UserWithScore }) {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <TableRow onClick={handleRowClick}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.found_count}</TableCell>
      <TableCell>{user.solved_questions_count}</TableCell>
      <TableCell>
        {user.score} <span className="text-xxs sm:text-xs">punts</span>
      </TableCell>
    </TableRow>
  );
}
