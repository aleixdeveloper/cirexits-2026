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
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { User } from './user';
import { useState } from 'react';
import { sortArrayByColumn, UserWithScore } from './utils';

const headerMap: Partial<
  Record<keyof UserWithScore, { label: string; type: 'text' | 'number' }>
> = {
  name: {
    label: 'Nom',
    type: 'text'
  },
  found_count: {
    label: 'Cirèxits',
    type: 'number'
  },
  solved_questions_count: {
    label: 'Preguntes resoltes',
    type: 'number'
  },
  score: {
    label: 'Puntuació',
    type: 'number'
  }
};

export function UsersTable({
  users,
  totalUsers
}: {
  users: UserWithScore[];
  totalUsers: number;
}) {
  const [orderBy, setOrderBy] = useState('score');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const sortedUsers = sortArrayByColumn(
    headerMap,
    users,
    orderBy as keyof UserWithScore,
    order
  );

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <CardTitle>Participants</CardTitle>
            <CardDescription>Gestiona tots els participants</CardDescription>
          </div>
          <div className="text-xs text-muted-foreground">
            <strong>{totalUsers}</strong> participants
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.entries(headerMap).map(([field, { label }]) => (
                <TableHead
                  key={field}
                  className="px-0.5 text-xxs sm:text-xs"
                  onClick={() => {
                    setOrderBy(field);
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  {label}
                  {orderBy === field ? (order === 'asc' ? '↑' : '↓') : ''}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
