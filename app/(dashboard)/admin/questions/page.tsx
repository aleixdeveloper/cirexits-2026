import React from 'react';
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
import { cn } from '@/lib/utils';

export default async function QuestionPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const questions = await getQuestionsWithStats();
  //questions starts with {number}. {question} so is sorted alphabetically
  //extract number, convert it into number and sort
  const sortedQuestions = questions.sort((a, b) => {
    const aNum = parseInt(a.question.split('.')[0]);
    const bNum = parseInt(b.question.split('.')[0]);
    return aNum - bNum;
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntes amb intents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-[11px]">
              <TableHead>Opció A</TableHead>
              <TableHead>Opció B</TableHead>
              <TableHead>Opció C</TableHead>
              <TableHead>Total intents</TableHead>
              <TableHead>Correctes</TableHead>
              <TableHead>Incorrectes</TableHead>
              <TableHead>Distribució A</TableHead>
              <TableHead>Distribució B</TableHead>
              <TableHead>Distribució C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[11px]">
            {sortedQuestions.map((question) => {
              return (
                <React.Fragment key={question.id}>
                  <TableRow className="py-0.5">
                    <TableCell colSpan={10}>
                      <b>{question.question}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span
                        className={cn(
                          question.correctOption === 'A' &&
                            'font-bold bg-accent'
                        )}
                      >
                        {question.optionA}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          question.correctOption === 'B' &&
                            'font-bold bg-accent'
                        )}
                      >
                        {question.optionB}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          question.correctOption === 'C' &&
                            'font-bold bg-accent'
                        )}
                      >
                        {question.optionC}
                      </span>
                    </TableCell>
                    <TableCell>{question.totalAttempts}</TableCell>
                    <TableCell>{question.correctCount}</TableCell>
                    <TableCell>{question.wrongCount}</TableCell>
                    <TableCell>{question.optionDistribution.a}%</TableCell>
                    <TableCell>{question.optionDistribution.b}%</TableCell>
                    <TableCell>{question.optionDistribution.c}%</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
