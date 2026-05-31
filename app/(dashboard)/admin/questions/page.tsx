import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getQuestionsWithStats } from 'services/questionAnalyticsService';

export default async function QuestionPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const questions = await getQuestionsWithStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntes amb intents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-[11px]">
              <TableHead>ID</TableHead>
              <TableHead>Pregunta</TableHead>
              <TableHead>Opció A</TableHead>
              <TableHead>Opció B</TableHead>
              <TableHead>Opció C</TableHead>
              <TableHead>Opció correcta</TableHead>
              <TableHead>Total intents</TableHead>
              <TableHead>Correctes</TableHead>
              <TableHead>Incorrectes</TableHead>
              <TableHead>Distribució A</TableHead>
              <TableHead>Distribució B</TableHead>
              <TableHead>Distribució C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[11px]">
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium max-w-[100px]">
                  ...{question.id.toString().slice(-5)}
                </TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.optionA}</TableCell>
                <TableCell>{question.optionB}</TableCell>
                <TableCell>{question.optionC}</TableCell>
                <TableCell>{question.correctOption}</TableCell>
                <TableCell>{question.totalAttempts}</TableCell>
                <TableCell>{question.correctCount}</TableCell>
                <TableCell>{question.wrongCount}</TableCell>
                <TableCell>{question.optionDistribution.a}</TableCell>
                <TableCell>{question.optionDistribution.b}</TableCell>
                <TableCell>{question.optionDistribution.c}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
