import { TableCell, TableRow } from '@/components/ui/table';
import { UserWithScore } from './utils';

export function User({ user }: { user: UserWithScore }) {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell className="text-right">{user.found_count}</TableCell>
      <TableCell className="text-right">{user.correct_answers}</TableCell>
      <TableCell className="text-right">
        {user.score} <span className="text-xxs sm:text-xs">punts</span>
      </TableCell>
    </TableRow>
  );
}
