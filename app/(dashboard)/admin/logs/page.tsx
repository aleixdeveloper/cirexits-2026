import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllQuestionAttempts } from 'services/questionAttemptService';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date';
import { getGameLog } from 'services/gameService';

export default async function LogsPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const gameLog = await getGameLog();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Històric del joc</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="text-center">Usuari</TableHead>
              <TableHead className="text-center">Tipus</TableHead>
              <TableHead className="text-center">Correcte</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gameLog.map((log) => (
              <TableRow key={log.createdAt.toISOString()}>
                <TableCell className="font-medium max-w-[100px]">
                  ...{log.createdAt.toISOString().slice(-5)}
                </TableCell>
                <TableCell className="text-center">
                  {log.userName ?? '-'}
                </TableCell>
                <TableCell className="text-center">
                  {log.type === 'piece_found' ? 'Peça trobada' : '-'}
                </TableCell>
                <TableCell className="text-center">
                  {log.isCorrect === null ? '-' : log.isCorrect ? 'Sí' : 'No'}
                </TableCell>
                <TableCell className="text-xxs sm:text-xs text-right">
                  {formatDate(log.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
