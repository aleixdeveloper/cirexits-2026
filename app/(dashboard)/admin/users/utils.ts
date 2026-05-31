import { SelectUserWithCount } from '@/lib/db/schema';
import { calculateScore } from '@/lib/score';

export type UserWithScore = {
  id: string;
  name: string;
  found_count: number;
  solved_questions_count?: number;
  score: number;
};

export const addScoreToUsers = (
  users: SelectUserWithCount[]
): UserWithScore[] => {
  return users.map((user) => ({
    ...user,
    score: 1 /* calculateScore({
      pieces: user.found_count,
      questions: user.solved_questions_count
    }) */
  }));
};

export function sortArrayByColumn<T>(
  headerMap: Partial<
    Record<keyof T, { label: string; type: 'text' | 'number' }>
  >,
  array: T[],
  orderBy: keyof T,
  order: 'asc' | 'desc'
): T[] {
  const columnType = headerMap[orderBy]?.type ?? 'text';

  return [...array].sort((a, b) => {
    const rawA = a[orderBy];
    const rawB = b[orderBy];

    let comparison = 0;

    if (columnType === 'number') {
      const numA = Number(rawA);
      const numB = Number(rawB);
      comparison = numA - numB;
    } else {
      const strA = String(rawA);
      const strB = String(rawB);
      comparison = strA.localeCompare(strB);
    }

    return order === 'asc' ? comparison : -comparison;
  });
}
